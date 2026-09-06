"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "WorkWise saves me so much time! I can instantly find policies and connect with teammates.",
      name: "Priya Mehta",
      title: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=256",
    },
    {
      quote: "The AI assistant is incredibly helpful. It's like having HR, IT, and a colleague all in one.",
      name: "Aarav Sharma",
      title: "Software Engineer",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256",
    },
    {
      quote: "The employee directory and insights make it so easy to stay connected and informed.",
      name: "Sneha Kapoor",
      title: "HR Specialist",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative w-full bg-[#F4F0FF]/80 dark:bg-[#070B16] pt-16 lg:pt-24 pb-12 transition-colors duration-300">
      {/* Upward Curve Wave SVG at top edge of full-bleed section background */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
        <svg
          className="relative block w-full h-8 sm:h-12 lg:h-16 text-[#F8FAFF] dark:text-[#0B1020]"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 L1440,0 L1440,75 Q 950,15 0,50 Z" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800/80 text-[11px] font-extrabold uppercase tracking-wider text-[#6366F1] dark:text-indigo-400 backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
            TESTIMONIALS
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Loved by Employees
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed">
            Here's what our users have to say about their experience with WorkWise.
          </p>
        </div>

        {/* Grid of Testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-7 rounded-[28px] bg-white dark:bg-[#0D1426] border border-slate-200/80 dark:border-slate-800/80 space-y-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-[#6366F1]/40 dark:text-indigo-400/40" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed font-normal">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
