import { motion } from 'framer-motion';
import { Truck, X, Save } from 'lucide-react';
import { useState } from 'react';

const TrackingModal = ({ isOpen, onClose, onSubmit, order }) => {
    const [trackingNumber, setTrackingNumber] = useState(order?.trackingNumber || '');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(order._id, trackingNumber);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-pink-100"
            >
                <div className="p-6 bg-pink-50 flex justify-between items-center border-b border-pink-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-xl text-primary shadow-sm">
                            <Truck className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-display font-black text-secondary uppercase">Enviar Guía</h2>
                            <p className="text-xs text-gray-400 font-bold">Orden #{order?._id.slice(-8)}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-red-400">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <p className="text-sm text-gray-500 font-medium">
                        Ingresa el número de guía para notificar al cliente <strong>{order?.user?.name || order?.shippingAddress?.name}</strong>.
                    </p>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Número de Guía / URL</label>
                        <input
                            type="text"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            placeholder="Ej: 99123456789"
                            className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl font-bold text-gray-600 outline-none focus:bg-white focus:border-primary transition-all"
                            autoFocus
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-secondary text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                        <Save className="w-5 h-5" /> Guardar y Enviar
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default TrackingModal;
