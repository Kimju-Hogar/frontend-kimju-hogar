import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import logo from '../../assets/kimju-hogar-logo.jpg';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-24 pb-12 border-t border-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1 space-y-6">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <img src={logo} alt="Kimju Hogar" className="h-12 w-12 object-cover rounded-lg border border-white/20 transition-transform group-hover:scale-110" />
                            <h3 className="text-3xl font-display font-black uppercase tracking-tighter text-white group-hover:text-primary transition-colors">
                                Kimju <span className="text-primary group-hover:text-white transition-colors">Hogar</span>
                            </h3>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Accesorios para el hogar y uso personal. Elegancia y estilo en cada detalle.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">Enlaces</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link to="/shop" className="hover:text-primary transition-colors">Tienda</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
                            <li><Link to="/profile" className="hover:text-primary transition-colors">Mi cuenta</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">Nosotros</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">Contacto</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li>Colombia</li>
                            <li><a href="mailto:info@kimjuhogar.com" className="hover:text-primary transition-colors">info@kimjuhogar.com</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">Síguenos</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="border border-gray-800 p-3 hover:border-primary hover:text-primary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="border border-gray-800 p-3 hover:border-primary hover:text-primary transition-colors">
                                <MessageCircle className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                </div>

                <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Kimju Hogar. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
