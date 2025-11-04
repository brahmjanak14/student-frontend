export type Submission = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  education: string;
  languageTest?: string;
  ieltsScore?: string;
  workExperienceYears?: string;
  eligibilityScore: number;
  status: "approved" | "pending" | "rejected";
  submittedAt?: string;
};
