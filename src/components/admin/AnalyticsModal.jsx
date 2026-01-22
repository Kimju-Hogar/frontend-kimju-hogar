import { motion } from 'framer-motion';
import { X, Image as ImageIcon, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, LineChart, CartesianGrid, XAxis, YAxis, Line } from 'recharts';

const AnalyticsModal = ({ isOpen, onClose, data, products, orders, dateRange, onDateRangeChange }) => {
    if (!isOpen) return null;

    // Filtered orders for stats
    const filteredOrders = orders.filter(o => {
        const d = new Date(o.createdAt);
        const start = new Date(dateRange.start);
        const end = new Date(dateRange.end);
        end.setHours(23, 59, 59, 999);
        return d >= start && d <= end && o.isPaid;
    });

    const periodStats = {
        revenue: filteredOrders.reduce((acc, o) => acc + (o.totalPrice || 0), 0),
        orders: filteredOrders.length,
        items: filteredOrders.reduce((acc, o) => acc + o.orderItems.reduce((sum, item) => sum + item.quantity, 0), 0)
    };

    // Category distribution based on ALL products (or maybe filtered products? let's stick to all for now)
    const catData = products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {});
    const pieData = Object.keys(catData).map(k => ({ name: k, value: catData[k] }));
    const COLORS = ['#f472b6', '#a855f7', '#60a5fa', '#facc15', '#4ade80'];

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-secondary/40 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl p-8 custom-scrollbar"
            >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 border-b border-pink-50 pb-6 gap-6">
                    <div>
                        <h2 className="text-3xl font-display font-black text-secondary uppercase tracking-tight text-secondary">Análisis de Datos Detallado</h2>
                        <p className="text-gray-400 font-bold text-sm">Discriminación de ventas y productos ✨</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 bg-pink-50/50 p-4 rounded-[2rem] border border-pink-50">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-gray-400">Desde:</span>
                            <input
                                type="date"
                                value={dateRange.start}
                                onChange={(e) => onDateRangeChange('start', e.target.value)}
                                className="bg-white border border-pink-100 rounded-xl px-3 py-2 text-xs font-bold text-secondary focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-gray-400">Hasta:</span>
                            <input
                                type="date"
                                value={dateRange.end}
                                onChange={(e) => onDateRangeChange('end', e.target.value)}
                                className="bg-white border border-pink-100 rounded-xl px-3 py-2 text-xs font-bold text-secondary focus:outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    <button onClick={onClose} className="p-2 hover:bg-pink-50 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm flex flex-col justify-center items-center text-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Ingresos en Periodo</span>
                        <h4 className="text-3xl font-display font-black text-primary">${periodStats.revenue.toLocaleString()}</h4>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm flex flex-col justify-center items-center text-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Pedidos Realizados</span>
                        <h4 className="text-3xl font-display font-black text-secondary">{periodStats.orders}</h4>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm flex flex-col justify-center items-center text-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Productos Vendidos</span>
                        <h4 className="text-3xl font-display font-black text-purple-500">{periodStats.items}</h4>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-pink-50/30 p-8 rounded-3xl border border-pink-50">
                        <h3 className="font-bold text-secondary mb-6 flex items-center gap-2"><ImageIcon className="w-5 h-5 text-primary" /> Distribución por Categoría</h3>
                        <div className="h-64" style={{ minWidth: 0, minHeight: 0 }}>
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
                        <div className="h-64" style={{ minWidth: 0, minHeight: 0 }}>
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

export default AnalyticsModal;
