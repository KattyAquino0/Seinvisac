import Image from "next/image";
import { Mail, MapMinusIcon, MapPlusIcon, Phone } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-0">
        <div className="grid md:grid-cols-4 gap-7">
          <div>
            <Image 
              src="/Images/copi_Seinvisac.png" 
              alt="SEINVISAC" 
              width={120} 
              height={40}
              className="h-8 w-auto mb-6"
            />
            <p className="text-white text-m">
              Especialistas en equipos de protección personal y fabricantes de botines de seguridad industrial de alta calidad.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#D77F4A]">Enlaces de Interes</h4>
            <ul className="space-y-2 text-m">
              <li><a href="/" className="text-white">Inicio</a></li>
              <li><a href="/nosotros" className="text-white">Nosotros</a></li>
              <li><a href="/productos" className="text-white">Productos</a></li>
              <li><a href="/contacto" className="text-white">Aliados</a></li>
              <li><a href="/contacto" className="text-white">FAQ</a></li>
            </ul>
            <h4 className="text-lg font-semibold mb-1 mt-5 text-[#D77F4A]">Preguntas frecuentes</h4>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#D77F4A]">Productos</h4>
            <ul className="space-y-2 text-m">
              <li><a href="#" className="text-white">Botines de Seguridad</a></li>
              <li><a href="#" className="text-white">EPP</a></li>
              <li><a href="#" className="text-white">Equipos de Protección</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#D77F4A]">Datos de Contacto</h4>
            <div className="space-y-2 text-m text-white">
              <MapMinusIcon className="w-5 h-5 text-[#D77F4A]" /><p>Dirección:Los libertadores N°393 - Urb. Valdiviezo- Ate</p>
              <Mail className="w-5 h-5 text-[#D77F4A]" /><p>Correo Electronico:seinvisac@gmail.com</p>
              <Phone className="w-5 h-5 text-[#D77F4A]"/><p>Telefono:326-1348   Celular: 924 338 443</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 SEINVISAC. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
