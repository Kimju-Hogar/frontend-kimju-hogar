import { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, FileText, CheckCircle, AlertTriangle, BarChart2, TrendingUp, Users, DollarSign, Package, Trash2, Edit, Search, Plus, Filter, X, LogOut, Save, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';
import PageTransition from '../components/layout/PageTransition';
import { useAuth } from '../context/AuthContext';

// --- Sub-components defined OUTSIDE to prevent re-render focus loss ---

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className={`p-6 border-2 border-black shadow-neo ${color}`}>
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-black text-white rounded-none">
                <Icon className="w-5 h-5" />
            </div>
        </div>
        <h3 className="text-3xl font-display font-black mb-1">{value}</h3>
        <p className="text-xs font-bold uppercase text-gray-500">{label}</p>
    </div>
);

const OverviewTab = ({ stats, data }) => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={DollarSign} label="Ventas Totales" value={`$${stats.sales.toLocaleString()}`} color="bg-primary" />
            <StatCard icon={Users} label="Usuarios" value={stats.users} color="bg-white" />
            <StatCard icon={Package} label="Pedidos" value={stats.orders} color="bg-white" />
            <StatCard icon={TrendingUp} label="Conversión" value="3.2%" color="bg-white" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 border-2 border-black shadow-neo">
                <h3 className="font-bold uppercase mb-4 text-sm bg-black text-white inline-block px-2">Ventas Mensuales (Comparativa)</h3>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f5c6d0" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#f5c6d0" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                            <XAxis dataKey="name" stroke="#000" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                            <YAxis stroke="#000" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                            <Tooltip contentStyle={{ border: '2px solid black', borderRadius: '8px' }} />
                            <Legend />
                            <Area type="monotone" dataKey="sales" name="Ventas ($)" stroke="#000" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="bg-white p-6 border-2 border-black shadow-neo">
                <h3 className="font-bold uppercase mb-4 text-sm bg-black text-white inline-block px-2">Crecimiento de Usuarios</h3>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                            <XAxis dataKey="name" stroke="#000" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                            <YAxis stroke="#000" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                            <Tooltip contentStyle={{ border: '2px solid black', borderRadius: '8px' }} />
                            <Legend />
                            <Line type="monotone" dataKey="users" name="Usuarios Activos" stroke="#000" strokeWidth={3} dot={{ r: 4, fill: 'black' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
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

    // Create unique categories list safely
    const uniqueHelper = products.map(p => p.category).filter(Boolean);
    const uniqueCategories = ['all', ...new Set(uniqueHelper)];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 bg-white p-4 border-2 border-black shadow-neo">
                <div className="flex items-center space-x-4 w-full md:w-2/3">
                    <div className="flex items-center space-x-2 flex-1 bg-gray-50 p-2 rounded border border-gray-200">
                        <Search className="text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar producto..."
                            className="w-full bg-transparent outline-none font-bold text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                        <select
                            className="pl-10 pr-8 py-2 border-2 border-gray-200 rounded font-bold text-xs uppercase appearance-none bg-white focus:border-black focus:outline-none"
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
                        className="bg-black text-white px-4 py-2 font-bold uppercase text-xs hover:bg-primary hover:text-black transition-colors flex items-center shadow-lg"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Nuevo
                    </button>
                </div>
            </div>

            <div className="bg-white border-2 border-dashed border-gray-300 hover:border-black p-6 rounded-lg flex flex-col md:flex-row items-center justify-between transition-colors">
                <div className="flex items-center mb-4 md:mb-0">
                    <div className="bg-gray-100 p-3 rounded-full mr-4"><Upload className="w-6 h-6 text-gray-500" /></div>
                    <div>
                        <h4 className="font-bold text-lg">Carga Masiva</h4>
                        <button onClick={downloadCsvTemplate} className="text-primary text-xs font-bold underline mt-1">Descargar Plantilla CSV</button>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} className="text-xs font-bold" />
                    {file && <button onClick={handleUpload} className="bg-black text-white px-4 py-2 text-xs font-bold uppercase hover:bg-green-600">Subir</button>}
                </div>
                {uploadStatus === 'success' && <div className="text-green-600 font-bold text-sm ml-4 flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> {uploadMsg}</div>}
            </div>

            <div className="bg-white border-2 border-black shadow-neo overflow-x-auto min-h-[400px]">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-black text-white uppercase text-xs">
                        <tr>
                            <th className="p-4">Producto</th>
                            <th className="p-4">Precio</th>
                            <th className="p-4">Stock</th>
                            <th className="p-4">Cat</th>
                            <th className="p-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-medium">
                        {filtered.map(product => (
                            <tr key={product._id} className="border-b border-gray-100 hover:bg-yellow-50 transition-colors">
                                <td className="p-4 flex items-center space-x-3">
                                    <img src={product.image || "https://via.placeholder.com/40"} className="w-10 h-10 object-cover border border-black rounded-md" />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-xs">{product.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 font-mono">${product.price.toLocaleString()}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{product.stock}</span>
                                </td>
                                <td className="p-4"><span className="bg-gray-100 px-2 py-1 rounded text-[10px] uppercase font-bold">{product.category}</span></td>
                                <td className="p-4 flex space-x-2">
                                    <button onClick={() => handleEditClick(product)} className="p-2 hover:bg-black hover:text-white transition-colors rounded border border-gray-200"><Edit className="w-4 h-4" /></button>
                                    <button onClick={() => handleDeleteProduct(product._id)} className="p-2 hover:bg-red-600 hover:text-white transition-colors rounded border border-gray-200"><Trash2 className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const UsersTab = ({ users, handleDeleteUser }) => (
    <div className="bg-white border-2 border-black shadow-neo overflow-x-auto">
        <table className="w-full text-left border-collapse">
            <thead className="bg-black text-white uppercase text-xs">
                <tr><th className="p-4">Usuario</th><th className="p-4">Email</th><th className="p-4">Rol</th><th className="p-4">Acciones</th></tr>
            </thead>
            <tbody className="text-sm font-medium">
                {users.map(u => (
                    <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4 flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary text-black border border-black rounded-full flex items-center justify-center font-bold">{u.name.charAt(0)}</div>
                            <span>{u.name}</span>
                        </td>
                        <td className="p-4">{u.email}</td>
                        <td className="p-4"><span className={`px-2 py-1 rounded text-xs uppercase font-bold border ${u.role === 'admin' ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-300'}`}>{u.role}</span></td>
                        <td className="p-4"><button onClick={() => handleDeleteUser(u._id)} className="text-red-500 hover:text-red-700 hover:underline text-xs font-bold uppercase">Eliminar</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const CategoriesTab = ({ categories, newCategory, setNewCategory, handleCreateCategory, handleDeleteCategory }) => (
    <div className="space-y-6">
        <div className="bg-white p-6 border-2 border-black shadow-neo">
            <h3 className="font-bold uppercase mb-4">Nueva Categoría</h3>
            <form onSubmit={handleCreateCategory} className="flex gap-4">
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Nombre de categoría..."
                    className="flex-1 border-2 border-gray-200 p-2 font-bold focus:border-black outline-none"
                    autoFocus
                />
                <button type="submit" className="bg-black text-white px-6 font-bold uppercase text-xs btn-neo-primary">Crear</button>
            </form>
        </div>
        <div className="bg-white border-2 border-black shadow-neo">
            <table className="w-full text-left">
                <thead className="bg-black text-white uppercase text-xs">
                    <tr><th className="p-4">Nombre</th><th className="p-4">Slug</th><th className="p-4">Acciones</th></tr>
                </thead>
                <tbody className="text-sm font-medium">
                    {categories.map(c => (
                        <tr key={c._id} className="border-b border-gray-100">
                            <td className="p-4">{c.name}</td>
                            <td className="p-4 text-gray-500">{c.slug}</td>
                            <td className="p-4"><button onClick={() => handleDeleteCategory(c._id)} className="text-red-500 font-bold uppercase text-xs hover:underline">Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const OrdersTab = ({ orders }) => (
    <div className="bg-white border-2 border-black shadow-neo overflow-x-auto">
        <table className="w-full text-left">
            <thead className="bg-black text-white uppercase text-xs">
                <tr><th className="p-4">ID</th><th className="p-4">Usuario</th><th className="p-4">Total</th><th className="p-4">Estado</th><th className="p-4">Fecha</th></tr>
            </thead>
            <tbody className="text-sm font-medium">
                {orders.map(order => (
                    <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4 font-mono text-xs text-gray-500">#{order._id.substring(0, 8)}</td>
                        <td className="p-4 font-bold">{order.user ? order.user.name : "Usuario Eliminado"}</td>
                        <td className="p-4 font-mono font-bold text-green-600">${order.totalPrice.toLocaleString()}</td>
                        <td className="p-4"><span className="bg-yellow-100 text-yellow-800 border border-yellow-200 px-2 py-1 uppercase text-[10px] font-black tracking-wider rounded">Pendiente</span></td>
                        <td className="p-4 text-gray-400 text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

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

    // UI States
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all'); // Fixed ReferenceError
    const [showProductModal, setShowProductModal] = useState(false);
    const [productMode, setProductMode] = useState('create');

    // Category Management State
    const [newCategory, setNewCategory] = useState('');

    // Form State
    const [productForm, setProductForm] = useState({
        name: '', price: '', category: '', stock: '', description: '', discount: '', image: '', variations: ''
    });

    // Upload State
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [uploadMsg, setUploadMsg] = useState('');

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        setIsLoadingData(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };

            const [productsRes, usersRes, ordersRes, categoriesRes] = await Promise.all([
                axios.get('http://localhost:5000/api/products'),
                axios.get('http://localhost:5000/api/users', config),
                axios.get('http://localhost:5000/api/orders', config),
                axios.get('http://localhost:5000/api/categories')
            ]);

            setProducts(productsRes.data);
            setUsers(usersRes.data);
            setOrders(ordersRes.data);
            setCategories(categoriesRes.data);

            const totalSales = ordersRes.data.reduce((acc, order) => acc + order.totalPrice, 0);
            setStats({
                sales: totalSales,
                users: usersRes.data.length,
                orders: ordersRes.data.length
            });
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoadingData(false);
        }
    };

    // --- Actions ---
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

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/categories', { name: newCategory }, { headers: { 'x-auth-token': token } });
            setNewCategory('');
            fetchData();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Error creando categoría');
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Borrar categoría?")) return;
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
                headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': token }
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
        const formData = new FormData();
        formData.append('image', imgFile);

        try {
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setProductForm({ ...productForm, image: `http://localhost:5000${res.data.filePath}` });
        } catch (err) {
            console.error("Upload failed", err);
            alert("Falló la subida de imagen");
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

    // Mock Chart Data
    const chartData = [
        { name: 'Ene', sales: 4000, users: 2400 },
        { name: 'Feb', sales: 3000, users: 1398 },
        { name: 'Mar', sales: 9800, users: 2800 },
        { name: 'Abr', sales: 2780, users: 3908 },
        { name: 'May', sales: 4890, users: 4800 },
        { name: 'Jun', sales: 2390, users: 3800 },
    ];

    if (loading) return <div className="pt-32 text-center font-bold">Cargando...</div>;
    if (!user || user.role !== 'admin') return <div className="pt-32 text-center font-bold text-red-500">Acceso Restringido</div>;

    return (
        <PageTransition>
            <div className="pt-24 pb-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <h1 className="text-4xl font-display font-black uppercase">Panel Administrativo</h1>

                    <div className="flex gap-4 mt-4 md:mt-0 items-center">
                        <div className="bg-white border-2 border-black p-1 rounded-lg flex space-x-1">
                            {['overview', 'products', 'users', 'categories', 'orders'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 uppercase font-bold text-xs rounded transition-all ${activeTab === tab ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                                >
                                    {tab === 'overview' ? 'Resumen' : tab}
                                </button>
                            ))}
                        </div>
                        <button onClick={logout} className="text-red-600 font-bold text-xs uppercase flex items-center gap-1 hover:underline">
                            <LogOut className="w-4 h-4" /> Salir
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                        {activeTab === 'overview' && <OverviewTab stats={stats} data={chartData} />}
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
                                handleCreateCategory={handleCreateCategory} handleDeleteCategory={handleDeleteCategory}
                            />
                        )}
                        {activeTab === 'orders' && <OrdersTab orders={orders} />}
                    </motion.div>
                </AnimatePresence>

                {/* Create/Edit Modal directly inside component is fine as it overlays */}
                {showProductModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-black shadow-2xl p-8 relative">
                            <button onClick={() => setShowProductModal(false)} className="absolute top-4 right-4"><X className="w-6 h-6" /></button>
                            <h2 className="text-2xl font-black uppercase mb-6">{productMode === 'create' ? 'Nuevo Producto' : 'Editar'}</h2>

                            <form onSubmit={handleProductSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input required placeholder="Nombre" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} className="border-2 border-gray-200 p-2 font-bold focus:border-black w-full" />
                                    <input required type="number" placeholder="Precio" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} className="border-2 border-gray-200 p-2 font-bold focus:border-black w-full" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-500">Categoría</label>
                                        <select value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} className="border-2 border-gray-200 p-2 font-bold focus:border-black w-full bg-white">
                                            <option value="">Categoría (Opcional)</option>
                                            {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                                        </select>
                                    </div>
                                    <input required type="number" placeholder="Stock" value={productForm.stock} onChange={e => setProductForm({ ...productForm, stock: e.target.value })} className="border-2 border-gray-200 p-2 font-bold focus:border-black w-full" />
                                </div>
                                <textarea placeholder="Descripción" value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} className="border-2 border-gray-200 p-2 font-bold focus:border-black w-full" rows="3" />

                                <div className="grid grid-cols-2 gap-4">
                                    <input type="number" placeholder="Descuento %" value={productForm.discount} onChange={e => setProductForm({ ...productForm, discount: e.target.value })} className="border-2 border-gray-200 p-2 font-bold focus:border-black w-full" />
                                    <input type="text" placeholder="Variaciones (Rojo, Azul)" value={productForm.variations} onChange={e => setProductForm({ ...productForm, variations: e.target.value })} className="border-2 border-gray-200 p-2 font-bold focus:border-black w-full" />
                                </div>

                                <div className="flex gap-2 items-center">
                                    <input type="text" placeholder="URL Imagen" value={productForm.image} onChange={e => setProductForm({ ...productForm, image: e.target.value })} className="border-2 border-gray-200 p-2 font-bold focus:border-black flex-1" />
                                    <label className="bg-gray-200 px-4 py-2 cursor-pointer border-2 border-black font-bold uppercase text-xs hover:bg-white">
                                        Subir <input type="file" onChange={handleImageUpload} className="hidden" />
                                    </label>
                                </div>
                                {productForm.image && <img src={productForm.image} className="h-20 object-contain border border-gray-300" />}

                                <button type="submit" className="w-full bg-black text-white p-3 font-bold uppercase hover:bg-gray-800">Guardar</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </PageTransition>
    );
};

export default AdminDashboard;
