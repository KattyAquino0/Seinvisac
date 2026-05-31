"use client";
import Header from "../../components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect, useMemo } from "react";
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

const categorias = [
  { id: "Todos", nombre: "Todos los Productos" },
  { id: "Protección corporal", nombre: "Protección corporal" },
  { id: "Protección de manos", nombre: "Protección de manos" },
  { id: "Protección auditiva", nombre: "Protección auditiva" },
  { id: "Protección visual", nombre: "Protección visual" },
  { id: "Protección respiratoria", nombre: "Protección respiratoria" },
  { id: "Zapato de seguridad", nombre: "Zapato de seguridad" },
  { id: "Protección de cabeza", nombre: "Protección de cabeza" },
  { id: "Guantes industriales", nombre: "Guantes industriales" },
];

export default function Productos() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  // [SENSEI TIP]: Instanciamos la variable de entorno fuera del useEffect para que esté disponible en todo el componente (ej. para las imágenes).
  // El fallback ("http://localhost:5000") previene que la app crashee si olvidas crear el .env, pero en producción tomará el valor real.
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // [SENSEI TIP]: Inyección dinámica de la URL. Ahora el código es agnóstico al entorno.
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
  }, [backendUrl]); // [SENSEI TIP]: Se añade backendUrl al array de dependencias por buenas prácticas de React.

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
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10">
          <aside className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-20">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Categorías
            </h3>
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
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Catálogo de Productos
              </h2>
              <p className="text-gray-600 text-lg">
                Equipos de protección personal y artículos industriales de alta calidad
              </p>
            </div>
            
            {loading ? (
              <p className="text-gray-500 mt-10">Cargando productos...</p>
            ) : (
              <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {productosFiltrados.length === 0 ? (
                  <p className="text-gray-500 col-span-full text-center">
                    No hay productos en esta categoría.
                  </p>
                ) : (
                  productosFiltrados.map((producto) => (
                    <motion.div
                      key={producto.id}
                      className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="relative h-56 w-full overflow-hidden rounded-t-2xl">
                        <img
                          src={
                            producto.imagenes && producto.imagenes[0]
                              // [SENSEI TIP]: Reemplazamos el localhost duro por nuestra variable dinámica.
                              ? `${backendUrl}${producto.imagenes[0].url}`
                              : "/images/default.png"
                          }
                          alt={producto.nombre}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {producto.nombre}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                          {producto.descripcion}
                        </p>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
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
      <Footer />
    </>
  );
}