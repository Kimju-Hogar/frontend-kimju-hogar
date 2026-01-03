import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';

const Checkout = () => {
    const { cart, getCartTotal } = useCart();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would integrate with PayU or backend order creation
        alert("Integración de Pagos en proceso...");
    };

    const total = getCartTotal();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-32 text-center">
                <h1 className="text-3xl font-bold uppercase">No hay productos en el carrito</h1>
                <Link to="/shop" className="text-primary underline mt-4 block">Volver a la tienda</Link>
            </div>
        );
    }

    return (
        <PageTransition>
            <div className="bg-gray-50 min-h-screen pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <div>
                        <h2 className="text-3xl font-display font-black uppercase mb-8">Pago y Envío</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2">Nombre Completo</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full border-2 border-black p-4 font-bold outline-none focus:bg-gray-100"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border-2 border-black p-4 font-bold outline-none focus:bg-gray-100"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2">Dirección de Entrega</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full border-2 border-black p-4 font-bold outline-none focus:bg-gray-100"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-2">Ciudad</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full border-2 border-black p-4 font-bold outline-none focus:bg-gray-100"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-2">Teléfono</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full border-2 border-black p-4 font-bold outline-none focus:bg-gray-100"
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full btn-neo-primary py-5 font-black uppercase tracking-widest text-lg">
                                Completar Orden
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white border-2 border-black p-8 h-fit shadow-neo">
                        <h3 className="text-xl font-black uppercase mb-6 border-b-2 border-dashed border-gray-300 pb-4">Tu Orden</h3>
                        <div className="space-y-4 mb-6">
                            {cart.map(item => (
                                <div key={`${item._id}-${item.selectedVariation}`} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gray-100 mr-4 border border-black overflow-hidden">
                                            <img src={item.image} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-bold uppercase">{item.name}</p>
                                            <p className="text-gray-500 text-xs">Cant: {item.quantity} {item.selectedVariation && `| ${item.selectedVariation}`}</p>
                                        </div>
                                    </div>
                                    <p className="font-mono font-bold">${(item.price * (1 - (item.discount || 0) / 100) * item.quantity).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t-2 border-black pt-4 flex justify-between items-center text-xl font-black uppercase">
                            <span>Total</span>
                            <span>${total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Checkout;
