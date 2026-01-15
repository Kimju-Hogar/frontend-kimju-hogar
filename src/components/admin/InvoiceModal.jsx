import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const InvoiceModal = ({ selectedOrder, onClose }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    if (!selectedOrder) return null;

    const downloadInvoice = async () => {
        setIsDownloading(true);
        const element = document.getElementById('invoice-content');
        try {
            const canvas = await html2canvas(element, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Factura_Kimju_${selectedOrder._id.slice(-6).toUpperCase()}.pdf`);
        } catch (err) {
            console.error("PDF Error", err);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-secondary/40 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-pink-50 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-xl">
                            <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-display font-black text-secondary uppercase text-lg">Factura de Orden</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={downloadInvoice}
                            disabled={isDownloading}
                            className="bg-pink-50 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {isDownloading ? 'Generando...' : <><Download className="w-4 h-4" /> PDF</>}
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto p-4 md:p-8 custom-scrollbar bg-gray-50/30">
                    <div id="invoice-content" className="bg-white p-6 md:p-12 rounded-[2rem] border border-pink-50 shadow-sm max-w-3xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
                            <div>
                                <h1 className="text-3xl font-display font-black text-primary mb-2">KIMJU <span className="text-secondary">HOGAR</span></h1>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tienda de Regalos y Kawaii</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-xl font-display font-black text-secondary uppercase mb-1">Copia Administrador</h2>
                                <p className="text-primary font-bold text-sm">#ORD-{selectedOrder._id.slice(-6).toUpperCase()}</p>
                                <p className="text-xs font-bold text-secondary mt-2">{new Date(selectedOrder.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 p-6 bg-pink-50/30 rounded-3xl border border-pink-50">
                            <div>
                                <h3 className="text-[10px] font-black text-primary uppercase mb-2">Cliente:</h3>
                                <p className="font-bold text-secondary">{selectedOrder.user?.name || 'Usuario Eliminado'}</p>
                                <p className="text-sm text-gray-500">{selectedOrder.user?.email || '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-black text-primary uppercase mb-2">Envío:</h3>
                                <p className="font-bold text-secondary">{selectedOrder.shippingAddress.address}</p>
                                <p className="text-sm text-gray-500">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                            </div>
                        </div>

                        <table className="w-full text-left mb-12">
                            <thead>
                                <tr className="border-b-2 border-pink-50">
                                    <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item</th>
                                    <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Cant.</th>
                                    <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-pink-50">
                                {selectedOrder.orderItems.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="py-4">
                                            <p className="font-bold text-secondary text-sm">{item.name}</p>
                                            {item.selectedVariation && <p className="text-[10px] text-primary font-bold uppercase">{item.selectedVariation}</p>}
                                        </td>
                                        <td className="py-4 text-center font-bold text-gray-500 text-sm">x{item.quantity}</td>
                                        <td className="py-4 text-right font-black text-secondary text-sm">${(item.quantity * item.price).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex flex-col items-end gap-3 border-t-2 border-pink-50 pt-8">
                            <div className="flex justify-between w-full max-w-[250px] text-2xl font-display font-black text-secondary pt-4 border-t border-dashed border-pink-100">
                                <span className="text-primary">TOTAL:</span>
                                <span>${selectedOrder.totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="text-right">
                                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${selectedOrder.isPaid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {selectedOrder.isPaid ? 'Pagado' : 'Pendiente de Pago'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default InvoiceModal;
