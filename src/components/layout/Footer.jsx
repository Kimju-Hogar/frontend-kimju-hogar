import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MessageCircle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../../assets/kimju-hogar-logo.jpg';

const Footer = () => {
    return (
        <footer className="bg-primary pt-24 pb-12 relative overflow-hidden text-white">
            {/* Decorative Top Wave */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
                <svg className="relative block w-[calc(100%+1.3px)] h-[40px] fill-primary bg-white" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
            >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1 space-y-6">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <motion.img
                                whileHover={{ rotate: 12, scale: 1.1 }}
                                src={logo}
                                alt="Kimju Hogar"
                                className="h-16 w-16 object-cover rounded-full border-4 border-white/30 p-1 shadow-2xl transition-all"
                            />
                            <h3 className="text-3xl font-display font-black tracking-tight text-white group-hover:text-pink-100 transition-colors">
                                Kimju<span className="text-pink-100 font-sans font-light">Hogar</span>
                            </h3>
                        </Link>
                        <p className="text-pink-50/80 text-sm leading-relaxed max-w-xs font-medium italic">
                            Tu espacio favorito para encontrar accesorios llenos de encanto y estilo. ✨
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-display font-bold text-xl mb-6 text-white border-b-2 border-white/20 pb-2 inline-block">Explora</h4>
                        <ul className="space-y-4 text-sm text-pink-50 font-medium">
                            <li><Link to="/shop" className="hover:text-white transition-all flex items-center gap-2 group"><span className="group-hover:scale-125 transition-transform duration-300">🎀</span> Tienda</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-all flex items-center gap-2 group"><span className="group-hover:scale-125 transition-transform duration-300">💌</span> Contacto</Link></li>
                            <li><Link to="/profile" className="hover:text-white transition-all flex items-center gap-2 group"><span className="group-hover:scale-125 transition-transform duration-300">👤</span> Mi cuenta</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-all flex items-center gap-2 group"><span className="group-hover:scale-125 transition-transform duration-300">🧸</span> Nosotros</Link></li>
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div>
                        <h4 className="font-display font-bold text-xl mb-6 text-white border-b-2 border-white/20 pb-2 inline-block">Soporte</h4>
                        <ul className="space-y-4 text-sm text-pink-50 font-medium">
                            <li><Link to="/terms" className="hover:text-white transition-all flex items-center gap-2 group"><span className="group-hover:rotate-12 transition-transform">⚖️</span> Términos y Condiciones</Link></li>
                            <li><Link to="/privacy" className="hover:text-white transition-all flex items-center gap-2 group"><span className="group-hover:rotate-12 transition-transform">🛡️</span> Privacidad</Link></li>
                            <li><a href="mailto:info@kimjuhogar.com" className="hover:text-white transition-all flex items-center gap-2 group"><span className="group-hover:rotate-12 transition-transform">📧</span> info@kimjuhogar.com</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-display font-bold text-xl mb-6 text-white border-b-2 border-white/20 pb-2 inline-block">Síguenos</h4>
                        <div className="flex space-x-4">
                            {[
                                { Icon: Instagram, color: 'hover:text-pink-500' },
                                { Icon: MessageCircle, color: 'hover:text-green-500' },
                                { Icon: Facebook, color: 'hover:text-blue-500' }
                            ].map(({ Icon, color }, idx) => (
                                <motion.a
                                    key={idx}
                                    whileHover={{ y: -8, scale: 1.15 }}
                                    whileTap={{ scale: 0.9 }}
                                    href="#"
                                    className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white ${color} transition-all duration-300 shadow-lg`}
                                >
                                    <Icon className="w-6 h-6" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-center items-center text-xs text-pink-100 font-medium text-center">
                    <p className="flex items-center gap-1 group">
                        &copy; {new Date().getFullYear()} Kimju Hogar. Hecho con
                        <motion.span
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <Heart className="w-4 h-4 text-red-300 fill-red-300 inline mx-1" />
                        </motion.span>
                        para ti.
                    </p>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;

