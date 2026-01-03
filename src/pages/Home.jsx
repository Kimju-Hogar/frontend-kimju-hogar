import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Star, Zap, Shield, Truck, Smartphone, Coffee, Monitor, ShoppingCart, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products", err);
            }
        };
        fetchProducts();
    }, []);

    const categories = [
        { name: 'Decoración', icon: Star },
        { name: 'Tecnología', icon: Smartphone },
        { name: 'Cocina', icon: Coffee },
        { name: 'Iluminación', icon: Zap },
    ];

    return (
        <PageTransition>
            <div className="bg-white min-h-screen pt-20">

                {/* Hero Section */}
                <section className="relative h-[85vh] bg-black text-white overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block border border-white/30 bg-white/10 backdrop-blur-md px-4 py-1 rounded-full mb-4"
                        >
                            <span className="text-sm font-bold tracking-widest uppercase text-primary">Nueva Colección 2026</span>
                        </motion.div>

                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-9xl font-display font-black uppercase tracking-tighter leading-none"
                        >
                            Futuro <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 stroke-text-white">Estético</span>
                        </motion.h1>

                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-xl md:text-3xl font-light text-gray-200 max-w-3xl mx-auto leading-relaxed"
                        >
                            Redefiniendo tu espacio con productos que fusionan diseño vanguardista y funcionalidad extrema.
                        </motion.p>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
                        >
                            <Link to="/shop" className="btn-neo-primary px-12 py-5 text-xl uppercase font-black tracking-widest hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] hover:shadow-none">
                                Explorar Colección
                            </Link>
                            <Link to="/shop" className="px-12 py-5 text-xl uppercase font-bold tracking-widest text-white border-2 border-white hover:bg-white hover:text-black transition-all">
                                Ver Ofertas
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Featured Products (Trends) */}
                <section className="py-24 px-4 md:px-12 bg-white border-b-2 border-black">
                    <div className="max-w-[1600px] mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-display font-black uppercase flex items-center mb-2">
                                    <Rocket className="mr-4 w-10 h-10 text-primary" /> Tendencias
                                </h2>
                                <p className="text-gray-500 font-medium">Los productos más deseados de la temporada.</p>
                            </div>
                            <Link to="/shop" className="btn-neo-primary px-8 py-3 uppercase font-bold text-sm tracking-wider flex items-center">
                                Ver Catálogo Completo <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.length > 0 ? (
                                products.slice(0, 4).map((product) => (
                                    <Link to={`/product/${product._id}`} key={product._id} className="group block h-full flex flex-col">
                                        <div className="relative border-2 border-black bg-gray-100 aspect-[4/5] overflow-hidden shadow-neo group-hover:shadow-none transition-all">
                                            {product.discount > 0 && (
                                                <div className="absolute top-4 right-4 bg-primary text-black font-black text-xs px-2 py-1 z-10 border border-black">
                                                    -{product.discount}%
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 bg-black text-white font-bold text-[10px] px-2 py-1 z-10 uppercase tracking-wider">
                                                {product.category || 'General'}
                                            </div>
                                            <img
                                                src={product.image || 'https://via.placeholder.com/400x500'}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            {/* Overlay with Quick Add */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                                <span className="bg-white text-black px-6 py-3 font-bold uppercase tracking-widest flex items-center border-2 border-black transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                    <ShoppingCart className="w-4 h-4 mr-2" /> Ver Detalles
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-5 space-y-2 flex-1 flex flex-col">
                                            <h3 className="text-xl font-black uppercase leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                                            <div className="flex justify-between items-center mt-auto pt-2 border-t border-dashed border-gray-300">
                                                <div className="flex flex-col">
                                                    {product.discount > 0 && (
                                                        <span className="text-gray-400 text-xs font-bold line-through">
                                                            ${product.price.toLocaleString()}
                                                        </span>
                                                    )}
                                                    <p className="text-xl font-mono font-bold">
                                                        ${(product.price * (1 - (product.discount || 0) / 100)).toLocaleString()}
                                                    </p>
                                                </div>
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Stock: {product.stock}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                // Skeleton Loading
                                [1, 2, 3, 4].map(i => (
                                    <div key={i} className="animate-pulse">
                                        <div className="bg-gray-200 aspect-[4/5] w-full border-2 border-gray-300"></div>
                                        <div className="mt-4 h-6 bg-gray-200 w-3/4"></div>
                                        <div className="mt-2 h-6 bg-gray-200 w-1/4"></div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>

                {/* Categories Grid */}
                <section className="py-24 px-4 md:px-12 bg-gray-50 border-b-2 border-black">
                    <div className="max-w-[1600px] mx-auto">
                        <h2 className="text-4xl md:text-5xl font-display font-black uppercase mb-16 flex items-center">
                            <Monitor className="mr-4 w-10 h-10 text-primary" /> Categorías Populares
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {categories.map((cat, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -10 }}
                                    className="bg-white border-2 border-black p-8 shadow-neo hover:shadow-none transition-all cursor-pointer group flex flex-col items-center text-center h-full justify-between"
                                >
                                    <div className="bg-gray-100 rounded-full p-6 mb-6 group-hover:bg-primary transition-colors border-2 border-black">
                                        <cat.icon className="w-12 h-12 text-black" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black uppercase mb-2">{cat.name}</h3>
                                        <Link to={`/shop?category=${cat.name}`} className="inline-block mt-2 text-gray-500 font-bold text-sm border-b-2 border-transparent group-hover:border-black group-hover:text-black transition-all">
                                            Ver Productos &rarr;
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Catalog Introduction / Highlighted Products */}
                <section className="py-24 px-4 md:px-12 bg-white shadow-inner">
                    <div className="max-w-[1600px] mx-auto">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-display font-black uppercase mb-4">
                                Catálogo <span className="text-primary">Destacado</span>
                            </h2>
                            <p className="text-gray-500 font-medium text-lg">
                                Una selección curada de nuestros productos más versátiles para tu hogar.
                                Encuentra desde tecnología hasta decoración esencial.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-8">
                            {products.length > 0 ? (
                                // Show next batch if available, otherwise show all products to populate the grid
                                (products.length > 4 ? products.slice(4, 12) : products).slice(0, 8).map((product) => (
                                    <Link to={`/product/${product._id}`} key={product._id} className="group block">
                                        <div className="relative border-2 border-black bg-gray-100 aspect-square overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
                                            {/* Dynamic Category Badge */}
                                            <div className="absolute top-0 left-0 bg-black/90 backdrop-blur-sm text-white font-mono text-xs px-3 py-1 z-10 border-r-2 border-b-2 border-white/20">
                                                {product.category || 'GENERAL'}
                                            </div>
                                            <div className="absolute top-0 right-0 bg-primary text-black font-black text-xs px-2 py-1 z-10 border-l-2 border-b-2 border-black">
                                                TOP
                                            </div>
                                            <img
                                                src={product.image || 'https://via.placeholder.com/400x400'}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="text-base font-black uppercase leading-tight truncate">{product.name}</h3>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-500 uppercase">{product.category || 'Varios'}</span>
                                                <p className="text-lg font-mono font-bold text-gray-900">
                                                    ${(product.price * (1 - (product.discount || 0) / 100)).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-center col-span-full">Cargando catálogo...</p>
                            )}
                        </div>

                        <div className="mt-16 text-center">
                            <Link to="/shop" className="inline-block border-b-2 border-black pb-1 text-xl font-black uppercase hover:text-primary hover:border-primary transition-colors">
                                Ver Todo el Inventario &rarr;
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Newsletter */}
                <section className="py-24 bg-black text-white text-center px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-6 leading-none">
                            ¿Listo para transformar <br /> <span className="text-primary">tu espacio?</span>
                        </h2>
                        <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
                            Únete a nuestro club exclusivo y recibe ofertas anticipadas, lanzamientos de productos limitados y tips de diseño.
                        </p>
                        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="TU CORREO ELECTRÓNICO"
                                className="flex-1 bg-white/10 border-2 border-white/20 px-6 py-4 font-bold text-white outline-none focus:border-primary placeholder:text-gray-500 transition-colors"
                            />
                            <button className="bg-primary text-black border-2 border-primary px-8 py-4 font-black uppercase tracking-widest hover:bg-white hover:border-white transition-colors">
                                Suscribirse
                            </button>
                        </form>
                    </div>
                </section>

                {/* Trust Signals Carousel (White Background) */}
                <div className="bg-white py-16 overflow-hidden relative border-t-2 border-black">
                    <div className="animate-marquee whitespace-nowrap flex gap-8 w-max" style={{ minWidth: '100%' }}>
                        {/* Duplicated content for seamless loop */}
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex gap-8">
                                <div className="border-2 border-black p-6 w-80 shrink-0 flex flex-col justify-center bg-white hover:bg-black hover:text-white transition-colors group">
                                    <Truck className="w-10 h-10 text-black group-hover:text-primary mb-4 transition-colors" />
                                    <h3 className="font-black uppercase text-xl mb-1 group-hover:text-white">Envío Nacional</h3>
                                    <p className="text-gray-500 text-sm font-bold group-hover:text-gray-300">A todo Colombia</p>
                                </div>
                                <div className="border-2 border-black p-6 w-80 shrink-0 flex flex-col justify-center bg-white hover:bg-black hover:text-white transition-colors group">
                                    <Shield className="w-10 h-10 text-black group-hover:text-primary mb-4 transition-colors" />
                                    <h3 className="font-black uppercase text-xl mb-1 group-hover:text-white">Pago Seguro</h3>
                                    <p className="text-gray-500 text-sm font-bold group-hover:text-gray-300">PayU Gateway</p>
                                </div>
                                <div className="border-2 border-black p-6 w-80 shrink-0 flex flex-col justify-center bg-white hover:bg-black hover:text-white transition-colors group">
                                    <Star className="w-10 h-10 text-black group-hover:text-primary mb-4 transition-colors" />
                                    <h3 className="font-black uppercase text-xl mb-1 group-hover:text-white">Calidad Premium</h3>
                                    <p className="text-gray-500 text-sm font-bold group-hover:text-gray-300">Garantizada</p>
                                </div>
                                <div className="border-2 border-black p-6 w-80 shrink-0 flex flex-col justify-center bg-white hover:bg-black hover:text-white transition-colors group">
                                    <Zap className="w-10 h-10 text-black group-hover:text-primary mb-4 transition-colors" />
                                    <h3 className="font-black uppercase text-xl mb-1 group-hover:text-white">Entrega Rápida</h3>
                                    <p className="text-gray-500 text-sm font-bold group-hover:text-gray-300">2-5 días hábiles</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Home;
