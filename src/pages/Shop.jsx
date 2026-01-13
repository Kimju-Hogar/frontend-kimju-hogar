import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowRight, Heart, Sparkles, ShoppingBag } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import SEO from '../components/common/SEO';

const Shop = () => {
    const { addToCart, setIsCartOpen } = useCart();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const location = useLocation();

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShopData = async () => {
            try {
                // Initial category and search from URL
                const params = new URLSearchParams(location.search);
                const catParam = params.get('category');
                const searchParam = params.get('search');

                if (catParam) setSelectedCategory(catParam);
                if (searchParam) setSearchTerm(searchParam);

                const [prodRes, catRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/products'),
                    axios.get('http://localhost:5000/api/categories')
                ]);

                setProducts(prodRes.data);

                // Process counts
                const cats = catRes.data;
                const totalCount = prodRes.data.length;
                setCategories([
                    { name: 'All', productCount: totalCount },
                    ...cats
                ]);

            } catch (err) {
                console.error("Error fetching shop data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchShopData();
    }, [location.search]);

    useEffect(() => {
        let result = products;

        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        if (searchTerm) {
            result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        setFilteredProducts(result);
    }, [searchTerm, selectedCategory, products]);

    return (
        <PageTransition>
            <SEO title="Tienda de Cositas Lindas" description="Explora nuestro catálogo de productos kawaii y decoración para el hogar en Valledupar." />
            <div className="bg-white/50 min-h-screen pt-24 pb-20 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-100/40 rounded-full blur-[100px] -z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[100px] -z-10 pointer-events-none" />

                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                                <h1 className="text-5xl font-display font-black text-secondary tracking-tight">Tienda</h1>
                            </div>
                            <p className="text-gray-500 font-medium max-w-md">Explora nuestra colección de cositas lindas para tu hogar. 🌸</p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Buscar cositas..."
                                className="w-full bg-white border-2 border-pink-100 rounded-full p-4 pl-12 font-medium text-gray-600 placeholder:text-pink-300 focus:outline-none focus:border-primary focus:ring-4 focus:ring-pink-100 transition-all shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-4 top-4 w-6 h-6 text-pink-300" />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar Filters */}
                        <aside className="w-full lg:w-64 space-y-8 flex-shrink-0">
                            <div className="bg-white/80 backdrop-blur-sm border-2 border-pink-100 rounded-3xl p-6 shadow-sm">
                                <h3 className="text-xl font-display font-bold mb-6 flex items-center text-secondary border-b-2 border-pink-50 pb-2">
                                    <Filter className="w-5 h-5 mr-2 text-primary" /> Categorías
                                </h3>
                                <ul className="space-y-2">
                                    {categories.map((cat, idx) => (
                                        <li key={idx}>
                                            <button
                                                onClick={() => setSelectedCategory(cat.name)}
                                                className={`w-full text-left font-bold text-sm px-4 py-3 rounded-xl transition-all flex justify-between items-center
                                                ${selectedCategory === cat.name
                                                        ? 'bg-primary text-white shadow-md transform scale-105'
                                                        : 'text-gray-500 hover:bg-pink-50 hover:text-primary'}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {cat.name === 'All' ? 'Todos' : cat.name}
                                                    {selectedCategory === cat.name && <Heart className="w-3 h-3 fill-white" />}
                                                </div>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedCategory === cat.name ? 'bg-white/20 text-white' : 'bg-pink-50 text-primary'}`}>
                                                    {cat.productCount}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>

                        {/* Product Grid */}
                        <div className="flex-1">
                            {loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} className="animate-pulse bg-gray-100 rounded-3xl aspect-[3/4]"></div>
                                    ))}
                                </div>
                            ) : filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {filteredProducts.map(product => (
                                        <div
                                            key={product._id}
                                            className="group block cursor-pointer"
                                            onClick={() => navigate(`/product/${product._id}`)}
                                        >
                                            <div className="card-kawaii h-full flex flex-col relative">
                                                <div className="relative aspect-square overflow-hidden bg-gray-50 p-4 rounded-b-3xl">
                                                    {product.discount > 0 && (
                                                        <span className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full shadow-sm z-10 rotate-3">
                                                            -{product.discount}%
                                                        </span>
                                                    )}
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="p-6">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                setSelectedCategory(product.category);
                                                            }}
                                                            className="inline-block bg-pink-50 px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider text-primary border border-pink-100 hover:bg-primary hover:text-white transition-colors relative z-20"
                                                        >
                                                            {product.category}
                                                        </button>
                                                        {product.stock <= 5 && product.stock > 0 && (
                                                            <span className="text-[10px] font-bold text-red-400 uppercase flex items-center bg-red-50 px-2 py-0.5 rounded-full">
                                                                ¡Últimos!
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="text-lg text-white mb-1 truncate group-hover:text-white transition-colors" title={product.name}>{product.name}</h3>
                                                    <div className="flex justify-between items-end mt-4">
                                                        <div className="flex flex-col">
                                                            {product.discount > 0 && (
                                                                <span className="text-secondary text-xs font-semibold hidden md:block">
                                                                    Antes ${product.price.toLocaleString()}
                                                                </span>
                                                            )}
                                                            <span className="text-2xl font-display text-primary px-2 bg-white rounded-full group-hover:scale-105 transition-transform duration-500">
                                                                ${(product.price * (1 - (product.discount || 0) / 100)).toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                addToCart(product);
                                                                setIsCartOpen(true);
                                                            }}
                                                            className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center group-hover:bg-white group-hover:text-secondary transition-colors shadow-lg transform group-hover:scale-110 relative z-20"
                                                        >
                                                            <ShoppingBag className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white/50 border-2 border-dashed border-pink-200 rounded-3xl">
                                    <p className="text-2xl font-bold text-gray-300 mb-2">No se encontraron productos 😢</p>
                                    <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="mt-4 text-primary font-bold underline hover:text-primary-dark">Ver todos los productos</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Shop;
