
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CarFront, Home } from "lucide-react";
import { BUSINESS_NAME } from "@/lib/business";

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#171717] text-white">

      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-40 -top-40 h-[550px] w-[550px] rounded-full border border-white/[0.05]" />
        <div className="absolute -right-20 -top-20 h-[350px] w-[350px] rounded-full border border-white/[0.05]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-red-600/[0.04] blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex h-20 items-center justify-between border-b border-white/[0.07] px-6 sm:px-10 lg:px-16">
        <Link
          href="/"
          aria-label={`Inicio de ${BUSINESS_NAME}`}
          className="flex items-center gap-3"
        >
          <Image
            src="/logo.svg"
            alt=""
            width={42}
            height={42}
            className="h-9 w-auto brightness-0 invert"
          />
          <span className="font-montserrat text-sm font-bold tracking-wide">
            {BUSINESS_NAME}
          </span>
        </Link>

        <span className="hidden font-montserrat text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35 sm:block">
          Excelencia automotriz
        </span>

        <Link
          href="/"
          className="flex items-center gap-2 font-montserrat text-xs font-semibold text-white/70 transition-colors hover:text-red-500"
        >
          <ArrowLeft size={15} />
          Inicio
        </Link>
      </header>

      {/* Main */}
      <section className="relative z-10 flex flex-1 items-center px-6 py-16 sm:px-10 lg:px-16">

        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">

          {/* Left: 404 */}
          <div className="relative">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-red-600" />
              <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
                Error 404
              </span>
            </div>

            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-2 top-3 select-none font-bebas text-[clamp(180px,30vw,420px)] leading-[0.75] text-white/[0.035]"
              >
                404
              </span>

              <h1 className="relative select-none font-bebas text-[clamp(180px,30vw,420px)] leading-[0.75] tracking-tight text-white">
                4<span className="text-red-600">0</span>4
              </h1>
            </div>

            <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-red-500">
                <CarFront size={23} strokeWidth={1.5} />
              </div>

              <div>
                <p className="font-montserrat text-xs font-semibold text-white/80">
                  ¿Te equivocaste de camino?
                </p>
                <p className="mt-1 font-montserrat text-[10px] text-white/35">
                  Este camino no lleva a ninguna parte.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="max-w-lg lg:ml-auto">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.07] px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              <span className="font-montserrat text-[9px] font-bold uppercase tracking-[0.2em] text-red-400">
                Página no disponible
              </span>
            </div>

            <h2 className="font-bebas text-5xl leading-[1.05] tracking-wide sm:text-6xl lg:text-7xl">
              Parece que
              <br />
              tomaste un
              <br />
              <span className="text-red-600">camino equivocado.</span>
            </h2>

            <p className="mt-6 max-w-sm font-montserrat text-sm leading-7 text-white/45">
              La página que buscas no existe, se ha movido o no está disponible
              temporalmente. Volvamos al camino.
            </p>

            {/* Actions */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="group flex items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-4 font-montserrat text-xs font-bold uppercase tracking-wide transition-all hover:bg-red-700"
              >
                <Home size={16} />
                Volver al inicio
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/cars"
                className="flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-6 py-4 font-montserrat text-xs font-bold uppercase tracking-wide text-white/80 transition-all hover:border-white/25 hover:bg-white/[0.08]"
              >
                Ver vehículos
                <ArrowUpRight size={15} />
              </Link>
            </div>

            {/* Bottom note */}
            <div className="mt-12 flex items-center gap-3">
              <div className="h-px w-8 bg-white/20" />
              <span className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30">
                Tu próximo viaje empieza aquí
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] px-6 py-5 sm:flex-row sm:px-10 lg:px-16">
        <span className="font-montserrat text-[9px] uppercase tracking-[0.18em] text-white/30">
          © {new Date().getFullYear()} {BUSINESS_NAME}
        </span>

        <span className="font-montserrat text-[9px] uppercase tracking-[0.18em] text-white/30">
          Preparados para el camino que viene.
        </span>
      </footer>
    </main>
  );
}
