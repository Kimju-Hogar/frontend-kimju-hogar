import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, ArrowLeft, Send, Sparkles } from 'lucide-react';
import PageTransition from '../../components/layout/PageTransition';
import SEO from '../../components/common/SEO';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setMessage({ type: 'success', text: '¡Correo enviado! Revisa tu bandeja de entrada 💌' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.msg || 'Error al enviar el correo 😢' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageTransition>
            <SEO title="Recuperar Contraseña" description="Recupera el acceso a tu cuenta en Kimju Hogar." />
            <div className="min-h-screen flex items-center justify-center bg-pink-50/30 py-20 px-4">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl w-full max-w-md border-4 border-pink-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300" />

                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-500 animate-bounce-slow">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-display font-black text-secondary">¿Olvidaste tu contraseña?</h1>
                        <p className="text-gray-400 text-sm mt-2">No te preocupes, te enviaremos un link mágico para recuperarla. ✨</p>
                    </div>

                    {message && (
                        <div className={`p-4 rounded-xl mb-6 text-sm font-bold text-center ${message.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase ml-3 mb-1">Email Registrado</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 pl-12 pr-4 py-3 rounded-2xl font-bold text-gray-600 outline-none focus:bg-white focus:border-primary transition-all placeholder:text-gray-300"
                                    placeholder="tu@email.com"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg hover:shadow-pink-200 flex items-center justify-center gap-2 group disabled:opacity-70"
                        >
                            {loading ? 'Enviando...' : 'Enviar Link de Recuperación'}
                            {!loading && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <Link to="/login" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-primary transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Login
                        </Link>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default ForgotPassword;
