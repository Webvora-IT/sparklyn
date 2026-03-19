import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const FROM = process.env.SMTP_FROM || `Sparklyn <${process.env.SMTP_USER}>`
const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3001'

export async function sendBookingConfirmation(data: {
  name: string
  email: string
  service: string
  date: string
  timeSlot: string
  address: string
  city: string
  bookingId: string
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return

  const dateFormatted = new Date(data.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  await transporter.sendMail({
    from: FROM,
    to: data.email,
    subject: `Confirmation de votre réservation — Sparklyn ✨`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #14b8a6, #0ea5e9); padding: 28px 32px; text-align: center;">
          <h1 style="margin: 0; color: #fff; font-size: 24px; font-weight: 700;">✨ Réservation reçue !</h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">Merci de faire confiance à Sparklyn</p>
        </div>
        <div style="padding: 32px; background: #fff;">
          <p style="color: #374151; font-size: 15px; line-height: 1.6;">Bonjour <strong>${data.name}</strong>,</p>
          <p style="color: #374151; font-size: 15px; line-height: 1.6;">
            Votre demande de réservation a bien été reçue. Notre équipe va confirmer votre créneau très prochainement.
          </p>
          <div style="background: #f0fdfa; border-radius: 12px; padding: 20px; margin: 24px 0; border: 1px solid #99f6e4;">
            <h3 style="margin: 0 0 16px; color: #0f766e; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Détails de votre réservation</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: #6b7280; font-size: 13px; width: 130px;">Référence</td><td style="padding: 6px 0; color: #14b8a6; font-weight: 700; font-family: monospace;">#${data.bookingId.slice(-8).toUpperCase()}</td></tr>
              <tr><td style="padding: 6px 0; color: #6b7280; font-size: 13px;">Service</td><td style="padding: 6px 0; color: #111827; font-weight: 600;">${data.service}</td></tr>
              <tr><td style="padding: 6px 0; color: #6b7280; font-size: 13px;">Date</td><td style="padding: 6px 0; color: #111827;">${dateFormatted}</td></tr>
              <tr><td style="padding: 6px 0; color: #6b7280; font-size: 13px;">Créneau</td><td style="padding: 6px 0; color: #111827;">${data.timeSlot}</td></tr>
              <tr><td style="padding: 6px 0; color: #6b7280; font-size: 13px;">Adresse</td><td style="padding: 6px 0; color: #111827;">${data.address}, ${data.city}</td></tr>
            </table>
          </div>
          <div style="background: #fef9c3; border-radius: 12px; padding: 16px; margin: 16px 0; border: 1px solid #fde68a;">
            <p style="margin: 0; color: #92400e; font-size: 13px;">⏳ <strong>Statut : En attente de confirmation.</strong> Vous recevrez un email dès que notre équipe valide votre créneau.</p>
          </div>
          <div style="text-align: center; margin: 28px 0 16px;">
            <a href="${BASE_URL}/fr/reservation" style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #14b8a6, #0ea5e9); color: #fff; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 14px;">
              Vérifier ma réservation
            </a>
          </div>
        </div>
        <div style="padding: 16px 32px; background: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} Sparklyn. Premium Cleaning Services.</p>
        </div>
      </div>
    `,
  })
}

export async function sendBookingNotificationToAdmin(data: {
  name: string
  email: string
  phone: string
  service: string
  date: string
  timeSlot: string
  address: string
  city: string
  frequency?: string
  notes?: string
  bookingId: string
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return

  const dateFormatted = new Date(data.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  await transporter.sendMail({
    from: FROM,
    to: process.env.ADMIN_EMAIL || 'admin@sparklyn.com',
    subject: `🆕 Nouvelle réservation — ${data.name} — ${data.service}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #14b8a6, #0ea5e9); padding: 24px 32px;">
          <h1 style="margin: 0; color: #fff; font-size: 20px; font-weight: 700;">🆕 Nouvelle réservation Sparklyn</h1>
        </div>
        <div style="padding: 32px; background: #fff;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 120px;">Client</td><td style="padding: 8px 0; color: #111827; font-weight: 600;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Email</td><td style="padding: 8px 0; color: #14b8a6;">${data.email}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Téléphone</td><td style="padding: 8px 0; color: #111827;">${data.phone}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Service</td><td style="padding: 8px 0; color: #0f766e; font-weight: 600;">${data.service}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Date</td><td style="padding: 8px 0; color: #111827;">${dateFormatted}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Créneau</td><td style="padding: 8px 0; color: #111827;">${data.timeSlot}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Adresse</td><td style="padding: 8px 0; color: #111827;">${data.address}, ${data.city}</td></tr>
            ${data.frequency ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Fréquence</td><td style="padding: 8px 0; color: #111827;">${data.frequency}</td></tr>` : ''}
            ${data.notes ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Notes</td><td style="padding: 8px 0; color: #111827; font-style: italic;">${data.notes}</td></tr>` : ''}
          </table>
          <div style="text-align: center; margin-top: 24px;">
            <a href="${BASE_URL}/admin/bookings" style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #14b8a6, #0ea5e9); color: #fff; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 14px;">
              Gérer dans l'admin
            </a>
          </div>
        </div>
      </div>
    `,
  })
}

const STATUS_LABELS: Record<string, { label: string; emoji: string; color: string }> = {
  CONFIRMED:   { label: 'confirmée',    emoji: '✅', color: '#14b8a6' },
  IN_PROGRESS: { label: 'en cours',     emoji: '🧹', color: '#0ea5e9' },
  COMPLETED:   { label: 'terminée',     emoji: '🎉', color: '#059669' },
  CANCELLED:   { label: 'annulée',      emoji: '❌', color: '#dc2626' },
}

export async function sendBookingStatusUpdate(data: {
  name: string
  email: string
  service: string
  date: string
  status: string
  bookingId: string
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return

  const info = STATUS_LABELS[data.status]
  if (!info) return

  const dateFormatted = new Date(data.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  await transporter.sendMail({
    from: FROM,
    to: data.email,
    subject: `${info.emoji} Votre réservation Sparklyn est ${info.label}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #14b8a6, #0ea5e9); padding: 24px 32px; text-align: center;">
          <h1 style="margin: 0; color: #fff; font-size: 22px; font-weight: 700;">${info.emoji} Mise à jour de votre réservation</h1>
        </div>
        <div style="padding: 32px; background: #fff; text-align: center;">
          <p style="color: #374151; font-size: 15px;">Bonjour <strong>${data.name}</strong>,</p>
          <p style="color: #374151; font-size: 15px; margin-bottom: 24px;">
            Votre réservation pour <strong>${data.service}</strong> le <strong>${dateFormatted}</strong> est maintenant
            <strong style="color: ${info.color};">${info.label}</strong>.
          </p>
          <div style="background: #f0fdfa; display: inline-block; padding: 12px 20px; border-radius: 50px; border: 1px solid #99f6e4; margin-bottom: 24px;">
            <span style="color: #14b8a6; font-family: monospace; font-weight: 700;">#${data.bookingId.slice(-8).toUpperCase()}</span>
          </div>
          <div>
            <a href="${BASE_URL}/fr/reservation" style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #14b8a6, #0ea5e9); color: #fff; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 14px;">
              Voir ma réservation
            </a>
          </div>
        </div>
        <div style="padding: 16px 32px; background: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} Sparklyn. Premium Cleaning Services.</p>
        </div>
      </div>
    `,
  })
}
