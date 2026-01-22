import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../config/api';
import { Lock, ArrowRight, CheckCircle } from 'lucide-react';
import PageTransition from '../../components/layout/PageTransition';
import SEO from '../../components/common/SEO';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Las contraseñas no coinciden 🚫' });
            return;
        }

        setLoading(true);

        try {
            await api.put(`/auth/reset-password/${token}`, { password });
            setMessage({ type: 'success', text: '¡Contraseña actualizada con éxito! 🎉' });
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.msg || 'Error al restablecer contraseña, el link puede haber expirado.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageTransition>
            <SEO title="Restablecer Contraseña" description="Crea una nueva contraseña segura para tu cuenta." />
            <div className="min-h-screen flex items-center justify-center bg-pink-50/30 py-20 px-4">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl w-full max-w-md border-4 border-purple-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300" />

                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-500">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-display font-black text-secondary">Nueva Contraseña</h1>
                        <p className="text-gray-400 text-sm mt-2">Crea una contraseña segura que puedas recordar. 🔐</p>
                    </div>

                    {message && (
                        <div className={`p-4 rounded-xl mb-6 text-sm font-bold text-center ${message.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase ml-3 mb-1">Nueva Contraseña</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-2xl font-bold text-gray-600 outline-none focus:bg-white focus:border-purple-400 transition-all placeholder:text-gray-300"
                                placeholder="******"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase ml-3 mb-1">Confirmar Contraseña</label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-2xl font-bold text-gray-600 outline-none focus:bg-white focus:border-purple-400 transition-all placeholder:text-gray-300"
                                placeholder="******"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || (message?.type === 'success')}
                            className="w-full bg-purple-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-purple-600 transition-all shadow-lg hover:shadow-purple-200 flex items-center justify-center gap-2 group mt-6 disabled:opacity-70"
                        >
                            {loading ? 'Guardando...' : 'Cambiar Contraseña'}
                            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>
                </div>
            </div>
        </PageTransition>
    );
};

export default ResetPassword;
