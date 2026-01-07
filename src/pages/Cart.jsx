import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const total = getCartTotal();
    if (cart.length === 0) {
        return (
            <PageTransition>
                <div className="min-h-screen pt-32 pb-20 px-4 text-center">
                    <h1 className="text-4xl font-display font-black uppercase mb-6">Tu Carrito está vacío</h1>
                    <p className="text-gray-500 mb-8">Parece que no has agregado nada aún.</p>
                    <Link to="/shop" className="btn-neo-primary px-8 py-3 uppercase font-bold tracking-widest inline-flex items-center">
                        Ir a la Tienda <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
            </PageTransition>
        );
    }
    return (
        <PageTransition>
            <div className="bg-gray-50 min-h-screen pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-display font-black uppercase mb-12">Carrito de Compras</h1>
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Cart Items */}
                        <div className="flex-1 space-y-6">
                            {cart.map((item) => (
                                <div key={`${item._id}-${item.selectedVariation}`} className="bg-white border-2 border-black p-4 md:p-6 shadow-neo flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                                    <div className="w-24 h-24 bg-gray-100 border border-black flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 text-center sm:text-left">
                                        <div className="flex flex-col sm:flex-row justify-between mb-2">
                                            <h3 className="font-black uppercase text-lg">{item.name}</h3>
                                            <span className="font-mono font-bold text-lg">${(item.price * (1 - (item.discount || 0) / 100)).toLocaleString()}</span>
                                        </div>

                                        {item.selectedVariation && (
                                            <p className="text-xs font-bold text-gray-500 uppercase mb-4">Variante: {item.selectedVariation}</p>
                                        )}
                                        <div className="flex items-center justify-center sm:justify-between gap-4">
                                            <div className="flex items-center border border-black bg-white">
                                                <button onClick={() => updateQuantity(item._id, item.selectedVariation, -1)} className="p-2 hover:bg-gray-100"><Minus className="w-3 h-3" /></button>
                                                <span className="px-4 font-mono font-bold text-sm">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item._id, item.selectedVariation, 1)} className="p-2 hover:bg-gray-100"><Plus className="w-3 h-3" /></button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item._id, item.selectedVariation)}
                                                className="text-red-500 hover:text-black transition-colors p-2"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button onClick={clearCart} className="text-xs font-bold uppercase text-gray-500 hover:text-red-500 underline">
                                Vaciar Carrito
                            </button>
                        </div>
                        {/* Summary */}
                        <div className="lg:w-96 flex-shrink-0">
                            <div className="bg-white border-2 border-black p-8 sticky top-32 shadow-neo">
                                <h2 className="text-2xl font-black uppercase mb-6 border-b-2 border-black pb-4">Resumen</h2>

                                <div className="space-y-4 mb-8 font-bold text-sm uppercase">
                                    <div className="flex justify-between text-gray-500">
                                        <span>Subtotal</span>
                                        <span>${total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500">
                                        <span>Envío</span>
                                        <span>Gratis</span>
                                    </div>
                                    <div className="flex justify-between text-xl text-black border-t-2 border-dashed border-gray-300 pt-4 mt-4">
                                        <span>Total</span>
                                        <span>${total.toLocaleString()}</span>
                                    </div>
                                </div>
                                <Link to="/checkout" className="btn-neo-primary w-full py-4 text-center block uppercase font-black tracking-widest hover:bg-white hover:text-black border-2 border-transparent hover:border-black transition-all">
                                    Proceder al Pago
                                </Link>

                                <div className="mt-4 flex items-center justify-center space-x-2 opacity-50 grayscale">
                                    {/* Payment Icons Placeholders */}
                                    <div className="h-6 w-10 bg-gray-200 rounded"></div>
                                    <div className="h-6 w-10 bg-gray-200 rounded"></div>
                                    <div className="h-6 w-10 bg-gray-200 rounded"></div>
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
