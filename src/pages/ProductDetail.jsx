import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Star, Truck, ShieldCheck, ArrowLeft, Minus, Plus, AlertCircle, Check } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImg, setActiveImg] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
                // Pre-select first variation if exists
                if (res.data.variations && res.data.variations.length > 0) {
                    setSelectedVariation(res.data.variations[0]);
                }
            } catch (err) {
                console.error("Error fetching product details", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-bold uppercase">Cargando producto...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold uppercase">Producto no encontrado</div>;

    return (
        <PageTransition>
            <div className="bg-gray-50 min-h-screen pt-24 pb-20">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to="/shop" className="inline-flex items-center font-bold uppercase text-xs mb-8 hover:underline">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Volver a la tienda
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Image Gallery */}
                        <div className="space-y-6">
                            <div className="bg-white border-2 border-black p-4 shadow-neo aspect-square relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                                {product.discount > 0 && (
                                    <span className="absolute top-6 left-6 bg-primary border-2 border-black px-3 py-1 text-sm font-black z-10">
                                        -{product.discount}% OFF
                                    </span>
                                )}
                            </div>
                            {product.images && product.images.length > 0 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {[product.image, ...product.images].map((img, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setActiveImg(idx)}
                                            className={`bg-white border-2 aspect-square p-2 cursor-pointer transition-all ${activeImg === idx ? 'border-primary shadow-neo' : 'border-black hover:border-gray-500'}`}
                                        >
                                            <img src={img} className="w-full h-full object-contain" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col justify-center">
                            <div className="mb-2">
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-300 px-2 py-1 rounded-sm">{product.category}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight mb-4 leading-none">{product.name}</h1>

                            <div className="flex items-center space-x-4 mb-8 border-b-2 border-gray-100 pb-8">
                                <div className="flex flex-col">
                                    {product.discount > 0 && (
                                        <span className="text-gray-400 text-sm font-bold line-through">
                                            ${product.price.toLocaleString()}
                                        </span>
                                    )}
                                    <span className="text-4xl font-mono font-bold">
                                        ${(product.price * (1 - (product.discount || 0) / 100)).toLocaleString()}
                                    </span>
                                </div>
                                {product.discount > 0 && (
                                    <span className="bg-primary text-black px-2 py-1 text-xs font-black uppercase border border-black">
                                        Ahorras: ${(product.price * ((product.discount || 0) / 100)).toLocaleString()}
                                    </span>
                                )}
                                <div className="flex items-center text-yellow-400 ml-auto">
                                    {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-current" />)}
                                </div>
                            </div>

                            <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                                {product.description}
                            </p>

                            {/* Variations */}
                            {product.variations && product.variations.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-xs font-black uppercase mb-3">Variante</h3>
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
                                                    className={`px-4 py-2 border-2 font-bold uppercase text-xs transition-all ${selectedVariation === v ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200 hover:border-black'}`}
                                                >
                                                    {v}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <div className="flex items-center border-2 border-black bg-white w-max">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100 transition-colors"><Minus className="w-4 h-4" /></button>
                                    <span className="px-4 font-bold font-mono">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100 transition-colors"><Plus className="w-4 h-4" /></button>
                                </div>
                                <button
                                    onClick={() => {
                                        addToCart(product, quantity, selectedVariation);
                                        setAdded(true);
                                        setTimeout(() => setAdded(false), 2000);
                                    }}
                                    className={`flex-1 py-4 uppercase font-black tracking-wider flex items-center justify-center transition-all ${added ? 'bg-green-500 border-green-600 text-white' : 'btn-neo-primary'}`}
                                >
                                    {added ? <><Check className="w-5 h-5 mr-2" /> Agregado</> : <><ShoppingCart className="w-5 h-5 mr-2" /> Agregar al Carrito</>}
                                </button>
                            </div>

                            {/* Trust Signals */}
                            <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase text-gray-500 bg-white border-2 border-gray-100 p-6">
                                <div className="flex items-center"><Truck className="w-5 h-5 mr-3 text-black" /> Envío Nacional Rápido</div>
                                <div className="flex items-center"><AlertCircle className="w-5 h-5 mr-3 text-black" /> No se aceptan devoluciones</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default ProductDetail;
