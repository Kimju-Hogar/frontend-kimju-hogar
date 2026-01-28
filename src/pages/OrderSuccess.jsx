import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../config/api';
import PageTransition from '../components/layout/PageTransition';
const OrderSuccess = () => {
    const { id } = useParams();
    const { clearCart } = useCart();
    const [status, setStatus] = useState('loading'); // loading, approved, error

    useEffect(() => {
        const verifyOrder = async () => {
            try {
                // Wompi redirects to /order/:transactionId/success
                // The :id in the route is actually the TRANSACTION ID, not the Order ID anymore
                const transactionId = id;

                if (!transactionId) {
                    setStatus('error');
                    return;
                }

                // Verify with backend
                const res = await api.get(`/payments/verify/${transactionId}`);

                if (res.data.status === 'APPROVED') {
                    setStatus('approved');
                    clearCart();
                } else if (res.data.status === 'DECLINED' || res.data.status === 'ERROR') {
                    window.location.href = `/order/${res.data.orderId}/failed`;
                } else {
                    // Pending or Voided
                    setStatus('pending'); // You might want a pending page logic here
                }
            } catch (err) {
                console.error("Error verifying Wompi transaction", err);
                setStatus('error');
            }
        };

        verifyOrder();
    }, [id]);

    if (status === 'loading') {
        return (
            <PageTransition>
                <div className="min-h-screen pt-32 pb-20 bg-white flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="font-bold text-gray-400 animate-pulse">Confirmando tu compra...</p>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="min-h-screen pt-32 pb-20 bg-white relative overflow-hidden flex flex-col items-center justify-center px-4">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50 rounded-full blur-[100px] -z-10 pointer-events-none opacity-60" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-50 rounded-full blur-[100px] -z-10 pointer-events-none opacity-60" />

                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-32 h-32 bg-green-100 rounded-[2rem] flex items-center justify-center mb-8 shadow-lg shadow-green-100/50"
                >
                    <CheckCircle className="w-16 h-16 text-green-500" />
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-display font-black text-secondary mb-4 text-center max-w-2xl leading-tight">
                    ¡Yeiii! ¡Tu pedido fue <span className="text-green-500">Exitoso!</span> 🎉
                </h1>
                <p className="text-gray-500 text-center max-w-lg mb-12 font-medium text-lg leading-relaxed">
                    Hemos recibido tu orden <span className="bg-gray-100 px-2 py-1 rounded-lg text-secondary font-bold font-mono">#{id.slice(-6).toUpperCase()}</span>. <br />
                    Te enviamos un correo con la confirmación y los detalles de envío. ¡Gracias por elegirnos!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                    <Link
                        to="/shop"
                        className="flex items-center justify-center gap-2 bg-secondary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                    >
                        <ShoppingBag className="w-5 h-5" /> Seguir Comprando
                    </Link>
                    <Link
                        to="/profile"
                        className="flex items-center justify-center gap-2 bg-white text-secondary border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold hover:border-pink-200 hover:text-primary transition-all shadow-sm hover:-translate-y-1 active:translate-y-0"
                    >
                        Ver Mis Pedidos <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <motion.div
                    animate={{ y: [0, -15, 0], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute bottom-10"
                >
                    <Heart className="w-24 h-24 stroke-pink-200 fill-none" />
                </motion.div>
            </div>
        </PageTransition>
    );
};
export default OrderSuccess;
