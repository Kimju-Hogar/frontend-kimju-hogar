import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

const Contact = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => setStatus('sent'), 2000); // Mock send
    };

    return (
        <PageTransition>
            <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Info Section */}
                    <div className="space-y-12">
                        <div>
                            <h1 className="text-5xl md:text-7xl font-display font-black uppercase mb-6">Hablemos</h1>
                            <p className="text-xl text-gray-500 font-light max-w-md">
                                ¿Tienes un proyecto en mente o dudas sobre un producto? Estamos aquí.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-6 group cursor-pointer hover:bg-gray-50 p-4 -ml-4 rounded-xl transition-colors">
                                <div className="bg-black text-white p-4 group-hover:bg-primary group-hover:text-black transition-colors shadow-neo">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold uppercase mb-1">Email</h3>
                                    <p className="text-gray-500 font-medium">hola@kimjuhogar.com</p>
                                    <p className="text-gray-500 font-medium">soporte@kimjuhogar.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6 group cursor-pointer hover:bg-gray-50 p-4 -ml-4 rounded-xl transition-colors">
                                <div className="bg-black text-white p-4 group-hover:bg-primary group-hover:text-black transition-colors shadow-neo">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold uppercase mb-1">Teléfono</h3>
                                    <p className="text-gray-500 font-medium">+57 300 123 4567</p>
                                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 uppercase mt-1 inline-block">WhatsApp Disponible</span>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6 group cursor-pointer hover:bg-gray-50 p-4 -ml-4 rounded-xl transition-colors">
                                <div className="bg-black text-white p-4 group-hover:bg-primary group-hover:text-black transition-colors shadow-neo">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold uppercase mb-1">Ubicación</h3>
                                    <p className="text-gray-500 font-medium">Calle de la Moda #10-20</p>
                                    <p className="text-gray-500 font-medium">Valledupar, Colombia</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white border-2 border-black p-10 shadow-neo"
                    >
                        <h2 className="text-3xl font-display font-bold uppercase mb-8">Envíanos un mensaje</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-500">Nombre</label>
                                    <input type="text" className="w-full border-2 border-gray-200 p-4 font-bold focus:border-black focus:outline-none transition-colors" placeholder="Tu nombre" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-500">Apellido</label>
                                    <input type="text" className="w-full border-2 border-gray-200 p-4 font-bold focus:border-black focus:outline-none transition-colors" placeholder="Tu apellido" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-500">Email</label>
                                <input type="email" className="w-full border-2 border-gray-200 p-4 font-bold focus:border-black focus:outline-none transition-colors" placeholder="tu@email.com" required />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-500">Mensaje</label>
                                <textarea rows="4" className="w-full border-2 border-gray-200 p-4 font-bold focus:border-black focus:outline-none transition-colors resize-none" placeholder="¿Cómo podemos ayudarte?" required></textarea>
                            </div>

                            <button className="w-full btn-neo-primary flex items-center justify-center space-x-2">
                                <span>{status === 'sending' ? 'Enviando...' : status === 'sent' ? 'Mensaje Enviado' : 'Enviar Mensaje'}</span>
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </PageTransition>
    );
};

export default Contact;
