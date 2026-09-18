"use client";
import Header from "../../components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react"; 

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

const categorias = [
  { id: "Todos", nombre: "Todos los Productos" },
  { id: "Protección corporal", nombre: "Protección corporal" },
  { id: "Protección de manos", nombre: "Protección de manos" },
  { id: "Protección auditiva", nombre: "Protección auditiva" },
  { id: "Protección visual", nombre: "Protección visual" },
  { id: "Protección respiratoria", nombre: "Protección respiratoria" },
  { id: "Zapato de seguridad", nombre: "Zapato de seguridad" },
  { id: "Protección de cabeza", nombre: "Protección de cabeza" },
];

export default function Productos() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  

  const [imagenActiva, setImagenActiva] = useState<number>(0);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/productos`);
        
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }

        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductos();
  }, [backendUrl]); 


  useEffect(() => {
    if (productoSeleccionado) {
      document.body.style.overflow = "hidden";
      setImagenActiva(0); 
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [productoSeleccionado]);

  const productosFiltrados = useMemo(() => {
    if (categoriaActiva === "Todos") return productos;
    const cat = categoriaActiva.trim().toLowerCase();
    return productos.filter(
      (p) => p.categoria?.trim().toLowerCase() === cat
    );
  }, [categoriaActiva, productos]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-12 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10">
          
          <aside className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-20 z-10">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Categorías</h3>
            <ul className="space-y-2">
              {categorias.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setCategoriaActiva(cat.id)}
                    className={`w-full text-left px-4 py-2 rounded-xl transition-all duration-200 ${
                      categoriaActiva === cat.id
                        ? "bg-blue-600 text-white font-semibold shadow-sm"
                        : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    {cat.nombre}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <section>
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-800">Catálogo de Productos</h2>
              <p className="text-gray-600 text-lg">
                Equipos de protección personal y artículos industriales de alta calidad
              </p>
            </div>
            
            {loading ? (
              <p className="text-gray-500 mt-10 font-medium animate-pulse">Cargando catálogo...</p>
            ) : (
              <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {productosFiltrados.length === 0 ? (
                  <p className="text-gray-500 col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                    No hay productos disponibles en esta categoría por el momento.
                  </p>
                ) : (
                  productosFiltrados.map((producto) => (
                    <motion.div
                      key={producto.id}
                      onClick={() => setProductoSeleccionado(producto)}
                      className="group bg-white rounded-2xl shadow-md border-2 border-transparent hover:border-orange-500 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
                      whileHover={{ y: -5 }}
                    >

                      <div className="relative h-56 w-full p-4 overflow-hidden rounded-t-2xl bg-white flex-shrink-0">

                        <img
                          src={
                            producto.imagenes && producto.imagenes[0]
                              ? `${backendUrl}${producto.imagenes[0].url}`
                              : "/images/default.png"
                          }
                          alt={producto.nombre}
                          className={`absolute inset-0 object-contain w-full h-full mix-blend-multiply p-4 transition-all duration-700 
                            ${producto.imagenes && producto.imagenes.length > 1 ? 'group-hover:opacity-0 group-hover:scale-95' : 'group-hover:scale-110'}
                          `}
                        />

                        {producto.imagenes && producto.imagenes.length > 1 && (
                          <img
                            src={`${backendUrl}${producto.imagenes[1].url}`}
                            alt={`${producto.nombre} - vista alternativa`}
                            className="absolute inset-0 object-contain w-full h-full mix-blend-multiply p-4 opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700"
                          />
                        )}
                      </div>
                      
                      <div className="p-5 flex flex-col flex-grow bg-gray-50/50 rounded-b-2xl border-t border-gray-100">
                        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-2 block">
                          {producto.categoria}
                        </span>
                        <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
                          {producto.nombre}
                        </h3>
                        <button className="mt-auto bg-white border border-gray-300 text-gray-700 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 font-semibold px-4 py-2 rounded-xl transition-all duration-300 w-full shadow-sm">
                          Ver detalles
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
          </section>
        </div>
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