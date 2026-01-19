import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Star, Truck, ArrowLeft, Minus, Plus, Heart, Check, Sparkles } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart, setIsCartOpen } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImg, setActiveImg] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [added, setAdded] = useState(false);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
                // Pre-select first variation if exists
                if (res.data.variations && res.data.variations.length > 0) {
                    setSelectedVariation(res.data.variations[0]);
                }

                // Check if favorite (simplistic check if user is logged in)
                const token = localStorage.getItem('token');
                if (token) {
                    const profileRes = await axios.get('http://localhost:5000/api/users/profile', {
                        headers: { 'x-auth-token': token }
                    });
                    setIsFavorite(profileRes.data.favorites?.includes(id));
                }

                // Fetch similar products
                const similarRes = await axios.get(`http://localhost:5000/api/products/${id}/similar`);
                setSimilarProducts(similarRes.data);
            } catch (err) {
                console.error("Error fetching product details", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleToggleFavorite = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Por favor inicia sesión para guardar tus favoritos 🎀');
            return;
        }
        try {
            await axios.post(`http://localhost:5000/api/users/favorites/${id}`, {}, {
                headers: { 'x-auth-token': token }
            });
            setIsFavorite(!isFavorite);
        } catch (err) {
            console.error("Error toggling favorite", err);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-primary animate-pulse">Cargando cositas... 🌸</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center text-red-400 font-bold">Producto no encontrado 😢</div>;

    const currentImage = (product.images && product.images.length > 0) ? [product.image, ...product.images][activeImg] : product.image;

    const productSchema = product ? {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": product.image,
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": "Kimju Hogar"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "COP",
            "price": product.price,
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "url": window.location.href
        }
    } : null;

    return (
        <PageTransition>
            <SEO
                title={product.name}
                description={product.description}
                image={product.image}
                schema={productSchema}
                canonical={window.location.href}
            />
            <div className="bg-white min-h-screen pt-28 pb-20 overflow-hidden relative">
                {/* Background Blobs */}
                <div className="absolute top-20 left-0 w-96 h-96 bg-primary-light/20 rounded-full blur-[80px] -z-10 pointer-events-none" />
                <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[80px] -z-10 pointer-events-none" />

                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to="/shop" className="inline-flex items-center font-bold text-xs mb-8 text-gray-500 hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Volver a la tienda
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
                        {/* Image Gallery */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white border-4 border-pink-100 rounded-[2rem] p-8 shadow-xl aspect-square relative flex items-center justify-center overflow-hidden"
                            >
                                <img
                                    src={currentImage}
                                    alt={product.name}
                                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                                />
                                {product.discount > 0 && (
                                    <span className="absolute top-6 left-6 bg-primary text-white border-2 border-white px-4 py-2 text-sm font-bold rounded-full shadow-lg z-10 animate-bounce-slow">
                                        -{product.discount}% OFF
                                    </span>
                                )}
                            </motion.div>

                            {/* Thumbnails */}
                            {(product.images && product.images.length > 0) && (
                                <div className="flex gap-4 justify-center">
                                    {[product.image, ...product.images].map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImg(idx)}
                                            className={`w-20 h-20 bg-white border-2 rounded-2xl p-2 cursor-pointer transition-all ${activeImg === idx ? 'border-primary shadow-lg scale-110' : 'border-gray-100 hover:border-pink-200'}`}
                                        >
                                            <img src={img} className="w-full h-full object-contain rounded-lg" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col justify-center">
                            <div className="mb-4">
                                <Link to={`/shop?category=${product.category}`} className="text-xs font-bold uppercase tracking-widest text-primary bg-pink-50 px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-all">
                                    {product.category}
                                </Link>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-display font-black text-secondary tracking-tight mb-4 leading-none">{product.name}</h1>

                            <div className="flex items-center space-x-6 mb-8 border-b-2 border-pink-50 pb-8">
                                <div className="flex flex-col">
                                    {product.discount > 0 && (
                                        <span className="text-gray-400 text-sm font-bold line-through">
                                            ${product.price.toLocaleString()}
                                        </span>
                                    )}
                                    <span className="text-5xl font-display font-black text-primary-dark">
                                        ${(product.price * (1 - (product.discount || 0) / 100)).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center text-yellow-400">
                                    {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-current" />)}
                                    <span className="ml-2 text-gray-400 text-xs font-bold">(4.9)</span>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-8 leading-relaxed font-medium text-lg">
                                {product.description}
                            </p>

                            {/* Variations */}
                            {product.variations && product.variations.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-sm font-bold uppercase text-gray-500 mb-3">Elige tu favorito:</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {/* Flatten and split variations just in case backend data is mixed */}
                                        {product.variations
                                            .flatMap(v => v.split(','))
                                            .map(v => v.trim())
                                            .filter(v => v)
                                            .map((v) => (
                                                <button
                                                    key={v}
                                                    onClick={() => setSelectedVariation(v)}
                                                    className={`px-6 py-2 border-2 rounded-full font-bold text-sm transition-all ${selectedVariation === v ? 'bg-primary text-white border-primary shadow-lg transform -translate-y-1' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'}`}
                                                >
                                                    {v}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            )}

                            {/* Stock Info */}
                            <div className="mb-6 flex items-center gap-2">
                                <span className="text-secondary font-bold text-sm">Disponibilidad:</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                                    {product.stock > 0 ? `${product.stock} unidades en stock` : 'Agotado'}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <div className="flex items-center border-2 border-pink-100 bg-white rounded-full w-max shadow-sm">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4 hover:text-primary transition-colors"><Minus className="w-4 h-4" /></button>
                                    <span className="px-4 font-bold font-display text-xl">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="p-4 hover:text-primary transition-colors"><Plus className="w-4 h-4" /></button>
                                </div>
                                <button
                                    onClick={() => {
                                        addToCart(product, quantity, selectedVariation);
                                        setAdded(true);
                                        setIsCartOpen(true);
                                        setTimeout(() => setAdded(false), 2000);
                                    }}
                                    className={`flex-1 py-4 px-8 rounded-full font-bold tracking-wider flex items-center justify-center transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 ${added ? 'bg-green-500 text-white' : 'bg-secondary text-white hover:bg-primary'}`}
                                >
                                    {added ? <><Check className="w-5 h-5 mr-2" /> ¡Listo!</> : <><ShoppingBag className="w-5 h-5 mr-2" /> Agregar al Carrito</>}
                                </button>
                                <button
                                    onClick={handleToggleFavorite}
                                    className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${isFavorite ? 'bg-primary border-primary text-white shadow-lg' : 'border-pink-100 text-pink-300 hover:bg-pink-50 hover:text-primary'}`}
                                >
                                    <Heart className={`w-6 h-6 ${isFavorite ? 'fill-white' : ''}`} />
                                </button>
                            </div>

                            {/* Trust Signals */}
                            <div className="flex gap-6 text-xs font-bold uppercase text-gray-500">
                                <div className="flex items-center bg-pink-50/50 px-4 py-2 rounded-lg gap-2 border border-pink-100">
                                    <Truck className="w-5 h-5 text-primary" />
                                    <span className="text-primary-dark">Envío Contra Entrega</span>
                                </div>
                                <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg gap-2">
                                    <Star className="w-5 h-5 text-primary" />
                                    <span>Garantía de Calidad</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recommended Products Section */}
                    {similarProducts.length > 0 && (
                        <div className="border-t-2 border-pink-50 pt-16">
                            <h2 className="text-3xl font-display font-black text-secondary mb-10 flex items-center gap-3">
                                <Sparkles className="w-6 h-6 text-primary" />
                                Cositas Similares que te Encantarán
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {similarProducts.map((p) => (
                                    <Link to={`/product/${p._id}`} key={p._id} className="group block">
                                        <div className="bg-white border-2 border-pink-50 rounded-3xl p-4 hover:border-primary hover:shadow-xl transition-all h-full flex flex-col">
                                            <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-50">
                                                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                            </div>
                                            <h3 className="font-bold text-secondary text-sm group-hover:text-primary truncate mb-2">{p.name}</h3>
                                            <p className="text-primary-dark font-black mt-auto">
                                                ${(p.price * (1 - (p.discount || 0) / 100)).toLocaleString()}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PageTransition>
    );
};

export default ProductDetail;
