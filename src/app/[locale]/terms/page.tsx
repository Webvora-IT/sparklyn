import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { FileText, ArrowLeft } from 'lucide-react'

export default function TermsPage() {
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
                <FileText className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Conditions Générales d'Utilisation</h1>
                <p className="text-sm text-gray-500 mt-0.5">Dernière mise à jour : Janvier 2025</p>
              </div>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Objet</h2>
                <p className="text-sm">Les présentes conditions générales régissent l'utilisation du site Sparklyn et la relation contractuelle entre Sparklyn et ses clients pour la fourniture de services de nettoyage professionnel.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Réservation et Confirmation</h2>
                <p className="text-sm">Toute réservation effectuée via notre site est soumise à confirmation par nos équipes. Un email de confirmation vous sera envoyé dans les 24 heures suivant votre demande. La réservation n'est définitive qu'après réception de cet email.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Tarification</h2>
                <p className="text-sm">Les prix indiqués sur notre site sont en euros TTC. Sparklyn se réserve le droit de modifier ses tarifs à tout moment. Le prix applicable est celui en vigueur au moment de la confirmation de la réservation.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Annulation et Modification</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Annulation gratuite jusqu'à 24h avant l'intervention</li>
                  <li>Annulation dans les 24h : facturation de 50% du montant prévu</li>
                  <li>Modification d'horaire sous réserve de disponibilité</li>
                  <li>En cas de force majeure, aucune pénalité ne sera appliquée</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Obligations du Client</h2>
                <p className="text-sm">Le client s'engage à :</p>
                <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
                  <li>Fournir des informations exactes lors de la réservation</li>
                  <li>Être présent ou s'assurer de l'accès aux locaux à l'heure convenue</li>
                  <li>Signaler tout risque particulier (allergies, matériaux fragiles)</li>
                  <li>Régler les prestations dans les délais convenus</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Responsabilité</h2>
                <p className="text-sm">Sparklyn est assurée pour tous dommages causés dans le cadre de ses prestations. Toute réclamation doit être signalée dans les 48 heures suivant l'intervention. Notre responsabilité est limitée au montant de la prestation concernée.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Droit Applicable</h2>
                <p className="text-sm">Les présentes conditions sont soumises au droit français. En cas de litige, les parties s'efforceront de trouver une solution amiable avant tout recours judiciaire.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Contact</h2>
                <p className="text-sm">Pour toute question : <a href="mailto:contact@sparklyn.com" className="text-teal-600 hover:underline">contact@sparklyn.com</a></p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
