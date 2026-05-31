"use client"; 

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Productos', href: '/productos' },
  { name: 'FaQ', href: '/faq' },
];

const Header = () => {
  const pathname = usePathname(); 
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white shadow-sm transition-all">
      {/* Contenedor principal con paddings fluidos y responsive */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Bloque del Logo (Ajustado para no descuadrarse) */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="ml-0 md:-ml-4 lg:-ml-6 inline-block"> 
              <img 
                src="/Images/logo2.png" 
                alt="SEINVISAC" 
                className="h-10 sm:h-12 md:h-14 w-auto object-contain cursor-pointer transition-transform hover:scale-105" 
              />
            </Link>
          </div>
          
          {/* Navegación para Computadoras (Desktop) */}
          <nav className="hidden md:flex space-x-8 lg:space-x-10 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`relative pb-1 text-sm font-semibold tracking-wide transition-colors duration-200 uppercase ${
                    isActive 
                      ? 'text-[#D77F4A]' 
                      : 'text-gray-600 hover:text-[#D77F4A]'
                  }`}
                >
                  {link.name}
                  {/* Línea decorativa inferior para el link activo */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D77F4A] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* Botón de Contacto destacado (Desktop) */}
          <div className="hidden md:flex items-center">
            <Link 
              href="/contacto" 
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold tracking-wide text-white bg-[#D77F4A] hover:bg-[#b96634] rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Contáctanos
            </Link>
          </div>
          
          {/* Botón de Menú Hamburguesa (Solo se ve en Móviles) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#D77F4A] p-2 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
        </div>
      </div>

      {/* Menú Desplegable (Solo se activa en Móviles al presionar la hamburguesa) */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-gray-50 border-t border-gray-100 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)} // Cierra el menú automáticamente al hacer click
                className={`block px-4 py-3 rounded-lg text-base font-bold transition-all ${
                  isActive 
                    ? 'bg-orange-50 text-[#D77F4A]' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-[#D77F4A]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          {/* Botón de Contacto dentro del menú móvil */}
          <div className="pt-4 px-4">
            <Link
              href="/contacto"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-5 py-3 text-base font-bold text-white bg-[#D77F4A] hover:bg-[#b96634] rounded-lg shadow"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;