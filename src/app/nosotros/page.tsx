"use client";
import Head from "next/head";
import Header from "../../components/Header";
import Fotter from "../../components/Footer";
import { Shield, Eye, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Nosotros() {
  return (
    <>
      <Header />
      <div className="bg-white py-16 px-6 sm:px-10 lg:px-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-extrabold text-gray-900"
        >
          Sobre SEINVISAC
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-base md:text-lg text-gray-600 mt-3 max-w-2xl mx-auto"
        >
          Conoce más sobre nuestra empresa especializada en equipos de protección personal
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8 max-w-6xl mx-auto items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-left space-y-6 mt-45"
          >
            <h2 className="text-gray-900 font-extrabold text-2xl md:text-3xl text-center md:text-left">
              Nuestra Historia
            </h2>
            <p className="text-gray-600 leading-relaxed text-justify text-sm md:text-base">
              SEINVISAC es una empresa peruana con más de 25 años de experiencia en la
              fabricación de equipos de protección personal, especializada en botines de
              seguridad industrial. Nos destacamos por ofrecer productos de alta calidad, con
              precios competitivos y control total sobre nuestros procesos. A lo largo de los
              años, hemos innovado continuamente para adaptarnos a las exigencias del sector
              industrial, minero y de construcción, cumpliendo con las normativas más rigurosas.
              Nuestro compromiso va más allá de la venta: protegemos vidas y fortalecemos la
              seguridad en el trabajo.
            </p>
          </motion.div>
          <div className="space-y-6">
            {[
              {
                icon: <Shield className="w-6 h-6 text-[#D77F4A]" />,
                title: "Misión",
                desc: "Proveer equipos de protección personal con altos estándares de calidad, garantizando la seguridad y bienestar de los trabajadores en sus actividades laborales."
              },
              {
                icon: <Eye className="w-6 h-6 text-[#D77F4A]" />,
                title: "Visión",
                desc: "Ser líderes en el sector de equipos de protección personal, innovando en productos que respondan a las necesidades del mercado y contribuyan al desarrollo de una cultura de seguridad laboral en el ámbito nacional e internacional."
              },
              {
                icon: <Star className="w-6 h-6 text-[#D77F4A]" />,
                title: "Valores",
                desc: (
                  <ul className="list-disc list-inside space-y-1 text-left">
                    <li>Calidad: Cumplimos con los más altos estándares.</li>
                    <li>Responsabilidad: La seguridad primero.</li>
                    <li>Innovación: Soluciones creativas y útiles.</li>
                    <li>Compromiso: Mejora continua en procesos.</li>
                    <li>Confianza: Relaciones sólidas y duraderas.</li>
                  </ul>
                )
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.2 }}
                className="bg-orange-100 rounded-2xl p-6 shadow-md hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <div className="flex items-center gap-3 mb-3">
                  {card.icon}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">{card.title}</h3>
                </div>
                {typeof card.desc === "string" ? (
                  <p className="text-gray-700 text-sm md:text-base text-left">{card.desc}</p>
                ) : (
                  <div className="text-gray-700 text-sm md:text-base text-left">{card.desc}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl p-6 md:p-9 mt-10 max-w-5xl mx-auto shadow-lg"
        >
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
            Nuestro Compromiso
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            En SEINVISAC entendemos que la seguridad laboral no es negociable. Por eso, cada
            producto que ofrecemos pasa por rigurosos controles de calidad y cumple con las
            normativas internacionales de seguridad industrial.
          </p>
        </motion.div>
      </div>
      <Fotter />
    </>
  );
}
