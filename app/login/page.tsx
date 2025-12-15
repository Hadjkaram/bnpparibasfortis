"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [clientId, setClientId] = useState("");

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col font-sans">
      
      {/* 1. HEADER SIMPLIFIÉ (Spécifique page login) */}
      <header className="bg-white py-4 px-4 md:px-8 border-b border-gray-200 flex justify-between items-center">
        {/* Logo avec lien retour accueil */}
        <Link href="/">
           <Image 
             src="/bnp.png" 
             alt="BNP Paribas Fortis" 
             width={150} 
             height={40} 
             className="w-auto h-8 md:h-10 object-contain"
           />
        </Link>

        {/* Lien Business à droite */}
        <a href="#" className="text-bnp-green font-bold text-sm md:text-base hover:underline">
          Vers Easy Banking Business
        </a>
      </header>

      {/* 2. CORPS DE PAGE (Centré) */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
          
          {/* ZONE GAUCHE : Bienvenue */}
          <div className="md:w-1/2 p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100 relative">
             <div className="mt-10">
                <p className="text-gray-500 text-lg mb-2">Bienvenue dans</p>
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide uppercase leading-tight">
                  EASY <br/> BANKING
                </h1>
             </div>
             
             {/* Numéro d'aide en bas */}
             <div className="text-gray-500 text-sm mt-10 md:mt-0">
               Besoin d'aide ? Appelez le <span className="font-bold text-gray-700">+32 2 762 20 00</span>
             </div>
          </div>

          {/* ZONE DROITE : Formulaire ITSME */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col items-center">
            
            {/* Logo ITSME (Simulation CSS car on n'a pas l'image svg) */}
            <div className="mb-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-[#FF5600] rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">
                its<span className="font-normal">me</span>
              </div>
              <p className="text-center text-gray-600 text-sm max-w-xs">
                Se connecter rapidement et en toute sécurité avec son smartphone.
              </p>
            </div>

            {/* Formulaire */}
            <form className="w-full space-y-4 max-w-xs">
              
              {/* Input Téléphone */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">En savoir plus sur itsme</label>
                <div className="flex">
                  <span className="bg-gray-100 border border-gray-300 border-r-0 rounded-l px-3 py-2 text-gray-600 font-medium flex items-center">
                    +32
                  </span>
                  <input 
                    type="tel" 
                    placeholder="Introduisez votre N° de GSM"
                    className="w-full border border-gray-300 rounded-r px-3 py-2 focus:outline-none focus:ring-1 focus:ring-bnp-green"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Input Numéro Client */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Numéro de client</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-bnp-green"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-2 py-2">
                <input type="checkbox" id="save" className="w-5 h-5 accent-bnp-green rounded border-gray-300" />
                <label htmlFor="save" className="text-sm font-bold text-gray-700">Sauvegarder ce profil</label>
              </div>

              {/* Bouton Principal */}
              <Link href="/dashboard" className="block">
                <button className="w-full bg-bnp-green text-white font-bold py-3 rounded hover:bg-[#007A50] transition shadow-sm text-sm">
                  Se connecter avec itsme
                </button>
              </Link>
            </form>

            {/* Séparateur */}
            <div className="w-full max-w-xs my-6 flex items-center text-gray-400 text-sm">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="px-2">Autres moyens de connexion</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* Bouton Lecteur de carte */}
            <button className="w-full max-w-xs border border-bnp-green text-bnp-green font-bold py-3 rounded hover:bg-green-50 transition text-sm flex justify-center items-center gap-2">
              <span className="text-lg">💳</span> Se connecter avec lecteur de carte
            </button>

          </div>
        </div>
      </main>

      {/* 3. FOOTER */}
      <footer className="bg-[#F4F4F4] py-4 text-center border-t border-gray-200">
        <div className="flex justify-center gap-4 text-xs text-bnp-green font-bold flex-wrap px-4">
           <a href="#" className="hover:underline">À propos de nous</a>
           <span>|</span>
           <a href="#" className="hover:underline">Conditions d'utilisation du site</a>
           <span>|</span>
           <a href="#" className="hover:underline">Politique des cookies</a>
           <span>|</span>
           <a href="#" className="hover:underline">Déclaration Vie Privée</a>
        </div>
        <p className="text-[10px] text-gray-400 mt-2">© 2025 BNP Paribas Fortis</p>
      </footer>
    </div>
  );
}