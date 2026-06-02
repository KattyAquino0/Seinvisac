"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const aliados = [
  { src: "/Images/lg1.png", alt: "3M" },
  { src: "/Images/lg2.png", alt: "MSA" },
  { src: "/Images/lg4.png", alt: "STEELPRO SAFETY" },
  { src: "/Images/lg5-.png", alt: "3M" },
  { src: "/Images/lg6.png", alt: "SHOWA" },
  { src: "/Images/lg7.png", alt: "SHOWA" },
  { src: "/Images/lg8.png", alt: "SHOWA" },
  { src: "/Images/lg9.png", alt: "SHOWA" },
  { src: "/Images/lg10.png", alt: "SHOWA" },
];

export default function AliadosCarousel() {
  // Duplicamos el arreglo para la ilusión óptica del bucle infinito
  const duplicatedAliados = [...aliados, ...aliados];

  return (
    // [SENSEI TIP]: Quitamos el overflow-hidden de la sección para que no restrinja los bordes de la pantalla.
    <section className="bg-white w-full py-6">
      
      {/* [SENSEI TIP]: Pasamos el overflow-hidden al 'container'. 
          Además, aplicamos mask-image. Esto crea un efecto donde el 10% izquierdo y derecho 
          del contenedor se vuelven transparentes, desvaneciendo los logos al entrar y salir. */}
      <div 
        className="container mx-auto px-4 overflow-hidden relative"
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', 
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' 
        }}
      >
        <div className="relative w-full flex group py-2">
          <motion.div
            className="flex gap-6 px-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {duplicatedAliados.map((aliado, index) => (
              <div
                key={index}
                className="border border-gray-200 bg-white rounded-2xl shadow-sm p-4 flex items-center justify-center w-40 h-20 hover:shadow-md transition-shadow shrink-0"
              >
                <Image
                  src={aliado.src}
                  alt={aliado.alt}
                  width={100}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}