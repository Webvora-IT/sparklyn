import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Politique de Confidentialité</h1>
                <p className="text-sm text-gray-500 mt-0.5">Dernière mise à jour : Janvier 2025</p>
              </div>
            </div>

            <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Collecte des Données</h2>
                <p>Sparklyn collecte les informations que vous nous fournissez directement lors de la prise de réservation, notamment :</p>
                <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
                  <li>Nom et prénom</li>
                  <li>Adresse email et numéro de téléphone</li>
                  <li>Adresse d'intervention</li>
                  <li>Préférences de service et horaires</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Utilisation des Données</h2>
                <p>Vos données sont utilisées exclusivement pour :</p>
                <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
                  <li>Traiter et confirmer vos réservations</li>
                  <li>Vous contacter concernant nos services</li>
                  <li>Améliorer la qualité de nos prestations</li>
                  <li>Vous envoyer des informations sur nos offres (avec votre consentement)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Protection des Données</h2>
                <p className="text-sm">Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Vos données sont stockées sur des serveurs sécurisés et ne sont jamais vendues à des tiers.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Conservation des Données</h2>
                <p className="text-sm">Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services et respecter nos obligations légales. En général, les données de réservation sont conservées pendant 3 ans.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Vos Droits</h2>
                <p className="text-sm">Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
                  <li><strong>Accès :</strong> obtenir une copie de vos données</li>
                  <li><strong>Rectification :</strong> corriger des données inexactes</li>
                  <li><strong>Effacement :</strong> demander la suppression de vos données</li>
                  <li><strong>Opposition :</strong> vous opposer à certains traitements</li>
                  <li><strong>Portabilité :</strong> recevoir vos données dans un format lisible</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Contact</h2>
                <p className="text-sm">Pour toute question concernant cette politique ou pour exercer vos droits, contactez-nous à : <a href="mailto:privacy@sparklyn.com" className="text-teal-600 hover:underline">privacy@sparklyn.com</a></p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
