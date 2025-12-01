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
