"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// On définit les données initiales (les dates seront mises à jour dynamiquement)
const INITIAL_TRANSACTIONS = [
  { id: 1, merchant: "Virement BRINKS BANK", amount: 1000000.00, type: "credit" },
];

const ACCOUNTS = [
  { 
    id: 1, 
    type: "Compte à vue Comfort Pack", 
    iban: "BE68 7340 1928 4571", 
    balance: 1000000.00, 
    currency: "EUR" 
  },
  { 
    id: 2, 
    type: "Compte d'épargne Premium", 
    iban: "BE14 9823 4510 6629", 
    balance: 0.00, 
    currency: "EUR" 
  },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hideAmounts, setHideAmounts] = useState(false);
  
  // États pour les dates dynamiques
  const [dateStr, setDateStr] = useState("");      // Pour "Situation au..."
  const [shortDate, setShortDate] = useState("");  // Pour l'historique "15 Déc"

  // Au chargement de la page, on calcule la date du jour
  useEffect(() => {
    const now = new Date();
    
    // Format complet : "16 décembre"
    const optionsFull: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    setDateStr(now.toLocaleDateString('fr-FR', optionsFull));

    // Format court : "16 Déc" (pour les transactions)
    const optionsShort: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    // On met la première lettre du mois en majuscule manuellement pour faire joli
    const short = now.toLocaleDateString('fr-FR', optionsShort).replace('.', '');
    setShortDate(short.charAt(0).toUpperCase() + short.slice(1));
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex font-sans text-gray-800">
      
      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
        ></div>
      )}

      {/* 1. SIDEBAR (Menu Gauche) */}
      <aside className={`fixed inset-y-0 left-0 bg-white w-72 border-r border-gray-200 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out z-50 flex flex-col`}>
        
        {/* Header Sidebar Mobile */}
        <div className="flex justify-between items-center p-4 md:justify-center border-b border-gray-100">
           <Link href="/" className="flex justify-center w-full">
             <Image src="/bnp.png" alt="BNP Logo" width={140} height={40} className="h-8 w-auto object-contain" />
           </Link>
           <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500 text-2xl px-2">
             ✕
           </button>
        </div>
        
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4">Ma Banque</p>
          {[
            { name: "Aperçu des comptes", active: true, icon: "📊", href: "/dashboard" },
            { name: "Virements", active: false, icon: "💸", href: "/dashboard/transfer" },
            { name: "Mes cartes", active: false, icon: "💳", href: "#" },
          ].map((item, idx) => (
            <Link key={idx} href={item.href || "#"}>
                <div className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition cursor-pointer ${item.active ? "bg-green-50 text-bnp-green border-l-4 border-bnp-green" : "text-gray-600 hover:bg-gray-50 hover:text-bnp-green"}`}>
                <span className="text-lg w-6 text-center">{item.icon}</span>
                {item.name}
                </div>
            </Link>
          ))}
          
          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-8">Services</p>
           {[
            { name: "Assurances", active: false, icon: "🛡️" },
            { name: "Documents Zoomit", active: false, icon: "📂" },
            { name: "Messagerie", active: false, icon: "📩" },
          ].map((item, idx) => (
            <button key={idx} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-bnp-green transition">
              <span className="text-lg w-6 text-center">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium">
            <span>🚪</span> Se déconnecter
          </Link>
        </div>
      </aside>

      {/* 2. CONTENU PRINCIPAL */}
      <main className="flex-1 md:ml-72 p-4 md:p-8 overflow-y-auto h-screen relative">
        
        {/* Top Bar Mobile */}
        <div className="md:hidden flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm sticky top-0 z-30">
          <Image src="/bnp.png" alt="Logo" width={100} height={30} className="h-6 w-auto" />
          <button onClick={() => setSidebarOpen(true)} className="text-2xl text-bnp-green">☰</button>
        </div>

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Bonjour, Julien FERRET</h1>
            {/* DATE DYNAMIQUE ICI */}
            <p className="text-gray-500 text-sm mt-1">
              {dateStr ? `Situation au ${dateStr}.` : "Chargement de la date..."}
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
                onClick={() => setHideAmounts(!hideAmounts)}
                className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
            >
                {hideAmounts ? "Afficher" : "Cacher"}
            </button>

            <Link href="/dashboard/transfer" className="flex-1 md:flex-none">
                <button className="w-full bg-bnp-green text-white px-6 py-2 rounded-full font-bold hover:bg-[#007A50] transition shadow-md text-sm flex justify-center items-center gap-2">
                <span>↗</span> Virement
                </button>
            </Link>
          </div>
        </header>

        {/* Grille Principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             
             {/* COLONNE GAUCHE : Comptes */}
             <div className="lg:col-span-2 space-y-6">
                {ACCOUNTS.map((account) => (
                <div key={account.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer group">
                    <div className="p-6 flex justify-between items-start relative">
                    <div className="absolute left-0 top-4 bottom-4 w-1 bg-bnp-green rounded-r-full"></div>
                    <div className="pl-4">
                        <h3 className="font-bold text-lg text-bnp-green group-hover:underline decoration-2 underline-offset-4">{account.type}</h3>
                        <p className="text-gray-400 text-xs md:text-sm font-mono mt-1 tracking-wide">{account.iban}</p>
                    </div>
                    <div className="text-right">
                        <span className={`text-2xl md:text-3xl font-bold text-gray-800 block ${hideAmounts ? "blur-md select-none" : ""}`}>
                            {account.balance.toLocaleString('fr-BE', { minimumFractionDigits: 2 })} <span className="text-base text-gray-500">€</span>
                        </span>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded mt-2 inline-block">Solde disponible</span>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex gap-4 text-xs font-bold text-gray-600">
                        <button className="hover:text-bnp-green transition">HISTORIQUE</button>
                        <button className="hover:text-bnp-green transition">EFFECTUER UN VIREMENT</button>
                    </div>
                </div>
                ))}

                {/* Banner Pub */}
                <div className="bg-gradient-to-r from-[#2D2D2D] to-[#404040] rounded-xl p-6 text-white shadow-lg flex items-center justify-between">
                    <div>
                        <p className="text-green-400 text-xs font-bold uppercase mb-1">Conseil</p>
                        <h4 className="font-bold text-lg">Épargnez automatiquement</h4>
                        <p className="text-gray-300 text-sm mt-1 max-w-md">Arrondissez vos dépenses.</p>
                    </div>
                    <button className="bg-white text-gray-900 px-4 py-2 rounded text-sm font-bold hover:bg-gray-100 transition whitespace-nowrap ml-4">
                        Activer
                    </button>
                </div>
             </div>

             {/* COLONNE DROITE : Historique (DATE DYNAMIQUE) */}
             <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-gray-800">Opérations récentes</h3>
                        <Link href="#" className="text-xs font-bold text-bnp-green hover:underline">TOUT VOIR</Link>
                    </div>

                    <div className="space-y-0">
                    {INITIAL_TRANSACTIONS.map((tx, idx) => (
                        <div key={idx} className="flex justify-between items-center py-4 border-b border-gray-50 hover:bg-gray-50 px-2 -mx-2 transition rounded border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm border bg-green-50 border-green-100 text-green-600">
                                💰
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-gray-800 line-clamp-1">{tx.merchant}</p>
                                    {/* DATE DYNAMIQUE ICI */}
                                    <p className="text-[11px] text-gray-400 font-medium">{shortDate || "..."}</p>
                                </div>
                            </div>
                            <span className={`font-bold text-sm whitespace-nowrap text-green-600 ${hideAmounts ? "blur-sm" : ""}`}>
                                + {tx.amount.toLocaleString('fr-BE')} €
                            </span>
                        </div>
                    ))}
                    </div>
                </div>
                
                {/* Widget Contact */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                    <div className="w-12 h-12 bg-green-50 text-bnp-green rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                        📞
                    </div>
                    <h4 className="font-bold text-gray-800">Votre agence</h4>
                    <p className="text-sm text-gray-500 mt-1">Agence Bruxelles-Schuman</p>
                    <button className="mt-4 border border-gray-300 text-gray-600 text-xs font-bold px-4 py-2 rounded hover:border-bnp-green hover:text-bnp-green transition w-full">
                        PRENDRE RENDEZ-VOUS
                    </button>
                </div>
             </div>
        </div>

      </main>
    </div>
  );
}