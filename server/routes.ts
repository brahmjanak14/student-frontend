import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import React from "react";
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all submissions
  app.get("/api/submissions", async (req, res) => {
    try {
      const submissions = await storage.getSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  // Get single submission
  app.get("/api/submissions/:id", async (req, res) => {
    try {
      const submission = await storage.getSubmission(req.params.id);
      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }
      res.json(submission);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch submission" });
    }
  });

  // Create submission
  app.post("/api/submissions", async (req, res) => {
    try {
      const validatedData = insertSubmissionSchema.parse(req.body);
      const submission = await storage.createSubmission(validatedData);
      res.status(201).json(submission);
    } catch (error) {
      res.status(400).json({ error: "Invalid submission data" });
    }
  });

  // Update submission status
  app.patch("/api/submissions/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }
      const submission = await storage.updateSubmissionStatus(req.params.id, status);
      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }
      res.json(submission);
    } catch (error) {
      res.status(500).json({ error: "Failed to update submission" });
    }
  });

  // NEW ELIGIBILITY FLOW ENDPOINTS
  
  // Submit contact information and send OTP
  app.post("/api/eligibility/submit", async (req, res) => {
    try {
      const contactSchema = z.object({
        fullName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(10),
        city: z.string().min(1),
      });
      
      const data = contactSchema.parse(req.body);
      
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Create submission in database
      const submission = await storage.createSubmission({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        otpCode: otp,
        otpVerified: 0,
        status: "pending",
      });
      
      // Store OTP in submission
      await storage.updateSubmissionOtp(submission.id, otp);
      
      // TODO: Send OTP via WhatsApp using Twilio
      // For now, just log it and return it in development mode
      console.log(`📱 WhatsApp OTP for ${data.phone}: ${otp}`);
      console.log(`Submission ID: ${submission.id}`);
      
      // In development mode, return OTP in response for testing
      const isDevelopment = process.env.NODE_ENV === "development";
      
      res.json({ 
        id: submission.id,
        message: "OTP sent to WhatsApp",
        // Only send OTP in development for testing
        ...(isDevelopment && { otpCode: otp })
      });
    } catch (error) {
      console.error("Error submitting contact:", error);
      res.status(400).json({ error: "Failed to submit contact information" });
    }
  });

  // Verify OTP and calculate eligibility
  app.post("/api/eligibility/verify-otp", async (req, res) => {
    try {
      const verifySchema = z.object({
        submissionId: z.string(),
        otp: z.string().length(6),
      });
      
      const { submissionId, otp } = verifySchema.parse(req.body);
      
      // Verify OTP
      const isValid = await storage.verifyOtp(submissionId, otp);
      
      if (!isValid) {
        return res.status(400).json({ error: "Invalid OTP code" });
      }
      
      // Calculate eligibility score (random for now, 70-95%)
      const score = Math.floor(70 + Math.random() * 26);
      
      // Update submission with score
      await storage.updateEligibilityScore(submissionId, score);
      
      const message = score >= 80
        ? "You have a strong profile for Canada study visa. Consider improving your writing score to increase chances further."
        : "You have a good profile for Canada study visa. We recommend improving your language test scores.";
      
      res.json({ 
        score,
        message,
        isEligible: score >= 70
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(400).json({ error: "Failed to verify OTP" });
    }
  });

  // Download PDF report
  app.get("/api/eligibility/download-pdf/:id", async (req, res) => {
    try {
      const submission = await storage.getSubmission(req.params.id);
      
      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }
      
      if (!submission.otpVerified) {
        return res.status(403).json({ error: "Phone number not verified" });
      }
      
      // Generate PDF using React.createElement
      const pdfDoc = React.createElement(
        Document,
        null,
        React.createElement(
          Page,
          { size: "A4", style: pdfStyles.page },
          React.createElement(
            View,
            { style: pdfStyles.header },
            React.createElement(Text, { style: pdfStyles.title }, "Canada Study Visa"),
            React.createElement(Text, { style: pdfStyles.subtitle }, "Eligibility Report")
          ),
          React.createElement(
            View,
            { style: pdfStyles.section },
            React.createElement(Text, { style: pdfStyles.sectionTitle }, "Personal Information"),
            React.createElement(Text, { style: pdfStyles.text }, `Name: ${submission.fullName}`),
            React.createElement(Text, { style: pdfStyles.text }, `Email: ${submission.email}`),
            React.createElement(Text, { style: pdfStyles.text }, `Phone: ${submission.phone}`),
            React.createElement(Text, { style: pdfStyles.text }, `City: ${submission.city}`)
          ),
          React.createElement(
            View,
            { style: pdfStyles.section },
            React.createElement(Text, { style: pdfStyles.sectionTitle }, "Eligibility Assessment"),
            React.createElement(Text, { style: pdfStyles.scoreText }, `Probability Score: ${submission.eligibilityScore}%`),
            React.createElement(
              Text,
              { style: pdfStyles.text },
              `Status: ${submission.eligibilityScore && submission.eligibilityScore >= 70 ? "Eligible" : "Not Eligible"}`
            )
          ),
          React.createElement(
            View,
            { style: pdfStyles.section },
            React.createElement(Text, { style: pdfStyles.sectionTitle }, "Recommendation"),
            React.createElement(
              Text,
              { style: pdfStyles.text },
              submission.eligibilityScore && submission.eligibilityScore >= 80
                ? "You have a strong profile for Canada study visa. Consider improving your writing score to increase chances further."
                : "You have a good profile for Canada study visa. We recommend improving your language test scores."
            )
          ),
          React.createElement(
            View,
            { style: pdfStyles.footer },
            React.createElement(Text, { style: pdfStyles.footerText }, `Generated on ${new Date().toLocaleDateString()}`)
          )
        )
      );
      
      // Generate PDF buffer
      const pdfBuffer = await pdf(pdfDoc).toBuffer();
      
      // Set response headers
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=eligibility-report-${submission.id}.pdf`);
      res.send(pdfBuffer);
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ error: "Failed to generate PDF" });
    }
  });

  // Send eligibility report via email
  app.post("/api/send-report-email", async (req, res) => {
    try {
      const { email, score, isEligible } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: "Email address is required" });
      }

      // Log the email request (in production, this would send actual email)
      console.log(`Sending eligibility report to ${email}`);
      console.log(`Score: ${score}%, Eligible: ${isEligible}`);
      
      // Simulate email sending delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return success response
      res.json({ 
        success: true, 
        message: "Report sent successfully",
        email: email 
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (username === "admin" && password === "admin123") {
        res.json({ 
          success: true,
          token: "dummy-jwt-token-" + Date.now(),
          message: "Login successful"
        });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

// PDF Styles
const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
    borderBottom: '2 solid #dc2626',
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#4b5563',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
    borderBottom: '1 solid #e5e7eb',
    paddingBottom: 6,
  },
  text: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 6,
    lineHeight: 1.5,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    borderTop: '1 solid #e5e7eb',
    paddingTop: 15,
  },
  footerText: {
    fontSize: 10,
    color: '#6b7280',
  },
});
