import { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface FormData {
  // Academic Details
  tenth_percentage: string;
  twelfth_percentage: string;
  bachelor_cgpa: string;
  bachelor_percentage: string;
  
  // Language Scores
  test_type: string;
  listening_score: string;
  reading_score: string;
  writing_score: string;
  speaking_score: string;
  overall_score: string;
  
  // Work Experience
  has_work_experience: string;
  work_experience_years: string;
  
  // Other Details
  financial_capacity: string;
  preferred_intake: string;
  preferred_province: string;
  
  // Personal Info
  full_name: string;
  email: string;
  phone: string;
  city: string;
}

export default function EligibilityForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const totalSteps = 4;
  const hasWorkExperience = watch("has_work_experience") === "yes";

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log("Form submitted:", data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to results page (simulated)
    window.location.href = '/result';
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Academic Background";
      case 2: return "Language Proficiency";
      case 3: return "Work Experience & Preferences";
      case 4: return "Contact Information";
      default: return "Assessment Form";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-4">
              Fill in Your Details to Check Eligibility
            </h1>
            <p className="text-xl text-gray-600">
              Complete all sections to get your comprehensive eligibility assessment
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm font-medium text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Card title={getStepTitle()} className="mb-8">
              
              {/* Step 1: Academic Background */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        10th Standard Percentage *
                      </label>
                      <input
                        type="number"
                        {...register("tenth_percentage", { required: "This field is required", min: 0, max: 100 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter percentage (e.g., 85)"
                        data-testid="input-tenth-percentage"
                      />
                      {errors.tenth_percentage && (
                        <p className="text-red-500 text-sm mt-1">{errors.tenth_percentage.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        12th Standard Percentage *
                      </label>
                      <input
                        type="number"
                        {...register("twelfth_percentage", { required: "This field is required", min: 0, max: 100 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter percentage (e.g., 87)"
                        data-testid="input-twelfth-percentage"
                      />
                      {errors.twelfth_percentage && (
                        <p className="text-red-500 text-sm mt-1">{errors.twelfth_percentage.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bachelor's CGPA *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register("bachelor_cgpa", { required: "This field is required", min: 0, max: 10 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter CGPA (e.g., 7.5)"
                        data-testid="input-bachelor-cgpa"
                      />
                      {errors.bachelor_cgpa && (
                        <p className="text-red-500 text-sm mt-1">{errors.bachelor_cgpa.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bachelor's Percentage
                      </label>
                      <input
                        type="number"
                        {...register("bachelor_percentage", { min: 0, max: 100 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter percentage (optional)"
                        data-testid="input-bachelor-percentage"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Language Proficiency */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language Test Type *
                    </label>
                    <select
                      {...register("test_type", { required: "Please select a test type" })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      data-testid="select-test-type"
                    >
                      <option value="">Select Test Type</option>
                      <option value="ielts">IELTS</option>
                      <option value="pte">PTE</option>
                      <option value="toefl">TOEFL</option>
                    </select>
                    {errors.test_type && (
                      <p className="text-red-500 text-sm mt-1">{errors.test_type.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Listening *</label>
                      <input
                        type="number"
                        step="0.5"
                        {...register("listening_score", { required: "Required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Score"
                        data-testid="input-listening-score"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Reading *</label>
                      <input
                        type="number"
                        step="0.5"
                        {...register("reading_score", { required: "Required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Score"
                        data-testid="input-reading-score"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Writing *</label>
                      <input
                        type="number"
                        step="0.5"
                        {...register("writing_score", { required: "Required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Score"
                        data-testid="input-writing-score"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Speaking *</label>
                      <input
                        type="number"
                        step="0.5"
                        {...register("speaking_score", { required: "Required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Score"
                        data-testid="input-speaking-score"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Overall Score *</label>
                    <input
                      type="number"
                      step="0.5"
                      {...register("overall_score", { required: "This field is required" })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Overall band score"
                      data-testid="input-overall-score"
                    />
                    {errors.overall_score && (
                      <p className="text-red-500 text-sm mt-1">{errors.overall_score.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Work Experience & Preferences */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you have work experience? *
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="yes"
                          {...register("has_work_experience", { required: "Please select an option" })}
                          className="mr-2"
                          data-testid="radio-work-experience-yes"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="no"
                          {...register("has_work_experience", { required: "Please select an option" })}
                          className="mr-2"
                          data-testid="radio-work-experience-no"
                        />
                        No
                      </label>
                    </div>
                    {errors.has_work_experience && (
                      <p className="text-red-500 text-sm mt-1">{errors.has_work_experience.message}</p>
                    )}
                  </div>

                  {hasWorkExperience && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Work Experience
                      </label>
                      <input
                        type="number"
                        {...register("work_experience_years")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter years (e.g., 2)"
                        data-testid="input-work-years"
                      />
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Intake *
                      </label>
                      <select
                        {...register("preferred_intake", { required: "Please select an intake" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        data-testid="select-intake"
                      >
                        <option value="">Select Intake</option>
                        <option value="january">January</option>
                        <option value="may">May</option>
                        <option value="september">September</option>
                      </select>
                      {errors.preferred_intake && (
                        <p className="text-red-500 text-sm mt-1">{errors.preferred_intake.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Province (Optional)
                      </label>
                      <select
                        {...register("preferred_province")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        data-testid="select-province"
                      >
                        <option value="">Select Province</option>
                        <option value="ontario">Ontario</option>
                        <option value="british-columbia">British Columbia</option>
                        <option value="alberta">Alberta</option>
                        <option value="quebec">Quebec</option>
                        <option value="manitoba">Manitoba</option>
                        <option value="saskatchewan">Saskatchewan</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Financial Capacity (Optional)
                    </label>
                    <select
                      {...register("financial_capacity")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      data-testid="select-financial-capacity"
                    >
                      <option value="">Select Range</option>
                      <option value="below-20">Below $20,000</option>
                      <option value="20-40">$20,000 - $40,000</option>
                      <option value="40-60">$40,000 - $60,000</option>
                      <option value="above-60">Above $60,000</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: Contact Information */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register("full_name", { required: "This field is required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter your full name"
                        data-testid="input-full-name"
                      />
                      {errors.full_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register("email", { 
                          required: "This field is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Please enter a valid email"
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter your email"
                        data-testid="input-email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register("phone", { required: "This field is required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter your phone number"
                        data-testid="input-phone"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        {...register("city", { required: "This field is required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter your city"
                        data-testid="input-city"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                icon={<ArrowLeft className="w-4 h-4" />}
                data-testid="button-previous"
              >
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  data-testid="button-next"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="gradient"
                  loading={isSubmitting}
                  icon={<CheckCircle className="w-4 h-4" />}
                  iconPosition="right"
                  data-testid="button-submit"
                >
                  {isSubmitting ? "Processing..." : "Check Eligibility"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}