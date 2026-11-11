
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Quote, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Cliente de ejemplo 01",
    location: "Testimonio de ejemplo",
    date: "Contenido de demostración",
    rating: 5,
    text: "Una experiencia profesional y sencilla. El equipo fue atento, respondió con claridad a mis preguntas e hizo que todo el proceso fuera cómodo.",
    vehicle: "Compra de vehículo",
  },
  {
    id: 2,
    name: "Cliente de ejemplo 02",
    location: "Testimonio de ejemplo",
    date: "Contenido de demostración",
    rating: 5,
    text: "El concesionario tenía una gran selección de vehículos. Agradecí la atención al detalle y el tiempo que dedicaron a explicármelo todo.",
    vehicle: "Experiencia en el concesionario",
  },
  {
    id: 3,
    name: "Cliente de ejemplo 03",
    location: "Testimonio de ejemplo",
    date: "Contenido de demostración",
    rating: 5,
    text: "Una experiencia excelente desde la primera conversación hasta la visita al concesionario. La comunicación fue clara y el trato del equipo, cercano.",
    vehicle: "Atención al cliente",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ReviewsSection() {
  return (
    <section className="relative overflow-hidden bg-white text-black">
      <div className="mx-auto max-w-[1800px] px-6 py-20 md:px-10 md:py-24 lg:px-14 lg:py-28">
        {/* HEADER */}
        <div className="mb-14 flex flex-col justify-between gap-8 md:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <motion.p
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="mb-4 font-montserrat text-[9px] font-medium uppercase tracking-[0.35em] text-black/30 md:text-[10px]"
            >
              Reseñas de ejemplo · Contenido de demostración
            </motion.p>

            <motion.h2
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="font-bebas text-[clamp(4.5rem,9vw,9rem)] leading-[0.8] tracking-[-0.04em] text-black"
            >
              EXPERIENCIAS QUE
              <br />
              HABLAN POR NOSOTROS.
            </motion.h2>

            <motion.p
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="mt-6 max-w-md font-montserrat text-[10px] leading-[1.9] tracking-[0.04em] text-black/40 md:text-[11px]"
            >
              Comprar un coche es una decisión personal. Creemos que la
              experiencia debe estar a la altura del vehículo que te llevas.
            </motion.p>
          </div>

          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group inline-flex w-fit items-center gap-3 border-b border-black/20 pb-2 font-montserrat text-[9px] font-semibold uppercase tracking-[0.16em] transition-colors hover:border-black md:text-[10px]"
          >
            Habla con nuestro equipo
            <ArrowUpRight
              size={14}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </motion.a>
        </div>

        {/* REVIEW CARDS */}
        <div className="grid grid-cols-1 border-l border-t border-black/10 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex min-h-[310px] flex-col border-b border-r border-black/10 p-6 transition-colors duration-300 hover:bg-[#f7f7f5] md:min-h-[340px] md:p-8 lg:p-9"
            >
              <div className="mb-8 flex items-center justify-between">
                <Quote
                  size={25}
                  strokeWidth={1}
                  className="text-black/20 transition-colors group-hover:text-black"
                />

                <div
                  className="flex gap-1"
                  aria-label={`${review.rating} de 5 estrellas`}
                >
                  {Array.from({ length: review.rating }, (_, i) => (
                    <Star
                      key={i}
                      size={12}
                      strokeWidth={1.2}
                      className="fill-black text-black"
                    />
                  ))}
                </div>
              </div>

              <p className="flex-1 font-montserrat text-[11px] leading-[2] tracking-[0.02em] text-black/65 md:text-xs">
                “{review.text}”
              </p>

              <div className="mt-9 border-t border-black/10 pt-5">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.08em]">
                      {review.name}
                    </h3>
                    <p className="mt-2 font-montserrat text-[9px] tracking-[0.08em] text-black/35">
                      {review.location}
                    </p>
                  </div>

                  <span className="text-right font-montserrat text-[8px] uppercase tracking-[0.1em] text-black/30">
                    {review.vehicle}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* BOTTOM NOTE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-montserrat text-[9px] leading-[1.8] tracking-[0.04em] text-black/35">
            Cada interacción con nuestros clientes es una oportunidad para mejorar.
          </p>

          <a
            href="/contact"
            className="group inline-flex w-fit items-center gap-2 font-montserrat text-[9px] font-semibold uppercase tracking-[0.14em] hover:text-black/55"
          >
            Contactar
            <ArrowUpRight
              size={13}
              strokeWidth={1.4}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </motion.div>
      </div>

      <div className="h-px w-full bg-black/10" />
    </section>
  );
}
