"use client";
import { useState } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "@/components/Footer";

export default function contacto() {
 
  return (
    <>
      <Header />
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold text-center mb-4 text-gray-900">
            Contáctanos
          </h2>
          <p className="text-gray-700 text-center text-md">
            Estamos aquí para ayudarte con cualquier consulta sobre nuestros productos
          </p>
        </div>
        <div className="grid-cols-2 grid gap-4 mt-10">
          <div className="px-20">
            <h2 className="text-xl font-bold text-gray-800">Envíanos un Mensaje</h2>
            
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Información de Contacto</h2>
            <p className="text-md text-gray-600">Estamos disponibles para atender tus consultas de lunes a viernes de 8:00 AM a 6:00 PM.</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
