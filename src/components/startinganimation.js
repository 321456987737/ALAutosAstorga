
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CarStartup({
  brand = "TU CONCESIONARIO",
  duration = 2600,
}) {
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

 useEffect(() => {
  const fadeTimer = setTimeout(() => {
    setLeaving(true);
  }, Math.max(0, duration ));

  const removeTimer = setTimeout(() => {
    setVisible(false);
  }, duration + 1100);

  return () => {
    clearTimeout(fadeTimer);
    clearTimeout(removeTimer);
  };
}, [duration]);
  // useEffect(() => {
  //   const fadeTimer = setTimeout(() => {
  //     setLeaving(true);
  //   }, Math.max(0, duration - 500));

  //   const removeTimer = setTimeout(() => {
  //     setVisible(false);
  //   }, duration);

  //   return () => {
  //     clearTimeout(fadeTimer);
  //     clearTimeout(removeTimer);
  //   };
  // }, [duration]);

  if (!visible) return null;

  return (
    <motion.div
      role="status"
      aria-label={`Cargando ${brand}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#0b0b0b] text-white"
      style={{ pointerEvents: leaving ? "none" : "auto" }}
    >
      <div className="flex flex-col items-center px-6 text-center">

        {/* LOGO REVEAL */}
        <div className="relative w-44 sm:w-56">
          <motion.div className="mb-8 not-even:">
            Te damos la bienvenida a
          </motion.div>
          <Image
            src="/logo.svg"
            alt={`Logotipo de ${brand}`}
            width={512}
            height={512}
            priority
            className="block h-auto w-full object-contain brightness-0 invert"
          />

          {/* BLACK BOX REVEAL */}
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: "-110%" }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute inset-0 z-10 bg-[#0b0b0b]"
          />
        </div>

        {/* RED ACCENT LINE */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: 0.45,
            delay: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-7 h-[2px] w-28 origin-center bg-red-500 sm:w-36"
        />

        {/* DEALERSHIP NAME */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.95,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-5 font-montserrat text-xl font-semibold uppercase tracking-[0.25em] text-white sm:text-2xl"
        >
          {brand}
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 1.15,
          }}
          className="mt-3 font-montserrat text-[9px] font-medium uppercase tracking-[0.3em] text-white/45"
        >
          ENCUENTRA EL COCHE PERFECTO PARA TI
        </motion.p>

      </div>
    </motion.div>
  );
}
