import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
    // Puedes cambiar este número por el real de Kimju Hogar
    const phoneNumber = "573229447494"; // Ejemplo de número colombiano
    const message = encodeURIComponent("¡Hola Kimju Hogar! 🧸 Me gustaría recibir más información sobre sus productos.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Contactar por WhatsApp"
        >
            {/* Tooltip elegante */}
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-secondary px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-pink-100">
                ¿Necesitas ayuda? ✨
            </span>

            {/* Botón con pulso animado */}
            <div className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative">
                <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20" />
                <MessageCircle className="w-8 h-8 relative z-10" />
            </div>
        </a>
    );
};

export default WhatsAppButton;
