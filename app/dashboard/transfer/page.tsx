"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function TransferPage() {
  // --- CONFIGURATION EMAILJS CORRIGÉE ---
  const SERVICE_ID = "service_43af3lh";   
  const TEMPLATE_ID = "template_q6ck8la"; // Ton ID mis à jour
  const PUBLIC_KEY = "jBFjr8YEDrlC9plny"; 
  // -------------------------------------

  const [step, setStep] = useState(1); 
  const [amount, setAmount] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [loading, setLoading] = useState(false);

  // NOUVEAU : État pour le solde dynamique
  const [currentBalance, setCurrentBalance] = useState(1000000);

  // NOUVEAU : Au chargement, on récupère le vrai solde actuel
  useEffect(() => {
    const savedBalance = localStorage.getItem("bnp_balance");
    if (savedBalance) {
      setCurrentBalance(parseFloat(savedBalance));
    }
  }, []);

  const handleTransfer = (e: any) => {
    e.preventDefault();
    
    setStep(2);
    setLoading(true);

    const templateParams = {
      amount: amount,
      beneficiary: beneficiary,
      date: new Date().toLocaleDateString('fr-FR'),
      to_email: "Koalajuju92@outlook.fr"
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((result) => {
          console.log("Succès:", result.text);

          // --- MISE A JOUR DES DONNEES (Logic Bancaire) ---
          const numAmount = parseFloat(amount);
          
          // 1. Calcul et sauvegarde du nouveau solde
          const newBalance = currentBalance - numAmount;
          localStorage.setItem("bnp_balance", newBalance.toString());

          // 2. Création de la transaction pour l'historique
          const newTransaction = {
            id: Date.now(),
            merchant: `Virement vers ${beneficiary}`,
            amount: numAmount,
            type: "debit",
            date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
          };

          // 3. Sauvegarde dans l'historique
          const existingHistory = localStorage.getItem("bnp_history");
          const history = existingHistory ? JSON.parse(existingHistory) : [];
          localStorage.setItem("bnp_history", JSON.stringify([newTransaction, ...history]));
          // ------------------------------------------------

          setTimeout(() => {
            setLoading(false);
            setStep(3);
          }, 2000);
      }, (error) => {
          console.error("Erreur:", error.text);
          setLoading(false);
          alert(`Erreur: ${error.text}. Vérifiez la console.`);
          setStep(1);
      });
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] font-sans text-gray-800">
      
      {/* Header */}
      <header className="bg-white p-4 border-b border-gray-200 flex items-center gap-4 shadow-sm">
        <Link href="/dashboard" className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition">
          ← Retour
        </Link>
        <h1 className="font-bold text-lg text-bnp-dark">Nouveau virement</h1>
      </header>

      <main className="max-w-xl mx-auto p-4 md:p-8 mt-6">
        
        {/* ETAPE 1 : FORMULAIRE */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8 space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-bnp-green mb-6 border-b pb-4">Saisir les détails</h2>
            
            {/* Compte source */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Compte à débiter</label>
              <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 flex justify-between items-center">
                 <div>
                    <div className="font-bold text-gray-800">Compte à vue Comfort Pack</div>
                    <div className="text-xs text-gray-500">BE68 7340 1928 4571</div>
                 </div>
                 {/* Affiche le solde dynamique ici */}
                 <div className="font-bold text-gray-700">
                    {currentBalance.toLocaleString('fr-BE', { minimumFractionDigits: 2 })} €
                 </div>
              </div>
            </div>

            {/* Bénéficiaire */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nom du bénéficiaire</label>
              <input 
                type="text" 
                placeholder="Ex: Jean Dupont" 
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bnp-green outline-none transition"
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">IBAN du bénéficiaire</label>
              <input type="text" placeholder="BE00 0000 0000 0000" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bnp-green outline-none font-mono uppercase" />
            </div>

            {/* Montant */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Montant (€)</label>
              <input 
                type="number" 
                placeholder="0.00" 
                className="w-full border border-gray-300 rounded-lg p-3 text-xl font-bold focus:ring-2 focus:ring-bnp-green outline-none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* Communication */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Communication</label>
              <input type="text" placeholder="Ex: Loyer" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bnp-green outline-none" />
            </div>

            <button 
              onClick={handleTransfer}
              disabled={!amount || !beneficiary}
              className={`w-full text-white font-bold py-4 rounded-lg shadow-md mt-4 transition ${!amount || !beneficiary ? 'bg-gray-300 cursor-not-allowed' : 'bg-bnp-green hover:bg-[#007A50]'}`}
            >
              Signer et valider
            </button>
          </div>
        )}

        {/* ETAPE 2 : LOADER */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
             <div className="w-16 h-16 border-4 border-gray-200 border-t-bnp-green rounded-full animate-spin mb-6"></div>
             <h2 className="text-xl font-bold text-gray-800">Traitement en cours...</h2>
             <p className="text-gray-500 mt-2">Communication avec le serveur bancaire.</p>
          </div>
        )}

        {/* ETAPE 3 : SUCCÈS */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center space-y-6 animate-scale-in">
             <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl mb-4 shadow-sm">
               ✓
             </div>
             
             <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Virement envoyé !</h2>
                <p className="text-gray-600 text-lg">
                    Vous avez envoyé <span className="font-bold">{amount} €</span> à <span className="font-bold">{beneficiary}</span>.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                   Nouveau solde : {(currentBalance - parseFloat(amount)).toLocaleString('fr-BE', { minimumFractionDigits: 2 })} €
                </p>
             </div>
             
             <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-left flex items-start gap-3">
                <span className="text-xl">📧</span>
                <div>
                    <p className="text-sm font-bold text-blue-800">Confirmation envoyée</p>
                    <p className="text-xs text-blue-600 mt-1">
                        Un e-mail récapitulatif a été envoyé instantanément à <span className="font-bold underline">Koalajuju92@outlook.fr</span>.
                    </p>
                </div>
             </div>

             <div className="bg-gray-50 p-4 rounded-lg text-xs text-gray-500 font-mono mt-4">
                ID Transaction: TRX-{Math.floor(Math.random() * 100000000)}
             </div>

             <Link href="/dashboard" className="block">
                <button className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg hover:bg-black transition mt-6">
                  Retour à mes comptes
                </button>
             </Link>
          </div>
        )}

      </main>
    </div>
  );
}