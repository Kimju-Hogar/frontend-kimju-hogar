import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        getCartTotal
    } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-secondary/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b-2 border-pink-50 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-pink-50 rounded-xl">
                                    <ShoppingBag className="w-6 h-6 text-primary" />
                                </div>
                                <h2 className="text-2xl font-display font-black text-secondary">Mi Carrito</h2>
                                <span className="ml-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {cart.reduce((acc, item) => acc + item.quantity, 0)} items
                                </span>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length > 0 ? (
                                cart.map((item, idx) => (
                                    <div key={`${item._id}-${item.selectedVariation}`} className="flex gap-4 group">
                                        <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden border border-pink-50 flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                width="96"
                                                height="96"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-secondary text-sm truncate pr-2" title={item.name}>{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item._id, item.selectedVariation)}
                                                    className="text-gray-300 hover:text-red-400 p-1 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            {item.selectedVariation && (
                                                <p className="text-[10px] font-bold text-primary bg-pink-50 px-2 py-0.5 rounded-full w-max mb-2">
                                                    {item.selectedVariation}
                                                </p>
                                            )}
                                            <div className="flex justify-between items-end">
                                                <div className="flex items-center border border-gray-100 rounded-full p-1 gap-3 sm:gap-4 bg-gray-50">
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.selectedVariation, -1)}
                                                        className="p-1 hover:text-primary transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="font-bold text-xs">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.selectedVariation, 1)}
                                                        className="p-1 hover:text-primary transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <span className="font-black text-primary">
                                                    ${((item.price * (1 - (item.discount || 0) / 100)) * item.quantity).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-6">
                                        <ShoppingBag className="w-12 h-12 text-pink-200" />
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary mb-2">¡Tu carrito está vacío!</h3>
                                    <p className="text-gray-400 text-sm mb-8">Parece que aún no has añadido ninguna cosita maravillosa. 🌸</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-primary-dark transition-all"
                                    >
                                        Seguir Comprando
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 bg-gray-50 border-t-2 border-pink-50 space-y-4">
                                <div className="flex justify-between items-center text-secondary">
                                    <span className="font-bold">Subtotal:</span>
                                    <span className="text-2xl font-black text-primary">${getCartTotal().toLocaleString()}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center">
                                    Envío calculado al finalizar compra 🚛
                                </p>
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <Link
                                        to="/cart"
                                        onClick={() => setIsCartOpen(false)}
                                        className="py-4 rounded-2xl bg-white border-2 border-pink-100 text-primary font-bold text-center hover:bg-pink-50 transition-all shadow-sm"
                                    >
                                        Ver Carrito
                                    </Link>
                                    <Link
                                        to="/checkout"
                                        onClick={() => setIsCartOpen(false)}
                                        className="py-4 rounded-2xl bg-primary text-white font-bold text-center flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-lg"
                                    >
                                        Checkout <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
