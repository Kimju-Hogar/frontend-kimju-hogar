import { useState, useEffect } from 'react';
import { User, Package, MapPin, CreditCard, LogOut, Settings, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

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

    // Address Management State
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [addressLoading, setAddressLoading] = useState(false);
    const [addressForm, setAddressForm] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'Colombia',
        isDefault: false
    });

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

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setMessage({ type: '', text: '' });
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/users/profile', formData, {
                headers: { 'x-auth-token': token }
            });
            setMessage({ type: 'success', text: 'Perfil actualizado correctamente' });
            await refreshUser(); // Sync Global State
        } catch (err) {
            setMessage({ type: 'error', text: 'Error al actualizar el perfil' });
        } finally {
            setUpdating(false);
        }
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        setAddressLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/users/address', addressForm, {
                headers: { 'x-auth-token': token }
            });
            await refreshUser();
            setShowAddressForm(false);
            setAddressForm({ name: '', street: '', city: '', state: '', zip: '', country: 'Colombia', isDefault: false });
            setMessage({ type: 'success', text: 'Dirección agregada correctamente' });
        } catch (err) {
            console.error("Error adding address", err);
            setMessage({ type: 'error', text: 'Error al agregar la dirección' });
        } finally {
            setAddressLoading(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Mi Perfil', icon: User },
        { id: 'orders', label: 'Mis Pedidos', icon: Package },
        { id: 'addresses', label: 'Direcciones', icon: MapPin },
        { id: 'wallet', label: 'Pagos', icon: CreditCard },
    ];

    if (!user) return null;

    return (
        <PageTransition>
            <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-12">
                    <h1 className="text-4xl font-display font-black uppercase mb-2">Mi Cuenta</h1>
                    <p className="text-gray-500">Bienvenido de nuevo, <span className="text-black font-bold">{user.name}</span></p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Sidebar */}
                    <div className="lg:w-1/4 space-y-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center space-x-3 px-6 py-4 font-bold uppercase text-sm border-2 transition-all duration-200 ${activeTab === tab.id ? 'bg-black text-white border-black shadow-neo -translate-y-1' : 'bg-white text-gray-500 border-transparent hover:border-black hover:text-black'}`}
                            >
                                <tab.icon className="w-5 h-5" />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-6 py-4 font-bold uppercase text-sm text-red-500 hover:bg-red-50 transition-colors mt-8 border-2 border-transparent hover:border-red-100"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="lg:w-3/4">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white border-2 border-black p-8 shadow-neo min-h-[500px]"
                        >
                            {activeTab === 'profile' && (
                                <form onSubmit={handleUpdate} className="space-y-8">
                                    <h2 className="text-2xl font-display font-bold uppercase border-b-2 border-black pb-4">Información Personal</h2>

                                    {message.text && (
                                        <div className={`p-4 border-2 ${message.type === 'success' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700'} font-bold`}>
                                            {message.text}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-500">Nombre Completo</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full border-2 border-gray-200 p-4 font-bold focus:border-black focus:outline-none transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-500">Email</label>
                                            <input
                                                type="email"
                                                value={user.email}
                                                disabled
                                                className="w-full border-2 border-gray-100 bg-gray-50 p-4 font-bold text-gray-400 cursor-not-allowed"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-500">Teléfono</label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full border-2 border-gray-200 p-4 font-bold focus:border-black focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={updating}
                                        className="btn-neo-primary px-8 py-3 text-sm flex items-center space-x-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>{updating ? 'Guardando...' : 'Guardar Cambios'}</span>
                                    </button>
                                </form>
                            )}

                            {activeTab === 'orders' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-display font-bold uppercase border-b-2 border-black pb-4">Historial de Pedidos</h2>
                                    <div className="text-center py-20 bg-gray-50 border-2 border-dashed border-gray-200">
                                        <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                                        <p className="font-bold text-gray-500 uppercase">Aún no tienes pedidos realizados</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'addresses' && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center border-b-2 border-black pb-4">
                                        <h2 className="text-2xl font-display font-bold uppercase">Mis Direcciones</h2>
                                        <button
                                            onClick={() => setShowAddressForm(!showAddressForm)}
                                            className={`text-xs font-bold uppercase border-2 border-black px-4 py-2 transition-colors ${showAddressForm ? 'bg-black text-white' : 'hover:bg-black hover:text-white'}`}
                                        >
                                            {showAddressForm ? 'Cancelar' : '+ Nueva'}
                                        </button>
                                    </div>

                                    {message.text && (
                                        <div className={`p-4 border-2 ${message.type === 'success' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700'} font-bold`}>
                                            {message.text}
                                        </div>
                                    )}

                                    {showAddressForm && (
                                        <motion.form
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            onSubmit={handleAddAddress}
                                            className="bg-gray-50 p-6 border-2 border-black space-y-4 mb-8"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input
                                                    type="text" placeholder="Alias (Ej: Casa, Oficina)" required
                                                    value={addressForm.name} onChange={e => setAddressForm({ ...addressForm, name: e.target.value })}
                                                    className="border-2 border-gray-200 p-3 font-bold focus:border-black outline-none"
                                                />
                                                <input
                                                    type="text" placeholder="Dirección / Calle" required
                                                    value={addressForm.street} onChange={e => setAddressForm({ ...addressForm, street: e.target.value })}
                                                    className="border-2 border-gray-200 p-3 font-bold focus:border-black outline-none"
                                                />
                                                <input
                                                    type="text" placeholder="Ciudad" required
                                                    value={addressForm.city} onChange={e => setAddressForm({ ...addressForm, city: e.target.value })}
                                                    className="border-2 border-gray-200 p-3 font-bold focus:border-black outline-none"
                                                />
                                                <input
                                                    type="text" placeholder="Departamento / Estado" required
                                                    value={addressForm.state} onChange={e => setAddressForm({ ...addressForm, state: e.target.value })}
                                                    className="border-2 border-gray-200 p-3 font-bold focus:border-black outline-none"
                                                />
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox" id="isDefault"
                                                    checked={addressForm.isDefault} onChange={e => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                                                    className="w-4 h-4 accent-black"
                                                />
                                                <label htmlFor="isDefault" className="text-sm font-bold uppercase">Dirección principal</label>
                                            </div>
                                            <button
                                                type="submit" disabled={addressLoading}
                                                className="btn-neo-primary px-6 py-2 text-xs"
                                            >
                                                {addressLoading ? 'Guardando...' : 'Guardar Dirección'}
                                            </button>
                                        </motion.form>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {user.addresses && user.addresses.length > 0 ? user.addresses.map((addr, idx) => (
                                            <div key={idx} className="border-2 border-black p-6 relative bg-white">
                                                {addr.isDefault && <span className="absolute top-2 right-2 bg-primary text-black text-[10px] font-bold px-2 py-1 uppercase">Principal</span>}
                                                <div className="mb-4">
                                                    <h3 className="font-black text-lg uppercase tracking-tighter">{addr.name}</h3>
                                                    <p className="text-gray-500 text-sm font-bold">{addr.street}</p>
                                                    <p className="text-gray-500 text-sm">{addr.city}, {addr.state}</p>
                                                </div>
                                                <div className="flex space-x-4">
                                                    <button className="text-xs font-bold underline hover:text-primary transition-colors">Editar</button>
                                                    <button className="text-xs font-bold underline text-red-500 hover:text-red-700 transition-colors">Eliminar</button>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="col-span-full py-12 text-center bg-gray-50 border-2 border-dashed border-gray-200">
                                                <MapPin className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                                                <p className="text-sm font-bold text-gray-500">No tienes direcciones registradas</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'wallet' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-display font-bold uppercase border-b-2 border-black pb-4">Métodos de Pago</h2>
                                    <div className="p-8 bg-blue-50 border-2 border-blue-200 flex items-start space-x-4">
                                        <Shield className="w-8 h-8 text-blue-600 shrink-0" />
                                        <div>
                                            <h3 className="font-black uppercase text-blue-900 mb-2">Transacciones Protegidas</h3>
                                            <p className="text-blue-800 text-sm leading-relaxed">
                                                En <span className="font-bold">Kimju Hogar</span> utilizamos <span className="font-bold">Mercado Pago</span> para procesar todos tus pagos de forma segura.
                                                No almacenamos los datos de tus tarjetas en nuestros servidores para garantizar tu máxima privacidad y seguridad.
                                            </p>
                                            <div className="mt-4 flex space-x-3 grayscale opacity-50">
                                                <img src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo.png" alt="Mercado Pago" className="h-6" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-2 border-gray-100 p-8 text-center bg-gray-50">
                                        <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">
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
