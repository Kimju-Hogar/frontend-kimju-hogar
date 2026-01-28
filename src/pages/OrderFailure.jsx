import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, RefreshCw, ShoppingBag } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import api from '../config/api';

const OrderFailure = () => {
    const { id } = useParams();
    const [status, setStatus] = useState('failure');

    useEffect(() => {
        const checkStatus = async () => {
            try {
                if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) return;

                const res = await api.get(`/orders/${id}`);

                if (res.data.isPaid) {
                    window.location.href = `/order/${id}/success`;
                }
                // If not paid, stay on failure page.
            } catch (err) {
                console.error("Verification failed in failure page", err);
            }
        };
        checkStatus();
    }, [id]);

    return (
        <PageTransition>
            <div className="min-h-screen pt-32 pb-20 bg-white relative overflow-hidden flex flex-col items-center justify-center px-4">
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-[100px] -z-10 pointer-events-none opacity-60" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-50 rounded-full blur-[100px] -z-10 pointer-events-none opacity-60" />

                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-32 h-32 bg-red-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-lg shadow-red-100/50"
                >
                    <XCircle className="w-16 h-16 text-red-400" />
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-display font-black text-secondary mb-4 text-center">
                    ¡Ups! Algo salió <span className="text-red-400">mal</span> 🧸
                </h1>
                <p className="text-gray-500 text-center max-w-lg mb-12 font-medium text-lg leading-relaxed">
                    No pudimos procesar el pago para la orden <span className="font-bold">#{id ? id.slice(-6).toUpperCase() : ''}</span>. <br />
                    No te preocupes, <strong>no se ha realizado ningún cargo</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                    <Link
                        to="/checkout"
                        className="flex items-center justify-center gap-2 bg-secondary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                    >
                        <RefreshCw className="w-5 h-5" /> Reintentar Pago
                    </Link>
                    <Link
                        to="/shop"
                        className="flex items-center justify-center gap-2 bg-white text-secondary border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold hover:border-pink-200 hover:text-primary transition-all shadow-sm hover:-translate-y-1 active:translate-y-0"
                    >
                        <ShoppingBag className="w-5 h-5" /> Ir a la Tienda
                    </Link>
                </div>
            </div>
        </PageTransition>
    );
};

export default OrderFailure;
