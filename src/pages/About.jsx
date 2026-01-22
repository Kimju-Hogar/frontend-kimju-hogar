import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import { ArrowRight, Star, Heart, Sparkles, Coffee, Gift, Crown, Smile } from 'lucide-react';
import logoKimju from "../assets/kimju-hogar-logo.jpg";


const About = () => {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const floatingVariant = {
        animate: {
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <PageTransition>
            <div className="pt-24 min-h-screen bg-white relative overflow-hidden">
                {/* Dynamic Background */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-pink-100 to-pink-50 rounded-full blur-[100px] -z-10 opacity-60 origin-center"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-purple-100 to-pink-50 rounded-full blur-[120px] -z-10 opacity-60"
                />

                {/* Sparkling Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.5, 1], y: [0, -50, 0] }}
                            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
                            className="absolute text-pink-200"
                            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                        >
                            <Sparkles className="w-8 h-8" />
                        </motion.div>
                    ))}
                </div>

                {/* Hero Section */}
                <div className="relative py-24 px-4 overflow-hidden">
                    <div className="max-w-7xl mx-auto relative z-10 text-center">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="inline-block p-6 rounded-full bg-white shadow-xl mb-8 border-4 border-pink-50 relative group cursor-pointer hover:scale-110 transition-transform"
                        >
                            <div className="absolute inset-0 bg-pink-100 rounded-full animate-ping opacity-20" />
                            <Crown className="w-12 h-12 text-primary fill-pink-200" />
                        </motion.div>

                        <motion.h1
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-6xl md:text-8xl font-display font-black text-secondary mb-8 tracking-tight leading-tight"
                        >
                            <motion.span variants={itemVariants} className="inline-block">Nuestra</motion.span>{' '}
                            <motion.span
                                variants={itemVariants}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 decoration-wavy underline decoration-pink-200 inline-block"
                            >
                                Historia
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="max-w-2xl mx-auto text-2xl text-gray-500 font-medium leading-relaxed"
                        >
                            Creando espacios donde la magia, el color y la ternura se encuentran para transformar tu hogar. ✨
                        </motion.p>
                    </div>
                </div>

                {/* Story Section */}
                <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-10"
                        >
                            <div className="relative">
                                <h2 className="text-5xl font-display font-black text-secondary leading-tight relative z-10">
                                    Más que accesorios, <br />
                                    <span className="relative">
                                        estilo y corazón
                                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-pink-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                            <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </h2>
                            </div>

                            <div className="space-y-6 text-lg text-gray-500 leading-relaxed font-medium">
                                <p>
                                    <span className="font-bold text-primary text-xl">Kimju</span> nació en el 2017 con un sueño brillante: llenar el mundo de accesorios modernos y accesibles. Lo que comenzó como una pequeña tienda de tesoros brillantes, floreció casi 9 años después en un universo de estilo y hogar.
                                </p>
                                <p>
                                    Gracias al amor y confianza de nuestra comunidad, evolucionamos. Hoy no solo adornamos a las personas, sino también sus espacios sagrados. Desde decoración soñada hasta ese termo perfecto que te acompaña siempre.
                                </p>
                                <p>
                                    Nos mueve la <span className="text-purple-500 font-bold">variedad</span>, los precios justos y esa calidad que se siente. Cada día crecemos contigo, buscando hacer tu vida más práctica, más linda y, sobre todo, más tú.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <motion.div
                                    whileHover={{ scale: 1.05, rotate: -2 }}
                                    className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-[2.5rem] border border-pink-100 text-center shadow-lg group"
                                >
                                    <span className="block text-5xl font-black text-primary mb-2 drop-shadow-sm group-hover:scale-110 transition-transform">9+</span>
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-primary transition-colors">Años de Magia</span>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                    className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-[2.5rem] border border-purple-100 text-center shadow-lg group"
                                >
                                    <span className="block text-5xl font-black text-purple-400 mb-2 drop-shadow-sm group-hover:scale-110 transition-transform">10k+</span>
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-purple-400 transition-colors">Clientes Felices</span>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <motion.div
                                variants={floatingVariant}
                                animate="animate"
                                className="aspect-[4/4] bg-white border-[8px] border-white rounded-[4rem] shadow-2xl overflow-hidden relative z-10"
                            >
                                <img
                                    src={logoKimju}
                                    alt="About Kimju"
                                    className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none mix-blend-overlay" />
                            </motion.div>

                            {/* Decorative Elements around image */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-12 -right-12 w-48 h-48 bg-yellow-100/50 rounded-full blur-2xl -z-10"
                            />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-200/50 rounded-full blur-2xl -z-10"
                            />

                            {/* Floating Card */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl border border-pink-50 flex items-center gap-4 z-20"
                            >
                                <div className="bg-green-100 p-3 rounded-full">
                                    <Smile className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-black text-secondary text-sm">100%</p>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Garantizado</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="bg-white py-32 relative">
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-pink-50/30" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-20"
                        >
                            <span className="text-primary font-black tracking-widest uppercase text-sm bg-pink-50 px-4 py-2 rounded-full mb-4 inline-block">Nuestra Esencia</span>
                            <h2 className="text-5xl font-display font-black text-secondary mt-4 mb-6 flex items-center justify-center gap-3">
                                Los Pilares de <span className="text-primary underline decoration-wavy decoration-purple-200">Kimju</span>
                            </h2>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Lo que nos hace únicos y especiales, pensando siempre en ti.</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[
                                { title: "Variedad", desc: "Un universo de opciones para que encuentres justo lo que tu corazón busca.", icon: Gift, color: "text-red-400", bg: "bg-red-50", border: "border-red-100" },
                                { title: "Calidad", desc: "Seleccionamos cada pieza con amor, asegurando que te acompañe por mucho tiempo.", icon: Star, color: "text-yellow-400", bg: "bg-yellow-50", border: "border-yellow-100" },
                                { title: "Accesibilidad", desc: "Porque el estilo y la ternura no deberían ser un lujo. Precios para todos.", icon: Heart, color: "text-purple-400", bg: "bg-purple-50", border: "border-purple-100" }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2 }}
                                    whileHover={{ y: -15, rotate: 1 }}
                                    className={`bg-white p-10 rounded-[3rem] border-2 ${item.border} shadow-sm hover:shadow-2xl transition-all duration-300 relative group overflow-hidden`}
                                >
                                    <div className={`w-20 h-20 ${item.bg} rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                                        <item.icon className={`w-10 h-10 ${item.color} fill-current`} />
                                    </div>
                                    <h3 className="text-3xl font-display font-bold text-secondary mb-4">{item.title}</h3>
                                    <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>

                                    {/* Hover decoration */}
                                    <div className={`absolute top-0 right-0 w-40 h-40 ${item.bg} rounded-full blur-[80px] -mr-20 -mt-20 opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="py-24 relative overflow-hidden">
                    <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-secondary rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity" />

                            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-8 relative z-10">
                                ¿Lista para llenar tu mundo de estilo?
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-secondary px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-lg shadow-lg hover:shadow-white/20 transition-all relative z-10"
                            >
                                Ir a la Tienda <ArrowRight className="inline-block ml-2 w-6 h-6" />
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

            </div>
        </PageTransition>
    );
};

export default About;
