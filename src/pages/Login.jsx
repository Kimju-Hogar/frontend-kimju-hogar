import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/layout/PageTransition';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(formData.email, formData.password);
            navigate('/'); // Redirect to home on success
        } catch (err) {
            setError(err.response?.data?.msg || 'Credenciales inválidas');
        }
    };

    return (
        <PageTransition>
            <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4 bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border-2 border-black p-8 md:p-12 w-full max-w-md shadow-neo relative"
                >
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-display font-black uppercase mb-2">Bienvenido</h1>
                        <p className="text-gray-500 text-sm">Ingresa a tu cuenta para gestionar tus pedidos.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-2 border-red-100 flex items-center space-x-2 text-red-600 text-sm font-bold">
                            <AlertCircle className="w-5 h-5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-500">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={onChange}
                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-black focus:outline-none font-bold transition-colors"
                                    placeholder="nombre@ejemplo.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-500">Contraseña</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={onChange}
                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-black focus:outline-none font-bold transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="form-checkbox text-black border-2 border-gray-300 focus:ring-0" />
                                <span className="font-bold text-gray-500">Recordarme</span>
                            </label>
                            <a href="#" className="font-bold underline hover:text-primary">¿Olvidaste tu contraseña?</a>
                        </div>

                        <button className="w-full btn-neo-primary">
                            Iniciar Sesión
                        </button>

                        <button type="button" className="w-full py-4 border-2 border-gray-200 text-gray-500 font-bold uppercase tracking-widest hover:border-black hover:text-black transition-colors flex items-center justify-center space-x-2">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="G" />
                            <span>Continuar con Google</span>
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500 font-medium">
                        ¿No tienes una cuenta? <Link to="/register" className="text-black font-bold underline hover:text-primary">Regístrate</Link>
                    </p>
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default Login;
