import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Zap, LogOut } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/kimju-hogar-logo.jpg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, user, isAuthenticated } = useAuth();
    const { getCartCount } = useCart();
    const location = useLocation();

    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Tienda', path: '/shop' },
        { name: 'Nosotros', path: '/about' },
        { name: 'Contacto', path: '/contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 w-full z-50 bg-white backdrop-blur-xl border-b border-gray-100/50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">

                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-3 group">
                            <img src={logo} alt="Kimju Hogar" className="h-10 w-10 object-cover rounded-3xl border border-white/20 transition-transform group-hover:scale-125" />
                            <span className="text-2xl font-display font-black tracking-tighter uppercase text-black group-hover:text-primary transition-colors">
                                Kimju <span className="text-primary group-hover:text-black transition-colors">Hogar</span>
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-12 items-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="relative group py-2"
                                >
                                    <span className={`text-sm font-bold uppercase tracking-widest ${location.pathname === link.path ? 'text-black' : 'text-gray-500'} group-hover:text-black transition-colors`}>
                                        {link.name}
                                    </span>
                                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${location.pathname === link.path ? 'scale-x-100' : ''}`}></span>
                                </Link>
                            ))}
                        </div>

                        {/* Icons */}
                        <div className="hidden md:flex items-center space-x-8">

                            <div className="hidden lg:flex items-center space-x-2 bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg group focus-within:border-black transition-colors">
                                <Search className="w-4 h-4 text-gray-400 group-focus-within:text-black" />
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    className="bg-transparent border-none outline-none text-sm font-bold w-32 focus:w-48 transition-all"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            window.location.href = `/shop?search=${e.target.value}`;
                                        }
                                    }}
                                />
                            </div>

                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <Link to={user.role === 'admin' ? "/admin" : "/profile"} className="relative group">
                                        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold font-display border-2 border-transparent group-hover:border-primary group-hover:bg-white group-hover:text-black transition-all">
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                    </Link>
                                    <button
                                        onClick={() => { logout(); window.location.href = '/'; }}
                                        className="hidden lg:block text-gray-500 hover:text-red-500 transition-colors"
                                        title="Cerrar Sesión"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="font-bold text-sm uppercase tracking-wide hover:text-gray-500 transition-colors">
                                    Iniciar sesión
                                </Link>
                            )}

                            <Link to="/cart" className="relative group">
                                <ShoppingCart className="w-5 h-5 text-gray-500 hover:text-black transition-colors" />
                                <span className="absolute -top-3 -right-3 bg-black text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full group-hover:bg-primary group-hover:text-black transition-colors">
                                    {getCartCount()}
                                </span>
                            </Link>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-black p-2">
                                {isOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-0 bg-white z-40 md:hidden pt-24 px-6 overflow-hidden"
                    >
                        <div className="flex flex-col space-y-6 text-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-3xl font-display font-bold uppercase text-black hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex flex-col items-center space-y-4 mt-8 pt-8 border-t border-gray-100">
                                {user ? (
                                    <>
                                        <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 font-bold uppercase text-sm">
                                            <User className="w-6 h-6" />
                                            <span>Mi Perfil</span>
                                        </Link>
                                        <button
                                            onClick={() => { logout(); setIsOpen(false); window.location.href = '/'; }}
                                            className="flex items-center space-x-2 font-bold uppercase text-sm text-red-500"
                                        >
                                            <LogOut className="w-6 h-6" />
                                            <span>Cerrar Sesión</span>
                                        </button>
                                    </>
                                ) : (
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 font-bold uppercase text-sm">
                                        <User className="w-6 h-6" />
                                        <span>Ingresar</span>
                                    </Link>
                                )}
                                <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 font-bold uppercase text-sm">
                                    <ShoppingCart className="w-6 h-6" />
                                    <span>Carrito ({getCartCount()})</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
