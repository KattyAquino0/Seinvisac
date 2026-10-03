"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

const categorias = [
  {
    nombre: "Todos los productos",
    href: "/productos",
  },
  {
    nombre: "Protección corporal",
    href: "/productos?categoria=Protección%20corporal",
  },
  {
    nombre: "Protección de manos",
    href: "/productos?categoria=Protección%20de%20manos",
  },
  {
    nombre: "Protección auditiva",
    href: "/productos?categoria=Protección%20auditiva",
  },
  {
    nombre: "Protección visual",
    href: "/productos?categoria=Protección%20visual",
  },
  {
    nombre: "Protección respiratoria",
    href: "/productos?categoria=Protección%20respiratoria",
  },
  {
    nombre: "Zapato de seguridad",
    href: "/productos?categoria=Zapato%20de%20seguridad",
  },
  {
    nombre: "Protección de cabeza",
    href: "/productos?categoria=Protección%20de%20cabeza",
  },
];

const enlaces = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Nosotros",
    href: "/nosotros",
  },
  {
    label: "Productos",
    href: "/productos",
  },
  {
    label: "Contacto",
    href: "/contacto",
  },
  {
    label: "Preguntas frecuentes",
    href: "/faq",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1B2025] text-white">
      <div className="h-1 w-full bg-orange-500" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
       <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-14 lg:py-16">
         <div className="lg:col-span-3 lg:col-start-1">
            <Link
              href="/"
              aria-label="SEINVISAC - Ir al inicio"
              className="group inline-flex rounded-2xl bg-white px-6 py-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D77F4A]"
            >
              <Image
                src="/Images/copi_Seinvisac.png"
                alt="SEINVISAC - Equipos de protección"
                width={300}
                height={110}
                className="h-auto w-56 object-contain sm:w-60 lg:w-64"
                priority={false}
              />
            </Link>

            <p className="mt-7 max-w-sm text-[15px] leading-7 text-gray-300">
              Especialistas en equipos de protección personal y fabricantes
              de botines de seguridad industrial de alta calidad.
            </p>

            <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-orange-500 bg-orange-500/10 px-4 py-2.5">
              <ShieldCheck
                size={18}
                className="shrink-0 text-orange-500"
                aria-hidden="true"
              />

              <span className="text-sm font-medium text-gray-200">
                Protección para cada jornada
              </span>
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-4">
            <h2 className="mb-6 text-[15px] font-bold uppercase tracking-[0.14em] text-white">
              Explora
            </h2>

            <ul className="space-y-4">
              {enlaces.map((enlace) => (
                <li key={enlace.href}>
                  <Link
                    href={enlace.href}
                    className="group inline-flex items-center gap-2 rounded-sm text-[15px] text-gray-300 transition-colors duration-200 hover:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D77F4A]"
                  >
                    <span>{enlace.label}</span>

                    <ArrowUpRight
                      size={15}
                      aria-hidden="true"
                      className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3 lg:col-start-6">
            <h2 className="mb-6 text-[15px] font-bold uppercase tracking-[0.14em] text-white">
              Categorías
            </h2>

            <ul className="flex flex-col gap-y-3.5">
              {categorias.map((categoria) => (
                <li key={categoria.href}>
                  <Link
                    href={categoria.href}
                    className="group inline-flex items-center gap-3 rounded-sm text-[15px] leading-5 text-gray-300 transition-all duration-200 hover:translate-x-1 hover:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D77F4A]"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500 transition-transform duration-200 group-hover:scale-150"
                      aria-hidden="true"
                    />

                    <span>{categoria.nombre}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <h2 className="mb-6 text-[15px] font-bold uppercase tracking-[0.14em] text-white">
              Contáctanos
            </h2>

            <div className="space-y-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Los+Libertadores+393+Valdiviezo+Ate+Lima"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.035] p-3.5 transition-all duration-200 hover:border-[#D77F4A]/30 hover:bg-[#D77F4A]/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D77F4A]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D77F4A]/10 text-orange-500">
                  <MapPin size={19} aria-hidden="true" />
                </span>

                <span className="min-w-0">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Dirección
                  </span>

                  <span className="block text-[14px] leading-5 text-gray-200 transition-colors group-hover:text-white">
                    Los Libertadores N.° 393,
                    <br />
                    Urb. Valdiviezo, Ate, Lima
                  </span>
                </span>
              </a>
              <a
                href="mailto:seinvisac@gmail.com"
                className="group flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.035] p-3.5 transition-all duration-200 hover:border-[#D77F4A]/30 hover:bg-[#D77F4A]/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D77F4A]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D77F4A]/10 text-orange-500">
                  <Mail size={19} aria-hidden="true" />
                </span>

                <span className="min-w-0">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Correo electrónico
                  </span>

                  <span className="block break-all text-[14px] text-gray-200 transition-colors group-hover:text-white">
                    seinvisac@gmail.com
                  </span>
                </span>
              </a>

              {/* Teléfono */}
              <a
                href="tel:+5113261348"
                className="group flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.035] p-3.5 transition-all duration-200 hover:border-[#D77F4A]/30 hover:bg-[#D77F4A]/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D77F4A]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D77F4A]/10 text-orange-500">
                  <Phone size={19} aria-hidden="true" />
                </span>

                <span className="min-w-0">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Teléfono
                  </span>

                  <span className="block text-[14px] text-gray-200 transition-colors group-hover:text-white">
                    (01) 326-1348
                  </span>
                </span>
              </a>

              {/* Celular */}
              <a
                href="tel:+51924338443"
                className="group flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.035] p-3.5 transition-all duration-200 hover:border-[#D77F4A]/30 hover:bg-[#D77F4A]/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D77F4A]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D77F4A]/10 text-orange-500">
                  <Phone size={19} aria-hidden="true" />
                </span>

                <span className="min-w-0">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Celular
                  </span>

                  <span className="block text-[14px] text-gray-200 transition-colors group-hover:text-white">
                    924 338 443
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================
            SEPARADOR
        ====================================================== */}
        <div className="border-t border-white/10" />

        {/* =====================================================
            BARRA INFERIOR
        ====================================================== */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm leading-5 text-gray-400">
            © {new Date().getFullYear()} SEINVISAC. Todos los derechos
            reservados.
          </p>

          <Link
            href="/"
            className="rounded-sm text-sm font-medium text-gray-400 transition-colors hover:text-[#E99A68] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D77F4A]"
          >
            Calidad y protección industrial
          </Link>
        </div>
      </div>
    </footer>
  );
}