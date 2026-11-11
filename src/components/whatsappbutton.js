
"use client";

import { MessageCircle, Phone } from "lucide-react";

export default function WhatsAppButton({
  phone = "34722819288",
  message = "¡Hola! Me interesan sus vehículos.",
}) {
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contáctanos por WhatsApp"
      className="fixed md:bottom-6 bottom-24 right-3 md:right-6 z-[9999] group flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_5px_25px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a]"
    >
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

      {/* WhatsApp-style chat bubble */}
      <div className="relative flex items-center justify-center">
        <MessageCircle
          size={37}
          strokeWidth={2.2}
          fill="white"
          className="text-white"
        />

        {/* Phone inside bubble */}
        <Phone
          size={17}
          strokeWidth={3}
          className="absolute text-[#25D366] rotate-[-15deg]"
        />
      </div>
    </a>
  );
}


// "use client";

// import { FaWhatsapp } from "react-icons/fa";

// export default function WhatsAppButton({
//   phone = "34722819288",
//   message = "Hello! I'm interested in your vehicles.",
// }) {
//   const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

//   return (
//     <a
//       href={whatsappUrl}
//       target="_blank"
//       rel="noopener noreferrer"
//       aria-label="Chat with us on WhatsApp"
//       className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a] hover:shadow-xl"
//     >
//       <FaWhatsapp size={32} />
//     </a>
//   );
// }
