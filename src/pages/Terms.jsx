import { motion } from 'framer-motion';
import { ShieldCheck, Scale, Info, Truck, RefreshCcw, CreditCard, MessageCircle, Mail } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

const Terms = () => {
    return (
        <PageTransition>
            <div className="pt-32 pb-20 bg-white min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex p-3 bg-pink-100 rounded-2xl mb-4">
                            <Scale className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-black text-secondary mb-4 tracking-tight">
                            Términos y <span className="text-primary">Condiciones</span>
                        </h1>
                        <p className="text-gray-500 font-medium">Información importante sobre tus compras en Kimju Hogar. ✨</p>
                    </div>

                    <div className="space-y-12">
                        {/* 1. Entregas y Envíos */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-50 p-8 rounded-[2.5rem] border-2 border-pink-50"
                        >
                            <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
                                <Truck className="w-6 h-6 text-primary" /> Políticas de Envío
                            </h2>
                            <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
                                <p>🚀 <span className="text-secondary font-black">Valledupar:</span> ¡Buenas noticias! El envío es totalmente <span className="text-secondary underline decoration-pink-300">GRATIS</span> dentro de la ciudad de Valledupar.</p>
                                <p>📦 <span className="text-secondary font-black">Envíos Nacionales:</span> Realizamos envíos a todo el territorio nacional.</p>
                                <ul className="list-disc ml-6 space-y-2 text-sm">
                                    <li>El costo del envío se calcula basándose en el valor total de tu compra y el destino.</li>
                                    <li><span className="text-primary font-black">Pago contra entrega del envío:</span> El valor del envío se cancelará únicamente en el momento en que recibas tu producto, directamente a la empresa transportadora. No solicitamos pagos por el flete antes del envío.</li>
                                </ul>
                            </div>
                        </motion.section>

                        {/* 2. Devoluciones */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-pink-50 p-8 rounded-[2.5rem] border-2 border-white"
                        >
                            <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
                                <RefreshCcw className="w-6 h-6 text-[#F43F5E]" /> Devoluciones
                            </h2>
                            <div className="bg-white p-6 rounded-2xl border-2 border-pink-100 italic">
                                <p className="text-secondary font-bold text-center">
                                    "Por políticas de higiene y costos operativos, <span className="text-[#F43F5E] uppercase underline decoration-wavy">NO SE ACEPTAN DEVOLUCIONES</span> una vez realizada la compra."
                                </p>
                            </div>
                            <p className="mt-4 text-xs text-center text-gray-400 font-bold uppercase tracking-widest">
                                Por favor verifica bien los detalles de tu producto antes de finalizar la compra. 🌸
                            </p>
                        </motion.section>

                        {/* 3. Pagos Seguros */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gray-50 p-8 rounded-[2.5rem] border-2 border-pink-50"
                        >
                            <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-primary" /> Compras Seguras
                            </h2>
                            <p className="text-gray-600 font-medium mb-4">
                                Todas nuestras transacciones son procesadas a través de <span className="text-secondary font-black">Mercado Pago</span>, garantizando que tus datos bancarios estén siempre protegidos mediante los más altos estándares de seguridad y cifrado.
                            </p>
                            <div className="flex gap-4">
                                <img src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo.png" className="h-8 grayscale opacity-50" alt="Mercado Pago" />
                                <div className="h-8 w-px bg-gray-200" />
                                <div className="flex items-center gap-1 text-[10px] font-black uppercase text-gray-400">
                                    <ShieldCheck className="w-4 h-4 text-green-400" /> Transacción Cifrada
                                </div>
                            </div>
                        </motion.section>

                        {/* 4. Contacto Soporte */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-10 rounded-[3rem] border-4 border-dashed border-pink-100 text-center"
                        >
                            <h2 className="text-2xl font-bold text-secondary mb-4 italic">¿Necesitas ayuda? 🎀</h2>
                            <p className="text-gray-500 mb-8 font-medium">Si tienes alguna duda sobre estos términos, contáctanos:</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a href="https://wa.me/573000000000" target="_blank" className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg">
                                    <MessageCircle className="w-5 h-5" /> WhatsApp Shop
                                </a>
                                <a href="mailto:soporte@kimjuhogar.com" className="flex items-center justify-center gap-2 bg-secondary text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg">
                                    <Mail className="w-5 h-5" /> Soporte Vía Email
                                </a>
                            </div>
                        </motion.section>
                    </div>

                    <div className="mt-20 text-center">
                        <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                            Última actualización: Enero 2026 - Kimju Hogar CO.
                        </p>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Terms;
