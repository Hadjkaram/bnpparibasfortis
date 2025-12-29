"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TransactionDetailPage() {
  const params = useParams();
  const [tx, setTx] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. On récupère l'ID depuis l'URL
    const id = params.id;

    // 2. On définit la transaction par défaut (Brinks)
    const defaultTx = { 
      id: 1, 
      merchant: "Virement BRINKS BANK", 
      amount: 1000000.00, 
      type: "credit", 
      date: "15 Déc",
      iban: "BE98 7364 9988 1122" // Faux IBAN pour Brinks
    };

    // 3. Si c'est la transaction par défaut
    if (Number(id) === 1) {
      setTx(defaultTx);
      setLoading(false);
      return;
    }

    // 4. Sinon, on cherche dans le LocalStorage (tes virements)
    const savedHistory = localStorage.getItem("bnp_history");
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      // On cherche la transaction qui a le même ID
      const found = history.find((item: any) => item.id.toString() === id);
      
      if (found) {
        setTx(found);
      }
    }
    setLoading(false);
  }, [params.id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Chargement...</div>;

  if (!tx) return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-bold text-gray-800">Transaction introuvable</h2>
      <Link href="/dashboard" className="text-bnp-green underline mt-4 block">Retour au dashboard</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F4F4] font-sans text-gray-800 flex justify-center items-start pt-10 px-4">
      
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg overflow-hidden">
        {/* Header Vert */}
        <div className="bg-bnp-green p-6 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            {tx.type === 'debit' ? '↗' : '↙'}
          </div>
          <h1 className="text-xl font-bold">Détail de la transaction</h1>
          <p className="opacity-90 text-sm mt-1">Exécuté le {tx.date}</p>
        </div>

        {/* Montant */}
        <div className="p-8 text-center border-b border-gray-100">
           <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">Montant</p>
           <h2 className={`text-4xl font-bold ${tx.type === 'debit' ? 'text-gray-900' : 'text-bnp-green'}`}>
             {tx.type === 'debit' ? '-' : '+'} {parseFloat(tx.amount).toLocaleString('fr-BE', { minimumFractionDigits: 2 })} €
           </h2>
        </div>

        {/* Détails */}
        <div className="p-6 space-y-6">
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Contrepartie</span>
            <span className="font-bold text-gray-800">{tx.merchant}</span>
          </div>

          <div className="flex justify-between items-center">
             <span className="text-gray-500 text-sm">Compte bénéficiaire</span>
             {/* Si on n'a pas l'IBAN (car pas sauvegardé avant), on en génère un masqué crédible */}
             <span className="font-mono text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded">
               {tx.iban || "BE** **** **** 9023"}
             </span>
          </div>

          <div className="flex justify-between items-center">
             <span className="text-gray-500 text-sm">Statut</span>
             <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
               ✓ COMPTABILISÉ
             </span>
          </div>

          <div className="flex justify-between items-center">
             <span className="text-gray-500 text-sm">Communication</span>
             <span className="text-gray-800 text-sm italic">
               {tx.communication || "Virement SEPA"}
             </span>
          </div>
          
          <div className="flex justify-between items-center">
             <span className="text-gray-500 text-sm">Référence</span>
             <span className="text-gray-400 text-xs font-mono">
                NON-{tx.id}
             </span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 p-6 flex gap-4">
           <Link href="/dashboard" className="flex-1">
             <button className="w-full border border-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-white transition">
               Retour
             </button>
           </Link>
           <button className="flex-1 bg-bnp-green text-white font-bold py-3 rounded-lg hover:bg-[#007A50] transition shadow-sm">
             Imprimer
           </button>
        </div>

      </div>
    </div>
  );
}