"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import Link from 'next/link';

export function Hero() {
  const images = [
    "/images/cvm1.jpg",
    "/images/cvm2.png",
    "/images/cvm3.jpg",
    "/images/cvm4.jpg",
    "/images/cvm5.jpg",
    "/images/lettrem1.jpg",
    "/images/lettrem2.jpg",
    "/images/lettrem3.jpg",
    "/images/lettrem4.jpg",
    "/images/lettrem5.jpg",
    "/images/cvm1.jpg",
    "/images/cvm2.png",
    "/images/cvm3.jpg",
    "/images/cvm4.jpg",
    "/images/cvm5.jpg",
    "/images/lettrem1.jpg",
    "/images/lettrem2.jpg",
    "/images/lettrem3.jpg",
    "/images/lettrem4.jpg",
    "/images/lettrem5.jpg",
    "/images/cvm1.jpg",
    "/images/cvm2.png",
    "/images/cvm3.jpg",
    "/images/cvm4.jpg",
    "/images/cvm5.jpg",
    "/images/lettrem1.jpg",
    "/images/lettrem2.jpg",
    "/images/lettrem3.jpg",
    "/images/lettrem4.jpg",
    "/images/lettrem5.jpg",
    "/images/cvm1.jpg",
    "/images/cvm2.png",
    "/images/cvm3.jpg",
    "/images/cvm4.jpg",
    "/images/cvm5.jpg",
    "/images/lettrem1.jpg",
    "/images/lettrem2.jpg",
    "/images/lettrem3.jpg",
    "/images/lettrem4.jpg",
    "/images/lettrem5.jpg",
    "/images/cvm1.jpg",
    "/images/cvm2.png",
    "/images/cvm3.jpg",
    "/images/cvm4.jpg",
    "/images/cvm5.jpg",
    "/images/lettrem1.jpg",
    "/images/lettrem2.jpg",
    "/images/lettrem3.jpg",
    "/images/lettrem4.jpg",
    "/images/lettrem5.jpg",
    "/images/cvm1.jpg",
    "/images/cvm2.png",
    "/images/cvm3.jpg",
    "/images/cvm4.jpg",
    "/images/cvm5.jpg",
    "/images/lettrem1.jpg",
    "/images/lettrem2.jpg",
    "/images/lettrem3.jpg",
    "/images/lettrem4.jpg",
    "/images/lettrem5.jpg",
    "/images/cvm1.jpg",
    "/images/cvm2.png",
    "/images/cvm3.jpg",
    "/images/cvm4.jpg",
    "/images/cvm5.jpg",
    "/images/lettrem1.jpg",
    "/images/lettrem2.jpg",
    "/images/lettrem3.jpg",
    "/images/lettrem4.jpg",
    "/images/lettrem5.jpg",
    "/images/cvm1.jpg",
    "/images/cvm2.png",
    "/images/cvm3.jpg",
    "/images/cvm4.jpg",
    "/images/cvm5.jpg",
    "/images/lettrem1.jpg",
    "/images/lettrem2.jpg",
    "/images/lettrem3.jpg",
    "/images/lettrem4.jpg",
    "/images/lettrem5.jpg",
    "/images/cvm1.jpg",
    "/images/cvm2.png",
    "/images/cvm3.jpg",
    "/images/cvm4.jpg",
    "/images/cvm5.jpg",
    "/images/lettrem1.jpg",
    "/images/lettrem2.jpg",
    "/images/lettrem3.jpg",
    "/images/lettrem4.jpg",
    "/images/lettrem5.jpg",
    
  ];

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Contenu principal */}
      <div className="relative z-20 w-full px-4">
        <h2 className="mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
          Créez des CV et lettres de motivation qui font{" "}
          <span className="inline-block rounded-xl bg-blue-500/40 px-4 py-1 text-white underline decoration-sky-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
            impression
          </span>{" "}
        </h2>
        <p className="mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
          Démarquez-vous auprès des recruteurs avec des documents professionnels personnalisés.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/sign-up">
            <button className="rounded-md bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
              Commencer gratuitement
            </button>
          </Link>
          <Link href="/cv-templates">
            <button className="rounded-md border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
              Voir les modèles
            </button>
          </Link>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-black/80" />
      
      {/* Conteneur pour le marquee avec hauteur et largeur fixes */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <ThreeDMarquee
          className="h-full w-full"
          images={images}
        />
      </div>
    </div>
  );
}