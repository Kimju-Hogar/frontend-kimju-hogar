import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, AlertCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/layout/PageTransition';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError("Las contraseñas no coinciden");
        }

        try {
            await register({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            });
            navigate('/'); // Redirect to home
        } catch (err) {
            setError(err.response?.data?.msg || 'Error al registrarse');
        }
    };

    return (
        <PageTransition>
            <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4 bg-white overflow-hidden relative">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute bottom-40 left-20 w-80 h-80 bg-pink-100 rounded-full blur-[80px] opacity-60" />
                    <div className="absolute top-20 right-20 w-64 h-64 bg-purple-100 rounded-full blur-[80px] opacity-60" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border-4 border-pink-100 p-8 md:p-12 w-full max-w-md shadow-2xl rounded-[3rem] relative z-10"
                >
                    <div className="mb-8 text-center relative">
                        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-purple-100">
                            <Star className="w-8 h-8 text-primary fill-pink-200" />
                        </div>
                        <h1 className="text-3xl font-display font-black text-secondary mb-2 tracking-tight">Únete a Nosotros</h1>
                        <p className="text-gray-400 font-medium">Crea tu cuenta y empieza a decorar tu mundo. 🌸</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-2 border-red-100 rounded-2xl flex items-center space-x-3 text-red-500 text-sm font-bold">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-4">

                        {/* Name */}
                        <div className="space-y-2">
                            <div className="relative group">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-300 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={onChange}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-light rounded-2xl focus:outline-none font-bold text-gray-600 transition-all placeholder:text-gray-300 shadow-inner group-focus-within:shadow-none"
                                    placeholder="Nombre Completo"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-300 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={onChange}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-light rounded-2xl focus:outline-none font-bold text-gray-600 transition-all placeholder:text-gray-300 shadow-inner group-focus-within:shadow-none"
                                    placeholder="Correo Electrónico"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <div className="relative group">
                                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-300 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={onChange}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-light rounded-2xl focus:outline-none font-bold text-gray-600 transition-all placeholder:text-gray-300 shadow-inner group-focus-within:shadow-none"
                                    placeholder="Teléfono"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-300 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={onChange}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-light rounded-2xl focus:outline-none font-bold text-gray-600 transition-all placeholder:text-gray-300 shadow-inner group-focus-within:shadow-none"
                                    placeholder="Contraseña"
                                    required
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-300 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={onChange}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-light rounded-2xl focus:outline-none font-bold text-gray-600 transition-all placeholder:text-gray-300 shadow-inner group-focus-within:shadow-none"
                                    placeholder="Confirmar Contraseña"
                                    required
                                />
                            </div>
                        </div>

                        <button className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-md mt-6">
                            Crear Cuenta 💖
                        </button>

                    </form>

                    <p className="mt-8 text-center text-sm text-gray-400 font-medium">
                        ¿Ya tienes cuenta? <Link to="/login" className="text-primary font-bold hover:underline">Inicia Sesión</Link>
                    </p>
                </motion.div>
            </div>
        </PageTransition>
    );
};
export default Register;
