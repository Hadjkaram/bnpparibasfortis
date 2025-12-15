"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ACCOUNTS = [
  { 
    id: 1, 
    type: "Compte à vue Comfort Pack", 
    iban: "BE45 0000 1234 5678", 
    balance: 1000000.00, 
    currency: "EUR" 
  },
  { 
    id: 2, 
    type: "Compte d'épargne Premium", 
    iban: "BE45 1111 2222 3333", 
    balance: 0.00, 
    currency: "EUR" 
  },
];

const TRANSACTIONS = [
  { id: 1, date: "15 Déc", merchant: "Virement BRINKS BANK", amount: 1000000.00, type: "credit" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hideAmounts, setHideAmounts] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex font-sans text-gray-800">
      
      {/* OVERLAY MOBILE (Le fond noir transparent quand le menu est ouvert) */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
        ></div>
      )}

      {/* 1. SIDEBAR (Menu Gauche) */}
      <aside className={`fixed inset-y-0 left-0 bg-white w-72 border-r border-gray-200 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out z-50 flex flex-col`}>
        
        {/* Header Sidebar Mobile (Bouton fermer) */}
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
          
          {/* ... Autres liens (inchangés pour la démo) ... */}
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
            <p className="text-gray-500 text-sm mt-1">Situation au 15 Décembre.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
                onClick={() => setHideAmounts(!hideAmounts)}
                className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
            >
                {hideAmounts ? "Afficher" : "Cacher"}
            </button>

            {/* LE BOUTON VIREMENT QUI FONCTIONNE */}
            <Link href="/dashboard/transfer" className="flex-1 md:flex-none">
                <button className="w-full bg-bnp-green text-white px-6 py-2 rounded-full font-bold hover:bg-[#007A50] transition shadow-md text-sm flex justify-center items-center gap-2">
                <span>↗</span> Virement
                </button>
            </Link>
          </div>
        </header>

        {/* ... (Le reste de la grille des comptes et historique reste identique) ... */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Tu peux garder le bloc des comptes et historique du code précédent ici */}
             {/* Pour gagner de la place, je ne le recolle pas mais garde le bien ! */}
             {/* Si tu as un doute, dis-le moi, je te remets tout le fichier. */}
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
                    </div>
                    </div>
                </div>
                ))}
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Dernière opération</h3>
                {TRANSACTIONS.map((tx) => (
                    <div key={tx.id} className="flex justify-between items-center py-2">
                         <div className="font-bold text-sm">{tx.merchant}</div>
                         <div className="text-green-600 font-bold">+{tx.amount.toLocaleString()} €</div>
                    </div>
                ))}
             </div>
        </div>

      </main>
    </div>
  );
}