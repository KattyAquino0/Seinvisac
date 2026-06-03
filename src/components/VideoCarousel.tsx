"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videos: string[] = [
  "/Images/vid1.mp4",
  "/Images/vid2.mp4",
  "/Images/vid3.mp4",
  "/Images/vid4.mp4",
];

export default function VideoCarousel() {
  const [current, setCurrent] = useState<number>(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      
      if (index === current) {
        // Reproducimos el video actual desde el inicio
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        // [SENSEI TIP]: La magia del Crossfade.
        // En lugar de pausarlo y resetearlo de inmediato, le damos 700ms 
        // para que termine su transición de opacidad. Así evitamos el "salto".
        setTimeout(() => {
          video.pause();
        }, 700);
      }
    });
  }, [current]);

  const prevVideo = () => {
    setCurrent((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const nextVideo = () => {
    setCurrent((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  return (
    // Fondo negro para que el cruce de opacidades se vea elegante
    <div className="relative h-[32rem] w-full overflow-hidden bg-black">
      {videos.map((video, index) => (
        <video
          key={index}
          ref={(el) => {
            videoRefs.current[index] = el ?? null;
          }}
          // [SENSEI TIP]: Quitamos el 'loop' y usamos onEnded. 
          // Cuando un video termine naturalmente, llamará a nextVideo.
          onEnded={nextVideo}
          muted
          playsInline
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 z-0 pointer-events-none ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={video} type="video/mp4" />
        </video>
      ))}
      
      <button
        onClick={prevVideo}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition pointer-events-auto"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextVideo}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition pointer-events-auto"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition ${
              index === current ? "bg-white scale-110" : "bg-white/50 hover:bg-white/80"
            } pointer-events-auto`}
            aria-label={`Ir al video ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}