import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Heart } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const total = getCartTotal();

    if (cart.length === 0) {
        return (
            <PageTransition>
                <div className="min-h-screen pt-32 pb-20 px-4 text-center bg-white relative overflow-hidden flex flex-col items-center justify-center">
                    {/* Background Blobs */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-100 rounded-full blur-[100px] -z-10 opacity-60" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100 rounded-full blur-[100px] -z-10 opacity-60" />

                    <div className="bg-pink-50 p-8 rounded-full mb-8 animate-bounce-slow">
                        <ShoppingBag className="w-16 h-16 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-black text-secondary mb-4">Tu Carrito está vacío</h1>
                    <p className="text-gray-400 text-lg mb-8 max-w-md">¡Oh no! Parece que aún no has encontrado tu cosita ideal. 🌸</p>
                    <Link to="/shop" className="bg-secondary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 inline-flex items-center">
                        Ir a la Tienda <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="bg-white min-h-screen pt-24 pb-20 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-50 rounded-full blur-[120px] -z-10 opacity-60" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-50 rounded-full blur-[120px] -z-10 opacity-60" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="bg-primary/10 p-3 rounded-2xl">
                            <Heart className="w-8 h-8 text-primary fill-primary" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-black text-secondary tracking-tight">Carrito de Compras</h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Cart Items */}
                        <div className="flex-1 space-y-6">
                            {cart.map((item) => (
                                <div key={`${item._id}-${item.selectedVariation}`} className="bg-white border border-pink-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 items-center sm:items-start group">
                                    <div className="w-32 h-32 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 relative">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>

                                    <div className="flex-1 text-center sm:text-left w-full">
                                        <div className="flex flex-col sm:flex-row justify-between mb-2">
                                            <h3 className="font-display font-bold text-xl text-secondary">{item.name}</h3>
                                            <span className="font-display font-black text-xl text-primary">${(item.price * (1 - (item.discount || 0) / 100)).toLocaleString()}</span>
                                        </div>

                                        {item.selectedVariation && (
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-4 bg-gray-50 inline-block px-3 py-1 rounded-full">{item.selectedVariation}</p>
                                        )}

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                                                <button onClick={() => updateQuantity(item._id, item.selectedVariation, -1)} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-500"><Minus className="w-4 h-4" /></button>
                                                <span className="px-4 font-bold text-secondary">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item._id, item.selectedVariation, 1)} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-500"><Plus className="w-4 h-4" /></button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item._id, item.selectedVariation)}
                                                className="text-red-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button onClick={clearCart} className="text-xs font-bold uppercase text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 ml-2">
                                <Trash2 className="w-4 h-4" /> Vaciar Carrito
                            </button>
                        </div>

                        {/* Summary */}
                        <div className="lg:w-96 flex-shrink-0">
                            <div className="bg-white border border-pink-100 p-8 rounded-[2.5rem] sticky top-32 shadow-lg shadow-pink-100/50">
                                <h2 className="text-2xl font-display font-bold text-secondary mb-6 flex items-center gap-2">
                                    <ShoppingBag className="w-6 h-6 text-primary" /> Resumen
                                </h2>

                                <div className="space-y-4 mb-8 font-medium text-sm">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Subtotal</span>
                                        <span className="text-gray-600 font-bold">${total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Envío</span>
                                        <span className="text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded-full text-xs">Contra Entrega</span>
                                    </div>
                                    <div className="flex justify-between text-2xl font-display font-black text-secondary border-t border-dashed border-pink-200 pt-6 mt-4">
                                        <span>Total</span>
                                        <span className="text-primary">${total.toLocaleString()}</span>
                                    </div>
                                </div>
                                <Link to="/checkout" className="bg-secondary text-white w-full py-4 rounded-2xl block text-center font-bold text-lg hover:bg-primary transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                    Proceder al Pago ✨
                                </Link>

                                <div className="mt-8 flex items-center justify-center space-x-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                                    {/* Payment Icons Placeholders */}
                                    <div className="h-8 w-12 bg-gray-100 rounded-md border border-gray-200"></div>
                                    <div className="h-8 w-12 bg-gray-100 rounded-md border border-gray-200"></div>
                                    <div className="h-8 w-12 bg-gray-100 rounded-md border border-gray-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};
export default Cart;
