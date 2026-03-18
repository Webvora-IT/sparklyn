'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CalendarDays, User, Sparkles, ThumbsUp } from 'lucide-react'

const steps = [
  {
    icon: CalendarDays,
    step: '01',
    title: 'Book Online',
    description: 'Choose your service, pick a date and time that suits you. Takes less than 2 minutes.',
    color: 'from-teal-400 to-teal-600',
  },
  {
    icon: User,
    step: '02',
    title: 'We Assign a Cleaner',
    description: 'We match you with a vetted, experienced cleaner from your local area.',
    color: 'from-sky-400 to-sky-600',
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'We Clean & Sparkle',
    description: 'Your dedicated cleaner arrives on time and transforms your space.',
    color: 'from-purple-400 to-purple-600',
  },
  {
    icon: ThumbsUp,
    step: '04',
    title: "You Relax & Enjoy",
    description: "Come home to a spotless space. Not happy? We'll fix it for free.",
    color: 'from-emerald-400 to-emerald-600',
  },
]

export default function HowItWorks() {
  const [ref, inView] = useInView({ triggerOnce: true })

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200 mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Clean in
            <span className="gradient-text"> 4 Simple Steps</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Getting your home or office cleaned has never been easier.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-teal-200 via-sky-200 via-purple-200 to-emerald-200 z-0" />

          {steps.map(({ icon: Icon, step, title, description, color }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="relative z-10 text-center"
            >
              <div className="flex justify-center mb-5">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center clean-shadow relative`}>
                  <Icon size={28} className="text-white" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-gray-100 rounded-full text-xs font-bold text-gray-600 flex items-center justify-center clean-shadow">
                    {i + 1}
                  </span>
                </div>
              </div>
              <div className="text-xs font-bold text-primary-400 mb-2 tracking-widest">{step}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
