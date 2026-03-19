import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Cookie, ArrowLeft } from 'lucide-react'

export default function CookiesPage() {
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
                <Cookie className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Politique des Cookies</h1>
                <p className="text-sm text-gray-500 mt-0.5">Dernière mise à jour : Janvier 2025</p>
              </div>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Qu'est-ce qu'un cookie ?</h2>
                <p className="text-sm">Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un site web. Il permet au site de mémoriser vos actions et préférences sur une période donnée.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Cookies utilisés par Sparklyn</h2>
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                    <h3 className="font-semibold text-green-800 text-sm mb-2">Cookies Essentiels (obligatoires)</h3>
                    <p className="text-xs text-green-700">Ces cookies sont nécessaires au fonctionnement du site. Ils permettent la navigation, la sécurité et l'authentification.</p>
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-xs text-green-600">
                        <span><code>next-auth.session-token</code></span>
                        <span>Session administrateur</span>
                      </div>
                      <div className="flex justify-between text-xs text-green-600">
                        <span><code>next-auth.csrf-token</code></span>
                        <span>Protection CSRF</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                    <h3 className="font-semibold text-blue-800 text-sm mb-2">Cookies Fonctionnels (optionnels)</h3>
                    <p className="text-xs text-blue-700">Ces cookies améliorent votre expérience en mémorisant vos préférences comme la langue ou le fuseau horaire.</p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <h3 className="font-semibold text-gray-700 text-sm mb-2">Cookies Analytiques (optionnels)</h3>
                    <p className="text-xs text-gray-600">Ces cookies nous aident à comprendre comment vous utilisez notre site. Nous utilisons des outils d'analyse anonymisés pour améliorer nos services.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Gestion des Cookies</h2>
                <p className="text-sm mb-3">Vous pouvez contrôler et/ou supprimer les cookies via les paramètres de votre navigateur :</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
                  <li><strong>Firefox :</strong> Options → Vie privée et sécurité → Cookies</li>
                  <li><strong>Safari :</strong> Préférences → Confidentialité → Gérer les données du site</li>
                  <li><strong>Edge :</strong> Paramètres → Cookies et autorisations du site</li>
                </ul>
                <p className="text-sm mt-3 text-gray-500">Note : désactiver certains cookies peut affecter le fonctionnement du site.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact</h2>
                <p className="text-sm">Pour toute question sur notre utilisation des cookies : <a href="mailto:privacy@sparklyn.com" className="text-teal-600 hover:underline">privacy@sparklyn.com</a></p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
