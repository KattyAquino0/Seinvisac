"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AliadosCarousel from "@/components/AliadosCarousel";
import VideoCarousel from "@/components/VideoCarousel";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  X,
  Check,
  ShieldCheck,
  Factory,
  Award,
  Sparkles,
} from "lucide-react";

interface Imagen {
  url: string;
}

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  sku?: string;
  caracteristicas?: string[];
  imagenes: Imagen[];
}

export default function Home() {
  const [destacados, setDestacados] = useState<Producto[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);
  const [imagenActiva, setImagenActiva] = useState<number>(0);

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchDestacados = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/productos`);
        if (!res.ok) throw new Error("Error fetching productos");

        const data: Producto[] = await res.json();

        const categoriasVistas = new Set();
        const filtrados = data.filter((prod) => {
          if (!categoriasVistas.has(prod.categoria)) {
            categoriasVistas.add(prod.categoria);
            return true;
          }
          return false;
        });

        setDestacados(filtrados);
      } catch (error) {
        console.error("Error al obtener productos destacados:", error);
      }
    };

    fetchDestacados();
  }, [backendUrl]);

  useEffect(() => {
    if (!scrollRef.current || destacados.length === 0 || productoSeleccionado)
      return;

    const interval = setInterval(() => {
      const container = scrollRef.current;

      if (container) {
        if (container.matches(":hover")) return;

        const maxScroll = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 382, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [destacados, productoSeleccionado]);


  useEffect(() => {
    if (productoSeleccionado) {
      document.body.style.overflow = "hidden";
      setImagenActiva(0);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [productoSeleccionado]);

  const scrollManual = (direccion: "izq" | "der") => {
    if (scrollRef.current) {
      const scrollAmount = 382;

      scrollRef.current.scrollBy({
        left: direccion === "izq" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Header />

      <main>
        {/* =========================================================
            HERO — NO MODIFICADO
        ========================================================= */}
        <section className="relative overflow-hidden h-[32rem]">
          <div className="absolute inset-0 z-0">
            <VideoCarousel />
          </div>

          <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

          <div className="relative z-20 container mx-auto px-0 h-full flex items-center">
            <motion.div
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6 text-white px-4 md:px-0">
                <motion.div
                  className="bg-[#F5F5F5] text-orange-500 px-4 py-2 rounded-md inline-block text-sm font-semibold"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  ⭐ Equipos de Protección Personal
                </motion.div>

                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Bienvenido a <br />
                  <span className="text-orange-500">SEINVISAC</span>, tu aliado{" "}
                  <br />
                  en seguridad
                </h1>

                <p className="text-lg max-w-md text-gray-200">
                  Empresa especializada en equipos de protección personal y
                  fabricación de botines de seguridad industrial con más de 10
                  años de experiencia en el mercado.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        <section className="py-0">
          <AliadosCarousel />
        </section>
        <section className="relative bg-white py-7 lg:py-10 overflow-hidden">
          <div className="absolute -left-30 top-20 w-[350px] h-[350px] bg-orange-100/50 rounded-full blur-3xl" />
          <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-orange-50 rounded-full blur-3xl" />
          <div className="relative z-10 container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
              <motion.div
                className="relative order-2 lg:order-1"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="absolute -left-4 -bottom-4 w-full h-full rounded-[2rem] border-2 border-orange-500/20" />
                <div className="relative overflow-hidden rounded-[2rem] shadow-[0_25px_70px_-20px_rgba(0,0,0,0.25)]">
                  <Image
                    src="/Images/image1.png"
                    alt="Safety boots manufacturing"
                    width={600}
                    height={480}
                    className="w-full h-[380px] lg:h-[470px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl">
                      <span className="block text-xs font-bold uppercase tracking-[0.18em] text-orange-500  mb-1">
                        SEINVISAC
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        Seguridad industrial
                      </span>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg">
                      <ArrowUpRight size={21} />
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-orange-500 text-sm font-bold uppercase tracking-[0.2em]">
                    Sobre nosotros
                  </span>

                  <span className="h-px w-14 bg-orange-500" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-950 leading-[1.05] tracking-tight mb-6">
                  Protección que nace de la
                  <span className="text-orange-500"> experiencia.</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
                  Empresa especializada en equipos de protección personal y
                  fabricación de botines de seguridad industrial.
                </p>
                <div className="relative pl-6 border-l-2 border-orange-500 mb-8">
                  <h3 className="text-xl font-extrabold text-gray-900 mb-3">
                    ¿Quiénes Somos?
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-xl">
                    SEINVISAC es una empresa comprometida con la seguridad laboral,
                    especializada en la venta, distribución y fabricación de equipos
                    de protección, en particular en la fabricación de botines de
                    seguridad industrial de alta calidad.
                  </p>
                </div>
                <motion.button
                  className="group inline-flex items-center gap-3 bg-gray-950 hover:bg-orange-500 text-white px-7 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Conoce más

                  <ArrowUpRight
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="h-[2px] w-12 bg-orange-500 rounded-full"></span>

                <span className="text-orange-500 text-sm font-bold uppercase tracking-[0.25em]">
                  Productos
                </span>

                <span className="h-[2px] w-12 bg-orange-500 rounded-full"></span>
              </div>

              <motion.h2
                className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Productos <span className="text-orange-500">Destacados</span>
              </motion.h2>

              <motion.p
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Descubre algunos de nuestros productos más populares en equipos
            de protección personal y botines de seguridad industrial.
          </motion.p>
            </motion.div>
          </div>
          {destacados.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              Cargando catálogo destacado...
            </p>
          ) : (
            <div className="container mx-auto px-4 relative group">
              <button
                onClick={() => scrollManual("izq")}
                className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl text-orange-500 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-orange-50 hover:scale-110"
              >
                <ChevronLeft size={28} />
              </button>

              <div
                className="overflow-hidden relative"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                }}
              >
                <div
                  ref={scrollRef}
                  className="flex gap-8 px-4 py-4 overflow-x-auto snap-x snap-mandatory scroll-smooth"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  <style jsx>{`
                    div::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>

                  {[...destacados, ...destacados].map((producto, index) => (
                    <div
                      key={`${producto.id}-${index}`}
                      onClick={() => setProductoSeleccionado(producto)}
                      className="w-[350px] shrink-0 p-6 bg-gray-50 rounded-2xl border-2 border-transparent shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-orange-500 transition-all duration-300 cursor-pointer snap-start flex flex-col group/card"
                    >
                      <div className="relative h-48 bg-white rounded-xl flex items-center justify-center mb-4 overflow-hidden p-4 flex-shrink-0">
                        <img
                          src={
                            producto.imagenes && producto.imagenes[0]
                              ? `${backendUrl}${producto.imagenes[0].url}`
                              : "/images/default.png"
                          }
                          alt={producto.nombre}
                          className={`absolute inset-0 object-contain w-full h-full mix-blend-multiply p-4 transition-all duration-700 ${
                            producto.imagenes &&
                            producto.imagenes.length > 1
                              ? "group-hover/card:opacity-0 group-hover/card:scale-95"
                              : "group-hover/card:scale-110"
                          }`}
                        />

                        {producto.imagenes &&
                          producto.imagenes.length > 1 && (
                            <img
                              src={`${backendUrl}${producto.imagenes[1].url}`}
                              alt={`${producto.nombre} - vista alternativa`}
                              className="absolute inset-0 object-contain w-full h-full mix-blend-multiply p-4 opacity-0 scale-110 group-hover/card:opacity-100 group-hover/card:scale-100 transition-all duration-700"
                            />
                          )}
                      </div>

                      <div className="flex flex-col flex-grow">
                        <span className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1 block">
                          {producto.categoria}
                        </span>

                        <h4 className="text-lg font-semibold text-gray-900 line-clamp-1">
                          {producto.nombre}
                        </h4>

                        <p className="text-gray-600 text-sm mt-2 line-clamp-2 mb-4">
                          {producto.descripcion}
                        </p>

                        <button className="mt-auto bg-white border border-gray-300 text-gray-700 group-hover/card:bg-orange-500 group-hover/card:text-white group-hover/card:border-orange-500 font-semibold px-4 py-2 rounded-xl transition-all duration-300 w-full shadow-sm">
                          Vista rápida
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => scrollManual("der")}
                className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl text-orange-500 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-orange-50 hover:scale-110"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          )}
          <div className="flex justify-center mt-10 mb-1">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href="/productos"
                className="group inline-flex items-center gap-3 bg-gray-950 hover:bg-orange-500 text-white px-7 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              >
                Explorar más productos

                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                />
              </Link>
            </motion.div>
          </div>
        </section>
        <section className="relative overflow-hidden bg-[#111111] py-20 lg:py-18">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-orange-400/5 blur-3xl" />
          <div className="relative z-10 container mx-auto px-4 lg:px-12">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-12 bg-orange-500" />
                  <span className="text-orange-400 text-sm font-bold uppercase tracking-[0.2em]">
                    Fabricación propia
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight">
                  Fabricantes de
                  <span className="block text-orange-500">Botines</span>
                </h2>

                <p className="mt-7 text-gray-400 text-lg leading-relaxed max-w-xl">
                  Nos especializamos en la fabricación de botines de seguridad
                  industrial. Nuestro proceso garantiza productos de alta
                  calidad que cumplen con todas las normativas de seguridad.
                </p>
                <div className="mt-10 space-y-4">
                  {[
                    "Fabricación propia de botines de seguridad",
                    "Control de calidad en cada etapa",
                    "Certificaciones de seguridad industrial",
                    "Precios competitivos directos de fábrica",
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: idx * 0.08,
                      }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-9 h-9 shrink-0 rounded-full border border-orange-500/30 bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
                        <Check
                          size={17}
                          className="text-orange-500 group-hover:text-white transition-colors"
                          strokeWidth={3}
                        />
                      </div>

                      <span className="text-gray-200 text-sm md:text-base">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative"
              >
                <div className="grid grid-cols-12 grid-rows-12 gap-3 h-[480px] md:h-[560px]">
                  <motion.div
                    className="col-span-7 row-span-12 relative overflow-hidden rounded-[2rem] group"
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src="/Images/botin3.jpg"
                      alt="Botín de seguridad"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-7 left-7 right-5">
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                        Seguridad industrial
                      </span>

                      <p className="mt-2 text-white font-bold text-xl">
                        Protección diseñada para el trabajo real
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="col-span-5 row-span-6 relative overflow-hidden rounded-[1.5rem] group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src="/Images/botin1.png"
                      alt="Botín en producción"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  </motion.div>
                  <motion.div
                    className="col-span-5 row-span-6 relative overflow-hidden rounded-[1.5rem] group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src="/Images/botin2.jpg"
                      alt="Botines en fábrica"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 -left-5 md:-left-8 bg-white rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3"
                >
                  <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center">
                    <Factory className="text-white" size={22} />
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">
                      Producción
                    </p>
                    <p className="text-sm font-extrabold text-gray-900">
                      Fabricación propia
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="relative bg-white py-18 lg:py-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-orange-50 rounded-full blur-3xl opacity-60" />
          <div className="relative z-10 container mx-auto px-4 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="max-w-3xl mb-10"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-[0.2em]">
                  Nuestro diferencial
                </span>
                <span className="h-px w-16 bg-orange-500" />
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-gray-950 leading-tight tracking-tight">
                Seguridad que se construye
                <span className="text-orange-500"> con experiencia.</span>
              </h2>

              <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-2xl">
                Cada producto responde a nuestro compromiso con la calidad,
                la seguridad y las necesidades reales del sector industrial.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  number: "01",
                  title: "Calidad y control",
                  desc: "Control total del proceso productivo para garantizar calidad y precios competitivos.",
                  icon: Factory,
                },
                {
                  number: "02",
                  title: "Seguridad Certificada",
                  desc: "Cumplimos con todas las normativas de seguridad industrial.",
                  icon: ShieldCheck,
                },
                {
                  number: "03",
                  title: "Durabilidad Comprobada",
                  desc: "Botines con materiales de alta resistencia, ideales para condiciones exigentes.",
                  icon: Award,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: idx * 0.12,
                    }}
                    viewport={{ once: true }}
                    className="group relative min-h-[330px] rounded-[2rem] border border-gray-200 bg-white p-8 md:p-9 overflow-hidden hover:border-orange-200 hover:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.15)] transition-all duration-500"
                  >
                    <span className="absolute right-7 top-6 text-6xl font-black text-gray-100 group-hover:text-orange-200 transition-colors duration-500">
                      {item.number}
                    </span>
                    <div className="relative w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-8 group-hover:bg-orange-500 transition-all duration-500">
                      <Icon
                        size={25}
                        className="text-orange-500 group-hover:text-white transition-colors duration-500"
                        strokeWidth={1.8}
                      />
                    </div>
                    <div className="relative">
                      <h3 className="text-2xl font-extrabold text-gray-900 mb-4">
                        {item.title}
                      </h3>

                      <p className="text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-orange-500 group-hover:w-full transition-all duration-500" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="relative px-4 pb-18 lg:pb-20 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative container mx-auto overflow-hidden rounded-[2rem] bg-[#111111] px-7 py-14 md:px-12 lg:px-16 lg:py-16"
          >
            <div className="absolute right-[-100px] top-[-150px] w-[400px] h-[400px] rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute left-[-100px] bottom-[-200px] w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-3xl" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <Sparkles size={18} className="text-orange-500" />

                  <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.2em]">
                    SEINVISAC
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                  Equipa a tu equipo con
                  <span className="text-orange-500"> seguridad.</span>
                </h2>
                <p className="mt-4 text-gray-400 text-base md:text-lg leading-relaxed">
                  Conoce nuestra línea de equipos de protección personal y
                  botines de seguridad industrial.
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  href="/productos"
                  className="inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-400 text-white font-bold px-7 py-4 rounded-xl shadow-lg hover:shadow-orange-500/20 hover:-translate-y-1 transition-all duration-300"
                >
                  Ver productos
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <AnimatePresence>
        {productoSeleccionado && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProductoSeleccionado(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <button
                onClick={() => setProductoSeleccionado(null)}
                className="absolute top-4 right-4 z-20 bg-gray-100 hover:bg-red-500 hover:text-white text-gray-600 p-2 rounded-full transition-colors duration-200 shadow-sm"
              >
                <X size={20} strokeWidth={3} />
              </button>

              <div className="w-full md:w-1/2 p-6 md:p-10 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col bg-white overflow-y-auto">
                <div className="flex flex-col-reverse sm:flex-row gap-4 mb-8 h-auto sm:h-80">
                  {productoSeleccionado.imagenes &&
                    productoSeleccionado.imagenes.length > 1 && (
                      <div
                        className="flex flex-row sm:flex-col gap-3 overflow-auto sm:w-20 shrink-0 pb-2 sm:pb-0 sm:pr-2 scroll-smooth"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        <style jsx>{`
                          div::-webkit-scrollbar {
                            display: none;
                          }
                        `}</style>

                        {productoSeleccionado.imagenes.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setImagenActiva(idx)}
                            className={`relative w-16 sm:w-full aspect-square rounded-xl border-2 overflow-hidden transition-all duration-300 shrink-0 ${
                              imagenActiva === idx
                                ? "border-orange-500 shadow-md scale-105"
                                : "border-gray-100 hover:border-orange-300 opacity-70 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={`${backendUrl}${img.url}`}
                              alt={`Miniatura ${idx + 1}`}
                              className="w-full h-full object-contain p-1 mix-blend-multiply bg-white"
                            />
                          </button>
                        ))}
                      </div>
                    )}

                  <div className="relative flex-grow bg-white border border-gray-100 rounded-2xl overflow-hidden p-6 flex items-center justify-center min-h-[250px] sm:min-h-0">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={imagenActiva}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        src={
                          productoSeleccionado.imagenes &&
                          productoSeleccionado.imagenes[imagenActiva]
                            ? `${backendUrl}${productoSeleccionado.imagenes[imagenActiva].url}`
                            : "/images/default.png"
                        }
                        alt={productoSeleccionado.nombre}
                        className="absolute inset-0 w-full h-full object-contain mix-blend-multiply p-4"
                      />
                    </AnimatePresence>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">
                  Descripción
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {productoSeleccionado.descripcion}
                </p>
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col bg-gray-50/50 overflow-y-auto">
                <div className="flex flex-col mb-6 mt-4 md:mt-0">
                  <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2 pr-8">
                    {productoSeleccionado.nombre}
                  </h2>

                  {productoSeleccionado.sku && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 font-bold uppercase tracking-wider bg-gray-200 px-2 py-1 rounded-md">
                        REF / SKU
                      </span>

                      <span className="text-sm font-bold text-gray-800">
                        {productoSeleccionado.sku}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                    Características Principales
                  </h3>

                  <ul className="space-y-3">
                    {productoSeleccionado.caracteristicas &&
                    productoSeleccionado.caracteristicas.length > 0 ? (
                      productoSeleccionado.caracteristicas.map(
                        (caracteristica, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-sm text-gray-700"
                          >
                            <span className="mr-3 text-orange-500 font-black mt-0.5">
                              •
                            </span>

                            <span className="leading-snug">
                              {caracteristica}
                            </span>
                          </li>
                        )
                      )
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        No hay especificaciones técnicas detalladas para este
                        producto.
                      </p>
                    )}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <a
                    href={`https://wa.me/51924338443?text=Hola%20SEINVISAC,%20deseo%20cotizar%20el%20siguiente%20producto:%20${encodeURIComponent(
                      productoSeleccionado.nombre
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-extrabold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    <MessageCircle size={24} />
                    Cotizar por WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <a
        href="https://wa.me/51924338443?text=Hola%20SEINVISAC,%20deseo%20informaci%C3%B3n%20sobre%20sus%20productos."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1"
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
      <Footer />
    </>
  );
}