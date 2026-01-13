import { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, CheckCircle, AlertTriangle, BarChart2, TrendingUp, Users, DollarSign, Package, Trash2, Edit, Search, Plus, Filter, X, LogOut, Image as ImageIcon, Heart, Star, ShoppingBag, Coffee, Smartphone, Zap, Truck, Shield, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend, PieChart, Pie, Cell } from 'recharts';
import PageTransition from '../components/layout/PageTransition';
import { useAuth } from '../context/AuthContext';

// --- Sub-components defined OUTSIDE to prevent re-render focus loss ---

const StatCard = ({ icon: Icon, label, value, color, iconColor }) => (
    <div className="p-6 bg-white border border-pink-100 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className={`absolute top-0 right-0 w-24 h-24 ${color} rounded-full blur-2xl -mr-10 -mt-10 opacity-50 group-hover:opacity-80 transition-opacity`} />
        <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 ${color} rounded-2xl`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
        </div>
        <h3 className="text-3xl font-display font-black text-secondary mb-1 relative z-10">{value}</h3>
        <p className="text-xs font-bold uppercase text-gray-400 relative z-10 tracking-wider">{label}</p>
    </div>
);

const OverviewTab = ({ stats, data, productAnalysis, onShowAnalytics }) => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={DollarSign} label="Ventas Totales (Pagado)" value={`$${stats.sales.toLocaleString()}`} color="bg-pink-100" iconColor="text-primary" />
            <StatCard icon={Users} label="Usuarios" value={stats.users} color="bg-purple-100" iconColor="text-purple-500" />
            <StatCard icon={Package} label="Pedidos Totales" value={stats.orders} color="bg-blue-100" iconColor="text-blue-500" />
            <StatCard icon={TrendingUp} label="Conversión" value={`${stats.orders > 0 ? ((stats.orders / (stats.users || 1)) * 10).toFixed(1) : 0}%`} color="bg-green-100" iconColor="text-green-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2rem] border border-pink-100 shadow-sm relative overflow-hidden">
                <h3 className="font-bold text-lg mb-6 text-secondary flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary fill-pink-200" /> Ventas Mensuales (Info Real)
                </h3>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f472b6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#f472b6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" vertical={false} />
                            <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12, fontWeight: 'bold' }} tickLine={false} axisLine={false} />
                            <YAxis stroke="#9ca3af" tick={{ fontSize: 12, fontWeight: 'bold' }} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val > 1000 ? (val / 1000).toFixed(0) + 'k' : val}`} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    borderRadius: '1rem',
                                    border: 'none',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    color: '#db2777',
                                    fontWeight: 'bold'
                                }}
                                formatter={(value) => [`$${value.toLocaleString()}`, "Ventas"]}
                            />
                            <Area type="monotone" dataKey="sales" stroke="#db2777" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-pink-100 shadow-sm relative overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-secondary flex items-center gap-2">
                        <BarChart2 className="w-5 h-5 text-blue-400" /> Top Productos Vendidos
                    </h3>
                    <button
                        onClick={onShowAnalytics}
                        className="text-xs font-black uppercase text-primary hover:underline flex items-center gap-1"
                    >
                        Ver Detalle <Sparkles className="w-3 h-3" />
                    </button>
                </div>
                {productAnalysis && productAnalysis.length > 0 ? (
                    <div className="space-y-4 flex-grow overflow-y-auto max-h-[280px] pr-2 custom-scrollbar">
                        {productAnalysis.slice(0, 5).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-xl bg-gray-50 p-1 border border-pink-50 shadow-sm shrink-0 overflow-hidden">
                                    <img src={item.image} alt="" className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="flex-grow">
                                    <p className="text-sm font-bold text-secondary truncate mb-0.5">{item.name}</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(item.count / productAnalysis[0].count) * 100}%` }}
                                                className="h-full bg-gradient-to-r from-primary to-purple-400"
                                            />
                                        </div>
                                        <span className="text-[10px] font-black text-primary w-8">{item.count}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-gray-300 font-bold italic">No hay ventas registradas aún.</div>
                )}
            </div>
        </div>
    </div>
);

const ProductsTab = ({
    products, searchTerm, setSearchTerm, filterCategory, setFilterCategory,
    handleDeleteProduct, setProductMode, setShowProductModal, downloadCsvTemplate,
    file, setFile, handleUpload, uploadStatus, uploadMsg, handleEditClick
}) => {
    const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const uniqueHelper = products.map(p => p.category).filter(Boolean);
    const uniqueCategories = ['all', ...new Set(uniqueHelper)];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 bg-white p-6 rounded-[2rem] border border-pink-100 shadow-sm">
                <div className="flex items-center space-x-4 w-full md:w-2/3">
                    <div className="flex items-center space-x-2 flex-1 bg-gray-50 p-3 rounded-xl border border-transparent focus-within:border-pink-200 focus-within:bg-white transition-all">
                        <Search className="text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar producto..."
                            className="w-full bg-transparent outline-none font-bold text-sm text-gray-600 placeholder:text-gray-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-3 w-4 h-4 text-pink-300" />
                        <select
                            className="pl-10 pr-8 py-3 border border-pink-100 rounded-xl font-bold text-xs uppercase text-gray-500 appearance-none bg-white focus:border-primary focus:outline-none transition-colors cursor-pointer hover:bg-pink-50"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            {uniqueCategories.map(c => <option key={c} value={c}>{c === 'all' ? 'Todas' : c}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => { setProductMode('create'); setShowProductModal(true); }}
                        className="bg-secondary text-white px-6 py-3 font-bold text-xs rounded-xl hover:bg-primary transition-all flex items-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Nuevo Producto
                    </button>
                </div>
            </div>

            <div className="bg-white border-2 border-dashed border-pink-200 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between transition-colors hover:border-primary-light">
                <div className="flex items-center mb-4 md:mb-0">
                    <div className="bg-pink-50 p-4 rounded-full mr-4"><Upload className="w-6 h-6 text-primary" /></div>
                    <div>
                        <h4 className="font-bold text-lg text-secondary">Carga Masiva</h4>
                        <button onClick={downloadCsvTemplate} className="text-primary text-xs font-bold underline mt-1 hover:text-primary-dark">Descargar Plantilla CSV</button>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} className="text-xs font-bold text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-pink-50 file:text-primary hover:file:bg-pink-100" />
                    {file && <button onClick={handleUpload} className="bg-secondary text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-primary transition-colors">Subir</button>}
                </div>
                {uploadStatus === 'success' && <div className="text-green-500 font-bold text-sm ml-4 flex items-center bg-green-50 px-3 py-1 rounded-full"><CheckCircle className="w-4 h-4 mr-1" /> {uploadMsg}</div>}
            </div>

            <div className="bg-white border border-pink-100 rounded-[2rem] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-pink-50 text-secondary uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="p-6 rounded-tl-[2rem]">Producto</th>
                                <th className="p-6">Precio</th>
                                <th className="p-6">Stock</th>
                                <th className="p-6">Cat</th>
                                <th className="p-6 rounded-tr-[2rem]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium">
                            {filtered.map(product => (
                                <tr key={product._id} className="border-b border-gray-50 hover:bg-pink-50/50 transition-colors">
                                    <td className="p-6 flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                            <img src={product.image || "https://via.placeholder.com/40"} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-secondary text-sm">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 font-bold text-gray-500">${product.price.toLocaleString()}</td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock < 10 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>{product.stock} un.</span>
                                    </td>
                                    <td className="p-6"><span className="bg-gray-50 text-gray-500 border border-gray-100 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide">{product.category}</span></td>
                                    <td className="p-6 flex space-x-2">
                                        <button onClick={() => handleEditClick(product)} className="p-2 hover:bg-primary hover:text-white text-gray-400 transition-colors rounded-xl"><Edit className="w-4 h-4" /></button>
                                        <button onClick={() => handleDeleteProduct(product._id)} className="p-2 hover:bg-red-400 hover:text-white text-gray-400 transition-colors rounded-xl"><Trash2 className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const UsersTab = ({ users, handleDeleteUser, onViewUserOrders }) => (
    <div className="bg-white border border-pink-100 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-pink-50 text-secondary uppercase text-xs font-bold tracking-wider">
                    <tr>
                        <th className="p-6 rounded-tl-[2rem]">Usuario</th>
                        <th className="p-6">Email</th>
                        <th className="p-6">Rol</th>
                        <th className="p-6 rounded-tr-[2rem]">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-sm font-medium">
                    {users.map(u => (
                        <tr key={u._id} className="border-b border-gray-50 hover:bg-pink-50/50 transition-colors">
                            <td className="p-6 flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-purple-200 text-white rounded-full flex items-center justify-center font-black shadow-sm border-2 border-white">
                                    {u.name.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-600">{u.name}</span>
                                    <button
                                        onClick={() => onViewUserOrders(u)}
                                        className="text-[10px] text-primary font-bold hover:underline text-left"
                                    >
                                        Ver Pedidos
                                    </button>
                                </div>
                            </td>
                            <td className="p-6 text-gray-500">{u.email}</td>
                            <td className="p-6">
                                <span className={`px-3 py-1 rounded-full text-xs uppercase font-bold text-[10px] tracking-wide ${u.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                                    {u.role}
                                </span>
                            </td>
                            <td className="p-6">
                                <button
                                    onClick={() => handleDeleteUser(u._id)}
                                    className="text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-1 rounded-full text-xs font-bold transition-all"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// CategoriesTab component is now defined inline or should be updated if defined separately.
// Wait, I defined it inside the previous large replace block, but if it was defined separately before line 227, I need to make sure I didn't verify duplicate definitions.
// The previous replace block REPLACED text starting at line 306.
// `CategoriesTab` is defined at line 227.
// I need to update the `CategoriesTab` DEFINITION at line 227 to match the one I used in the large block (or just remove it if I moved it, but I didn't move it).
// Actually, looking at my previous tool call, I replaced the STATE and handle functions (306-386), AND I INCLUDED the new `CategoriesTab` component code at the end of the content.
// BUT `CategoriesTab` was defined BEFORE 306 (at 227).
// So now I have TWO `CategoriesTab` definitions?
// No, the previous `replace_file_content` targeted lines 306-386 (State + Actions).
// It included `const CategoriesTab = ...` at the end of the `ReplacementContent`.
// This means I likely now have `CategoriesTab` defined TWICE if I didn't delete the old one.
// The old one is at 227.
// I should DELETE the old `CategoriesTab` definition at 227 to avoid conflicts.

const OrdersTab = ({ orders }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filtered = orders.filter(o => {
        const matchesSearch = o._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (o.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'paid' && o.isPaid) ||
            (statusFilter === 'unpaid' && !o.isPaid) ||
            (statusFilter === o.status.toLowerCase());
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 bg-white p-6 rounded-[2rem] border border-pink-100 shadow-sm">
                <div className="flex items-center space-x-4 w-full">
                    <div className="flex items-center space-x-2 flex-1 bg-gray-50 p-3 rounded-xl border border-transparent focus-within:border-pink-200 focus-within:bg-white transition-all">
                        <Search className="text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar por ID o Usuario..."
                            className="w-full bg-transparent outline-none font-bold text-sm text-gray-600 placeholder:text-gray-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-3 w-4 h-4 text-pink-300" />
                        <select
                            className="pl-10 pr-8 py-3 border border-pink-100 rounded-xl font-bold text-xs uppercase text-gray-500 appearance-none bg-white focus:border-primary focus:outline-none transition-colors cursor-pointer hover:bg-pink-50"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Todos los Estados</option>
                            <option value="paid">Pagados</option>
                            <option value="unpaid">No Pagados</option>
                            <option value="processing">Procesando</option>
                            <option value="delivered">Entregados</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-pink-100 rounded-[2rem] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-pink-50 text-secondary uppercase text-xs font-bold">
                            <tr>
                                <th className="p-6">ID Pedido</th>
                                <th className="p-6">Cliente</th>
                                <th className="p-6">Total</th>
                                <th className="p-6">Vencimiento/Pago</th>
                                <th className="p-6">Estado</th>
                                <th className="p-6">Fecha</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium">
                            {filtered.map(order => (
                                <tr key={order._id} className="border-b border-gray-50 hover:bg-pink-50/50 transition-colors">
                                    <td className="p-6 font-mono text-xs text-gray-400">#{order._id.substring(order._id.length - 8)}</td>
                                    <td className="p-6">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-600">{order.user ? order.user.name : "Usuario Eliminado"}</span>
                                            <span className="text-[10px] text-gray-400">{order.shippingAddress.city}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 font-display font-black text-primary">${order.totalPrice.toLocaleString()}</td>
                                    <td className="p-6">
                                        {order.isPaid ? (
                                            <span className="text-green-500 font-bold flex items-center gap-1 text-xs">
                                                <CheckCircle className="w-3 h-3" /> Pagado
                                            </span>
                                        ) : (
                                            <span className="text-red-400 font-bold flex items-center gap-1 text-xs">
                                                <AlertTriangle className="w-3 h-3" /> Pendiente
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1 uppercase text-[10px] font-black rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                            order.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                                                'bg-yellow-100 text-yellow-600'
                                            }`}>
                                            {order.status === 'Processing' ? 'En Preparación' :
                                                order.status === 'Delivered' ? 'Entregado' : 'Pendiente'}
                                        </span>
                                    </td>
                                    <td className="p-6 text-gray-400 text-xs font-bold">{new Date(order.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---
const AnalyticsModal = ({ isOpen, onClose, data, products, orders }) => {
    if (!isOpen) return null;

    // Category distribution
    const catData = products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {});
    const pieData = Object.keys(catData).map(k => ({ name: k, value: catData[k] }));
    const COLORS = ['#f472b6', '#a855f7', '#60a5fa', '#facc15', '#4ade80'];

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-secondary/40 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl p-8 custom-scrollbar"
            >
                <div className="flex justify-between items-center mb-8 border-b border-pink-50 pb-6">
                    <div>
                        <h2 className="text-3xl font-display font-black text-secondary uppercase tracking-tight">Análisis de Datos Detallado</h2>
                        <p className="text-gray-400 font-bold text-sm">Discriminación de ventas y productos ✨</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-pink-50 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-pink-50/30 p-8 rounded-3xl border border-pink-50">
                        <h3 className="font-bold text-secondary mb-6 flex items-center gap-2"><ImageIcon className="w-5 h-5 text-primary" /> Distribución por Categoría</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                        {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-purple-50/30 p-8 rounded-3xl border border-purple-50">
                        <h3 className="font-bold text-secondary mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-purple-400" /> Crecimiento de Usuarios</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="users" stroke="#a855f7" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-pink-100 rounded-3xl p-8 mb-8 shadow-sm">
                    <h3 className="font-bold text-secondary mb-8">Desglose de Rendimiento Mensual</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-pink-50">
                                    <th className="pb-4">Mes</th>
                                    <th className="pb-4">Ventas</th>
                                    <th className="pb-4">Registros</th>
                                    <th className="pb-4">Tasa Crecimiento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((m, i) => (
                                    <tr key={i} className="border-b border-gray-50 last:border-0">
                                        <td className="py-4 font-bold text-secondary">{m.name}</td>
                                        <td className="py-4 font-black text-primary">${m.sales.toLocaleString()}</td>
                                        <td className="py-4 font-bold text-gray-500">{m.users}</td>
                                        <td className="py-4">
                                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-[10px] font-black tracking-tighter">
                                                +{i > 0 ? (m.users - data[i - 1].users >= 0 ? m.users - data[i - 1].users : 0) : m.users}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// --- Main Component ---
const AdminDashboard = () => {
    const { user, logout, loading } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    // Data States
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [stats, setStats] = useState({ sales: 0, users: 0, orders: 0 });

    const [isLoadingData, setIsLoadingData] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [showProductModal, setShowProductModal] = useState(false);
    const [productMode, setProductMode] = useState('create');

    const [newCategory, setNewCategory] = useState('');
    const [newCategoryImage, setNewCategoryImage] = useState('');
    const [newCategoryIcon, setNewCategoryIcon] = useState('');

    // Category Edit State
    const [categoryMode, setCategoryMode] = useState('create');
    const [editingCategory, setEditingCategory] = useState(null);

    const availableIcons = [
        { name: 'Star', icon: Star },
        { name: 'Heart', icon: Heart },
        { name: 'ShoppingBag', icon: ShoppingBag },
        { name: 'Coffee', icon: Coffee },
        { name: 'Smartphone', icon: Smartphone },
        { name: 'Zap', icon: Zap },
        { name: 'Truck', icon: Truck },
        { name: 'Shield', icon: Shield },
        { name: 'Wait', icon: AlertTriangle },
        { name: 'Sparkles', icon: Sparkles },
        // New Kawaii Icons
        { name: 'Image', icon: ImageIcon },
        { name: 'Package', icon: Package },
        { name: 'TrendingUp', icon: TrendingUp },
        { name: 'DollarSign', icon: DollarSign },
        { name: 'Users', icon: Users },
    ];

    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [uploadMsg, setUploadMsg] = useState('');

    // Product Form State
    const [productForm, setProductForm] = useState({
        name: '', price: '', category: '', stock: '', description: '', discount: '', image: '', variations: ''
    });

    const handleCategoryImageUpload = async (e) => {
        const imgFile = e.target.files[0];
        if (!imgFile) return;

        // Basic validation
        if (imgFile.size > 5 * 1024 * 1024) {
            alert("La imagen es muy grande (máx 5MB)");
            return;
        }

        const formData = new FormData();
        formData.append('image', imgFile);

        try {
            const res = await axios.post('http://localhost:5000/api/upload', formData);
            setNewCategoryImage(`http://localhost:5000${res.data.filePath}`);
        } catch (err) {
            console.error("Upload failed", err);
            const msg = err.response?.data?.message || "Falló la subida de imagen";
            alert(`Error: ${msg}`);
        }
    };

    const handleEditCategoryClick = (cat) => {
        setCategoryMode('edit');
        setEditingCategory(cat);
        setNewCategory(cat.name);
        setNewCategoryImage(cat.image || '');
        setNewCategoryIcon(cat.icon || '');
    };

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) {
            alert("El nombre de la categoría es obligatorio");
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const payload = { name: newCategory.trim(), image: newCategoryImage, icon: newCategoryIcon };
            const config = { headers: { 'x-auth-token': token } };

            if (categoryMode === 'create') {
                await axios.post('http://localhost:5000/api/categories', payload, config);
            } else {
                // Edit Mode
                await axios.put(`http://localhost:5000/api/categories/${editingCategory._id}`, payload, config);
                setCategoryMode('create');
                setEditingCategory(null);
            }

            setNewCategory('');
            setNewCategoryImage('');
            setNewCategoryIcon('');
            fetchData();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Error guardando categoría');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/products/${id}`, { headers: { 'x-auth-token': token } });
            fetchData();
        } catch (err) { alert("Error al eliminar"); console.error(err); }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/users/${id}`, { headers: { 'x-auth-token': token } });
            fetchData();
        } catch (err) { alert("Error al eliminar"); console.error(err); }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("¿Borrar categoría?")) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/categories/${id}`, { headers: { 'x-auth-token': token } });
            fetchData();
        } catch (err) { alert('Error borrando categoría'); }
    };

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        setUploadStatus('uploading');

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/products/batch', formData, {
                headers: { 'x-auth-token': token }
            });
            setUploadStatus('success');
            setUploadMsg(res.data.msg);
            fetchData();
        } catch (err) {
            setUploadStatus('error');
            setUploadMsg('Error al subir');
        }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };

            if (productMode === 'create') {
                const finalProduct = { ...productForm };
                if (!finalProduct.category) finalProduct.category = 'General';
                await axios.post('http://localhost:5000/api/products', finalProduct, config);
            } else {
                // Edit Mode
                await axios.put(`http://localhost:5000/api/products/${productForm._id}`, productForm, config);
            }

            setShowProductModal(false);
            setProductForm({ name: '', price: '', category: '', stock: '', description: '', discount: '', image: '', variations: '' });
            fetchData();
        } catch (err) {
            alert('Error al guardar producto');
            console.error(err);
        }
    };

    const handleEditClick = (product) => {
        setProductMode('edit');
        setProductForm({
            _id: product._id,
            name: product.name,
            price: product.price,
            category: product.category,
            stock: product.stock,
            description: product.description,
            discount: product.discount || 0,
            image: product.image,
            variations: product.variations ? product.variations.join(',') : ''
        });
        setShowProductModal(true);
    };

    const handleImageUpload = async (e) => {
        const imgFile = e.target.files[0];
        if (!imgFile) return;

        if (imgFile.size > 5 * 1024 * 1024) {
            alert("La imagen es muy grande (máx 5MB)");
            return;
        }

        const formData = new FormData();
        formData.append('image', imgFile);

        try {
            const res = await axios.post('http://localhost:5000/api/upload', formData);
            setProductForm({ ...productForm, image: `http://localhost:5000${res.data.filePath}` });
        } catch (err) {
            console.error("Upload failed", err);
            const msg = err.response?.data?.message || "Falló la subida de imagen";
            alert(`Error: ${msg}`);
        }
    };

    const downloadCsvTemplate = () => {
        const csvContent = "data:text/csv;charset=utf-8,name,price,category,stock,description,image\nProducto1,10000,Hogar,50,Desc,http://url.com";
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "plantilla.csv");
        document.body.appendChild(link);
        link.click();
    };

    // Real Data Processing
    const getChartData = () => {
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const currentYear = new Date().getFullYear();

        const monthlyData = months.map((month, idx) => {
            const monthOrders = orders.filter(o => {
                const date = new Date(o.createdAt);
                return date.getMonth() === idx && date.getFullYear() === currentYear && o.isPaid;
            });
            const monthUsers = users.filter(u => {
                const date = new Date(u.createdAt);
                return date.getMonth() === idx && date.getFullYear() === currentYear;
            });

            return {
                name: month,
                sales: monthOrders.reduce((acc, o) => acc + (o.totalPrice || 0), 0),
                users: monthUsers.length
            };
        });

        // Only return last 6 months or until current month
        const currentMonthIdx = new Date().getMonth();
        return monthlyData.slice(Math.max(0, currentMonthIdx - 5), currentMonthIdx + 1);
    };

    const processedChartData = getChartData();

    const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

    const getProductAnalysis = () => {
        const productSales = {};
        orders.filter(o => o.isPaid).forEach(order => {
            order.orderItems.forEach(item => {
                if (productSales[item.product]) {
                    productSales[item.product].count += item.quantity;
                } else {
                    productSales[item.product] = {
                        name: item.name,
                        image: item.image,
                        count: item.quantity
                    };
                }
            });
        });
        return Object.values(productSales).sort((a, b) => b.count - a.count);
    };

    const productAnalysis = getProductAnalysis();

    const fetchData = async () => {
        setIsLoadingData(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };

            const [productsRes, usersRes, ordersRes, categoriesRes] = await Promise.all([
                axios.get('http://localhost:5000/api/products?includeOutOfStock=true', config),
                axios.get('http://localhost:5000/api/users', config),
                axios.get('http://localhost:5000/api/orders', config),
                axios.get('http://localhost:5000/api/categories', config)
            ]);

            setProducts(productsRes.data);
            setUsers(usersRes.data);
            setOrders(ordersRes.data);
            setCategories(categoriesRes.data);

            // ONLY PAID ORDERS count for Sales KPI
            const totalSales = ordersRes.data
                .filter(o => o.isPaid)
                .reduce((acc, order) => acc + (order.totalPrice || 0), 0);

            setStats({
                sales: totalSales,
                users: usersRes.data.length,
                orders: ordersRes.data.length
            });

        } catch (err) {
            console.error("Error fetching admin data", err);
        }
        setIsLoadingData(false);
    };

    const handleUpdateOrderStatus = async (orderId, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status }, {
                headers: { 'x-auth-token': token }
            });
            fetchData();
        } catch (err) {
            alert('Error al actualizar estado');
        }
    };

    const handleUpdateOrderPaid = async (orderId) => {
        if (!window.confirm("¿Confirmar que este pedido ya fue pagado manualmente?")) return;
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/orders/${orderId}/pay`, {}, {
                headers: { 'x-auth-token': token }
            });
            fetchData();
        } catch (err) {
            alert('Error al marcar como pagado');
        }
    };

    const downloadInvoice = async () => {
        if (!selectedOrder) return;
        setIsDownloading(true);
        const element = document.getElementById('invoice-content');
        try {
            const canvas = await html2canvas(element, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Factura_Kimju_${selectedOrder._id.slice(-6).toUpperCase()}.pdf`);
        } catch (err) {
            console.error("PDF Error", err);
        } finally {
            setIsDownloading(false);
        }
    };

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchData();
        }
    }, [user]);


    return (
        <PageTransition>
            <div className="pt-24 pb-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 bg-white min-h-screen relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-50 rounded-full blur-[120px] -z-10 opacity-60" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-50 rounded-full blur-[120px] -z-10 opacity-60" />

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="bg-gradient-to-tr from-primary to-purple-400 text-white p-2 rounded-xl shadow-lg">
                                <Star className="w-6 h-6 animate-spin-slow" />
                            </div>
                            <h1 className="text-4xl font-display font-black text-secondary tracking-tight">Panel Administrativo</h1>
                        </div>
                        <p className="text-gray-400 font-medium">Gestiona tu tienda con estilo. ✨</p>
                    </div>

                    <div className="flex gap-4 items-center bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-pink-100 shadow-sm">
                        <div className="flex space-x-1">
                            {['overview', 'products', 'users', 'categories', 'orders'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 font-bold text-xs rounded-xl transition-all ${activeTab === tab ? 'bg-secondary text-white shadow-md' : 'text-gray-400 hover:bg-pink-50 hover:text-primary'}`}
                                >
                                    {tab === 'rows' ? 'Filas' : tab.charAt(0).toUpperCase() + tab.slice(1)} {/* Simple Cap */}
                                </button>
                            ))}
                        </div>
                        <div className="h-6 w-px bg-gray-200 mx-2" />
                        <button onClick={logout} className="text-red-400 font-bold text-xs flex items-center gap-1 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                        {activeTab === 'overview' && (
                            <OverviewTab
                                stats={stats}
                                data={processedChartData}
                                productAnalysis={productAnalysis}
                                onShowAnalytics={() => setIsAnalyticsOpen(true)}
                            />
                        )}
                        {activeTab === 'products' && (
                            <ProductsTab
                                products={products}
                                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                                filterCategory={filterCategory} setFilterCategory={setFilterCategory}
                                handleDeleteProduct={handleDeleteProduct}
                                setProductMode={setProductMode} setShowProductModal={setShowProductModal}
                                downloadCsvTemplate={downloadCsvTemplate}
                                file={file} setFile={setFile} handleUpload={handleUpload}
                                uploadStatus={uploadStatus} uploadMsg={uploadMsg}
                                handleEditClick={handleEditClick}
                            />
                        )}
                        {activeTab === 'users' && <UsersTab users={users} handleDeleteUser={handleDeleteUser} />}
                        {activeTab === 'categories' && (
                            <CategoriesTab
                                categories={categories}
                                newCategory={newCategory} setNewCategory={setNewCategory}
                                newCategoryImage={newCategoryImage}
                                newCategoryIcon={newCategoryIcon} setNewCategoryIcon={setNewCategoryIcon}
                                availableIcons={availableIcons}
                                handleCategoryImageUpload={handleCategoryImageUpload}
                                handleCreateCategory={handleCreateCategory} handleDeleteCategory={handleDeleteCategory}
                                categoryMode={categoryMode} editingCategory={editingCategory} handleEditCategoryClick={handleEditCategoryClick}
                            />
                        )}
                        {activeTab === 'orders' && (
                            <OrdersTab
                                orders={orders}
                                onUpdateStatus={handleUpdateOrderStatus}
                                onUpdatePaid={handleUpdateOrderPaid}
                                onViewInvoice={(order) => { setSelectedOrder(order); setIsInvoiceOpen(true); }}
                            />
                        )}
                    </motion.div >
                </AnimatePresence >

                <AnalyticsModal
                    isOpen={isAnalyticsOpen}
                    onClose={() => setIsAnalyticsOpen(false)}
                    data={processedChartData}
                    products={products}
                    orders={orders}
                />

                {/* Invoice Modal */}
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
                                        <h3 className="font-display font-black text-secondary uppercase text-lg">Factura de Orden</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={downloadInvoice}
                                            disabled={isDownloading}
                                            className="bg-pink-50 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50"
                                        >
                                            {isDownloading ? 'Generando...' : <><Download className="w-4 h-4" /> PDF</>}
                                        </button>
                                        <button onClick={() => setIsInvoiceOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                            <X className="w-6 h-6 text-gray-400" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-grow overflow-y-auto p-4 md:p-8 custom-scrollbar bg-gray-50/30">
                                    <div id="invoice-content" className="bg-white p-6 md:p-12 rounded-[2rem] border border-pink-50 shadow-sm max-w-3xl mx-auto">
                                        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
                                            <div>
                                                <h1 className="text-3xl font-display font-black text-primary mb-2">KIMJU <span className="text-secondary">HOGAR</span></h1>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tienda de Regalos y Kawaii</p>
                                            </div>
                                            <div className="text-right">
                                                <h2 className="text-xl font-display font-black text-secondary uppercase mb-1">Copia Administrador</h2>
                                                <p className="text-primary font-bold text-sm">#ORD-{selectedOrder._id.slice(-6).toUpperCase()}</p>
                                                <p className="text-xs font-bold text-secondary mt-2">{new Date(selectedOrder.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 p-6 bg-pink-50/30 rounded-3xl border border-pink-50">
                                            <div>
                                                <h3 className="text-[10px] font-black text-primary uppercase mb-2">Cliente:</h3>
                                                <p className="font-bold text-secondary">{selectedOrder.user?.name || 'Usuario Eliminado'}</p>
                                                <p className="text-sm text-gray-500">{selectedOrder.user?.email || '-'}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-[10px] font-black text-primary uppercase mb-2">Envío:</h3>
                                                <p className="font-bold text-secondary">{selectedOrder.shippingAddress.address}</p>
                                                <p className="text-sm text-gray-500">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                                            </div>
                                        </div>

                                        <table className="w-full text-left mb-12">
                                            <thead>
                                                <tr className="border-b-2 border-pink-50">
                                                    <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item</th>
                                                    <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Cant.</th>
                                                    <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-pink-50">
                                                {selectedOrder.orderItems.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td className="py-4">
                                                            <p className="font-bold text-secondary text-sm">{item.name}</p>
                                                            {item.selectedVariation && <p className="text-[10px] text-primary font-bold uppercase">{item.selectedVariation}</p>}
                                                        </td>
                                                        <td className="py-4 text-center font-bold text-gray-500 text-sm">x{item.quantity}</td>
                                                        <td className="py-4 text-right font-black text-secondary text-sm">${(item.quantity * item.price).toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <div className="flex flex-col items-end gap-3 border-t-2 border-pink-50 pt-8">
                                            <div className="flex justify-between w-full max-w-[250px] text-2xl font-display font-black text-secondary pt-4 border-t border-dashed border-pink-100">
                                                <span className="text-primary">TOTAL:</span>
                                                <span>${selectedOrder.totalPrice.toLocaleString()}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${selectedOrder.isPaid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                    {selectedOrder.isPaid ? 'Pagado' : 'Pendiente de Pago'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {showProductModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-secondary/30 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
                    >
                        <motion.div
                            initial={{ y: "100%" }} animate={{ y: 0 }}
                            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-[2rem] sm:rounded-[2.5rem] p-8 relative shadow-2xl"
                        >
                            <button onClick={() => setShowProductModal(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
                            <h2 className="text-2xl font-display font-black text-secondary mb-1">{productMode === 'create' ? 'Nuevo Producto' : 'Editar Producto'}</h2>
                            <p className="text-gray-400 text-sm font-medium mb-6">Completa los detalles de tu cosita maravillosa.</p>

                            <form onSubmit={handleProductSubmit} className="space-y-5">
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-400 ml-2">Nombre</label>
                                        <input required value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-600 focus:bg-white focus:border-primary focus:outline-none transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-400 ml-2">Precio</label>
                                        <input required type="number" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-600 focus:bg-white focus:border-primary focus:outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-400 ml-2">Categoría</label>
                                        <select value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-600 focus:bg-white focus:border-primary focus:outline-none transition-all appearance-none cursor-pointer">
                                            <option value="">Seleccionar...</option>
                                            {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-400 ml-2">Stock</label>
                                        <input required type="number" value={productForm.stock} onChange={e => setProductForm({ ...productForm, stock: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-600 focus:bg-white focus:border-primary focus:outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 ml-2">Descripción</label>
                                    <textarea value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-600 focus:bg-white focus:border-primary focus:outline-none transition-all" rows="3" />
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-400 ml-2">Descuento (%)</label>
                                        <input type="number" value={productForm.discount} onChange={e => setProductForm({ ...productForm, discount: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-600 focus:bg-white focus:border-primary focus:outline-none transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-400 ml-2">Variaciones</label>
                                        <input type="text" placeholder="Ej: Rojo, Azul" value={productForm.variations} onChange={e => setProductForm({ ...productForm, variations: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-600 focus:bg-white focus:border-primary focus:outline-none transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 ml-2">Imagen</label>
                                    <div className="flex gap-2 items-center">
                                        <input type="text" placeholder="URL de la imagen" value={productForm.image} onChange={e => setProductForm({ ...productForm, image: e.target.value })} className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-600 focus:bg-white focus:border-primary focus:outline-none transition-all" />
                                        <label className="bg-pink-50 px-4 py-3 cursor-pointer rounded-xl font-bold uppercase text-xs text-primary hover:bg-pink-100 transition-colors">
                                            Subir <input type="file" onChange={handleImageUpload} className="hidden" />
                                        </label>
                                    </div>
                                </div>
                                {productForm.image && (
                                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-100 shadow-sm mx-auto">
                                        <img src={productForm.image} className="w-full h-full object-cover" />
                                    </div>
                                )}

                                <button type="submit" className="w-full bg-secondary text-white p-4 rounded-xl font-bold text-lg hover:bg-primary transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                    {productMode === 'create' ? 'Crear Producto' : 'Guardar Cambios'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </div >
        </PageTransition >
    );
};

export default AdminDashboard;
