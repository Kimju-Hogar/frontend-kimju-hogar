import { motion } from 'framer-motion';
import { X, Package, ShoppingBag, FileText } from 'lucide-react';

const UserOrdersModal = ({ user, orders, onClose, onViewInvoice }) => {
    if (!user) return null;
    const userOrders = orders.filter(o => o.user?._id === user._id || o.user === user._id);

    return (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-secondary/40 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-[3rem] shadow-2xl flex flex-col"
            >
                <div className="p-8 border-b border-pink-50 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-display font-black text-secondary uppercase tracking-tight">Pedidos de {user.name}</h2>
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">Historial del Cliente</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-pink-50 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
                </div>

                <div className="flex-grow overflow-y-auto p-8 custom-scrollbar bg-gray-50/30">
                    {userOrders.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {userOrders.map(order => (
                                <div key={order._id} className="bg-white p-6 rounded-3xl border border-pink-50 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${order.isPaid ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-400'}`}>
                                            <Package className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-mono text-[10px] text-gray-400">#{order._id.slice(-8).toUpperCase()}</p>
                                            <p className="font-bold text-secondary text-lg">${order.totalPrice.toLocaleString()}</p>
                                            <p className="text-[10px] font-black text-gray-400 uppercase">{new Date(order.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${order.isPaid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            {order.isPaid ? 'Pagado' : 'Pendiente'}
                                        </span>
                                        <button
                                            onClick={() => onViewInvoice(order)}
                                            className="bg-secondary text-white p-2 rounded-xl hover:bg-primary transition-colors shadow-sm"
                                        >
                                            <FileText className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShoppingBag className="w-10 h-10 text-pink-300" />
                            </div>
                            <p className="font-bold text-gray-400">Este usuario aún no ha realizado pedidos.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default UserOrdersModal;
