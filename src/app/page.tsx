"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AliadosCarousel from "@/components/AliadosCarousel";
import VideoCarousel from "@/components/VideoCarousel";
import { motion } from "framer-motion";

interface Imagen {
  url: string;
}

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  imagenes: Imagen[];
}

export default function Home() {
  const [destacados, setDestacados] = useState<Producto[]>([]);
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
              <div className="space-y-6 text-white">
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

        <motion.section
          className="py-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <AliadosCarousel />
        </motion.section>

        <section className="py-4 bg-white">
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
                  className="rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-4 bg-white">
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
                  className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
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

        <section className="py-12 bg-white overflow-hidden">
          <div className="container mx-auto px-6 mb-10">
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

            <div className="relative w-full flex group">
              <motion.div
                className="flex gap-8 px-4 w-max"

                animate={{ x: ["0%", "-50%"] }}

                transition={{ ease: "linear", duration: 40, repeat: Infinity }}
              >

                {[...destacados, ...destacados].map((producto, index) => (
                  <div
                    key={`${producto.id}-${index}`}
                    
                    className="w-[350px] shrink-0 p-6 bg-gray-50 rounded-2xl border-2 border-transparent shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-orange-500 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-48 bg-white rounded-xl flex items-center justify-center mb-4 overflow-hidden p-4">
                      <img
                        src={
                          producto.imagenes && producto.imagenes[0]
                            ? `${backendUrl}${producto.imagenes[0].url}`
                            : "/images/default.png"
                        }
                        alt={producto.nombre}
                        className="object-contain w-full h-full mix-blend-multiply transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1 block">
                      {producto.categoria}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-900 line-clamp-1">{producto.nombre}</h4>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{producto.descripcion}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          )}
        </section>


        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-6 lg:px-12">
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
                  <img src="/images/botin3.jpg" alt="Botín de seguridad" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md">
                  <img src="/images/botin1.png" alt="Botín en producción" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md">
                  <img src="/images/botin2.jpg" alt="Botines en fábrica" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
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
      <Footer />
    </>
  );
}