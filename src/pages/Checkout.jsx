import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../config/api';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/layout/PageTransition';
import AutocompleteField from '../components/common/AutocompleteField';
import colombiaData from '../utils/colombia.json';
import { CreditCard, Truck, ShieldCheck, Heart, ShoppingBag, MapPin, Check, Sparkles, Star, Shield } from 'lucide-react';

// Initialize MP with your public key
const MP_KEY = import.meta.env.VITE_MERCADOPAGO_KEY || 'TEST-5afed917-c538-47b2-9999-7acda2635a26';
initMercadoPago(MP_KEY, {
    locale: 'es-CO'
});

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [preferenceId, setPreferenceId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mpReady, setMpReady] = useState(false);

    useEffect(() => {
        if (preferenceId) {
            setTimeout(() => {
                const element = document.getElementById('mercadopago-button-container');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 500);
        }
    }, [preferenceId]);

    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        address: '',
        city: '',
        state: '',
        phone: user?.phone || '',
        additionalInfo: ''
    });

    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

    const handleSelectAddress = (addr, index) => {
        if (selectedAddressIndex === index) {
            // Deselect/Unmark
            setSelectedAddressIndex(null);
            setFormData({
                ...formData,
                address: '',
                city: '',
                state: '',
            });
        } else {
            // Select/Mark
            setFormData({
                ...formData,
                address: addr.street,
                city: addr.city,
                state: addr.state || '',
                additionalInfo: addr.additionalInfo || ''
            });
            setSelectedAddressIndex(index);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSelectedAddressIndex(null); // Reset selection if manually typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Create Order in Backend
            const orderData = {
                orderItems: cart.map(item => ({
                    product: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price * (1 - (item.discount || 0) / 100),
                    image: item.image
                })),
                shippingAddress: {
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    postalCode: '0000',
                    country: 'Colombia',
                    additionalInfo: formData.additionalInfo
                },
                paymentMethod: 'Mercado Pago',
                itemsPrice: getCartTotal(),
                taxPrice: 0,
                shippingPrice: 0,
                totalPrice: getCartTotal()
            };

            const { data: createdOrder } = await api.post('/orders', orderData);

            // 2. Create Payment Preference
            const { data: preference } = await api.post('/payments/create_preference', {
                orderId: createdOrder._id
            });

            if (preference && preference.id) {
                setPreferenceId(preference.id);
            } else {
                throw new Error('No preference ID received from server');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            if (error.response && error.response.status === 400 && error.response.data.msg) {
                alert(`Error: ${error.response.data.msg}`);
                // Optional: Redirect to cart to fix the issue
                // navigate('/cart');
            } else {
                alert('Hubo un error al procesar tu orden. Por favor intenta de nuevo.');
            }
        } finally {
            setLoading(false);
        }
    };

    const total = getCartTotal();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-32 text-center bg-white flex flex-col items-center">
                <h1 className="text-3xl font-display font-bold text-secondary uppercase mb-4">No hay productos en el carrito</h1>
                <Link to="/shop" className="text-primary font-bold underline hover:text-primary-dark transition-colors">Volver a la tienda</Link>
            </div>
        );
    }

    return (
        <PageTransition>
            <div className="bg-white min-h-screen pt-24 pb-20 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-50 rounded-full blur-[120px] -z-10 opacity-60" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-50 rounded-full blur-[120px] -z-10 opacity-60" />

                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Form */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-primary/10 p-3 rounded-2xl">
                                <Truck className="w-6 h-6 text-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-display font-black text-secondary tracking-tight">Pago y Envío</h2>
                        </div>

                        {/* Saved Addresses Selection */}
                        {user?.addresses?.length > 0 && !preferenceId && (
                            <div className="mb-8">
                                <label className="block text-xs font-bold text-gray-400 uppercase ml-3 mb-3">Usar una dirección guardada:</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {user.addresses.map((addr, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => handleSelectAddress(addr, idx)}
                                            className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all text-left ${selectedAddressIndex === idx ? 'border-primary bg-pink-50/50 shadow-md' : 'border-gray-100 bg-gray-50 hover:border-pink-200'}`}
                                        >
                                            <div className={`mt-1 p-1.5 rounded-full ${selectedAddressIndex === idx ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
                                                <MapPin className="w-3 h-3" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-center mb-1">
                                                    <p className={`font-bold text-sm ${selectedAddressIndex === idx ? 'text-secondary' : 'text-gray-500'}`}>{addr.name}</p>
                                                    {selectedAddressIndex === idx && <Check className="w-4 h-4 text-primary" />}
                                                </div>
                                                <p className="text-[10px] text-gray-400 font-medium leading-tight truncate">{addr.street}</p>
                                                {addr.additionalInfo && <p className="text-[10px] text-gray-300 font-medium leading-tight truncate">{addr.additionalInfo}</p>}
                                                <p className="text-[10px] text-gray-400 font-medium leading-tight">{addr.city}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-400 uppercase ml-3">Nombre Completo</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    disabled={!!preferenceId}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl font-bold text-gray-600 outline-none focus:bg-white focus:border-primary transition-all placeholder:text-gray-300 shadow-sm disabled:opacity-50"
                                    placeholder="Ej: Ana Pérez"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-400 uppercase ml-3">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!!preferenceId}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl font-bold text-gray-600 outline-none focus:bg-white focus:border-primary transition-all placeholder:text-gray-300 shadow-sm disabled:opacity-50"
                                    placeholder="tu@email.com"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-400 uppercase ml-3">Dirección de Entrega</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={!!preferenceId}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl font-bold text-gray-600 outline-none focus:bg-white focus:border-primary transition-all placeholder:text-gray-300 shadow-sm disabled:opacity-50"
                                    placeholder="Calle 123 # 45-67"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-400 uppercase ml-3">Detalles Adicionales</label>
                                <input
                                    type="text"
                                    name="additionalInfo"
                                    value={formData.additionalInfo}
                                    onChange={handleChange}
                                    disabled={!!preferenceId}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl font-bold text-gray-600 outline-none focus:bg-white focus:border-primary transition-all placeholder:text-gray-300 shadow-sm disabled:opacity-50"
                                    placeholder="Apto, Torre, Conjunto, Referencia..."
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AutocompleteField
                                    label="Departamento"
                                    placeholder="Selecciona departamento..."
                                    value={formData.state}
                                    onChange={(val) => setFormData({ ...formData, state: val, city: '' })} // Reset city when dept changes
                                    options={colombiaData.map(d => d.departamento)}
                                    disabled={!!preferenceId}
                                />
                                <AutocompleteField
                                    label="Ciudad / Municipio"
                                    placeholder="Selecciona ciudad..."
                                    value={formData.city}
                                    onChange={(val) => setFormData({ ...formData, city: val })}
                                    options={
                                        formData.state
                                            ? (colombiaData.find(d => d.departamento === formData.state)?.ciudades || [])
                                            : colombiaData.flatMap(d => d.ciudades) // Show all if no dept
                                    }
                                    disabled={!!preferenceId}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-400 uppercase ml-3">Teléfono</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!!preferenceId}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl font-bold text-gray-600 outline-none focus:bg-white focus:border-primary transition-all placeholder:text-gray-300 shadow-sm disabled:opacity-50"
                                    placeholder="300 123 4567"
                                    required
                                />
                            </div>

                            {!preferenceId ? (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-secondary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-primary transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 mt-6 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Generando Pago...' : 'Completar Orden'} <Heart className="w-5 h-5 group-hover:fill-white transition-all" />
                                </button>
                            ) : (
                                <div id="mercadopago-button-container" className="mt-6 animate-fade-in-up">
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-pink-50/50 p-4 rounded-3xl border border-pink-100 flex flex-col items-center text-center">
                                            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                                                <Shield className="w-5 h-5 text-primary" />
                                            </div>
                                            <p className="text-[10px] font-black text-secondary uppercase mb-1">Pago 100%</p>
                                            <p className="text-[8px] font-bold text-primary tracking-widest uppercase">Encriptado</p>
                                        </div>
                                        <div className="bg-purple-50/50 p-4 rounded-3xl border border-purple-100 flex flex-col items-center text-center">
                                            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                                                <Star className="w-5 h-5 text-purple-400" />
                                            </div>
                                            <p className="text-[10px] font-black text-secondary uppercase mb-1">Compra 100%</p>
                                            <p className="text-[8px] font-bold text-purple-400 tracking-widest uppercase">Garantizada</p>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 text-green-600 p-4 rounded-2xl text-center font-bold mb-4 border border-green-100 flex items-center justify-center gap-2 relative overflow-hidden group">
                                        <div className="absolute inset-y-0 left-0 w-1 bg-green-400 group-hover:w-full transition-all opacity-10" />
                                        <ShieldCheck className="w-5 h-5" /> ¡Orden generada! Paga ahora:
                                    </div>
                                    {preferenceId && (
                                        <div className="min-h-[150px] flex flex-col justify-center">
                                            {!mpReady && (
                                                <div className="flex flex-col items-center justify-center py-8 animate-pulse text-primary">
                                                    <Sparkles className="w-6 h-6 mb-2 animate-bounce" />
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Magia en proceso...</p>
                                                </div>
                                            )}
                                            <Wallet
                                                key={preferenceId}
                                                initialization={{ preferenceId: preferenceId, redirectMode: 'modal' }}
                                                onReady={() => {
                                                    setMpReady(true);
                                                }}
                                                onError={(error) => {
                                                    setMpReady(false);
                                                }}
                                            />
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreferenceId(null);
                                            setMpReady(false);
                                        }}
                                        className="w-full text-center text-xs font-bold text-gray-400 uppercase mt-4 hover:text-primary transition-colors"
                                    >
                                        Modificar datos de envío
                                    </button>
                                </div>
                            )}

                            <div className="flex items-center justify-center gap-2 text-gray-400 text-xs font-bold uppercase mt-4">
                                <ShieldCheck className="w-4 h-4" /> Pago 100% Seguro por Mercado Pago
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="bg-white border border-pink-100 p-8 rounded-[2.5rem] shadow-lg sticky top-32">
                            <h3 className="text-xl font-display font-black text-secondary uppercase mb-6 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-primary" /> Tu Orden
                            </h3>
                            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map(item => (
                                    <div key={`${item._id}-${item.selectedVariation}`} className="flex justify-between items-center text-sm group">
                                        <div className="flex items-center">
                                            <div className="w-16 h-16 bg-gray-50 mr-4 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                                <img src={item.image} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-secondary text-base">{item.name}</p>
                                                <p className="text-gray-400 text-xs font-medium">Qty: {item.quantity} {item.selectedVariation && <span className="bg-pink-50 text-primary px-1.5 py-0.5 rounded ml-1">{item.selectedVariation}</span>}</p>
                                            </div>
                                        </div>
                                        <p className="font-display font-black text-secondary">${(item.price * (1 - (item.discount || 0) / 100) * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-dashed border-pink-200 pt-6 space-y-3">
                                <div className="flex justify-between text-gray-400 font-medium">
                                    <span>Subtotal</span>
                                    <span>${total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 font-medium">
                                    <span>Envío</span>
                                    <span className="text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded-full text-xs">Contra Entrega</span>
                                </div>
                                <div className="flex justify-between items-center text-2xl font-display font-black text-primary pt-2">
                                    <span>Total</span>
                                    <span>${total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Checkout;
