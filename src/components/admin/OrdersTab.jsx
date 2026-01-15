import { useState } from 'react';
import { Search, Filter, AlertTriangle, CheckCircle } from 'lucide-react';

const OrdersTab = ({ orders, onUpdateStatus, onUpdatePaid, onViewInvoice }) => {
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

export default OrdersTab;
