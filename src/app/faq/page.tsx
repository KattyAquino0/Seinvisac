"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react"; // 👈 cambiamos los iconos
import Header from "../../components/Header";
import Footer from "@/components/Footer";

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (index: string) => {
    setOpen(open === index ? null : index);
  };

  const faqs = [
    {
      category: "Productos y Servicios",
      items: [
        {
          q: "¿Qué tipos de equipos de protección personal ofrecen?",
          a: "Ofrecemos una amplia gama de EPP incluyendo botines de seguridad (nuestra especialidad como fabricantes), guantes de diferentes tipos, protección visual, ropa de seguridad y más. Consulta nuestro catálogo completo para ver todos los productos disponibles."
        },
        {
          q: "¿Fabrican sus propios botines de seguridad?",
          a: "Sí, somos fabricantes directos de botines de seguridad industrial. Esto nos permite ofrecer productos de alta calidad con precios competitivos, control total sobre el proceso de producción y opciones de personalización según las necesidades específicas de nuestros clientes."
        },
        {
          q: "¿Todos sus productos cuentan con certificaciones?",
          a: "Absolutamente. Todos nuestros productos, especialmente nuestros botines de fabricación propia, cumplen con las normativas de seguridad industrial y cuentan con las certificaciones correspondientes."
        }
      ]
    },
    {
      category: "Pedidos y Ventas",
      items: [
        {
          q: "¿Realizan ventas al por mayor?",
          a: "Sí, ofrecemos precios especiales para pedidos al por mayor. Como fabricantes directos, podemos ofrecer condiciones muy competitivas para empresas que requieren grandes cantidades. Contáctanos para una cotización personalizada."
        },
        {
          q: "¿Cuál es el pedido mínimo?",
          a: "El pedido mínimo es de 10 unidades en productos seleccionados."
        },
        {
          q: "¿Cómo puedo hacer un pedido?",
          a: "Puedes realizar pedidos a través de nuestro formulario de contacto, por teléfono, WhatsApp o visitando nuestras instalaciones. Nuestro equipo te ayudará con todo el proceso y te proporcionará una cotización detallada."
        }
      ]
    },
    {
      category: "Pagos y Garantías",
      items: [
        {
          q: "¿Qué métodos de pago aceptan?",
          a: "Aceptamos transferencias bancarias, Yape, Plin y tarjetas de crédito/débito."
        },
        {
          q: "¿Ofrecen garantía en sus productos?",
          a: "Sí, todos nuestros productos cuentan con garantía contra defectos de fábrica."
        }
      ]
    }
  ];

  return (
    <>
      <Header />
      <div className="bg-white py-16 px-6 sm:px-10 lg:px-20">
        <motion.h2
          className="text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-black">Preguntas</span>{" "}
          <span className="text-orange-500">Frecuentes</span>
        </motion.h2>
        <motion.p
          className="text-gray-600 text-center mb-12 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios
        </motion.p>
        <div className="max-w-4xl mx-auto space-y-10">
          {faqs.map((section, sIdx) => (
            <motion.div
              key={sIdx}
              className="shadow-lg rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-orange-500 text-white px-4 py-4 font-semibold text-lg">
                {section.category}
              </div>
              <div className="divide-y">
                {section.items.map((item, iIdx) => {
                  const index = `${sIdx}-${iIdx}`;
                  const isOpen = open === index;
                  return (
                    <div key={iIdx} className="bg-white">
                      <button
                        onClick={() => toggle(index)}
                        className="w-full flex justify-between items-center px-5 py-4 text-left text-gray-800 font-medium"
                      >
                        <span>{item.q}</span>
                        {isOpen ? (
                          <Minus className="text-orange-500 w-5 h-5" /> // 👈 cuando abre
                        ) : (
                          <Plus className="text-orange-500 w-5 h-5" /> // 👈 cuando cierra
                        )}
                      </button>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={
                          isOpen
                            ? { height: "auto", opacity: 1 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 text-gray-600 text-sm md:text-base">
                          {item.a}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-10 mt-12 text-center max-w-3xl mx-auto shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl md:text-2xl font-bold mb-0">
            ¿No encontraste tu respuesta?
          </h3>
          <p className="text-gray-300 mb-6">
            Contáctanos directamente y nuestro equipo te ayudará con cualquier consulta específica
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md">
              Contactar Ahora
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold px-6 py-3 rounded-lg transition shadow-md">
              Ver Productos
            </button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
