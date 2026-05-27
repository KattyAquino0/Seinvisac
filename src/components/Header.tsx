import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-0">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img 
              src="/Images/logos.png" 
              alt="SEINVISAC" 
              width={100} 
              height={40}
              className="h-9 w-auto"
            />
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-[#D77F4A] font-bold hover:text-orange-600">
              Inicio
            </Link>
            <Link href="/nosotros" className="text-gray-700 hover:text-orange-500 font-bold">
              Nosotros
            </Link>
            <Link href="/productos" className="text-gray-700 hover:text-orange-500 font-bold">
              Productos
            </Link>
             <Link href="/faq" className="text-gray-700 hover:text-orange-500 font-bold">
              FaQ
            </Link>
            <Link href="/contacto" className="text-gray-700 hover:text-orange-500 font-bold">
              Contacto
            </Link>
          </nav>
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-orange-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;