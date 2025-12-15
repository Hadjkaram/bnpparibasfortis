"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Pour la redirection

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [clientId, setClientId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // LA FONCTION DE CONNEXION SÉCURISÉE
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulation d'un délai réseau (1 seconde)
    setTimeout(() => {
      // ICI ON DÉFINIT LES SEULS ACCÈS VALIDES
      if (phone === "0499123456" && clientId === "123456") {
        router.push("/dashboard");
      } else {
        setError("Les données d'identification sont incorrectes.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col font-sans">
      
      {/* HEADER */}
      <header className="bg-white py-4 px-4 md:px-8 border-b border-gray-200 flex justify-between items-center">
        <Link href="/">
           <Image src="/bnp.png" alt="BNP Paribas Fortis" width={150} height={40} className="w-auto h-8 md:h-10 object-contain"/>
        </Link>
        <a href="#" className="text-bnp-green font-bold text-sm md:text-base hover:underline">
          Vers Easy Banking Business
        </a>
      </header>

      {/* CORPS DE PAGE */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
          
          {/* ZONE GAUCHE */}
          <div className="md:w-1/2 p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100 relative">
             <div className="mt-10">
                <p className="text-gray-500 text-lg mb-2">Bienvenue dans</p>
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide uppercase leading-tight">
                  EASY <br/> BANKING
                </h1>
             </div>
             <div className="text-gray-500 text-sm mt-10 md:mt-0">
               Besoin d'aide ? Appelez le <span className="font-bold text-gray-700">+32 2 762 20 00</span>
             </div>
          </div>

          {/* ZONE DROITE : Formulaire */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col items-center">
            
            <div className="mb-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-[#FF5600] rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">
                its<span className="font-normal">me</span>
              </div>
              <p className="text-center text-gray-600 text-sm max-w-xs">
                Se connecter rapidement et en toute sécurité.
              </p>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded w-full mb-4 text-center border border-red-200">
                ⚠️ {error}
              </div>
            )}

            <form className="w-full space-y-4 max-w-xs" onSubmit={handleLogin}>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Votre N° de GSM</label>
                <div className="flex">
                  <span className="bg-gray-100 border border-gray-300 border-r-0 rounded-l px-3 py-2 text-gray-600 font-medium flex items-center">
                    +32
                  </span>
                  <input 
                    type="tel" 
                    placeholder="0499123456"
                    className="w-full border border-gray-300 rounded-r px-3 py-2 focus:outline-none focus:ring-1 focus:ring-bnp-green"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Numéro de client</label>
                <input 
                  type="text" 
                  placeholder="123456"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-bnp-green"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center gap-2 py-2">
                <input type="checkbox" id="save" className="w-5 h-5 accent-bnp-green rounded border-gray-300" />
                <label htmlFor="save" className="text-sm font-bold text-gray-700">Sauvegarder ce profil</label>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className={`w-full text-white font-bold py-3 rounded transition shadow-sm text-sm ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-bnp-green hover:bg-[#007A50]'}`}
              >
                {loading ? "Connexion..." : "Se connecter avec itsme"}
              </button>
            </form>

            <div className="w-full max-w-xs my-6 flex items-center text-gray-400 text-sm">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="px-2">Autres moyens</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <button className="w-full max-w-xs border border-bnp-green text-bnp-green font-bold py-3 rounded hover:bg-green-50 transition text-sm flex justify-center items-center gap-2">
              <span className="text-lg">💳</span> Lecteur de carte
            </button>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#F4F4F4] py-4 text-center border-t border-gray-200 text-[10px] text-gray-400">
        © 2025 BNP Paribas Fortis
      </footer>
    </div>
  );
}