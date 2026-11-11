import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import CarStartup from "@/components/startinganimation";
import WhatsAppButton from "@/components/whatsappbutton";
import { BUSINESS_LOCATION, BUSINESS_NAME } from "@/lib/business";
export const metadata = {
  title: BUSINESS_NAME,
  description: `${BUSINESS_NAME} es un concesionario de automóviles en ${BUSINESS_LOCATION}.`,
};

export default function mainlayout({ children }) {
  return (
    <div className="min-h-full flex flex-col">
        <CarStartup
          variant="drive"
          brand={BUSINESS_NAME}
          duration={2200}
        />
      <Header />
        {children}
        <WhatsAppButton/>
        <Footer/>
    </div>
    
  );
}
