import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ShoppingBag, ArrowRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

const OrderPending = () => {
    return (
        <PageTransition>
            <div className="min-h-screen pt-32 pb-20 bg-white flex flex-col items-center px-4">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-8"
                >
                    <Clock className="w-12 h-12 text-yellow-500" />
                </motion.div>

                <h1 className="text-4xl font-display font-black text-secondary mb-4 text-center">
                    Pago <span className="text-yellow-500">pendiente</span> ⏳
                </h1>
                <p className="text-gray-500 text-center max-w-md mb-12 font-medium">
                    Estamos esperando la confirmación de Mercado Pago. Te notificaremos por correo una vez que se procese con éxito. ¡No cierres tu sesión!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                    <Link
                        to="/shop"
                        className="flex items-center justify-center gap-2 bg-secondary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary transition-all shadow-lg hover:-translate-y-1"
                    >
                        <ShoppingBag className="w-5 h-5" /> Seguir Navegando
                    </Link>
                    <Link
                        to="/profile"
                        className="flex items-center justify-center gap-2 bg-white text-secondary border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold hover:border-pink-200 transition-all shadow-sm hover:-translate-y-1"
                    >
                        Ver Mi Pedido <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </PageTransition>
    );
};

export default OrderPending;
