import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I try Lumina for free?",
    answer:
      "Absolutely! We offer a 14-day free trial on all plans. No credit card required to start. You can explore all features and see if Lumina is the right fit for you.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. There are no long-term contracts or hidden fees. Your access will continue until the end of your billing cycle.",
  },
  {
    question: "Do I need technical skills to use Lumina?",
    answer:
      "Not at all. Lumina is designed to be user-friendly and intuitive. Our drag-and-drop interface and AI assistants make it easy for anyone to create professional content and manage campaigns.",
  },
  {
    question: "How does the AI know my brand voice?",
    answer:
      "During onboarding, you'll provide some examples of your past content and define your brand personality. Our AI analyzes this data to learn your unique tone and style, ensuring every post sounds like you.",
  },
  {
    question: "What social media platforms do you support?",
    answer:
      "We currently support Instagram, Twitter (X), LinkedIn, Facebook, and Pinterest. We're constantly adding new integrations based on user feedback.",
  },
];

const FAQ = () => {
  return (
    <section
      id="faq"
      className="py-24 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Everything you need to know about Lumina.
          </motion.p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="border border-gray-200 dark:border-gray-800 rounded-lg px-4 data-[state=open]:border-indigo-500 dark:data-[state=open]:border-indigo-500 data-[state=open]:bg-indigo-50/50 dark:data-[state=open]:bg-indigo-900/20 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
