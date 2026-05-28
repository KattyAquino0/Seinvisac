"use client"; // [SENSEI TIP]: Requerido para usar hooks del lado del cliente como usePathname

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // [SENSEI TIP]: Hook de Next.js para leer la URL actual

// [SENSEI TIP]: Principio DRY (Don't Repeat Yourself). 
// Centralizamos las rutas en un arreglo para no repetir el componente <Link> 5 veces.
const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Productos', href: '/productos' },
  { name: 'FaQ', href: '/faq' },
  { name: 'Contacto', href: '/contacto' },
];

const Header = () => {
  // Guardamos la ruta actual en una variable (ej: "/", "/nosotros", "/productos")
  const pathname = usePathname(); 

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-0">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* [SENSEI TIP]: Ya que estabas importando 'next/image', es mejor usarlo. 
                Optimiza las imágenes automáticamente para producción. */}
            <Image 
              src="/Images/logos.png" 
              alt="SEINVISAC" 
              width={100} 
              height={40}
              className="h-9 w-auto"
              priority // Carga esta imagen de inmediato porque es el logo (LCP)
            />
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {/* Iteramos sobre nuestro arreglo de rutas */}
            {navLinks.map((link) => {
              // Verificamos si la ruta actual coincide con el enlace
              const isActive = pathname === link.href;
              
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`font-bold transition-colors duration-200 ${
                    isActive 
                      ? 'text-[#D77F4A]' // Estilo si ESTAMOS en esta página
                      : 'text-gray-700 hover:text-orange-500' // Estilo si NO estamos en esta página
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
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