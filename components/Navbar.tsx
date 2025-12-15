import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm font-sans">
      {/* Barre supérieure grise */}
      <div className="bg-[#F4F4F4] text-[13px] py-1 px-4 md:px-8 flex justify-between items-center text-gray-600 border-b border-gray-200">
        <div className="flex gap-6">
          <span className="font-bold text-bnp-dark border-b-2 border-bnp-green pb-[2px]">Particuliers</span>
          <span className="cursor-pointer hover:text-bnp-green">Professionnels</span>
          <span className="cursor-pointer hover:text-bnp-green">Private Banking</span>
          <span className="cursor-pointer hover:text-bnp-green">Entreprises</span>
        </div>
        <div className="hidden md:flex gap-4">
            <span className="hover:underline cursor-pointer">Nous contacter</span>
            <span className="hover:underline cursor-pointer">FR ▼</span>
        </div>
      </div>

      {/* Barre principale */}
      <div className="flex justify-between items-center py-3 px-4 md:px-8">
        {/* Partie Gauche : Logo + Menu */}
        <div className="flex items-center gap-8">
          {/* Logo Image */}
          <Link href="/">
            <Image 
                src="/bnp.png" 
                alt="BNP Paribas Fortis" 
                width={180} 
                height={50} 
                className="w-auto h-10 object-contain"
                priority
            />
          </Link>

          {/* Menu Desktop */}
          <div className="hidden lg:flex gap-6 text-[15px] font-medium text-gray-700">
            <Link href="#" className="hover:text-bnp-green hover:underline decoration-2 underline-offset-8 transition">Comptes et cartes</Link>
            <Link href="#" className="hover:text-bnp-green hover:underline decoration-2 underline-offset-8 transition">Épargner et placer</Link>
            <Link href="#" className="hover:text-bnp-green hover:underline decoration-2 underline-offset-8 transition">Emprunter</Link>
            <Link href="#" className="hover:text-bnp-green hover:underline decoration-2 underline-offset-8 transition">Assurer</Link>
          </div>
        </div>

        {/* Partie Droite : Boutons */}
        <div className="flex items-center gap-3">
          <button className="hidden md:block border border-bnp-green text-bnp-green px-4 py-2 rounded-[4px] font-bold text-sm hover:bg-green-50 transition">
            Ouvrir un compte
          </button>
          <Link 
            href="/login" 
            className="bg-bnp-green text-white px-4 py-2 rounded-[4px] font-bold text-sm hover:bg-[#007A50] transition flex items-center gap-2 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Se connecter
          </Link>
        </div>
      </div>
    </nav>
  );
}