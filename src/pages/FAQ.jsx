import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, Truck, CreditCard, RefreshCcw, MapPin } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import SEO from '../components/common/SEO';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            category: "Envíos",
            icon: Truck,
            questions: [
                { q: "¿Cuánto tiempo tarda el envío?", a: "Para Valledupar entregamos el mismo día. Para el resto del país, el tiempo es de 2 a 5 días hábiles dependiendo de la transportadora." },
                { q: "¿El envío es gratis?", a: "¡Sí! El domicilio es totalmente GRATIS para toda la ciudad de Valledupar. Para envíos nacionales, el costo depende del peso y destino." },
            ]
        },
        {
            category: "Pagos",
            icon: CreditCard,
            questions: [
                { q: "¿Qué métodos de pago aceptan?", a: "Aceptamos tarjetas de crédito/débito, PSE, Nequi y Daviplata a través de Mercado Pago. Es 100% seguro." },
                { q: "¿Puedo pagar contra entrega?", a: "El pago contra entrega solo está habilitado para envíos locales en Valledupar. Para nacionales, debes pagar antes del envío." },
            ]
        },
        {
            category: "Devoluciones",
            icon: RefreshCcw,
            questions: [
                { q: "¿Puedo devolver un producto?", a: "Por políticas de higiene y calidad, no aceptamos devoluciones a menos que el producto llegue con defectos de fábrica." },
                { q: "¿Qué hago si mi pedido llegó dañado?", a: "Contáctanos inmediatamente por WhatsApp con fotos del producto y te solucionaremos el inconveniente lo más rápido posible." },
            ]
        },
        {
            category: "Ubicación",
            icon: MapPin,
            questions: [
                { q: "¿Tienen tienda física?", a: "¡Sí! Visítanos en nuestra tienda en Valledupar, Colombia. Te esperamos con la mejor atención." },
            ]
        }
    ];

    return (
        <PageTransition>
            <SEO title="Preguntas Frecuentes" description="Resuelve tus dudas sobre envíos, pagos y devoluciones en Kimju Hogar." />
            <div className="pt-32 pb-20 bg-white min-h-screen">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex p-3 bg-purple-100 rounded-2xl mb-4 text-purple-500">
                            <HelpCircle className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-black text-secondary mb-4 tracking-tight">
                            Preguntas <span className="text-purple-500">Frecuentes</span>
                        </h1>
                        <p className="text-gray-500 font-medium">Todo lo que necesitas saber antes de comprar. 🌸</p>
                    </div>

                    <div className="space-y-12">
                        {faqs.map((section, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-[2.5rem] p-8 border-2 border-purple-50">
                                <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-3">
                                    <section.icon className="w-6 h-6 text-primary" /> {section.category}
                                </h3>
                                <div className="space-y-4">
                                    {section.questions.map((item, qIdx) => {
                                        const isOpen = openIndex === `${idx}-${qIdx}`;
                                        return (
                                            <div key={qIdx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden text-left">
                                                <button
                                                    onClick={() => setOpenIndex(isOpen ? null : `${idx}-${qIdx}`)}
                                                    className="w-full p-5 flex items-center justify-between font-bold text-secondary hover:text-primary transition-colors text-left"
                                                >
                                                    <span className="pr-4">{item.q}</span>
                                                    {isOpen ? <Minus className="w-5 h-5 text-primary shrink-0" /> : <Plus className="w-5 h-5 text-gray-400 shrink-0" />}
                                                </button>
                                                <AnimatePresence>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="p-5 pt-0 text-gray-500 font-medium text-sm leading-relaxed border-t border-gray-50 bg-purple-50/30">
                                                                {item.a}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default FAQ;
