import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart, setIsCartOpen } = useCart();
    const [isHovered, setIsHovered] = useState(false);

    // Determine secondary image
    const secondaryImage = (product.images && product.images.length > 0) ? product.images[0] : null;

    return (
        <div
            className="group block cursor-pointer h-full"
            onClick={() => navigate(`/product/${product._id}`)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            tabIndex="0"
            role="button"
            aria-label={`Ver detalles de ${product.name}`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/product/${product._id}`);
                }
            }}
        >
            <div className="card-kawaii h-full flex flex-col relative bg-white transition-all duration-300 hover:shadow-xl">
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 p-4 rounded-b-3xl">
                    {product.discount > 0 && (
                        <span className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10 rotate-3">
                            -{product.discount}% OFF
                        </span>
                    )}

                    {/* Main Image */}
                    <motion.img
                        src={product.image || 'https://via.placeholder.com/400x500'}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-xl absolute inset-0 p-4"
                        animate={{ opacity: (isHovered && secondaryImage) ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                        loading="lazy"
                        width="400"
                        height="500"
                    />

                    {/* Secondary Image (on Hover) */}
                    {secondaryImage && (
                        <motion.img
                            src={secondaryImage}
                            alt={`${product.name} vista secundaria`}
                            className="w-full h-full object-cover rounded-xl absolute inset-0 p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            loading="lazy"
                            width="400"
                            height="500"
                        />
                    )}

                    {/* Quick Add Overlay */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-b-3xl pointer-events-none">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(product);
                                setIsCartOpen(true);
                            }}
                            className="bg-white text-primary font-bold px-6 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform hover:bg-primary hover:text-white relative z-30 pointer-events-auto flex items-center gap-2"
                            aria-label={`Añadir ${product.name} al carrito`}
                        >
                            <ShoppingBag className="w-4 h-4" /> Añadir
                        </button>
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                navigate(`/shop?category=${product.category || 'General'}`);
                            }}
                            className="inline-block bg-pink-50 px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider text-primary border border-pink-100 hover:bg-primary hover:text-white transition-colors relative z-20"
                        >
                            {product.category || 'General'}
                        </button>
                        {product.stock <= 5 && product.stock > 0 && (
                            <span className="text-[10px] font-bold text-red-400 uppercase flex items-center bg-red-50 px-2 py-0.5 rounded-full">
                                ¡Últimos!
                            </span>
                        )}
                    </div>

                    <h3 className="text-lg font-bold text-secondary leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                    </h3>

                    <div className="mt-auto flex items-center justify-between">
                        <div className="flex flex-col">
                            {product.discount > 0 && (
                                <span className="text-gray-400 text-xs line-through font-medium">
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
                            className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm"
                            aria-label="Agregar a favoritos"
                        >
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
