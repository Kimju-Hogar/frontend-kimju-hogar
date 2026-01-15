import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ghost, ArrowLeft } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

const NotFound = () => {
    return (
        <PageTransition>
            <div className="min-h-screen flex items-center justify-center bg-white pt-20 pb-10">
                <div className="text-center px-6">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-8 relative inline-block"
                    >
                        <div className="w-64 h-64 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Ghost className="w-32 h-32 text-pink-300 animate-bounce-slow" />
                        </div>
                        <div className="absolute top-0 right-0 bg-secondary text-white font-black px-4 py-2 rounded-xl rotate-12 shadow-lg">
                            Error 404
                        </div>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-display font-black text-secondary mb-4">
                        ¡Ups! Página no encontrada
                    </h1>
                    <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                        Parece que la cosita que buscas se escondió o ya no existe. 👻
                    </p>

                    <Link to="/shop" className="btn-kawaii inline-flex items-center gap-3">
                        <ArrowLeft className="w-5 h-5" /> Volver a la Tienda
                    </Link>
                </div>
            </div>
        </PageTransition>
    );
};

export default NotFound;
