import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";

interface HeroProps {
  headline?: string;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  features?: string[];
  className?: string;
}

export default function Hero({ 
  headline = "Check Your Canada Study Visa Eligibility Instantly",
  subtext = "Get a free assessment in 2 minutes.",
  ctaText = "Start Eligibility Check",
  ctaLink = "/eligibility",
  features = ["100% Free Assessment", "Instant Results", "Expert Guidance"],
  className = ""
}: HeroProps) {
  return (
    <section className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-red-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-poppins font-bold text-gray-900 mb-6 leading-tight">
            {headline}
          </h1>
          
          {/* Subtext */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {subtext}
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-200">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link 
            href={ctaLink}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active-elevate-2"
            data-testid="button-hero-cta"
          >
            {ctaText}
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-primary">10,000+</span>
              <span>Students Assessed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-primary">95%</span>
              <span>Accuracy Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-primary">24/7</span>
              <span>Support Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}