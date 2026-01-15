import { useState, useEffect } from 'react';
import {
    User, Package, MapPin, CreditCard, LogOut, Settings, Save, Shield, Heart, Sparkles, ArrowRight,
    X, Download, Printer, FileText, Star
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import AutocompleteField from '../components/common/AutocompleteField';
import colombiaData from '../utils/colombia.json';

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const { user, logout, isAuthenticated, refreshUser } = useAuth();
    const navigate = useNavigate();

    // Profile Edit State
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
    });
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Address Management State
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [addressLoading, setAddressLoading] = useState(false);
    const [addressForm, setAddressForm] = useState({
        name: '',
        street: '',
        neighborhood: '',
        city: '',
        state: '',
        zip: '',
        country: 'Colombia',
        additionalInfo: '',
        phone: '',
        isDefault: false
    });
    const [editingAddressId, setEditingAddressId] = useState(null);

    const [favorites, setFavorites] = useState([]);
    const [favsLoading, setFavsLoading] = useState(false);

    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const downloadInvoice = async () => {
        if (!selectedOrder) return;
        setIsDownloading(true);
        const element = document.getElementById('invoice-content');
        try {
            const canvas = await html2canvas(element, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width / 2, canvas.height / 2]
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
            pdf.save(`Kimju-Hogar-Factura-${selectedOrder._id.slice(-6).toUpperCase()}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
            });
        }
    }, [user]);

    useEffect(() => {
        if (activeTab === 'favorites') {
            const fetchFavorites = async () => {
                setFavsLoading(true);
                try {
                    const token = localStorage.getItem('token');
                    const res = await axios.get('http://localhost:5000/api/users/favorites', {
                        headers: { 'x-auth-token': token }
                    });
                    setFavorites(res.data);
                } catch (err) {
                    console.error("Error fetching favorites", err);
                } finally {
                    setFavsLoading(false);
                }
            };
            fetchFavorites();
        }

        if (activeTab === 'orders') {
            const fetchOrders = async () => {
                setOrdersLoading(true);
                try {
                    const token = localStorage.getItem('token');
                    const res = await axios.get('http://localhost:5000/api/orders/myorders', {
                        headers: { 'x-auth-token': token }
                    });
                    setOrders(res.data);
                } catch (err) {
                    console.error("Error fetching orders", err);
                } finally {
                    setOrdersLoading(false);
                }
            };
            fetchOrders();
        }
    }, [activeTab]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setMessage({ type: '', text: '' });

        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
            setUpdating(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const res = await axios.put('http://localhost:5000/api/users/profile', formData, {
                headers: { 'x-auth-token': token }
            });
            console.log("Profile Update Response:", res.data);
            setMessage({ type: 'success', text: 'Perfil actualizado correctamente' });

            // Safe refresh
            try {
                await refreshUser();
            } catch (refreshErr) {
                console.warn("Global state refresh warning:", refreshErr);
            }
        } catch (err) {
            console.error("Profile update error detail:", err);
            setMessage({ type: 'error', text: err.response?.data?.msg || 'Error al actualizar el perfil' });
        } finally {
            setUpdating(false);
        }
    };

    const deleteAccount = async () => {
        try {
            await axios.delete('http://localhost:5000/api/users/profile', {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            localStorage.removeItem('token');
            window.location.href = '/login';
        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: 'No se pudo eliminar la cuenta' });
        }
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        setAddressLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };

            if (editingAddressId) {
                // Update existing
                await axios.put(`http://localhost:5000/api/users/address/${editingAddressId}`, addressForm, config);
                setMessage({ type: 'success', text: 'Dirección actualizada correctamente' });
            } else {
                // Create new
                await axios.post('http://localhost:5000/api/users/address', addressForm, config);
                setMessage({ type: 'success', text: 'Dirección agregada correctamente' });
            }

            await refreshUser();
            setShowAddressForm(false);
            setEditingAddressId(null);
            setAddressForm({ name: '', street: '', neighborhood: '', city: '', state: '', zip: '', country: 'Colombia', additionalInfo: '', phone: '', isDefault: false });
        } catch (err) {
            console.error("Error saving address", err);
            setMessage({ type: 'error', text: 'Error al guardar la dirección' });
        } finally {
            setAddressLoading(false);
        }
    };

    const handleEditAddress = (addr) => {
        setAddressForm({
            name: addr.name || '',
            street: addr.street || '',
            neighborhood: addr.neighborhood || '',
            city: addr.city || '',
            state: addr.state || '',
            zip: addr.zip || '',
            country: addr.country || 'Colombia',
            additionalInfo: addr.additionalInfo || '',
            phone: addr.phone || '',
            isDefault: addr.isDefault || false
        });
        setEditingAddressId(addr._id);
        setShowAddressForm(true);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    const handleDeleteAddress = async (addressId) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta dirección?')) return;
        setAddressLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/users/address/${addressId}`, {
                headers: { 'x-auth-token': token }
            });
            await refreshUser();
            setMessage({ type: 'success', text: 'Dirección eliminada correctamente' });
        } catch (err) {
            console.error("Error deleting address", err);
            setMessage({ type: 'error', text: 'Error al eliminar la dirección' });
        } finally {
            setAddressLoading(false);
        }
    };


    const tabs = [
        { id: 'profile', label: 'Mi Perfil', icon: User },
        { id: 'favorites', label: 'Favoritos', icon: Heart },
        { id: 'orders', label: 'Mis Pedidos', icon: Package },
        { id: 'addresses', label: 'Direcciones', icon: MapPin },
        { id: 'wallet', label: 'Pagos', icon: CreditCard },
    ];

    if (!user) return null;

    return (
        <PageTransition>
            <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-200 to-purple-200 p-1">
                        <img src={`https://ui-avatars.com/api/?name=${user.name}&background=fff&color=f472b6`} alt="Avatar" className="w-full h-full rounded-full object-cover border-4 border-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-display font-black text-secondary mb-1">Mi Cuenta</h1>
                        <p className="text-gray-500">Bienvenido de nuevo, <span className="text-primary font-bold decoration-wavy underline decoration-pink-200">{user.name}</span> ✨</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="lg:w-1/4 space-y-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center space-x-3 px-6 py-4 font-bold text-sm rounded-2xl transition-all duration-300 ${activeTab === tab.id ? 'bg-primary text-white shadow-lg transform translate-x-2' : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-primary'}`}
                            >
                                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-pink-300'}`} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-6 py-4 font-bold text-sm text-red-400 bg-red-50 hover:bg-red-100 rounded-2xl transition-colors mt-8"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Cerrar Sesión</span>
                        </button>
                    </aside>

                    {/* Content Area */}
                    <div className="lg:w-3/4">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white border-2 border-pink-100 rounded-3xl p-8 shadow-sm min-h-[500px]"
                        >
                            {activeTab === 'profile' && (
                                <form onSubmit={handleUpdate} className="space-y-8">
                                    <h2 className="text-2xl font-bold text-secondary mb-6 border-b-2 border-pink-50 pb-4">Información Personal</h2>
                                    {message.text && (
                                        <div className={`p-4 rounded-2xl border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600'} font-bold flex items-center gap-2`}>
                                            {message.type === 'success' ? <span className="text-xl">✅</span> : <span className="text-xl">⚠️</span>}
                                            {message.text}
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-400">Nombre Completo</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl p-4 font-bold focus:bg-white focus:border-primary-light focus:outline-none transition-all placeholder:text-gray-300"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-400">Email</label>
                                            <input
                                                type="email"
                                                value={user.email}
                                                disabled
                                                className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl p-4 font-bold text-gray-400 cursor-not-allowed"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-400">Teléfono</label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl p-4 font-bold focus:bg-white focus:border-primary-light focus:outline-none transition-all placeholder:text-gray-300"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={updating}
                                        className="bg-secondary text-white rounded-xl px-8 py-3 text-sm font-bold flex items-center space-x-2 hover:bg-primary transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>{updating ? 'Guardando...' : 'Guardar Cambios'}</span>
                                    </button>

                                    <div className="pt-6 border-t border-gray-100 mt-8">
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Seguridad y Cuenta</h3>

                                        {/* Google Status */}
                                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl mb-4">
                                            <div className="flex items-center gap-3">
                                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
                                                <div>
                                                    <p className="font-bold text-gray-700">Cuenta de Google</p>
                                                    <p className="text-xs text-gray-400">{user?.googleId ? 'Vinculada correctamente' : 'No vinculada'}</p>
                                                </div>
                                            </div>
                                            {user?.googleId && <span className="text-xs font-bold bg-green-100 text-green-600 px-3 py-1 rounded-full">Conectado</span>}
                                        </div>

                                        {/* Delete Account */}
                                        <div className="mt-8">
                                            {!showDeleteConfirm ? (
                                                <button
                                                    type="button"
                                                    onClick={() => setShowDeleteConfirm(true)}
                                                    className="text-red-400 text-sm font-bold hover:text-red-600 underline"
                                                >
                                                    Eliminar mi cuenta permanentemente
                                                </button>
                                            ) : (
                                                <div className="bg-red-50 p-4 rounded-xl border border-red-100 animate-fade-in">
                                                    <p className="text-red-800 font-bold text-sm mb-2">¿Estás seguro? Esta acción no se puede deshacer.</p>
                                                    <div className="flex gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={deleteAccount}
                                                            className="bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-600"
                                                        >
                                                            Sí, eliminar
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowDeleteConfirm(false)}
                                                            className="bg-white text-gray-600 text-xs font-bold px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            )}

                            {activeTab === 'favorites' && (
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between border-b-2 border-pink-50 pb-4">
                                        <h2 className="text-2xl font-bold text-secondary flex items-center gap-2">
                                            <Heart className="w-6 h-6 text-primary fill-primary" /> Mi Lista de Favoritos
                                        </h2>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{favorites.length} productos</p>
                                    </div>
                                    {favsLoading ? (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                            {[1, 2, 3].map(i => <div key={i} className="animate-pulse bg-gray-50 rounded-3xl aspect-[3/4]" />)}
                                        </div>
                                    ) : favorites.length > 0 ? (
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                            {favorites.map((product) => (
                                                <Link to={`/product/${product._id}`} key={product._id} className="group relative">
                                                    <div className="bg-white border-2 border-pink-50 rounded-[2.5rem] p-4 hover:border-primary hover:shadow-xl transition-all h-full flex flex-col">
                                                        <div className="aspect-square rounded-[2rem] overflow-hidden mb-4 bg-gray-50 relative p-4">
                                                            <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                                                            <button
                                                                onClick={async (e) => {
                                                                    e.preventDefault();
                                                                    const token = localStorage.getItem('token');
                                                                    await axios.post(`http://localhost:5000/api/users/favorites/${product._id}`, {}, {
                                                                        headers: { 'x-auth-token': token }
                                                                    });
                                                                    setFavorites(favorites.filter(f => f._id !== product._id));
                                                                }}
                                                                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-red-400 hover:bg-red-400 hover:text-white transition-all shadow-sm"
                                                            >
                                                                <Heart className="w-4 h-4 fill-current" />
                                                            </button>
                                                        </div>
                                                        <h3 className="font-bold text-secondary text-sm group-hover:text-primary truncate mb-1">{product.name}</h3>
                                                        <p className="text-primary-dark font-black mt-auto">
                                                            ${(product.price * (1 - (product.discount || 0) / 100)).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-20 bg-pink-50/50 rounded-3xl border-2 border-dashed border-pink-100">
                                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                                <Heart className="w-10 h-10 text-pink-200" />
                                            </div>
                                            <h3 className="text-xl font-display font-bold text-secondary mb-2">¡Tu lista está muy solita! 😢</h3>
                                            <p className="text-gray-500 font-medium mb-8">Guarda las cositas que más te gusten para comprarlas después.</p>
                                            <Link to="/shop" className="btn-kawaii inline-flex items-center gap-2">
                                                Ir a la Tienda <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'orders' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-secondary mb-6 border-b-2 border-pink-50 pb-4">Historial de Pedidos</h2>

                                    {ordersLoading ? (
                                        <div className="space-y-4">
                                            {[1, 2, 3].map(i => <div key={i} className="animate-pulse bg-gray-50 h-32 rounded-3xl" />)}
                                        </div>
                                    ) : orders.length > 0 ? (
                                        <div className="space-y-4">
                                            {orders.map((order) => (
                                                <div key={order._id} className="border-2 border-pink-50 p-6 rounded-[2rem] hover:shadow-md transition-all bg-white relative overflow-hidden group">
                                                    {/* Status Badge */}
                                                    <div className="absolute top-0 right-0 p-4">
                                                        <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${order.isPaid ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                                            {order.isPaid ? 'Pagado' : 'Pendiente de Pago'}
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                                                        <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center shrink-0">
                                                            <Package className="w-8 h-8 text-primary opacity-60" />
                                                        </div>

                                                        <div className="flex-grow">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h3 className="font-black text-secondary uppercase text-sm">Pedido #{order._id.slice(-6).toUpperCase()}</h3>
                                                                <span className="text-gray-300 text-sm">•</span>
                                                                <span className="text-xs font-bold text-gray-400 capitalize">
                                                                    {new Date(order.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                                </span>
                                                                <span className="text-[10px] font-black text-primary/60 bg-pink-50 px-1.5 py-0.5 rounded">
                                                                    {new Date(order.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                                                </span>
                                                            </div>
                                                            <p className="text-gray-500 text-sm font-medium mb-2">
                                                                {order.orderItems.length} {order.orderItems.length === 1 ? 'producto' : 'productos'} • Total: <span className="text-primary-dark font-black">${order.totalPrice.toLocaleString()}</span>
                                                            </p>

                                                            <div className="flex flex-wrap gap-2">
                                                                {order.orderItems.slice(0, 3).map((item, idx) => (
                                                                    <div key={idx} className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 p-1 overflow-hidden">
                                                                        <img src={item.image} alt="" className="w-full h-full object-cover rounded shadow-sm" title={item.name} />
                                                                    </div>
                                                                ))}
                                                                {order.orderItems.length > 3 && (
                                                                    <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                                                                        +{order.orderItems.length - 3}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="shrink-0 flex items-center">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedOrder(order);
                                                                    setIsInvoiceOpen(true);
                                                                }}
                                                                className="flex items-center gap-2 text-xs font-black uppercase text-secondary hover:text-primary transition-colors group-hover:translate-x-1 duration-300"
                                                            >
                                                                Detalles <ArrowRight className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-20 bg-pink-50/50 rounded-3xl border-2 border-dashed border-pink-100">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                                <Package className="w-8 h-8 text-pink-300" />
                                            </div>
                                            <p className="font-bold text-gray-400">Aún no tienes pedidos realizados... ¡Hora de comprar! 🛍️</p>
                                            <Link to="/shop" className="mt-4 inline-block text-primary font-bold hover:underline">Ir a la tienda</Link>
                                        </div>
                                    )}
                                </div>
                            )}

                            <AnimatePresence>
                                {isInvoiceOpen && selectedOrder && (
                                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary/40 backdrop-blur-sm">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col"
                                        >
                                            {/* Header */}
                                            <div className="p-6 border-b border-pink-50 flex items-center justify-between bg-white sticky top-0 z-10">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-primary/10 p-2 rounded-xl">
                                                        <FileText className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <h3 className="font-display font-black text-secondary uppercase text-lg">Detalles del Pedido</h3>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={downloadInvoice}
                                                        disabled={isDownloading}
                                                        className="bg-pink-50 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50"
                                                    >
                                                        {isDownloading ? 'Generando...' : <><Download className="w-4 h-4" /> Descargar PDF</>}
                                                    </button>
                                                    <button
                                                        onClick={() => setIsInvoiceOpen(false)}
                                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                                    >
                                                        <X className="w-6 h-6 text-gray-400" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Scrollable Content (Invoice Image) */}
                                            <div className="flex-grow overflow-y-auto p-4 md:p-8 custom-scrollbar bg-gray-50/30">
                                                <div
                                                    id="invoice-content"
                                                    className="bg-white p-6 md:p-12 rounded-[2rem] border border-pink-50 shadow-sm max-w-3xl mx-auto"
                                                >
                                                    {/* Invoice Header */}
                                                    <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
                                                        <div>
                                                            <h1 className="text-3xl font-display font-black text-primary mb-2">KIMJU <span className="text-secondary">HOGAR</span></h1>
                                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tienda de decoración y detalles</p>
                                                            <p className="text-xs font-medium text-gray-400">NIT: 123.456.789-0 • Medellín, Colombia</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <h2 className="text-xl font-display font-black text-secondary uppercase mb-1">FACTURA DE VENTA</h2>
                                                            <p className="text-primary font-bold text-sm">#ORD-{selectedOrder._id.slice(-6).toUpperCase()}</p>
                                                            <div className="mt-4 space-y-1">
                                                                <p className="text-[10px] font-bold text-gray-300 uppercase">Fecha de Emisión</p>
                                                                <p className="text-xs font-bold text-secondary">{new Date(selectedOrder.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                                                <p className="text-xs font-bold text-primary">{new Date(selectedOrder.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Client & Shipping */}
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 p-6 bg-pink-50/30 rounded-3xl border border-pink-50">
                                                        <div>
                                                            <h3 className="text-[10px] font-black text-primary uppercase mb-3 tracking-widest">Facturar a:</h3>
                                                            <p className="font-bold text-secondary">{user.name}</p>
                                                            <p className="text-sm text-gray-500">{user.email}</p>
                                                            <p className="text-sm text-gray-500">{user.phone || 'Sin teléfono'}</p>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-[10px] font-black text-primary uppercase mb-3 tracking-widest">Enviar a:</h3>
                                                            <p className="font-bold text-secondary">{selectedOrder.shippingAddress.address}</p>
                                                            <p className="text-sm text-gray-500">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                                                            <p className="text-sm text-gray-500">{selectedOrder.shippingAddress.country}</p>
                                                        </div>
                                                    </div>

                                                    {/* Items Table */}
                                                    <div className="mb-12 overflow-x-auto">
                                                        <table className="w-full text-left">
                                                            <thead>
                                                                <tr className="border-b-2 border-pink-50">
                                                                    <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Descripción</th>
                                                                    <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Cant.</th>
                                                                    <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Precio</th>
                                                                    <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Subtotal</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-pink-50">
                                                                {selectedOrder.orderItems.map((item, idx) => (
                                                                    <tr key={idx} className="group">
                                                                        <td className="py-6">
                                                                            <div className="flex items-center gap-4">
                                                                                <div className="w-12 h-12 rounded-xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100 p-1">
                                                                                    <img src={item.image} alt="" className="w-full h-full object-cover rounded-lg" />
                                                                                </div>
                                                                                <div>
                                                                                    <p className="font-bold text-secondary text-sm">{item.name}</p>
                                                                                    {item.selectedVariation && <p className="text-[10px] text-primary font-bold uppercase">{item.selectedVariation}</p>}
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="py-6 text-center font-bold text-gray-500 text-sm">x{item.quantity}</td>
                                                                        <td className="py-6 text-right font-bold text-gray-500 text-sm">${Number(item.price).toLocaleString()}</td>
                                                                        <td className="py-6 text-right font-black text-secondary text-sm">${(item.quantity * item.price).toLocaleString()}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    {/* Totals */}
                                                    <div className="flex flex-col items-end gap-3 border-t-2 border-pink-50 pt-8">
                                                        <div className="flex justify-between w-full max-w-[200px] text-sm font-bold text-gray-400">
                                                            <span>Subtotal:</span>
                                                            <span>${selectedOrder.totalPrice.toLocaleString()}</span>
                                                        </div>
                                                        <div className="flex justify-between w-full max-w-[200px] text-sm font-bold text-green-500">
                                                            <span>Envío:</span>
                                                            <span>Gratis</span>
                                                        </div>
                                                        <div className="flex justify-between w-full max-w-[250px] text-2xl font-display font-black text-secondary pt-4 border-t border-dashed border-pink-100">
                                                            <span className="text-primary">TOTAL:</span>
                                                            <span>${selectedOrder.totalPrice.toLocaleString()}</span>
                                                        </div>
                                                    </div>

                                                    {/* Footer Info */}
                                                    <div className="mt-20 text-center border-t border-pink-50 pt-8">
                                                        <p className="text-[10px] font-black text-primary uppercase mb-2 tracking-[0.2em]">¡Gracias por apoyar a Kimju Hogar! 🌸</p>
                                                        <p className="text-[10px] text-gray-300 font-medium">Esta es una factura digital válida para registro de compras en línea.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                )}
                            </AnimatePresence>

                            {activeTab === 'addresses' && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center border-b-2 border-pink-50 pb-4">
                                        <h2 className="text-2xl font-bold text-secondary">Mis Direcciones</h2>
                                        <button
                                            onClick={() => {
                                                if (showAddressForm) {
                                                    setShowAddressForm(false);
                                                    setEditingAddressId(null);
                                                    setAddressForm({ name: '', street: '', neighborhood: '', city: '', state: '', zip: '', country: 'Colombia', additionalInfo: '', phone: '', isDefault: false });
                                                } else {
                                                    setShowAddressForm(true);
                                                }
                                            }}
                                            className={`text-xs font-bold uppercase border-2 border-pink-200 rounded-full px-4 py-2 transition-colors ${showAddressForm ? 'bg-pink-100 text-primary' : 'hover:bg-primary hover:text-white text-primary'}`}
                                        >
                                            {showAddressForm ? 'Cancelar' : '+ Nueva'}
                                        </button>
                                    </div>
                                    {showAddressForm && (
                                        <motion.form
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            onSubmit={handleAddAddress}
                                            className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-4 mb-8"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input
                                                    type="text" placeholder="Alias (Ej: Casa, Oficina)" required
                                                    value={addressForm.name} onChange={e => setAddressForm({ ...addressForm, name: e.target.value })}
                                                    className="border-2 border-white rounded-xl p-3 font-bold focus:border-primary-light outline-none shadow-sm h-[58px]"
                                                />
                                                <input
                                                    type="text" placeholder="Dirección / Calle" required
                                                    value={addressForm.street} onChange={e => setAddressForm({ ...addressForm, street: e.target.value })}
                                                    className="border-2 border-white rounded-xl p-3 font-bold focus:border-primary-light outline-none shadow-sm h-[58px]"
                                                />
                                                <input
                                                    type="text" placeholder="Barrio"
                                                    value={addressForm.neighborhood} onChange={e => setAddressForm({ ...addressForm, neighborhood: e.target.value })}
                                                    className="border-2 border-white rounded-xl p-3 font-bold focus:border-primary-light outline-none shadow-sm h-[58px]"
                                                />
                                                <input
                                                    type="text" placeholder="Info Adicional (Apto, Unidad, Torre)"
                                                    value={addressForm.additionalInfo} onChange={e => setAddressForm({ ...addressForm, additionalInfo: e.target.value })}
                                                    className="border-2 border-white rounded-xl p-3 font-bold focus:border-primary-light outline-none shadow-sm h-[58px]"
                                                />
                                                <input
                                                    type="text" placeholder="Teléfono de Contacto"
                                                    value={addressForm.phone} onChange={e => setAddressForm({ ...addressForm, phone: e.target.value })}
                                                    className="border-2 border-white rounded-xl p-3 font-bold focus:border-primary-light outline-none shadow-sm h-[58px]"
                                                />
                                                <AutocompleteField
                                                    placeholder="Departamento"
                                                    value={addressForm.state}
                                                    onChange={val => setAddressForm({ ...addressForm, state: val, city: '' })}
                                                    options={colombiaData.map(d => d.departamento)}
                                                />
                                                <AutocompleteField
                                                    placeholder="Ciudad / Municipio"
                                                    value={addressForm.city}
                                                    onChange={val => setAddressForm({ ...addressForm, city: val })}
                                                    options={
                                                        addressForm.state
                                                            ? (colombiaData.find(d => d.departamento === addressForm.state)?.ciudades || [])
                                                            : colombiaData.flatMap(d => d.ciudades)
                                                    }
                                                />
                                                <input
                                                    type="text" placeholder="Código Postal (Opcional)"
                                                    value={addressForm.zip} onChange={e => setAddressForm({ ...addressForm, zip: e.target.value })}
                                                    className="border-2 border-white rounded-xl p-3 font-bold focus:border-primary-light outline-none shadow-sm h-[58px]"
                                                />
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox" id="isDefault"
                                                    checked={addressForm.isDefault} onChange={e => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                                                    className="w-4 h-4 accent-primary rounded-md"
                                                />
                                                <label htmlFor="isDefault" className="text-sm font-bold text-gray-500">Dirección principal</label>
                                            </div>
                                            <button
                                                type="submit" disabled={addressLoading}
                                                className="bg-primary text-white rounded-xl px-6 py-2 text-xs font-bold shadow-md hover:bg-primary-dark transition-colors"
                                            >
                                                {addressLoading ? 'Guardando...' : 'Guardar Dirección'}
                                            </button>
                                        </motion.form>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {user.addresses && user.addresses.length > 0 ? user.addresses.map((addr, idx) => (
                                            <div key={idx} className="border-2 border-pink-50 p-6 relative bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                                {addr.isDefault && <span className="absolute top-4 right-4 bg-pink-100 text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase">Principal</span>}
                                                <div className="mb-4">
                                                    <h3 className="font-bold text-lg text-secondary mb-1">{addr.name}</h3>
                                                    <p className="text-gray-500 text-sm font-medium">{addr.street}</p>
                                                    <p className="text-gray-400 text-sm">{addr.city}, {addr.state}</p>
                                                </div>
                                                <div className="flex space-x-4">
                                                    <button
                                                        onClick={() => handleEditAddress(addr)}
                                                        className="text-xs font-bold text-gray-400 hover:text-primary transition-colors"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteAddress(addr._id)}
                                                        className="text-xs font-bold text-gray-400 hover:text-red-400 transition-colors"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="col-span-full py-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                                <MapPin className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                                                <p className="text-sm font-bold text-gray-500">No tienes direcciones registradas</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'wallet' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-secondary mb-6 border-b-2 border-pink-50 pb-4">Métodos de Pago</h2>
                                    <div className="p-8 bg-blue-50/50 border border-blue-100 rounded-3xl flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm text-blue-400">
                                            <Shield className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-black uppercase text-blue-900 mb-2 text-sm">Transacciones Protegidas</h3>
                                            <p className="text-blue-800 text-sm leading-relaxed opacity-80 mb-4">
                                                En <span className="font-bold">Kimju Hogar</span> utilizamos <span className="font-bold">Mercado Pago</span> para procesar todos tus pagos de forma segura.
                                            </p>
                                            <div className="flex space-x-3 grayscale opacity-60 hover:opacity-100 transition-opacity">
                                                <img src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo.png" alt="Mercado Pago" className="h-5" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-2 border-dashed border-gray-100 p-8 text-center bg-gray-50 rounded-3xl">
                                        <p className="text-gray-400 font-bold text-xs">
                                            Tus métodos de pago aparecerán aquí durante el proceso de compra.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default UserProfile;
