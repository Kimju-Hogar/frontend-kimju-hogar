import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingCart, ArrowRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShopData = async () => {
            try {
                const [prodRes, catRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/products'),
                    axios.get('http://localhost:5000/api/categories')
                ]);

                setProducts(prodRes.data);
                setFilteredProducts(prodRes.data);
                setCategories(['All', ...catRes.data.map(c => c.name)]);
            } catch (err) {
                console.error("Error fetching shop data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchShopData();
    }, []);

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
            <div className="bg-gray-50 min-h-screen pt-24 pb-20">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <h1 className="text-6xl font-display font-black uppercase tracking-tight mb-2">Tienda</h1>
                            <p className="text-gray-500 font-medium max-w-md">Explora nuestra colección exclusiva de productos de diseño vanguardista.</p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="BUSCAR PRODUCTOS..."
                                className="w-full bg-white border-2 border-black p-4 pl-12 font-bold uppercase placeholder:text-gray-400 focus:outline-none focus:shadow-neo transition-shadow"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-4 top-4 w-6 h-6 text-black" />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar Filters */}
                        <aside className="w-full lg:w-64 space-y-8 flex-shrink-0">
                            <div className="bg-white border-2 border-black p-6 shadow-neo">
                                <h3 className="text-xl font-black uppercase mb-6 flex items-center border-b-2 border-gray-100 pb-2">
                                    <Filter className="w-5 h-5 mr-2" /> Categorías
                                </h3>
                                <ul className="space-y-3">
                                    {categories.map((cat, idx) => (
                                        <li key={idx}>
                                            <button
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`w-full text-left font-bold uppercase text-sm px-3 py-2 border-l-4 transition-all hover:pl-5 
                                                ${selectedCategory === cat
                                                        ? 'border-primary bg-gray-50 text-black'
                                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-black'}`}
                                            >
                                                {cat}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white border-2 border-black p-6 shadow-neo">
                                <h3 className="text-xl font-black uppercase mb-4">Precio</h3>
                                <div className="space-y-2">
                                    {/* Simple price filter placeholder - can be expanded */}
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-black border-2 border-black rounded-none focus:ring-0" />
                                        <span className="font-bold text-xs uppercase text-gray-600">Ofertas</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-black border-2 border-black rounded-none focus:ring-0" />
                                        <span className="font-bold text-xs uppercase text-gray-600">Stock Limitado</span>
                                    </label>
                                </div>
                            </div>
                        </aside>

                        {/* Product Grid */}
                        <div className="flex-1">
                            {loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} className="animate-pulse bg-white border-2 border-gray-200 aspect-[3/4]"></div>
                                    ))}
                                </div>
                            ) : filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {filteredProducts.map(product => (
                                        <Link to={`/product/${product._id}`} key={product._id} className="group block bg-white border-2 border-black shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                                            <div className="relative aspect-square overflow-hidden border-b-2 border-black bg-gray-100">
                                                {product.discount > 0 && (
                                                    <span className="absolute top-3 right-3 bg-primary border-2 border-black px-2 py-1 text-xs font-black z-10">
                                                        -{product.discount}%
                                                    </span>
                                                )}
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-5">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="inline-block bg-gray-100 px-2 py-1 text-[10px] uppercase font-black tracking-wider text-gray-500 border border-gray-200">
                                                        {product.category}
                                                    </span>
                                                    {product.stock <= 5 && product.stock > 0 && (
                                                        <span className="text-[10px] font-bold text-red-500 uppercase flex items-center">
                                                            ¡Pocas Unidades!
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-lg font-black uppercase mb-1 truncate" title={product.name}>{product.name}</h3>
                                                <div className="flex justify-between items-end mt-4">
                                                    <div className="flex flex-col">
                                                        {product.discount > 0 && (
                                                            <span className="text-gray-400 text-xs font-bold line-through hidden md:block">
                                                                ${product.price.toLocaleString()}
                                                            </span>
                                                        )}
                                                        <span className="text-xl font-mono font-bold">
                                                            ${(product.price * (1 - (product.discount || 0) / 100)).toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <button className="bg-black text-white p-2 hover:bg-primary hover:text-black transition-colors border border-black">
                                                        <ArrowRight className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white border-2 border-black shadow-neo">
                                    <p className="text-2xl font-black uppercase text-gray-300">No se encontraron productos</p>
                                    <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="mt-4 text-primary font-bold underline">Limpiar filtros</button>
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
