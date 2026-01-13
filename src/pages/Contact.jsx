import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
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
            <div className="pt-24 pb-20 min-h-screen bg-white relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-100 rounded-full blur-[100px] -z-10 opacity-60" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-100 rounded-full blur-[120px] -z-10 opacity-60" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Info Section */}
                        <div className="space-y-12">
                            <div>
                                <div className="inline-block p-3 bg-pink-50 rounded-2xl mb-4">
                                    <MessageCircle className="w-8 h-8 text-primary" />
                                </div>
                                <h1 className="text-5xl md:text-7xl font-display font-black text-secondary mb-6">Hablemos</h1>
                                <p className="text-xl text-gray-400 font-medium max-w-md">
                                    ¿Tienes un proyecto en mente o dudas sobre un producto? Estamos aquí para ti. 🌸
                                </p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { icon: Mail, title: "Email", t1: "hola@kimjuhogar.com", t2: "soporte@kimjuhogar.com", color: "text-blue-400", bg: "bg-blue-50" },
                                    { icon: Phone, title: "Teléfono", t1: "+57 300 123 4567", t2: "WhatsApp Disponible", color: "text-green-500", bg: "bg-green-50" },
                                    { icon: MapPin, title: "Ubicación", t1: "Calle de la Moda #10-20", t2: "Valledupar, Colombia", color: "text-red-400", bg: "bg-red-50" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start space-x-6 group cursor-pointer hover:bg-white/80 p-6 rounded-[2rem] transition-all border border-transparent hover:border-pink-100 hover:shadow-lg">
                                        <div className={`${item.bg} ${item.color} p-4 rounded-2xl transition-colors shadow-sm`}>
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-secondary mb-1">{item.title}</h3>
                                            <p className="text-gray-500 font-medium">{item.t1}</p>
                                            <p className="text-gray-400 text-sm font-medium opacity-80">{item.t2}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form Section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white border-4 border-pink-100 p-10 rounded-[3rem] shadow-xl relative"
                        >
                            <h2 className="text-3xl font-display font-bold text-secondary mb-8">Envíanos un mensaje</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-400 ml-4">Nombre</label>
                                        <input type="text" className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl font-bold text-gray-600 focus:bg-white focus:border-primary-light focus:outline-none transition-all" placeholder="Tu nombre" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-400 ml-4">Apellido</label>
                                        <input type="text" className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl font-bold text-gray-600 focus:bg-white focus:border-primary-light focus:outline-none transition-all" placeholder="Tu apellido" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-400 ml-4">Email</label>
                                    <input type="email" className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl font-bold text-gray-600 focus:bg-white focus:border-primary-light focus:outline-none transition-all" placeholder="tu@email.com" required />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-400 ml-4">Mensaje</label>
                                    <textarea rows="4" className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl font-bold text-gray-600 focus:bg-white focus:border-primary-light focus:outline-none transition-all resize-none" placeholder="¿Cómo podemos ayudarte?" required></textarea>
                                </div>

                                <button className="w-full py-4 bg-secondary text-white rounded-2xl font-bold text-lg hover:bg-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-md flex items-center justify-center space-x-2">
                                    <span>{status === 'sending' ? 'Enviando...' : status === 'sent' ? 'Mensaje Enviado' : 'Enviar Mensaje'}</span>
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </motion.div>

                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Contact;
