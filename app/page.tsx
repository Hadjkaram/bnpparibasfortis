import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-bnp-dark font-sans">
      <Navbar />

      {/* Section Héro : Recherche */}
      <section className="bg-gray-50 py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
            <p className="uppercase tracking-widest text-xs text-gray-500 font-semibold">BIENVENUE</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Comment pouvons-nous vous aider ?
            </h1>

            {/* Barre de recherche */}
            <div className="relative max-w-2xl mx-auto">
                <input 
                    type="text" 
                    placeholder="Trouver une réponse >" 
                    className="w-full py-4 pl-6 pr-12 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-bnp-green focus:border-transparent outline-none text-lg placeholder-bnp-green font-medium"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-bnp-green text-white p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>

            {/* Liens rapides (Icônes) */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 pt-4 text-sm font-medium text-gray-600">
                <div className="flex items-center gap-2 cursor-pointer hover:text-bnp-green">
                    <span className="text-xl">📞</span> 02 762 20 00 &gt;
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-bnp-green">
                    <span className="text-xl">📍</span> Trouver une agence &gt;
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-bnp-green">
                    <span className="text-xl">📅</span> Prendre rendez-vous &gt;
                </div>
            </div>
        </div>
      </section>

      {/* Section "Vos besoins" */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">Vos besoins</h2>
          
          <div className="flex flex-col lg:flex-row gap-8">
              {/* Colonne Gauche : Liste des liens */}
              <div className="lg:w-1/3">
                  <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
                      {[
                          "Comparer nos comptes de paiement",
                          "Comparer nos cartes de crédit",
                          "Épargner pour votre pension",
                          "Simuler votre crédit hypothécaire",
                          "Découvrir la banque des jeunes",
                          "Découvrir la Banque Privée"
                      ].map((item, index) => (
                          <li key={index} className="py-5 flex justify-between items-center group cursor-pointer hover:bg-gray-50 transition px-2">
                              <span className="font-bold text-gray-700 group-hover:text-bnp-green">{item}</span>
                              <span className="text-bnp-green opacity-0 group-hover:opacity-100 transition">&gt;</span>
                          </li>
                      ))}
                  </ul>
              </div>

              {/* Colonne Droite : Carte Promo (Hello4You) */}
              <div className="lg:w-2/3 bg-[#F4F4F4] rounded-lg overflow-hidden flex flex-col md:flex-row relative group cursor-pointer hover:shadow-lg transition">
                  {/* Texte Promo */}
                  <div className="p-8 md:w-1/2 flex flex-col justify-center z-10">
                      <span className="text-xs font-bold text-gray-500 mb-2 uppercase">Le compte gratuit jusqu'à 28 ans !</span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                          Ouvrez votre compte de paiement Hello4You et recevez 50€*
                      </h3>
                      <button className="bg-bnp-green text-white font-bold py-3 px-6 rounded-[4px] self-start hover:bg-green-700 transition">
                          Ouvrir un compte
                      </button>
                      <p className="text-[10px] text-gray-400 mt-4">*OFFRE SOUS CONDITIONS</p>
                  </div>

                  {/* Image Promo (Placeholder ou image locale si tu en as une) */}
                  <div className="md:w-1/2 h-64 md:h-auto bg-gray-300 relative">
                     {/* Ici tu pourras mettre une vraie photo plus tard. Pour l'instant on simule l'image du jeune homme */}
                     <div className="absolute inset-0 bg-gradient-to-r from-[#F4F4F4] to-transparent z-0 md:hidden"></div>
                     <Image 
                        src="/bnp.png" // Temporaire : remplace par une image de jeune homme si tu as
                        alt="Promo"
                        fill
                        className="object-cover opacity-20" // Opacité basse car c'est le logo
                     />
                     <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-bold">
                        [Image Jeune Homme]
                     </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}