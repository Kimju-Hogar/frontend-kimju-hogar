import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Heart } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
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

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google`, {
                token: credentialResponse.credential
            });
            localStorage.setItem('token', res.data.token);
            // We need a way to refresh context, usually window.location.reload() or exposing a method
            // For now, reload is safest simple way or calling a context method if exposed
            window.location.href = '/';
        } catch (err) {
            console.error(err);
            setError('Error al iniciar sesión con Google');
        }
    };

    return (
        <PageTransition>
            <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4 bg-white overflow-hidden relative">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-64 h-64 bg-pink-100 rounded-full blur-[80px] opacity-60" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100 rounded-full blur-[80px] opacity-60" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border-4 border-pink-100 p-8 md:p-12 w-full max-w-md shadow-2xl rounded-[3rem] relative z-10"
                >
                    <div className="mb-8 text-center relative">
                        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-pink-100">
                            <Heart className="w-10 h-10 text-primary fill-pink-200" />
                        </div>
                        <h1 className="text-4xl font-display font-black text-secondary mb-2 tracking-tight">¡Hola de nuevo!</h1>
                        <p className="text-gray-400 font-medium">Ingresa para ver tus cositas favoritas. ✨</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-2 border-red-100 rounded-2xl flex items-center space-x-3 text-red-500 text-sm font-bold">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-400 ml-4">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-300 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={onChange}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-light rounded-2xl focus:outline-none font-bold text-gray-600 transition-all placeholder:text-gray-300 shadow-inner group-focus-within:shadow-none"
                                    placeholder="nombre@ejemplo.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-400 ml-4">Contraseña</label>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-300 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={onChange}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-light rounded-2xl focus:outline-none font-bold text-gray-600 transition-all placeholder:text-gray-300 shadow-inner group-focus-within:shadow-none"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs px-2">
                            <label className="flex items-center space-x-2 cursor-pointer group">
                                <input type="checkbox" className="form-checkbox text-primary border-2 border-gray-300 rounded-md focus:ring-0 transition-colors group-hover:border-primary" />
                                <span className="font-bold text-gray-400 group-hover:text-primary transition-colors">Recordarme</span>
                            </label>
                            <Link to="/forgot-password" className="font-bold text-gray-400 hover:text-primary transition-colors">¿Olvidaste tu contraseña?</Link>
                        </div>

                        <button className="w-full py-4 bg-secondary text-white rounded-2xl font-bold text-lg hover:bg-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-md">
                            Iniciar Sesión 🌸
                        </button>

                        <div className="flex justify-center">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => setError('Error al iniciar sesión con Google')}
                                useOneTap
                                shape="pill"
                                text="continue_with"
                                locale="es"
                            />
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-400 font-medium">
                        ¿No tienes una cuenta? <Link to="/register" className="text-primary font-bold hover:underline">Regístrate aquí</Link>
                    </p>
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default Login;
