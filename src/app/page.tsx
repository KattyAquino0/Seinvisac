"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AliadosCarousel from "@/components/AliadosCarousel";
import VideoCarousel from "@/components/VideoCarousel";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ChevronLeft, ChevronRight, ArrowRight, X } from "lucide-react"; 

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
  
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [imagenActiva, setImagenActiva] = useState<number>(0);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

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

    if (!scrollRef.current || destacados.length === 0 || productoSeleccionado) return;
    
    const interval = setInterval(() => {
      const container = scrollRef.current;
      if (container) {
        if (container.matches(':hover')) return;

        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 382, behavior: 'smooth' }); 
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
    return () => { document.body.style.overflow = "unset"; };
  }, [productoSeleccionado]);

  const scrollManual = (direccion: "izq" | "der") => {
    if (scrollRef.current) {
      const scrollAmount = 382;
      scrollRef.current.scrollBy({
        left: direccion === "izq" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <Header />
      <main>
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
                  className="bg-[#F5F5F5] text-[#E17B48] px-4 py-2 rounded-md inline-block text-sm font-semibold"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  ⭐ Equipos de Protección Personal
                </motion.div>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Bienvenido a <br />
                  <span className="text-[#E17B48]">SEINVISAC</span>, tu aliado <br />
                  en seguridad
                </h1>
                <p className="text-lg max-w-md text-gray-200">
                  Empresa especializada en equipos de protección personal y fabricación
                  de botines de seguridad industrial con más de 10 años de experiencia
                  en el mercado.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-0">
          <AliadosCarousel />
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                  Sobre SEINVISAC
                </h2>
                <p className="text-gray-600 mb-4">
                  Empresa especializada en equipos de protección personal y fabricación de botines 
                  de seguridad industrial.
                </p>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-orange-500 mb-4">
                    ¿Quiénes Somos?
                  </h3>
                  <p className="text-gray-600">
                    SEINVISAC es una empresa comprometida con la seguridad laboral, especializada en la venta, 
                    distribución y fabricación de equipos de protección, en particular en la fabricación de botines de 
                    seguridad industrial de alta calidad.
                  </p>
                  <motion.button
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Conoce más
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/Images/image1.png"
                  alt="Safety boots manufacturing"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </div>
          </div>
        </section>


        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 },
                },
              }}
            >
              {[
                { title: "Protección Garantizada", desc: "Equipos de protección personal certificados que garantizan la seguridad de tu equipo de trabajo." },
                { title: "Fabricación Especializada", desc: "Somos especialistas en la fabricación propia de botines de seguridad industrial de alta calidad." },
                { title: "Experiencia Comprobada", desc: "Más de 15 años de experiencia en el sector industrial." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                  variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                >
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>


        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 mb-6">
            <motion.h2
              className="text-3xl font-extrabold text-gray-900 mb-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Productos Destacados
            </motion.h2>
            <motion.p
              className="text-gray-600 text-center max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Descubre algunos de nuestros productos más populares en equipos de protección personal y botines de seguridad industrial.
            </motion.p>
          </div>

          {destacados.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Cargando catálogo destacado...</p>
          ) : (
            <div className="container mx-auto px-4 relative group">
              
              <button 
                onClick={() => scrollManual('izq')} 
                className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl text-orange-500 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-orange-50 hover:scale-110"
              >
                <ChevronLeft size={28} />
              </button>

              <div 
                className="overflow-hidden relative"
                style={{ 
                  maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', 
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' 
                }}
              >
                <div 
                  ref={scrollRef}
                  className="flex gap-8 px-4 py-4 overflow-x-auto snap-x snap-mandatory scroll-smooth"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
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
                          className={`absolute inset-0 object-contain w-full h-full mix-blend-multiply p-4 transition-all duration-700 
                            ${producto.imagenes && producto.imagenes.length > 1 ? 'group-hover/card:opacity-0 group-hover/card:scale-95' : 'group-hover/card:scale-110'}
                          `}
                        />
                        {producto.imagenes && producto.imagenes.length > 1 && (
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
                        <h4 className="text-lg font-semibold text-gray-900 line-clamp-1">{producto.nombre}</h4>
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2 mb-4">{producto.descripcion}</p>
                        <button className="mt-auto bg-white border border-gray-300 text-gray-700 group-hover/card:bg-orange-500 group-hover/card:text-white group-hover/card:border-orange-500 font-semibold px-4 py-2 rounded-xl transition-all duration-300 w-full shadow-sm">
                          Vista rápida
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => scrollManual('der')} 
                className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl text-orange-500 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-orange-50 hover:scale-110"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          )}

          <div className="flex justify-center mt-12 mb-4">
            <Link 
              href="/productos" 
              className="flex items-center gap-2 bg-orange-500 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-orange-600 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              Explorar más productos <ArrowRight size={20} />
            </Link>
          </div>
        </section>


        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                  Fabricantes de Botines
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Nos especializamos en la fabricación de botines de seguridad industrial. 
                  Nuestro proceso garantiza productos de alta calidad que cumplen con 
                  todas las normativas de seguridad.
                </p>
                <ul className="space-y-4">
                  {[
                    "Fabricación propia de botines de seguridad",
                    "Control de calidad en cada etapa",
                    "Certificaciones de seguridad industrial",
                    "Precios competitivos directos de fábrica",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-500 font-bold">✓</span>
                      </div>
                      <span className="text-gray-700 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="row-span-2 rounded-xl overflow-hidden shadow-md">
                  <img src="/Images/botin3.jpg" alt="Botín de seguridad" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md">
                  <img src="/Images/botin1.png" alt="Botín en producción" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md">
                  <img src="/Images/botin2.jpg" alt="Botines en fábrica" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-12">
            <motion.h3
              className="text-3xl font-extrabold text-gray-900 text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              ¿Por qué elegirnos?
            </motion.h3>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
              }}
            >
              {[
                { title: "Fabricación Propia", desc: "Control total del proceso productivo para garantizar calidad y precios competitivos." },
                { title: "Seguridad Certificada", desc: "Cumplimos con todas las normativas de seguridad industrial." },
                { title: "Durabilidad Comprobada", desc: "Botines con materiales de alta resistencia, ideales para condiciones exigentes." },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex flex-col items-center text-center px-6"
                  variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                >
                  <div className="w-20 h-20 mb-6 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed max-w-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
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
                  {productoSeleccionado.imagenes && productoSeleccionado.imagenes.length > 1 && (
                    <div 
                      className="flex flex-row sm:flex-col gap-3 overflow-auto sm:w-20 shrink-0 pb-2 sm:pb-0 sm:pr-2 scroll-smooth"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                      {productoSeleccionado.imagenes.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setImagenActiva(idx)}
                          className={`relative w-16 sm:w-full aspect-square rounded-xl border-2 overflow-hidden transition-all duration-300 shrink-0 ${
                            imagenActiva === idx ? 'border-orange-500 shadow-md scale-105' : 'border-gray-100 hover:border-orange-300 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={`${backendUrl}${img.url}`} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-contain p-1 mix-blend-multiply bg-white" />
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
                          productoSeleccionado.imagenes && productoSeleccionado.imagenes[imagenActiva]
                            ? `${backendUrl}${productoSeleccionado.imagenes[imagenActiva].url}`
                            : "/images/default.png"
                        }
                        alt={productoSeleccionado.nombre}
                        className="absolute inset-0 w-full h-full object-contain mix-blend-multiply p-4"
                      />
                    </AnimatePresence>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">Descripción</h3>
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
                      <span className="text-sm font-bold text-gray-800">{productoSeleccionado.sku}</span>
                    </div>
                  )}
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Características Principales</h3>
                  <ul className="space-y-3">
                    {productoSeleccionado.caracteristicas && productoSeleccionado.caracteristicas.length > 0 ? (
                      productoSeleccionado.caracteristicas.map((caracteristica, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <span className="mr-3 text-orange-500 font-black mt-0.5">•</span>
                          <span className="leading-snug">{caracteristica}</span>
                        </li>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic">No hay especificaciones técnicas detalladas para este producto.</p>
                    )}
                  </ul>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <a
                    href={`https://wa.me/51924338443?text=Hola%20SEINVISAC,%20deseo%20cotizar%20el%20siguiente%20producto:%20${encodeURIComponent(productoSeleccionado.nombre)}`}
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