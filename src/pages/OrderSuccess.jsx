import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import PageTransition from '../components/layout/PageTransition';

const OrderSuccess = () => {
    const { id } = useParams();
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
        // Here you could also call backend to sync order status if webhook is slow
    }, []);

    return (
        <PageTransition>
            <div className="min-h-screen pt-32 pb-20 bg-white flex flex-col items-center px-4">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8"
                >
                    <CheckCircle className="w-12 h-12 text-green-500" />
                </motion.div>

                <h1 className="text-4xl font-display font-black text-secondary mb-4 text-center">
                    ¡Gracias por tu <span className="text-primary">compra!</span> 🌸
                </h1>
                <p className="text-gray-500 text-center max-w-md mb-12 font-medium">
                    Tu pedido <span className="text-secondary font-bold">#{id.slice(-6).toUpperCase()}</span> ha sido recibido con éxito. Te hemos enviado un correo con los detalles.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                    <Link
                        to="/shop"
                        className="flex items-center justify-center gap-2 bg-secondary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary transition-all shadow-lg hover:-translate-y-1"
                    >
                        <ShoppingBag className="w-5 h-5" /> Seguir Comprando
                    </Link>
                    <Link
                        to="/profile"
                        className="flex items-center justify-center gap-2 bg-white text-secondary border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold hover:border-pink-200 transition-all shadow-sm hover:-translate-y-1"
                    >
                        Ver Mis Pedidos <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mt-20 text-primary-light"
                >
                    <Heart className="w-12 h-12 fill-current opacity-20" />
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default OrderSuccess;
