import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, Heart, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/kimju-hogar-logo.jpg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [suggestions, setSuggestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const { logout, user } = useAuth();
    const { getCartCount, setIsCartOpen } = useCart();
    const location = useLocation();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/categories');
                setCategories(res.data);
            } catch (err) { console.error(err); }
        };
        fetchCategories();
    }, []);

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.length > 2) {
            try {
                const res = await axios.get(`http://localhost:5000/api/products?search=${value}&category=${selectedCategory}`);
                setSuggestions(res.data.slice(0, 5));
                setShowSuggestions(true);
            } catch (err) { console.error(err); }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

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
                className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b-2 border-pink-100 shadow-sm"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">

                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-3 group">
                            <motion.div
                                whileHover={{ rotate: 10, scale: 1.1 }}
                                className="relative"
                            >
                                <img src={logo} alt="Kimju Hogar" className="h-12 w-12 object-cover rounded-full border-2 border-primary shadow-lg" />
                                <span className="absolute -top-1 -right-1 text-xl">✨</span>
                            </motion.div>
                            <span className="text-2xl font-display font-black tracking-tight text-primary-dark group-hover:text-primary transition-colors">
                                Kimju<span className="text-black font-sans font-light">Hogar</span>
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8 items-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="relative group py-2"
                                >
                                    <span className={`text-base font-bold tracking-wide ${location.pathname === link.path ? 'text-primary' : 'text-gray-500'} group-hover:text-primary transition-colors flex items-center gap-1`}>
                                        {location.pathname === link.path && <Heart className="w-3 h-3 fill-primary text-primary" />}
                                        {link.name}
                                    </span>
                                    <span className={`absolute bottom-0 left-0 w-full h-1 bg-primary-light rounded-full transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${location.pathname === link.path ? 'scale-x-100' : ''}`}></span>
                                </Link>
                            ))}
                        </div>

                        {/* Icons */}
                        <div className="hidden md:flex items-center space-x-6">

                            <div className="hidden lg:flex items-center space-x-0 bg-pink-50 border-2 border-pink-100 rounded-full group focus-within:border-primary transition-all shadow-inner relative">
                                <select
                                    className="bg-transparent border-none outline-none text-[10px] font-black uppercase text-primary-dark pl-4 pr-2 cursor-pointer hover:text-primary transition-colors h-full"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="All">Todas</option>
                                    {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                                </select>
                                <div className="w-px h-4 bg-pink-200 mx-1" />
                                <div className="flex items-center px-3 py-2">
                                    <Search className="w-4 h-4 text-primary" />
                                    <input
                                        type="text"
                                        placeholder="Buscar cositas..."
                                        className="bg-transparent border-none outline-none text-sm font-medium text-gray-600 placeholder:text-pink-300 w-32 focus:w-48 transition-all ml-2"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                window.location.href = `/shop?search=${searchQuery}&category=${selectedCategory}`;
                                            }
                                        }}
                                    />
                                </div>

                                {/* Suggestions Dropdown */}
                                <AnimatePresence>
                                    {showSuggestions && suggestions.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-white border border-pink-100 rounded-2xl shadow-xl overflow-hidden z-[100]"
                                        >
                                            <div className="p-2">
                                                <p className="text-[10px] font-black text-gray-400 uppercase px-3 py-2 tracking-widest">Sugerencias</p>
                                                {suggestions.map(s => (
                                                    <Link
                                                        key={s._id}
                                                        to={`/product/${s._id}`}
                                                        onClick={() => setShowSuggestions(false)}
                                                        className="flex items-center gap-3 p-3 hover:bg-pink-50 rounded-xl transition-colors group"
                                                    >
                                                        <img src={s.image} className="w-10 h-10 object-cover rounded-lg shadow-sm" alt={s.name} />
                                                        <div>
                                                            <p className="text-sm font-bold text-secondary group-hover:text-primary transition-colors">{s.name}</p>
                                                            <p className="text-[10px] text-gray-400 font-medium">${s.price.toLocaleString()}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                                <Link
                                                    to={`/shop?search=${searchQuery}&category=${selectedCategory}`}
                                                    onClick={() => setShowSuggestions(false)}
                                                    className="block text-center p-3 text-xs font-black text-primary hover:bg-pink-100 transition-colors uppercase tracking-tight"
                                                >
                                                    Ver todos los resultados
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <Link to={user.role === 'admin' ? "/admin" : "/profile"} className="relative group">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="w-10 h-10 bg-primary-light text-primary-dark rounded-full flex items-center justify-center font-bold font-display border-2 border-white shadow-md group-hover:bg-primary group-hover:text-white transition-all"
                                        >
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </motion.div>
                                    </Link>
                                    <button
                                        onClick={() => { logout(); window.location.href = '/'; }}
                                        className="hidden lg:block text-pink-300 hover:text-primary-dark transition-colors"
                                        title="Cerrar Sesión"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="btn-kawaii-outline px-6 py-2 text-xs">
                                    Ingresar
                                </Link>
                            )}

                            {/* Cart Toggle */}
                            <div className="relative group p-2">
                                <button onClick={() => setIsCartOpen(true)} className="relative">
                                    <ShoppingBag className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors" />
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm"
                                    >
                                        {getCartCount()}
                                    </motion.span>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-primary p-2 bg-pink-50 rounded-full">
                                {isOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav >

            {/* Mobile Menu Overlay */}
            < AnimatePresence >
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 md:hidden pt-24 px-6 overflow-hidden flex flex-col items-center justify-center"
                    >
                        <div className="flex flex-col space-y-8 text-center w-full max-w-sm">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="text-3xl font-display font-bold text-gray-800 hover:text-primary transition-colors block py-2"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <hr className="border-pink-100 w-full" />

                            <div className="flex justify-center space-x-6">
                                {user ? (
                                    <>
                                        <Link to="/profile" onClick={() => setIsOpen(false)} className="flex flex-col items-center space-y-2 text-gray-600">
                                            <div className="p-3 bg-pink-50 rounded-full text-primary">
                                                <User className="w-6 h-6" />
                                            </div>
                                            <span className="text-sm font-bold">Perfil</span>
                                        </Link>
                                        <button
                                            onClick={() => { logout(); setIsOpen(false); window.location.href = '/'; }}
                                            className="flex flex-col items-center space-y-2 text-red-400"
                                        >
                                            <div className="p-3 bg-red-50 rounded-full">
                                                <LogOut className="w-6 h-6" />
                                            </div>
                                            <span className="text-sm font-bold">Salir</span>
                                        </button>
                                    </>
                                ) : (
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="flex flex-col items-center space-y-2 text-gray-600">
                                        <div className="p-3 bg-pink-50 rounded-full text-primary">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <span className="text-sm font-bold">Ingresar</span>
                                    </Link>
                                )}
                                <Link to="/cart" onClick={() => setIsOpen(false)} className="flex flex-col items-center space-y-2 text-gray-600">
                                    <div className="p-3 bg-pink-50 rounded-full text-primary relative">
                                        <ShoppingBag className="w-6 h-6" />
                                        <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                            {getCartCount()}
                                        </span>
                                    </div>
                                    <span className="text-sm font-bold">Carrito</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )
                }
            </AnimatePresence >
        </>
    );
};

export default Navbar;
