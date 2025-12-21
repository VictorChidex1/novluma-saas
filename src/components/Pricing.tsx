import { useState } from "react";
import { Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

interface PricingProps {
  onGetStarted?: () => void;
}

const plans = [
  {
    name: "Starter",
    monthlyPrice: 0,
    description: "Perfect for individuals just getting started.",
    features: [
      "Basic Analytics",
      "5 Social Profiles",
      "1 User Seat",
      "Community Support",
      "Basic Content Scheduling",
    ],
    cta: "Get Started",
    popular: false,
    color: "bg-gray-100 dark:bg-gray-800",
  },
  {
    name: "Pro",
    monthlyPrice: 19,
    betaPrice: "Free",
    description: "Ideal for growing creators and small teams.",
    features: [
      "Advanced Analytics",
      "15 Social Profiles",
      "5 User Seats",
      "Priority Email Support",
      "AI Content Generation",
      "Competitor Analysis",
    ],
    cta: "Join Public Beta",
    popular: true,
    color: "bg-indigo-600",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with specific needs.",
    features: [
      "Custom Reporting",
      "Unlimited Profiles",
      "Unlimited Seats",
      "24/7 Dedicated Support",
      "SSO & Advanced Security",
      "Custom API Access",
    ],
    cta: "Contact Sales",
    popular: false,
    color: "bg-gray-100 dark:bg-gray-800",
  },
];

export function Pricing({ onGetStarted }: PricingProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  const calculatePrice = (monthly: number) => {
    if (monthly === 0) return "$0";
    if (isAnnual) {
      // 20% discount on yearly total
      const total = monthly * 12 * 0.8;
      return `$${Math.floor(total)}`;
    }
    return `$${monthly}`;
  };

  const getPeriod = (planName: string) => {
    if (planName === "Enterprise") return "";
    return isAnnual ? "/year" : "/month";
  };

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to grow your social presence.
            <br />
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
              Join the beta today for free access.
            </span>
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span
            className={`text-sm font-medium ${
              !isAnnual
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Monthly
          </span>
          <div className="flex items-center gap-2">
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>
          <span
            className={`text-sm font-medium flex items-center gap-2 ${
              isAnnual
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Yearly
            <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-300">
              Save 20%
            </span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="h-full">
                <Card
                  className={`h-full flex flex-col relative overflow-hidden transition-all duration-300 ${
                    plan.popular
                      ? "border-indigo-600 dark:border-indigo-500 shadow-xl shadow-indigo-100 dark:shadow-indigo-900/20 md:-mt-4 md:mb-4 z-10"
                      : "border-gray-200 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800"
                  } bg-white dark:bg-gray-900`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
                  )}

                  {plan.popular && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="mb-8">
                      {plan.name === "Enterprise" ? (
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          Custom
                        </span>
                      ) : (
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-gray-900 dark:text-white">
                            {plan.betaPrice
                              ? plan.betaPrice
                              : calculatePrice(plan.monthlyPrice || 0)}
                          </span>
                          {plan.betaPrice && (
                            <span className="text-lg text-gray-400 line-through decoration-red-500 decoration-2">
                              {calculatePrice(plan.monthlyPrice || 0)}
                            </span>
                          )}
                          <span className="text-gray-500 dark:text-gray-400">
                            {getPeriod(plan.name)}
                          </span>
                        </div>
                      )}
                      {plan.betaPrice && (
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                          Free during beta period
                        </p>
                      )}
                    </div>

                    <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check
                            size={18}
                            className={`flex-shrink-0 mt-0.5 ${
                              plan.popular
                                ? "text-indigo-600 dark:text-indigo-400"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={
                        plan.name === "Enterprise"
                          ? () =>
                              (window.location.href =
                                "mailto:sales@novluma.com")
                          : onGetStarted
                      }
                      className={`w-full h-12 text-base font-semibold transition-all duration-300 ${
                        plan.popular
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 hover:scale-[1.02]"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-[1.02]"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center gap-2">
            <HelpCircle size={16} />
            Need help choosing?{" "}
            <a
              href="mailto:support@novluma.com"
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              Talk to our team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
