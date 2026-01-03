import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
    return (
        <a
            href="https://wa.me/573000000000" // Replace with actual number
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 hover:scale-110 flex items-center justify-center"
            aria-label="Chat en WhatsApp"
        >
            <MessageCircle className="w-8 h-8" />
        </a>
    );
};

export default WhatsAppButton;
