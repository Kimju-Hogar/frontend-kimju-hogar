import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import { ArrowRight, Star } from 'lucide-react';

const About = () => {
    return (
        <PageTransition>
            <div className="pt-24">

                {/* Banner */}
                <div className="bg-black text-white py-32 px-4 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto relative z-10 text-center">
                        <h1 className="text-6xl md:text-8xl font-display font-black uppercase mb-6 tracking-tight">
                            Nuestra <span className="text-primary">Visión</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-gray-400 font-light">
                            Redefiniendo el concepto de hogar a través de la fusión entre tecnología, minimalismo y estética futurista.
                        </p>
                    </div>
                    {/* Abstract Background Element */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary opacity-5 skew-x-12 transform translate-x-1/2"></div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-display font-bold uppercase">Más que muebles,<br />una experiencia.</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Kimju Hogar nació de la necesidad de escapar de lo convencional. Creemos que tu espacio debe reflejar no solo quién eres, sino quién quieres ser.
                                Nuestras colecciones productos para el hogar y uso personal del dia a dia con un estilo minimalista, priorizando formas audaces y funcionalidad absoluta.
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-8">
                                <div>
                                    <span className="block text-5xl font-black text-primary mb-2">05+</span>
                                    <span className="text-sm font-bold uppercase tracking-widest text-black">Años de Innovación</span>
                                </div>
                                <div>
                                    <span className="block text-5xl font-black text-primary mb-2">10k+</span>
                                    <span className="text-sm font-bold uppercase tracking-widest text-black">Clientes Felices</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/5] bg-gray-100 border-2 border-black shadow-neo">
                                {/* Placeholder for About Image */}
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400 font-bold uppercase">Imagen Corporativa</span>
                                </div>
                            </div>
                            {/* Decorative Element */}
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black z-[-1]"></div>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="bg-gray-50 py-24 border-t-2 border-black">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-display font-bold uppercase text-center mb-16">Nuestros Pilares</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Vanguardia", desc: "Siempre un paso adelante en tendencias globales." },
                                { title: "Calidad", desc: "Materiales premium que perduran y destacan." },
                                { title: "Exclusividad", desc: "Piezas únicas para espacios con carácter." }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -10 }}
                                    className="bg-white p-10 border-2 border-black shadow-neo hover:shadow-none transition-all duration-300"
                                >
                                    <Star className="w-10 h-10 text-primary mb-6 fill-current" />
                                    <h3 className="text-2xl font-bold uppercase mb-4">{item.title}</h3>
                                    <p className="text-gray-500">{item.desc}</p>
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
