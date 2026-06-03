import Image from "next/image";
import Link from "next/link";
import { Mail, MapMinusIcon, Phone } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-0">
        <div className="grid md:grid-cols-4 gap-7">
          
          {/* Logo y descripción */}
          <div>
            <Image
              src="/Images/copi_Seinvisac.png"
              alt="SEINVISAC"
              width={120}
              height={40}
              className="h-8 w-auto mb-6"
            />
            <p className="text-white text-m">
              Especialistas en equipos de protección personal y fabricantes de
              botines de seguridad industrial de alta calidad.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#D77F4A]">
              Enlaces de Interés
            </h4>

            <ul className="space-y-2 text-m">
              <li>
                <Link href="/" className="text-white hover:text-[#D77F4A] transition">
                  Inicio
                </Link>
              </li>

              <li>
                <Link
                  href="/nosotros"
                  className="text-white hover:text-[#D77F4A] transition"
                >
                  Nosotros
                </Link>
              </li>

              <li>
                <Link
                  href="/productos"
                  className="text-white hover:text-[#D77F4A] transition"
                >
                  Productos
                </Link>
              </li>

              <li>
                <Link
                  href="/contacto"
                  className="text-white hover:text-[#D77F4A] transition"
                >
                  Contacto
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="text-white hover:text-[#D77F4A] transition"
                >
                  FAQ
                </Link>
              </li>
            </ul>

            <h4 className="text-lg font-semibold mb-1 mt-5 text-[#D77F4A]">
              Preguntas frecuentes
            </h4>
          </div>

          {/* Productos */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#D77F4A]">
              Productos
            </h4>

            <ul className="space-y-2 text-m">
              <li>Botines de Seguridad</li>
              <li>EPP</li>
              <li>Equipos de Protección</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#D77F4A]">
              Datos de Contacto
            </h4>

            <div className="space-y-4 text-m text-white">
              <div className="flex items-start gap-2">
                <MapMinusIcon className="w-5 h-5 text-[#D77F4A] shrink-0 mt-1" />
                <p>
                  Dirección: Los Libertadores N°393 - Urb. Valdiviezo - Ate
                </p>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-[#D77F4A] shrink-0 mt-1" />
                <p>Correo: seinvisac@gmail.com</p>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-[#D77F4A] shrink-0 mt-1" />
                <p>Teléfono: 326-1348 | Celular: 924 338 443</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 SEINVISAC. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}