import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';
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
            <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4 bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border-2 border-black p-8 md:p-12 w-full max-w-md shadow-neo relative"
                >
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-display font-black uppercase mb-2">Crear Cuenta</h1>
                        <p className="text-gray-500 text-sm">Únete a Kimju Hogar hoy mismo.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-2 border-red-100 flex items-center space-x-2 text-red-600 text-sm font-bold">
                            <AlertCircle className="w-5 h-5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-4">

                        {/* Name */}
                        <div className="space-y-2">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={onChange}
                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-black focus:outline-none font-bold transition-colors"
                                    placeholder="Nombre Completo"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={onChange}
                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-black focus:outline-none font-bold transition-colors"
                                    placeholder="Correo Electrónico"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={onChange}
                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-black focus:outline-none font-bold transition-colors"
                                    placeholder="Teléfono"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={onChange}
                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-black focus:outline-none font-bold transition-colors"
                                    placeholder="Contraseña"
                                    required
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={onChange}
                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-black focus:outline-none font-bold transition-colors"
                                    placeholder="Confirmar Contraseña"
                                    required
                                />
                            </div>
                        </div>

                        <button className="w-full btn-neo-primary mt-4">
                            Registrarse
                        </button>

                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500 font-medium">
                        ¿Ya tienes cuenta? <Link to="/login" className="text-black font-bold underline hover:text-primary">Inicia Sesión</Link>
                    </p>
                </motion.div>
            </div>
        </PageTransition>
    );
};
export default Register;
