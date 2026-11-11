
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  BUSINESS_LOCATION,
  BUSINESS_MAPS_URL,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_PHONE_LINK,
  BUSINESS_WHATSAPP_URL,
} from "@/lib/business";

const navigation = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Vehículos",
    href: "/cars",
  },
  {
    label: "Servicios",
    href: "/services",
  },
  {
    label: "Nosotros",
    href: "/about",
  },
  {
    label: "Contacto",
    href: "/contact",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#181818] text-white">
      {/* ======================================================
          TOP CTA
      ====================================================== */}

      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1800px] px-6 py-20 md:px-10 md:py-28 lg:px-14 lg:py-32">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            {/* TITLE */}

            <div>
              <motion.p
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.4,
                }}
                transition={{
                  duration: 0.45,
                }}
                className="mb-5 font-montserrat text-[9px] font-medium uppercase tracking-[0.35em] text-white/30 md:text-[10px]"
              >
                Tu próximo coche te espera
              </motion.p>

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.4,
                }}
                transition={{
                  duration: 0.65,
                  delay: 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-5xl font-bebas text-[clamp(4.5rem,10vw,10rem)] leading-[0.78] tracking-[-0.045em]"
              >
                Encuentra tu próximo
                <br />
                viaje.
              </motion.h2>
            </div>

            {/* CTA */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.5,
                delay: 0.15,
              }}
            >
              <Link
                href="/cars"
                className="group inline-flex items-center gap-4 border border-white bg-white px-7 py-4 font-montserrat text-[9px] font-medium uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-white md:px-8 md:py-5"
              >
                Ver vehículos

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ======================================================
          MAIN FOOTER
      ====================================================== */}

      <div className="mx-auto max-w-[1800px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-14 border-b border-white/10 py-16 md:grid-cols-2 md:gap-16 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.8fr] lg:py-20">
          {/* ==================================================
              BRAND
          ================================================== */}

          <div>
            <Link
              href="/"
              aria-label={`${BUSINESS_NAME} home`}
              className="inline-flex items-center gap-4 transition-opacity duration-300 hover:opacity-70"
            >
              <Image
                src="/logo.svg"
                alt=""
                width={64}
                height={64}
                className="h-14 w-fit object-contain brightness-0 invert"
              />
              <span className="font-bebas text-3xl tracking-[0.02em] md:text-4xl">
                {BUSINESS_NAME}
              </span>
            </Link>

            <p className="mt-5 max-w-sm font-montserrat text-[10px] leading-[1.9] tracking-[0.05em] text-white/30 md:text-[11px]">
              Vehículos excepcionales. Atención cuidada. Una selección para
              quienes esperan más de cada viaje.
            </p>
          </div>

          {/* ==================================================
              NAVIGATION
          ================================================== */}

          <div>
            <p className="mb-6 font-montserrat text-[9px] font-medium uppercase tracking-[0.3em] text-white/25">
              Explorar
            </p>

            <nav className="flex flex-col items-start">
              {navigation.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-3 py-1.5 font-montserrat text-[10px] uppercase tracking-[0.16em] text-white/55 transition-colors duration-300 hover:text-white md:text-[11px]"
                >
                  <span className="text-[8px] text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{item.label}</span>

                  <ArrowRight
                    size={12}
                    strokeWidth={1.2}
                    className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* ==================================================
              VISIT
          ================================================== */}

          <div>
            <p className="mb-6 font-montserrat text-[9px] font-medium uppercase tracking-[0.3em] text-white/25">
              Visítanos
            </p>

            <div className="space-y-5">
              <div>
                <p className="font-montserrat text-[9px] uppercase tracking-[0.16em] text-white/25">
                  Concesionario
                </p>

                <a
                  href={BUSINESS_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block font-montserrat text-[10px] leading-[1.7] tracking-[0.04em] text-white/55 transition-colors duration-300 hover:text-white"
                >
                  {BUSINESS_LOCATION}
                </a>
              </div>
            </div>
          </div>

          {/* ==================================================
              CONTACT
          ================================================== */}

          <div>
            <p className="mb-6 font-montserrat text-[9px] font-medium uppercase tracking-[0.3em] text-white/25">
              Contacto
            </p>

            <div className="space-y-4">
              <a
                href={`tel:${BUSINESS_PHONE_LINK}`}
                className="block font-montserrat text-[10px] tracking-[0.05em] text-white/55 transition-colors duration-300 hover:text-white md:text-[11px]"
              >
                {BUSINESS_PHONE}
              </a>

              <a
                href={BUSINESS_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-montserrat text-[10px] tracking-[0.05em] text-white/55 transition-colors duration-300 hover:text-white md:text-[11px]"
              >
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* ======================================================
            BOTTOM BAR
        ====================================================== */}

        <div className="flex flex-col gap-7 py-7 md:flex-row md:items-center md:justify-between md:py-8">
          {/* COPYRIGHT */}

          <p className="font-montserrat text-[8px] uppercase tracking-[0.18em] text-white/20">
            © {new Date().getFullYear()} {BUSINESS_NAME}.
          </p>

          {/* BACK TO TOP */}

          <button
            type="button"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="group flex cursor-pointer items-center gap-2 font-montserrat text-[8px] uppercase tracking-[0.18em] text-white/30 transition-colors duration-300 hover:text-white"
          >
            Volver arriba

            <ArrowUpRight
              size={13}
              strokeWidth={1.2}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
















// "use client";

// import Link from "next/link";
// import { ArrowUpRight, ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";

// const navigation = [
//   {
//     label: "Home",
//     href: "/",
//   },
//   {
//     label: "Cars",
//     href: "/cars",
//   },
//   {
//     label: "Services",
//     href: "/services",
//   },
//   {
//     label: "About",
//     href: "/about",
//   },
//   {
//     label: "Contact",
//     href: "/contact",
//   },
// ];

// export default function Footer() {
//   return (
//     <footer className="relative overflow-hidden bg-[#181818] text-white">
//       {/* ======================================================
//           TOP CTA
//       ====================================================== */}

//       <div className="border-b border-white/10">
//         <div className="mx-auto max-w-[1800px] px-6 py-20 md:px-10 md:py-28 lg:px-14 lg:py-32">
//           <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
//             {/* TITLE */}

//             <div>
//               <motion.p
//                 initial={{
//                   opacity: 0,
//                   y: 12,
//                 }}
//                 whileInView={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 viewport={{
//                   once: true,
//                   amount: 0.4,
//                 }}
//                 transition={{
//                   duration: 0.45,
//                 }}
//                 className="mb-5 font-montserrat text-[9px] font-medium uppercase tracking-[0.35em] text-white/30 md:text-[10px]"
//               >
//                 Your next car awaits
//               </motion.p>

//               <motion.h2
//                 initial={{
//                   opacity: 0,
//                   y: 35,
//                 }}
//                 whileInView={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 viewport={{
//                   once: true,
//                   amount: 0.4,
//                 }}
//                 transition={{
//                   duration: 0.65,
//                   delay: 0.05,
//                   ease: [0.22, 1, 0.36, 1],
//                 }}
//                 className="max-w-5xl font-bebas text-[clamp(4.5rem,10vw,10rem)] leading-[0.78] tracking-[-0.045em]"
//               >
//                 Find Your Next
//                 <br />
//                 Drive.
//               </motion.h2>
//             </div>

//             {/* CTA */}

//             <motion.div
//               initial={{
//                 opacity: 0,
//                 y: 20,
//               }}
//               whileInView={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               viewport={{
//                 once: true,
//                 amount: 0.4,
//               }}
//               transition={{
//                 duration: 0.5,
//                 delay: 0.15,
//               }}
//             >
//               <Link
//                 href="/cars"
//                 className="group inline-flex items-center gap-4 border border-white bg-white px-7 py-4 font-montserrat text-[9px] font-medium uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-white md:px-8 md:py-5"
//               >
//                 Explore inventory

//                 <ArrowUpRight
//                   size={15}
//                   strokeWidth={1.3}
//                   className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//                 />
//               </Link>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* ======================================================
//           MAIN FOOTER
//       ====================================================== */}

//       <div className="mx-auto max-w-[1800px] px-6 md:px-10 lg:px-14">
//         <div className="grid grid-cols-1 gap-14 border-b border-white/10 py-16 md:grid-cols-2 md:gap-16 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.8fr] lg:py-20">
//           {/* ==================================================
//               BRAND
//           ================================================== */}

//           <div>
//             <Link
//               href="/"
//               className="inline-block font-bebas text-4xl tracking-[0.02em] transition-opacity duration-300 hover:opacity-70 md:text-5xl"
//             >
//               DEMO AUTO
//             </Link>

//             <p className="mt-5 max-w-sm font-montserrat text-[10px] leading-[1.9] tracking-[0.05em] text-white/30 md:text-[11px]">
//               Exceptional vehicles. Refined service. A collection built for
//               those who expect more from every drive.
//             </p>
//           </div>

//           {/* ==================================================
//               NAVIGATION
//           ================================================== */}

//           <div>
//             <p className="mb-6 font-montserrat text-[9px] font-medium uppercase tracking-[0.3em] text-white/25">
//               Explore
//             </p>

//             <nav className="flex flex-col items-start">
//               {navigation.map((item, index) => (
//                 <Link
//                   key={item.label}
//                   href={item.href}
//                   className="group flex items-center gap-3 py-1.5 font-montserrat text-[10px] uppercase tracking-[0.16em] text-white/55 transition-colors duration-300 hover:text-white md:text-[11px]"
//                 >
//                   <span className="text-[8px] text-white/20">
//                     {String(index + 1).padStart(2, "0")}
//                   </span>

//                   <span>{item.label}</span>

//                   <ArrowRight
//                     size={12}
//                     strokeWidth={1.2}
//                     className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
//                   />
//                 </Link>
//               ))}
//             </nav>
//           </div>

//           {/* ==================================================
//               VISIT
//           ================================================== */}

//           <div>
//             <p className="mb-6 font-montserrat text-[9px] font-medium uppercase tracking-[0.3em] text-white/25">
//               Visit
//             </p>

//             <div className="space-y-5">
//               <div>
//                 <p className="font-montserrat text-[9px] uppercase tracking-[0.16em] text-white/25">
//                   Showroom
//                 </p>

//                 <p className="mt-1 font-montserrat text-[10px] leading-[1.7] tracking-[0.04em] text-white/55">
//                   Demo showroom address
//                   <br />
//                   Demo city
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* ==================================================
//               CONTACT
//           ================================================== */}

//           <div>
//             <p className="mb-6 font-montserrat text-[9px] font-medium uppercase tracking-[0.3em] text-white/25">
//               Contact
//             </p>

//             <div className="space-y-4">
//               <p className="font-montserrat text-[10px] tracking-[0.05em] text-white/55 md:text-[11px]">
//                 00000000
//               </p>

//               <a
//                 href="mailto:hello@example.com"
//                 className="block font-montserrat text-[10px] tracking-[0.05em] text-white/55 transition-colors duration-300 hover:text-white md:text-[11px]"
//               >
//                 hello@example.com
//               </a>

//               <div className="pt-2">
//                 <p className="font-montserrat text-[9px] uppercase tracking-[0.16em] text-white/25">
//                   Opening hours
//                 </p>

//                 <p className="mt-1 font-montserrat text-[10px] leading-[1.7] tracking-[0.04em] text-white/45">
//                   Mon — Sat
//                   <br />
//                   09:00 — 19:00
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ======================================================
//             BOTTOM BAR
//         ====================================================== */}

//         <div className="flex flex-col gap-7 py-7 md:flex-row md:items-center md:justify-between md:py-8">
//           {/* COPYRIGHT */}

//           <p className="font-montserrat text-[8px] uppercase tracking-[0.18em] text-white/20">
//             © {new Date().getFullYear()} Demo Auto. Demo website.
//           </p>

//           {/* BACK TO TOP */}

//           <button
//             type="button"
//             onClick={() => {
//               window.scrollTo({
//                 top: 0,
//                 behavior: "smooth",
//               });
//             }}
//             className="group flex cursor-pointer items-center gap-2 font-montserrat text-[8px] uppercase tracking-[0.18em] text-white/30 transition-colors duration-300 hover:text-white"
//           >
//             Back to top

//             <ArrowUpRight
//               size={13}
//               strokeWidth={1.2}
//               className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
//             />
//           </button>
//         </div>
//       </div>
//     </footer>
//   );
// }