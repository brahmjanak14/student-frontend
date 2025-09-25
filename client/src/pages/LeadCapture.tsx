import { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import { Lock, Shield, CheckCircle, Mail, Phone } from "lucide-react";

interface LeadFormData {
  name: string;
  email: string;
  mobile: string;
  city: string;
  otp: string;
}

export default function LeadCapture() {
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<LeadFormData>();

  const onSubmitForm = async (data: LeadFormData) => {
    setIsSubmitting(true);
    console.log("Lead form submitted:", data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Move to OTP step
    setStep('otp');
    setCountdown(30);
    setIsSubmitting(false);
    
    // Start countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onSubmitOTP = async (data: LeadFormData) => {
    setIsSubmitting(true);
    console.log("OTP submitted:", data.otp);
    
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStep('success');
    setIsSubmitting(false);
    
    // Redirect to download page after success
    setTimeout(() => {
      window.location.href = '/download-share';
    }, 2000);
  };

  const resendOTP = async () => {
    console.log("Resending OTP");
    setCountdown(30);
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-4">
              Unlock Your Full Report
            </h1>
            <p className="text-xl text-gray-600">
              Get your detailed eligibility assessment with personalized recommendations
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center gap-8 mb-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Secure & Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>100% Free</span>
            </div>
          </div>

          {/* Form Step */}
          {step === 'form' && (
            <Card>
              <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Full name is required" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your full name"
                    data-testid="input-lead-name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email"
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your email address"
                    data-testid="input-lead-email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    {...register("mobile", { 
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit mobile number"
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your mobile number"
                    data-testid="input-lead-mobile"
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    {...register("city", { required: "City is required" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your city"
                    data-testid="input-lead-city"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div className="text-center text-sm text-gray-500">
                  By proceeding, you agree to receive communications from Pratham International
                </div>

                <Button 
                  type="submit"
                  variant="gradient" 
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                  data-testid="button-send-otp"
                >
                  {isSubmitting ? "Sending OTP..." : "Send OTP & Unlock Report"}
                </Button>
              </form>
            </Card>
          )}

          {/* OTP Step */}
          {step === 'otp' && (
            <Card>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Verify Your Mobile Number
                </h3>
                <p className="text-gray-600">
                  We've sent a 6-digit OTP to {getValues('mobile')}
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmitOTP)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                    Enter OTP *
                  </label>
                  <input
                    type="text"
                    {...register("otp", { 
                      required: "OTP is required",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Please enter a valid 6-digit OTP"
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center text-lg tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                    data-testid="input-otp"
                  />
                  {errors.otp && (
                    <p className="text-red-500 text-sm mt-1 text-center">{errors.otp.message}</p>
                  )}
                </div>

                <div className="text-center text-sm text-gray-500">
                  {countdown > 0 ? (
                    <span>Resend OTP in {countdown} seconds</span>
                  ) : (
                    <button
                      type="button"
                      onClick={resendOTP}
                      className="text-primary hover:underline"
                      data-testid="button-resend-otp"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <Button 
                  type="submit"
                  variant="gradient" 
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                  data-testid="button-verify-otp"
                >
                  {isSubmitting ? "Verifying..." : "Verify & Get Report"}
                </Button>
              </form>
            </Card>
          )}

          {/* Success Step */}
          {step === 'success' && (
            <Card className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4" data-testid="text-verification-success">
                Verification Successful!
              </h3>
              
              <p className="text-gray-600 mb-6">
                Your mobile number has been verified. Redirecting to your detailed report...
              </p>
              
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </Card>
          )}

          {/* Benefits */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What you'll get in your full report:
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Detailed eligibility analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>University recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Course suggestions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Next steps guidance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}