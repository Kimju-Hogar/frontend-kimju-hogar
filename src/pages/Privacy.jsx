import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, UserCheck, MessageCircle, Mail } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

const Privacy = () => {
    return (
        <PageTransition>
            <div className="pt-32 pb-20 bg-white min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex p-3 bg-blue-100 rounded-2xl mb-4 text-blue-500">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-black text-secondary mb-4 tracking-tight">
                            Políticas de <span className="text-blue-500">Privacidad</span>
                        </h1>
                        <p className="text-gray-500 font-medium italic">En Kimju Hogar cuidamos tus datos como un tesoro. 💎</p>
                    </div>

                    <div className="prose prose-pink max-w-none space-y-12">
                        {/* Summary Section */}
                        <motion.section
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-gray-50 p-8 rounded-[2.5rem] border-2 border-gray-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Database className="w-24 h-24" />
                            </div>
                            <h2 className="text-2xl font-bold text-secondary mb-4 relative z-10 flex items-center gap-2">
                                <Eye className="w-5 h-5 text-blue-400" /> Transparencia de Datos
                            </h2>
                            <p className="text-gray-600 font-medium relative z-10 leading-relaxed">
                                Esta política describe cómo recopilamos, usamos y protegemos tu información personal cuando visitas nuestro sitio web y realizas compras. Al utilizar nuestros servicios, aceptas las prácticas descritas aquí.
                            </p>
                        </motion.section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Collecting Info */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white p-8 rounded-3xl border-2 border-pink-50 shadow-sm"
                            >
                                <div className="p-2 bg-pink-50 w-max rounded-lg mb-4 text-primary">
                                    <Database className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-3 underline decoration-pink-200">¿Qué recolectamos?</h3>
                                <p className="text-sm text-gray-500 font-medium">Información de contacto (nombre, email, teléfono, dirección) para procesar tus pedidos y ofrecerte soporte personalizado.</p>
                            </motion.div>

                            {/* Security */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white p-8 rounded-3xl border-2 border-blue-50 shadow-sm"
                            >
                                <div className="p-2 bg-blue-50 w-max rounded-lg mb-4 text-blue-500">
                                    <Lock className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-3 underline decoration-blue-200">Seguridad Total</h3>
                                <p className="text-sm text-gray-500 font-medium">Tus pagos se procesan fuera de nuestro servidor a través de pasarelas seguras. Nunca almacenamos los datos de tus tarjetas.</p>
                            </motion.div>
                        </div>

                        {/* Tratamiento de Datos */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-px bg-pink-100 flex-1" />
                                <UserCheck className="w-6 h-6 text-gray-300" />
                                <div className="h-px bg-pink-100 flex-1" />
                            </div>
                            <h2 className="text-2xl font-bold text-secondary text-center">Tratamiento de Datos Personales</h2>
                            <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
                                <p>De acuerdo con la legislación vigente de protección de datos, te informamos que:</p>
                                <ul className="list-disc ml-6 space-y-4">
                                    <li><span className="text-secondary font-black">Finalidad:</span> Los datos se usarán exclusivamente para la gestión de pedidos, envío de productos y comunicaciones directas relacionadas con tu compra.</li>
                                    <li><span className="text-secondary font-black">Tus Derechos:</span> Puedes solicitar en cualquier momento el acceso, corrección o eliminación de tus datos personales enviando un correo a nuestras líneas de atención.</li>
                                    <li><span className="text-secondary font-black">Uso de Cookies:</span> Utilizamos cookies para mejorar tu experiencia de navegación y recordar tus preferencias de carrito.</li>
                                </ul>
                            </div>
                        </motion.section>

                        {/* Footer Contact */}
                        <div className="bg-pink-50 p-10 rounded-[3rem] text-center border-2 border-white">
                            <h3 className="text-xl font-black text-secondary mb-2">¿Deseas saber más?</h3>
                            <p className="text-sm text-gray-500 mb-6 font-bold uppercase tracking-widest">Contáctanos por canales oficiales</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a href="https://wa.me/573000000000" target="_blank" className="flex items-center justify-center gap-2 bg-white text-[#25D366] px-6 py-2 rounded-xl font-bold border-2 border-[#25D366] hover:bg-green-50 transition-colors shadow-sm">
                                    <MessageCircle className="w-5 h-5" /> WhatsApp
                                </a>
                                <a href="mailto:soporte@kimjuhogar.com" className="flex items-center justify-center gap-2 bg-white text-gray-600 px-6 py-2 rounded-xl font-bold border-2 border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                                    <Mail className="w-5 h-5" /> Email Legal
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 text-center">
                        <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                            © 2026 Kimju Hogar. Todos los derechos reservados bajo ley colombiana.
                        </p>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Privacy;
