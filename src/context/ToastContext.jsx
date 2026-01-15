import { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type, duration }]);
        setTimeout(() => removeToast(id), duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, success: (msg) => addToast(msg, 'success'), error: (msg) => addToast(msg, 'error'), info: (msg) => addToast(msg, 'info') }}>
            {children}
            <div className="fixed top-24 right-4 z-[9999] flex flex-col items-end gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

const Toast = ({ toast, onClose }) => {
    const variants = {
        initial: { opacity: 0, x: 50, scale: 0.9 },
        animate: { opacity: 1, x: 0, scale: 1 },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
    };

    const styles = {
        success: { bg: 'bg-green-100', border: 'border-green-200', text: 'text-green-600', icon: CheckCircle },
        error: { bg: 'bg-red-100', border: 'border-red-200', text: 'text-red-500', icon: XCircle },
        info: { bg: 'bg-blue-100', border: 'border-blue-200', text: 'text-blue-500', icon: Info },
        warning: { bg: 'bg-yellow-100', border: 'border-yellow-200', text: 'text-yellow-600', icon: AlertTriangle }
    };

    const typeStyle = styles[toast.type] || styles.info;
    const Icon = typeStyle.icon;

    return (
        <motion.div
            layout
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`pointer-events-auto min-w-[300px] max-w-sm flex items-center p-4 rounded-2xl shadow-lg border-2 backdrop-blur-md ${typeStyle.bg} ${typeStyle.border}`}
        >
            <div className={`p-2 rounded-xl bg-white/50 mr-3`}>
                <Icon className={`w-5 h-5 ${typeStyle.text}`} />
            </div>
            <div className="flex-1">
                <p className={`text-sm font-bold ${typeStyle.text}`}>{toast.message}</p>
            </div>
            <button onClick={onClose} className={`p-1 hover:bg-black/5 rounded-full transition-colors ml-2 ${typeStyle.text}`}>
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};
