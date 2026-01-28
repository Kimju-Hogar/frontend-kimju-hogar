import { useState, useEffect } from 'react';

import { Star, LogOut, Package, TrendingUp, DollarSign, Users, Heart, ShoppingBag, Coffee, Smartphone, Zap, Truck, Shield, AlertTriangle, Sparkles, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';


// Import Admin Components
import OverviewTab from '../components/admin/OverviewTab';
import ProductsTab from '../components/admin/ProductsTab';
import UsersTab from '../components/admin/UsersTab';
import CategoriesTab from '../components/admin/CategoriesTab';
import OrdersTab from '../components/admin/OrdersTab';
import AnalyticsModal from '../components/admin/AnalyticsModal';
import UserOrdersModal from '../components/admin/UserOrdersModal';
import ProductModal from '../components/admin/ProductModal';
import InvoiceModal from '../components/admin/InvoiceModal';
import TrackingModal from '../components/admin/TrackingModal';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
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
        name: '', price: '', category: '', stock: '', description: '', discount: '', image: '', images: [], variations: ''
    });

    // Modal States
    const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
    const [selectedUserForOrders, setSelectedUserForOrders] = useState(null);
    const [isTrackingOpen, setIsTrackingOpen] = useState(false);
    const [selectedOrderForTracking, setSelectedOrderForTracking] = useState(null);

    // Advanced Analytics State
    const [dateRange, setDateRange] = useState({
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0], // First day of current month
        end: new Date().toISOString().split('T')[0]
    });


    const fetchData = async () => {
        setIsLoadingData(true);
        try {
            const [productsRes, usersRes, ordersRes, categoriesRes] = await Promise.all([
                api.get('/products?includeOutOfStock=true'),
                api.get('/users'),
                api.get('/orders'),
                api.get('/categories')
            ]);

            setProducts(productsRes.data);
            setUsers(usersRes.data);
            setOrders(ordersRes.data);
            setCategories(categoriesRes.data);

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

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchData();
        }
    }, [user]);

    // --- Handlers ---

    const handleCategoryImageUpload = async (e) => {
        const imgFile = e.target.files[0];
        if (!imgFile) return;
        if (imgFile.size > 5 * 1024 * 1024) return alert("Imagen muy grande (máx 5MB)");

        const formData = new FormData();
        formData.append('image', imgFile);

        try {
            const res = await api.post('/upload', formData);
            const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
            setNewCategoryImage(`${baseUrl}${res.data.filePath}`);
        } catch (err) {
            console.error("Upload failed", err);
            alert("Falló la subida de imagen");
        }
    };

    const handleEditCategoryClick = (cat) => {
        setCategoryMode('edit');
        setEditingCategory(cat);
        setNewCategory(cat.name);
        setNewCategoryImage(cat.image || '');
        setNewCategoryIcon(cat.icon || '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setCategoryMode('create');
        setEditingCategory(null);
        setNewCategory('');
        setNewCategoryImage('');
        setNewCategoryIcon('');
    };

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return alert("Nombre obligatorio");

        const payload = {
            name: newCategory,
            image: newCategoryImage,
            icon: newCategoryIcon
        };

        try {
            if (categoryMode === 'create') {
                await api.post('/categories', payload);
            } else {
                await api.put(`/categories/${editingCategory._id}`, payload);
                setCategoryMode('create');
                setEditingCategory(null);
            }
            setNewCategory(''); setNewCategoryImage(''); setNewCategoryIcon('');
            fetchData();
        } catch (err) { alert(err.response?.data?.message || 'Error guardando categoría'); }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("¿Borrar categoría?")) return;
        try {
            await api.delete(`/categories/${id}`);
            fetchData();
        } catch (err) { alert('Error borrando categoría'); }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm("¿Eliminar producto?")) return;
        try {
            await api.delete(`/products/${id}`);
            fetchData();
        } catch (err) { alert("Error al eliminar"); }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("¿Eliminar usuario?")) return;
        try {
            await api.delete(`/users/${id}`);
            fetchData();
        } catch (err) { alert("Error al eliminar"); }
    };

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        setUploadStatus('uploading');
        try {
            const res = await api.post('/products/batch', formData);
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
            if (productMode === 'create') {
                const finalProduct = { ...productForm };
                if (!finalProduct.category) finalProduct.category = 'General';
                await api.post('/products', finalProduct);
            } else {
                await api.put(`/products/${productForm._id}`, productForm);
            }

            setShowProductModal(false);
            setProductForm({ name: '', price: '', category: '', stock: '', description: '', discount: '', image: '', images: [], variations: '' });
            fetchData();
        } catch (err) {
            alert('Error al guardar producto');
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
            images: product.images || [],
            variations: product.variations ? product.variations.join(',') : ''
        });
        setShowProductModal(true);
    };

    const handleImageUpload = async (e) => {
        const imgFile = e.target.files[0];
        if (!imgFile) return;
        if (imgFile.size > 5 * 1024 * 1024) return alert("Imagen muy grande (máx 5MB)");

        const formData = new FormData();
        formData.append('image', imgFile);

        try {
            const res = await api.post('/upload', formData);
            // Adjust relative path if backend returns /uploads/file.jpg
            const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
            setProductForm({ ...productForm, image: `${baseUrl}${res.data.filePath}` });
        } catch (err) {
            alert("Falló la subida de imagen");
        }
    };

    const handleMultiImageUpload = async (files) => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }

        try {
            const res = await api.post('/upload/multiple', formData);
            const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
            const newImageUrls = res.data.filePaths.map(path => `${baseUrl}${path}`);

            setProductForm(prev => ({
                ...prev,
                images: [...(prev.images || []), ...newImageUrls]
            }));
        } catch (err) {
            console.error("Multi upload error", err);
            alert("Falló la subida de múltiples imágenes");
        }
    };

    // Pass this handler to ProductModal via specific prop or attach to existing handleProductSubmit object if hacky, 
    // but better to pass as prop. PROPOSAL: attach to handleProductSubmit as a property temporarily or pass new prop.
    // Let's pass it as a new prop to ProductModal in the render.

    const downloadCsvTemplate = () => {
        const csvContent = "data:text/csv;charset=utf-8,name,price,category,stock,description,image\nProducto1,10000,Hogar,50,Desc,http://url.com";
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "plantilla.csv");
        document.body.appendChild(link);
        link.click();
    };

    const handleUpdateOrderStatus = async (orderId, status) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status });
            fetchData();
        } catch (err) { alert('Error al actualizar estado'); }
    };

    const handleUpdateOrderPaid = async (orderId) => {
        if (!window.confirm("¿Confirmar pago manual?")) return;
        try {
            await api.put(`/orders/${orderId}/pay`, {});
            fetchData();
        } catch (err) { alert('Error al marcar pagado'); }
    };

    const handleUpdateTracking = async (orderId, trackingNumber) => {
        try {
            await api.put(`/orders/${orderId}/tracking`, { trackingNumber });
            fetchData();
            alert("Tracking enviado correctamente 🚚");
        } catch (err) {
            console.error(err);
            alert("Error enviando tracking");
        }
    };

    // Helpers for Charts
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
        const currentMonthIdx = new Date().getMonth();
        return monthlyData.slice(Math.max(0, currentMonthIdx - 5), currentMonthIdx + 1);
    };

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

    const processedChartData = getChartData();
    const productAnalysis = getProductAnalysis();

    return (
        <PageTransition>
            <div className='pt-22 pb-20' ></div>
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
                                    {tab === 'overview' ? 'Resumen' : tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                        {activeTab === 'users' && (
                            <UsersTab
                                users={users}
                                handleDeleteUser={handleDeleteUser}
                                onViewOrders={(u) => setSelectedUserForOrders(u)}
                            />
                        )}
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
                                handleCancelEdit={handleCancelEdit}
                            />
                        )}
                        {activeTab === 'orders' && (
                            <OrdersTab
                                orders={orders}
                                onUpdateStatus={handleUpdateOrderStatus}
                                onUpdatePaid={handleUpdateOrderPaid}
                                onViewInvoice={(order) => { setSelectedOrder(order); setIsInvoiceOpen(true); }}
                                onAddTracking={(order) => { setSelectedOrderForTracking(order); setIsTrackingOpen(true); }}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>

                <AnalyticsModal
                    isOpen={isAnalyticsOpen}
                    onClose={() => setIsAnalyticsOpen(false)}
                    data={processedChartData}
                    products={products}
                    orders={orders}
                    dateRange={dateRange}
                    onDateRangeChange={(key, val) => setDateRange(prev => ({ ...prev, [key]: val }))}
                />

                <UserOrdersModal
                    user={selectedUserForOrders}
                    orders={orders}
                    onClose={() => setSelectedUserForOrders(null)}
                    onViewInvoice={(order) => { setSelectedOrder(order); setIsInvoiceOpen(true); }}
                />

                <AnimatePresence>
                    {isInvoiceOpen && selectedOrder && (
                        <InvoiceModal
                            selectedOrder={selectedOrder}
                            onClose={() => setIsInvoiceOpen(false)}
                        />
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isTrackingOpen && selectedOrderForTracking && (
                        <TrackingModal
                            isOpen={isTrackingOpen}
                            onClose={() => setIsTrackingOpen(false)}
                            order={selectedOrderForTracking}
                            onSubmit={handleUpdateTracking}
                        />
                    )}
                </AnimatePresence>

                <ProductModal
                    showProductModal={showProductModal}
                    setShowProductModal={setShowProductModal}
                    productMode={productMode}
                    handleProductSubmit={handleProductSubmit}
                    productForm={productForm}
                    setProductForm={setProductForm}
                    handleImageUpload={handleImageUpload}
                    handleMultiImageUpload={handleMultiImageUpload}
                    categories={categories}
                />
            </div>
        </PageTransition>
    );
};

export default AdminDashboard;
