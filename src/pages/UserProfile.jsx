import { useState, useEffect } from 'react';
import { User, Package, MapPin, CreditCard, LogOut, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('profile');

    // Mock user data - replace with API call
    const [user, setUser] = useState({
        name: "Alex Design",
        email: "alex@example.com",
        phone: "+57 300 123 4567",
        joined: "Jan 2026",
        addresses: [
            { id: 1, name: "Casa", address: "Calle 123 #45-67", city: "Valledupar", default: true }
        ],
        orders: [
            { id: "#ORD-001", date: "02 Jan 2026", total: "$450.000", status: "Enviado" },
            { id: "#ORD-002", date: "28 Dec 2025", total: "$120.000", status: "Entregado" }
        ]
    });

    const tabs = [
        { id: 'profile', label: 'Mi Perfil', icon: User },
        { id: 'orders', label: 'Mis Pedidos', icon: Package },
        { id: 'addresses', label: 'Direcciones', icon: MapPin },
        { id: 'wallet', label: 'Billetera', icon: CreditCard },
    ];

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
                        <button className="w-full flex items-center space-x-3 px-6 py-4 font-bold uppercase text-sm text-red-500 hover:bg-red-50 transition-colors mt-8 border-2 border-transparent hover:border-red-100">
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
                                <div className="space-y-8">
                                    <h2 className="text-2xl font-display font-bold uppercase border-b-2 border-black pb-4">Información Personal</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-500">Nombre Completo</label>
                                            <input type="text" defaultValue={user.name} className="w-full border-2 border-gray-200 p-4 font-bold focus:border-black focus:outline-none transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-500">Email</label>
                                            <input type="email" defaultValue={user.email} disabled className="w-full border-2 border-gray-100 bg-gray-50 p-4 font-bold text-gray-400 cursor-not-allowed" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-500">Teléfono</label>
                                            <input type="tel" defaultValue={user.phone} className="w-full border-2 border-gray-200 p-4 font-bold focus:border-black focus:outline-none transition-colors" />
                                        </div>
                                    </div>
                                    <button className="btn-neo-primary px-8 py-3 text-sm">Guardar Cambios</button>
                                </div>
                            )}

                            {activeTab === 'orders' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-display font-bold uppercase border-b-2 border-black pb-4">Historial de Pedidos</h2>
                                    <div className="space-y-4">
                                        {user.orders.map((order, idx) => (
                                            <div key={idx} className="border-2 border-gray-100 p-6 hover:border-black transition-colors flex flex-col md:flex-row justify-between items-center group">
                                                <div className="mb-4 md:mb-0">
                                                    <span className="block font-black text-lg">{order.id}</span>
                                                    <span className="text-sm text-gray-500">{order.date}</span>
                                                </div>
                                                <div className="flex items-center space-x-8">
                                                    <span className="font-bold text-primary">{order.total}</span>
                                                    <span className={`px-3 py-1 text-xs font-bold uppercase ${order.status === 'Entregado' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{order.status}</span>
                                                    <button className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors">
                                                        <Settings className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'addresses' && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center border-b-2 border-black pb-4">
                                        <h2 className="text-2xl font-display font-bold uppercase">Mis Direcciones</h2>
                                        <button className="text-xs font-bold uppercase border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">+ Nueva</button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {user.addresses.map((addr, idx) => (
                                            <div key={idx} className="border-2 border-black p-6 relative">
                                                {addr.default && <span className="absolute top-2 right-2 bg-primary text-black text-[10px] font-bold px-2 py-1 uppercase">Default</span>}
                                                <div className="mb-4">
                                                    <h3 className="font-bold text-lg">{addr.name}</h3>
                                                    <p className="text-gray-500 text-sm">{addr.address}</p>
                                                    <p className="text-gray-500 text-sm">{addr.city}</p>
                                                </div>
                                                <div className="flex space-x-4">
                                                    <button className="text-xs font-bold underline hover:text-primary">Editar</button>
                                                    <button className="text-xs font-bold underline text-red-500 hover:text-red-700">Eliminar</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'wallet' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-display font-bold uppercase border-b-2 border-black pb-4">Billetera Digital</h2>
                                    <p className="text-gray-500">Tus tarjetas guardadas para pagos rápidos.</p>
                                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-8 text-center">
                                        <CreditCard className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                        <p className="text-sm font-bold text-gray-500">No tienes tarjetas guardadas</p>
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
