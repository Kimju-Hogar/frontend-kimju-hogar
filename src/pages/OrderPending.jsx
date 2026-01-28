import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ShoppingBag, ArrowRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import api from '../config/api';

const OrderPending = () => {
    const { id } = useParams();

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const mainUrl = window.location.href;
                const urlObj = new URL(mainUrl);
                // Wompi returns ?id=TRANSACTION_ID
                const transactionId = urlObj.searchParams.get("id");

                if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) return;

                if (transactionId) {
                    console.log("Verifying Wompi Transaction:", transactionId);
                    const res = await api.get(`/payments/verify/${transactionId}`);

                    if (res.data.status === 'APPROVED') {
                        window.location.href = `/order/${id}/success`;
                        return;
                    } else if (res.data.status === 'DECLINED' || res.data.status === 'ERROR' || res.data.status === 'VOIDED') {
                        window.location.href = `/order/${id}/failure`;
                        return;
                    }
                }

                // Check order status directly (covers webhook updates or direct updates)
                const res = await api.get(`/orders/${id}`);
                const order = res.data;

                if (order.isPaid) {
                    window.location.href = `/order/${id}/success`;
                    return;
                } else if (order.status === 'Cancelled' || order.status === 'Failed') {
                    window.location.href = `/order/${id}/failure`;
                    return;
                }

                // Check Timeout (3 minutes = 180,000 ms)
                const createdAt = new Date(order.createdAt).getTime();
                const now = Date.now();
                const timeoutDuration = 3 * 60 * 1000; // 3 minutes

                if (now - createdAt > timeoutDuration) {
                    console.warn("Order pending timeout exceeded. Redirecting to failure.");
                    // Optional: Call backend to explicitly cancel if needed, 
                    // but for now redirecting to failure page is the requested UX.
                    // Ideally we should call an endpoint to set status to Cancelled/Failed 
                    // to release stock if reserved, but Wompi usually handles expiration too.
                    // Let's just redirect for now as requested.
                    window.location.href = `/order/${id}/failure`;
                    return;
                }

            } catch (err) {
                console.error("Verification failed in pending page", err);
            }
        };
        const interval = setInterval(checkStatus, 5000); // Check every 5s
        checkStatus();

        return () => clearInterval(interval);
    }, [id]);

    return (
        <PageTransition>
            <div className="min-h-screen pt-32 pb-20 bg-white relative overflow-hidden flex flex-col items-center justify-center px-4">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-50 rounded-full blur-[100px] -z-10 pointer-events-none opacity-60" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-50 rounded-full blur-[100px] -z-10 pointer-events-none opacity-60" />

                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-32 h-32 bg-yellow-100 rounded-[2rem] flex items-center justify-center mb-8 shadow-lg shadow-yellow-100/50"
                >
                    <Clock className="w-16 h-16 text-yellow-500 animate-pulse" />
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-display font-black text-secondary mb-4 text-center">
                    Verificando <span className="text-yellow-500">Pago</span> ⏳
                </h1>
                <p className="text-gray-500 text-center max-w-lg mb-12 font-medium text-lg leading-relaxed">
                    Estamos confirmando tu transacción con Wompi para la orden <span className="font-bold">#{id ? id.slice(-6).toUpperCase() : ''}</span>. <br />
                    Esto solo tomará unos segundos...
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center gap-2 bg-secondary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                    >
                        <Clock className="w-5 h-5" /> Consultar Nuevamente
                    </button>
                    <Link
                        to="/contact"
                        className="flex items-center justify-center gap-2 bg-white text-secondary border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold hover:border-pink-200 hover:text-primary transition-all shadow-sm hover:-translate-y-1 active:translate-y-0"
                    >
                        Ayuda <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </PageTransition>
    );
};

export default OrderPending;
