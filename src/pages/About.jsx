import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import { ArrowRight, Star, Heart, Sparkles, Coffee } from 'lucide-react';

const About = () => {
    return (
        <PageTransition>
            <div className="pt-24 min-h-screen bg-white relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-100 rounded-full blur-[100px] -z-10 opacity-60" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100 rounded-full blur-[120px] -z-10 opacity-60" />

                {/* Banner */}
                <div className="relative py-24 px-4 overflow-hidden">
                    <div className="max-w-7xl mx-auto relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-block p-4 rounded-full bg-white shadow-sm mb-6 border border-pink-100"
                        >
                            <Heart className="w-8 h-8 text-primary fill-pink-200 animate-pulse" />
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-display font-black text-secondary mb-6 tracking-tight">
                            Nuestra <span className="text-primary decoration-wavy underline decoration-pink-200">Historia</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-gray-500 font-medium">
                            Creando espacios llenos de magia, color y mucha ternura. ✨
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-display font-bold text-secondary">Más que muebles,<br />una experiencia <span className="text-primary">Kawaii</span>.</h2>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                Kimju Hogar nació de la necesidad de llenar nuestros espacios de alegría. Creemos que tu hogar debe ser un refugio de ternura y estilo, donde cada objeto te saque una sonrisa.
                                Nuestras colecciones combinan la funcionalidad moderna con esa estética adorable que tanto amamos.
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-8">
                                <div className="bg-pink-50 p-6 rounded-[2rem] border border-pink-100 text-center">
                                    <span className="block text-4xl font-black text-primary mb-2">05+</span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Años de Magia</span>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-[2rem] border border-purple-100 text-center">
                                    <span className="block text-4xl font-black text-purple-400 mb-2">10k+</span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Clientes Felices</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[3/3] bg-white border-4 border-pink-100 rounded-[3rem] shadow-xl overflow-hidden relative rotate-3 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src="/src/assets/kimju-hogar-logo.jpg"
                                    alt="About Us"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
                            </div>
                            {/* Decorative Element */}
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-200 rounded-full blur-2xl -z-10 opacity-50"></div>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="bg-white py-24 border-t border-pink-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-display font-bold text-secondary text-center mb-16 flex items-center justify-center gap-3">
                            <Sparkles className="w-8 h-8 text-primary" /> Nuestros Pilares
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Ternura", desc: "Diseños que enamoran a primera vista.", icon: Heart, color: "text-red-400", bg: "bg-red-50" },
                                { title: "Calidad", desc: "Materiales suaves y duraderos para ti.", icon: Star, color: "text-yellow-400", bg: "bg-yellow-50" },
                                { title: "Estilo", desc: "La mezcla perfecta entre modernidad y dulzura.", icon: Coffee, color: "text-purple-400", bg: "bg-purple-50" }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -10 }}
                                    className="bg-white p-10 rounded-[2.5rem] border border-pink-100 shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
                                >
                                    <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-6`}>
                                        <item.icon className={`w-8 h-8 ${item.color} fill-current`} />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-secondary mb-4">{item.title}</h3>
                                    <p className="text-gray-500 font-medium">{item.desc}</p>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-[60px] -mr-16 -mt-16 group-hover:bg-pink-50 transition-colors" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </PageTransition>
    );
};

export default About;
