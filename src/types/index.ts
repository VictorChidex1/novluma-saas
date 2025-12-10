import type { LucideIcon } from "lucide-react";

export type BillingCycle = "monthly" | "yearly";

export interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  notIncluded: string[];
  icon: LucideIcon;
  popular: boolean;
  color: string;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName: string;
}

export type AppView = "landing" | "wizard";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role?: "admin" | "user";
  plan?: "free" | "pro" | "enterprise";
  usage?: {
    wordsUsed: number;
    cycleStart: any;
  };
  createdAt: any;
}

export interface Application {
  id: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  resume: string; // Base64 string
  resumeName?: string;
  coverLetter: string;
  createdAt: any;
}
