"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Send, MessageCircle  } from "lucide-react";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejador de cambios en los inputs (Vincular estado con UI)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setIsSubmitting(true);

    // Aquí luego conectaremos la API real
    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert(
      "¡Gracias por contactarnos! Te responderemos en menos de 24 horas."
    );

    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      asunto: "",
      mensaje: "",
    });
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al enviar la consulta.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-10 md:py-13 selection:bg-blue-500 selection:text-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-10 md:mb-16">
          <span className="text-blue-600 font-bold text-sm tracking-wider uppercase bg-blue-50 px-3 py-0 rounded-full">
            Contacto directo
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4 tracking-tight">
            Estamos listos para ayudarte
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            ¿Tienes dudas sobre nuestros equipos de protección o necesitas un presupuesto corporativo? Escríbenos y te responderemos en breve.
          </p>
        </div>
        <div className="max-w-6xl -py-6 px-6 md:px-9 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              Envíanos un Mensaje
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Los campos marcados con asterisco (*) son obligatorios.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="juan@empresa.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-sm"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+51 999 999 999"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Asunto *
                  </label>
                  <input
                    type="text"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    placeholder="Ej. Cotización de Guantes"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Mensaje o Consulta *
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Escribe detalladamente lo que necesitas..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-sm resize-none default-scroll"
                  required
                ></textarea>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <span>Enviando...</span>
                  ) : (
                    <>
                      <span>Enviar Mensaje</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
                <a
                  href="https://wa.me/51924338443?text=Hola%20SEINVISAC,%20deseo%20informaci%C3%B3n%20sobre%20sus%20productos."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-green-500/20"
                >
                  <MessageCircle size={18} />
                  WhatsApp Directo
                </a>
              </div>
            </form>
          </div>
          <div className="lg:col-span-5 space-y-8 lg:pl-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Información de Contacto
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Nuestros asesores corporativos están listos para atender tus requerimientos comerciales de inmediato.
              </p>
            </div>
            <div className="space-y-4">
              <div className="group flex items-start gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-blue-900/10 flex items-center justify-center text-blue-900 shrink-0 group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
                  <Phone size={20} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Central Telefónica</h3>
                  <p className="text-gray-600 text-sm mt-1 font-medium">+51  924 338 443</p>
                  <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md mt-2 font-medium">
                    Lun - Vie, 8:00 AM - 6:00 PM
                  </span>
                </div>
              </div>
              <div className="group flex items-start gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <Mail size={20} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Soporte y Ventas</h3>
                  <a 
                    href="mailto:seinvisac@gmail.com" 
                    className="block text-blue-600 text-sm mt-1 font-semibold hover:underline"
                  >
                    seinvisac@gmail.com
                  </a>
                  <p className="text-gray-400 text-xs mt-1">Respuesta garantizada en menos de 24h</p>
                </div>
              </div>
              <div className="group flex items-start gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-blue-900/10 flex items-center justify-center text-blue-900 shrink-0 group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
                  <MapPin size={20} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Oficina Principal</h3>
                  <p className="text-gray-600 text-sm mt-1 font-medium">Lima, Perú</p>
                  <p className="text-gray-400 text-xs mt-1">Atención corporativa previa cita</p>
                </div>
              </div>

            </div>
          </div>
          <a
            href="https://wa.me/51924338443?text=Hola%20SEINVISAC,%20deseo%20informaci%C3%B3n%20sobre%20sus%20productos."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
            aria-label="WhatsApp"
          >
            <MessageCircle size={28} />
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}