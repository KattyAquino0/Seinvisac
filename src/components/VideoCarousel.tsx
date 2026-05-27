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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === current) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [current]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const resetAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    }, 8000);
  };

  const prevVideo = () => {
    setCurrent((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
    resetAutoplay();
  };

  const nextVideo = () => {
    setCurrent((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    resetAutoplay();
  };

  return (
    <div className="relative h-[32rem] w-full overflow-hidden">
      {videos.map((video, index) => (
        <video
          key={index}
          ref={(el) => {
            videoRefs.current[index] = el ?? null;
          }}
          loop
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
            onClick={() => {
              setCurrent(index);
              resetAutoplay();
            }}
            className={`h-3 w-3 rounded-full transition ${
              index === current ? "bg-white" : "bg-white/50 hover:bg-white/80"
            } pointer-events-auto`}
            aria-label={`Ir al video ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
