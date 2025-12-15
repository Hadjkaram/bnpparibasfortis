"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function TransferPage() {
  const [step, setStep] = useState(1); // 1 = Formulaire, 2 = Confirmation

  return (
    <div className="min-h-screen bg-[#F4F4F4] font-sans text-gray-800">
      
      {/* Header Simple */}
      <header className="bg-white p-4 border-b border-gray-200 flex items-center gap-4">
        <Link href="/dashboard" className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition">
          ← Retour
        </Link>
        <h1 className="font-bold text-lg">Nouveau virement</h1>
      </header>

      <main className="max-w-2xl mx-auto p-4 md:p-8">
        
        {step === 1 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
            <h2 className="text-2xl font-bold text-bnp-green mb-6">Saisir les détails</h2>
            
            {/* Compte source */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Depuis le compte</label>
              <select className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-bnp-green outline-none">
                <option>Compte à vue Comfort Pack - ...5678 (1 000 000,00 €)</option>
              </select>
            </div>

            {/* Bénéficiaire */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nom du bénéficiaire</label>
              <input type="text" placeholder="Ex: Jean Dupont" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bnp-green outline-none" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">IBAN du bénéficiaire</label>
              <input type="text" placeholder="BE00 0000 0000 0000" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bnp-green outline-none font-mono" />
            </div>

            {/* Montant */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Montant (€)</label>
              <input type="number" placeholder="0.00" className="w-full border border-gray-300 rounded-lg p-3 text-xl font-bold focus:ring-2 focus:ring-bnp-green outline-none" />
            </div>

            {/* Communication */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Communication (Optionnel)</label>
              <input type="text" placeholder="Ex: Loyer Janvier" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bnp-green outline-none" />
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full bg-bnp-green text-white font-bold py-4 rounded-lg hover:bg-[#007A50] transition shadow-md mt-4"
            >
              Suivant
            </button>
          </div>
        ) : (
          /* ECRAN DE CONFIRMATION */
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center space-y-6 animate-fade-in">
             <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
               ✓
             </div>
             <h2 className="text-2xl font-bold text-gray-800">Virement signé !</h2>
             <p className="text-gray-600">Votre virement a bien été enregistré. Il sera traité dans les plus brefs délais.</p>
             
             <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500 mt-6">
                Ref: 4930-5839-2029
             </div>

             <Link href="/dashboard" className="block">
                <button className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg hover:bg-black transition mt-6">
                  Retour aux comptes
                </button>
             </Link>
          </div>
        )}

      </main>
    </div>
  );
}