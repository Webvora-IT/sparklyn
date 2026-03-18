Create a new component for Sparklyn.

Conventions:
1. `'use client'` if interactive
2. `const t = useTranslations('sectionKey')` + add keys to all 3 message files
3. Framer Motion + `useInView` for scroll animations
4. Light theme: white bg, gray borders, teal accents

Template:
```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function MySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const t = useTranslations('mySection')

  return (
    <section ref={ref} id="my-section" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            {t('title')} <span className="gradient-text">{t('titleGradient')}</span>
          </h2>
        </motion.div>
      </div>
    </section>
  )
}
```
