import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Star, Zap, Shield, Truck, Smartphone, Coffee, ShoppingBag, Heart, Sparkles, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import bannerHome from '../assets/banner/banner-kimju.jpg';
import { useCart } from '../context/CartContext';
import SEO from '../components/common/SEO';

const Home = () => {
    const { addToCart, setIsCartOpen } = useCart();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    // Typing effect removed as per request
    const displayText = "Kimju Hogar";

    const [categories, setCategories] = useState([]);

    // Newsletter State
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const res = await axios.post('http://localhost:5000/api/newsletter', { email });
            setMessage(res.data.msg);
            setEmail('');
        } catch (err) {
            setMessage(err.response?.data?.msg || 'Error al suscribirse. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/products'),
                    axios.get('http://localhost:5000/api/categories')
                ]);
                setProducts(productsRes.data);
                setCategories(categoriesRes.data);
            } catch (err) {
                console.error("Error fetching data", err);
            }
        };
        fetchData();
    }, []);


    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Store",
        "name": "Kimju Hogar",
        "image": "https://kimjuhogar.com/logo.png", // Start using absolute URLs for production
        "description": "Tienda de decoración, hogar y accesorios en Valledupar.",
        "telephone": "+573000000000",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Calle Principal #123",
            "addressLocality": "Valledupar",
            "addressRegion": "Cesar",
            "postalCode": "200001",
            "addressCountry": "CO"
        },
        "url": "https://kimjuhogar.com",
        "priceRange": "$$"
    };

    return (
        <PageTransition>
            <SEO
                title="Tu Tienda para tu Hogar"
                description="Kimju Hogar es tu tienda favorita de decoración, hogar y cositas maravillosas en Valledupar, Colombia. ✨"
                schema={organizationSchema}
                canonical="https://kimjuhogar.com/"
            />
            <h1 className="sr-only">Kimju Hogar - Decoración y Estilo en Colombia</h1>
            <div className="min-h-screen pt-24 overflow-x-hidden">
                {/* Hero Section - Restored to Minimalist Image + Buttons */}
                <section className="relative w-full h-auto min-h-[600px] md:h-auto overflow-hidden bg-white">
                    {/* Full Banner Image (contains text/logo within it) */}
                    <div className="relative w-full">
                        <img src={bannerHome} alt="Kimju Hogar Banner" className="w-full h-auto object-contain md:object-cover" />

                        {/* Buttons Overlay - Vertically Stacked, No Card Background */}
                        <div className="absolute inset-0 flex flex-col justify-end items-center pb-8 sm:pb-12 md:pb-44 pointer-events-none">
                            <div className="flex flex-col gap-3 sm:gap-4 pointer-events-auto w-full px-8 sm:px-0 sm:w-auto">
                                <Link to="/shop" className="bg-[#F43F5E] text-white py-3 px-12 rounded-full font-bold uppercase tracking-widest hover:bg-[#BE123C] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-center text-sm md:text-base">
                                    Ver Colección
                                </Link>
                                <Link to="/contact" className="bg-white text-[#F43F5E] border-2 border-[#F43F5E] py-3 px-12 rounded-full font-bold uppercase tracking-widest hover:bg-pink-50 transition-all text-center text-sm md:text-base shadow-md">
                                    Contáctanos
                                </Link>
                            </div>
                        </div>

                    </div>
                </section>
                {/* Categories - Dynamic Kawaii Section */}
                <section className="py-16 px-4 bg-accent/30 relative overflow-hidden">
                    {/* Decorations */}
                    <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-0 pointer-events-none">
                        <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="pinkWave" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#FF8DAE" stopOpacity="0.8" />
                                    <stop offset="50%" stopColor="#FBCFE8" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#FF8DAE" stopOpacity="0.8" />
                                </linearGradient>
                            </defs>
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="url(#pinkWave)"></path>
                            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,61.67,103,71.05s82.64-12.75,115.54-36.88c29-21.27,51.84-48,82.46-63.51S923.47,0,958.46,0Z" fill="#FFF" opacity="0.3"></path>
                        </svg>
                    </div>
                    {/* Floating Decorations */}
                    <div className="absolute top-10 left-10 text-primary/20 animate-float"><Sparkles className="w-12 h-12" /></div>
                    <div className="absolute bottom-10 right-10 text-primary/20 animate-float-delayed"><Heart className="w-12 h-12 fill-current" /></div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-display font-black text-secondary mb-2 flex items-center justify-center gap-2">
                                <Sparkles className="w-6 h-6 text-primary animate-kawaii-sparkle" />
                                Categorías <span className="text-[#F43F5E]">Favoritas</span>
                            </h2>
                            <p className="text-gray-500 font-medium text-sm">¡Todo lo que amas en un solo lugar! 🎀</p>
                        </div>

                        {categories.length > 0 ? (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6">
                                {categories.map((cat, idx) => {
                                    const iconMap = { Star, Heart, ShoppingBag, Coffee, Smartphone, Zap, Truck, Shield, Wait: AlertTriangle };
                                    const IconComp = (cat.icon && iconMap[cat.icon]) ? iconMap[cat.icon] : Star;

                                    return (
                                        <Link to={`/shop?category=${cat.name}`} key={cat._id} className="group flex flex-col items-center">
                                            <motion.div
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: idx * 0.05 }}
                                                whileHover={{ y: -5, scale: 1.1 }}
                                                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-[2rem] flex items-center justify-center cursor-pointer border-2 border-pink-100 group-hover:border-[#F43F5E] shadow-md group-hover:shadow-pink-200/50 transition-all relative overflow-hidden"
                                            >
                                                {/* Decorative blob */}
                                                <div className="absolute inset-0 bg-pink-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full scale-0 group-hover:scale-150 duration-500" />

                                                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden flex items-center justify-center">
                                                    {cat.image ? (
                                                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:rotate-6 transition-transform duration-300" />
                                                    ) : (
                                                        <div className="text-pink-300">
                                                            <IconComp className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 group-hover:rotate-12 transition-transform" />
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                            <h3 className="mt-3 font-display font-bold text-xs sm:text-sm text-secondary group-hover:text-[#F43F5E] transition-colors text-center truncate w-full px-1">{cat.name}</h3>
                                        </Link>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-400 font-bold">Cargando categorías...</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Trending Products */}
                <section className="py-24 bg-white/50 backdrop-blur-sm border-y-4 border-pink-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-4xl font-display font-black text-secondary flex items-center gap-3">
                                    <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                                    Lo Más Trending
                                </h2>
                            </div>
                            <Link to="/shop" className="hidden md:flex items-center font-bold text-primary hover:text-primary-dark transition-colors">
                                Ver todo <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                            {products.slice(0, 4).map((product) => (
                                <div
                                    key={product._id}
                                    className="group relative cursor-pointer"
                                    onClick={() => navigate(`/product/${product._id}`)}
                                >
                                    <div className="card-kawaii h-full flex flex-col relative bg-white">
                                        {/* Image Container */}
                                        <div className="aspect-[4/5] overflow-hidden bg-gray-50 relative p-4">
                                            {product.discount > 0 && (
                                                <span className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10 rotate-3">
                                                    -{product.discount}% OFF
                                                </span>
                                            )}
                                            <img
                                                src={product.image || 'https://via.placeholder.com/400x500'}
                                                alt={product.name}
                                                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Quick Add Overlay */}
                                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-b-2xl">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        addToCart(product);
                                                        setIsCartOpen(true);
                                                    }}
                                                    className="bg-white text-primary font-bold px-6 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform hover:bg-primary hover:text-white relative z-30"
                                                >
                                                    Añadir al Carrito 🌸
                                                </button>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="p-5 flex flex-col flex-1">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    navigate(`/shop?category=${product.category || 'General'}`);
                                                }}
                                                className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 hover:text-primary transition-colors w-max relative z-20"
                                            >
                                                {product.category || 'General'}
                                            </button>
                                            <h3 className="text-lg font-bold text-secondary leading-tight mb-2 group-hover:text-primary transition-colors">
                                                {product.name}
                                            </h3>
                                            <div className="mt-auto flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    {product.discount > 0 && (
                                                        <span className="text-gray-400 text-xs line-through">
                                                            ${product.price.toLocaleString()}
                                                        </span>
                                                    )}
                                                    <span className="text-xl font-display font-black text-primary-dark">
                                                        ${(product.price * (1 - (product.discount || 0) / 100)).toLocaleString()}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // Toggle favorite logic if needed
                                                    }}
                                                    className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                                                >
                                                    <Heart className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-center md:hidden">
                            <Link to="/shop" className="btn-kawaii-outline inline-block">
                                Ver todo el catálogo
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Trust Features */}
                <section className="py-12 border-t border-gray-100 bg-primary">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { icon: Truck, title: "Envío Nacional", desc: "A todo Colombia" },
                                { icon: Shield, title: "Pago Seguro", desc: "100% Protegido" },
                                { icon: Star, title: "Calidad Premium", desc: "Garantizada" },
                                { icon: Zap, title: "Entrega Rápida", desc: "2-5 días hábiles" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -8, scale: 1.05 }}
                                    className="flex flex-col items-center text-center p-6 shadow-lg border-2 border-white group rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-display font-bold text-white text-sm group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-[10px] uppercase font-bold text-white group-hover:text-primary mt-1 tracking-wider">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter / CTA */}
                <section className="py-24 px-4">
                    <div className="max-w-4xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                        {/* Decorative circles */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2" />
                        <div className="absolute top-1/2 right-10 text-white/10 animate-float hidden md:block"><Sparkles className="w-20 h-20" /></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
                                ¡Únete a nuestro Club! 🎀
                            </h2>
                            <p className="text-pink-100 text-lg mb-10 max-w-xl mx-auto">
                                Recibe ofertas exclusivas, tips de decoración y sé la primera en enterarte de los nuevos lanzamientos.
                            </p>

                            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    placeholder="Tu correo electrónico..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 px-6 py-4 rounded-full border-none outline-none focus:ring-4 focus:ring-pink-300 transition-all font-medium"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-secondary text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? '...' : 'Suscribirse'}
                                </button>
                            </form>
                            {message && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`mt-4 font-bold ${message.includes('Error') || message.includes('registrado') ? 'text-red-200' : 'text-white'}`}
                                >
                                    {message}
                                </motion.p>
                            )}
                        </div>
                    </div>
                </section>
            </div >
        </PageTransition >
    );
};

export default Home;
