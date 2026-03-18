'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    name: 'Emma Thompson',
    location: 'London, UK',
    service: 'Residential Cleaning',
    content: "Sparklyn has been cleaning my house for 6 months and I couldn't be happier. Always on time, thorough, and they leave my home smelling fresh. Highly recommend!",
    rating: 5,
    avatar: '👩‍🦰',
  },
  {
    name: 'Michael Chen',
    location: 'Manchester, UK',
    service: 'Commercial Cleaning',
    content: "We use Sparklyn for our office. The team is professional, discreet, and our employees love coming to a clean workspace every morning. Great service!",
    rating: 5,
    avatar: '👨‍💼',
  },
  {
    name: 'Sophie Laurent',
    location: 'Birmingham, UK',
    service: 'Deep Cleaning',
    content: "Booked a deep clean before moving in to my new flat. The results were incredible! Places I didn't even think to clean, they got spotless. Worth every penny.",
    rating: 5,
    avatar: '👩‍💼',
  },
  {
    name: 'James Williams',
    location: 'Bristol, UK',
    service: 'Post-Construction',
    content: "After our renovation, the house was a dust nightmare. Sparklyn came in and made it look brand new. Professional, efficient, and reasonably priced.",
    rating: 5,
    avatar: '👨‍🔧',
  },
  {
    name: 'Priya Sharma',
    location: 'Leeds, UK',
    service: 'Carpet Cleaning',
    content: "My carpets had stains I thought would never come out. The Sparklyn team worked magic! Everything looks like new. Will definitely book again.",
    rating: 5,
    avatar: '👩‍🦱',
  },
  {
    name: 'David Murphy',
    location: 'Edinburgh, UK',
    service: 'Window Cleaning',
    content: "Crystal clear windows every time. They're reliable, affordable, and always do an excellent job. I've been using them monthly for over a year now.",
    rating: 5,
    avatar: '👨‍🦳',
  },
]

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true })

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-primary-50 via-white to-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-white text-primary-700 rounded-full text-sm font-medium border border-primary-200 mb-4 clean-shadow">
            Customer Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Don&apos;t Just Take
            <br />
            <span className="gradient-text">Our Word for It</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={22} className="text-yellow-400 fill-yellow-400" />
            ))}
            <span className="ml-2 text-gray-600 font-medium">4.9/5 from 500+ reviews</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-6 clean-shadow hover:clean-shadow-lg transition-all border border-gray-100 relative"
            >
              <Quote size={36} className="absolute top-5 right-5 text-primary-100" />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-5">&ldquo;{review.content}&rdquo;</p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <span className="text-3xl">{review.avatar}</span>
                <div>
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-xs text-gray-400">{review.location}</div>
                  <div className="text-xs text-primary-600 font-medium">{review.service}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
