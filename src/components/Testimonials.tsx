import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

import drAlex from "@/assets/images/team/dr-alex.webp";
import Bosa from "@/assets/images/team/Bosa.webp";
import Minimi from "@/assets/images/team/Minimi.webp";

const testimonials = [
  {
    name: "Dr Alex Victory",
    role: "Marketing Director at TechFlow",
    content:
      "Novluma has completely transformed how we handle our social media analytics. The AI insights are incredibly accurate and have helped us double our engagement in just two months.",
    avatar: drAlex,
    initials: "AV",
  },
  {
    name: "Miriam Nwakama",
    role: "Founder of CookWIthMinimi",
    content:
      "The content generation features are a game-changer. I used to spend hours writing captions and scripts, but now Novluma does it in seconds, and they sound exactly like my brand voice.",
    avatar: Minimi,
    initials: "MN",
  },
  {
    name: "Bosa Jane",
    role: "Founder Girlie's House",
    content:
      "I've tried every tool out there, but nothing compares to Novluma's ease of use and powerful features. The scheduling tool is intuitive and the analytics are deep yet easy to understand.",
    avatar: Bosa,
    initials: "BN",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="py-24 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Loved by Businesses Worldwide
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Don't just take our word for it. Here's what our users have to say
            about their experience with Novluma.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: index * 0.2, // Stagger the floating effect
              }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="h-full flex flex-col border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6 flex-grow">
                  <Quote className="w-10 h-10 text-indigo-500 mb-4 opacity-50" />
                  <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </CardContent>
                <CardFooter className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
