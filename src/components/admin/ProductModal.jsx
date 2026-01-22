import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const ProductModal = ({
    showProductModal, setShowProductModal, productMode, handleProductSubmit,
    productForm, setProductForm, handleImageUpload, handleMultiImageUpload, categories
}) => {
    if (!showProductModal) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="fixed inset-0 bg-secondary/30 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
            <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }}
                className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-[2rem] sm:rounded-[2.5rem] p-8 relative shadow-2xl"
            >
                <button onClick={() => setShowProductModal(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
                <h2 className="text-2xl font-display font-black text-secondary mb-1">{productMode === 'create' ? 'Nuevo Producto' : 'Editar Producto'}</h2>
                <p className="text-gray-400 text-sm font-medium mb-6">Completa los detalles de tu cosita maravillosa.</p>

                <form onSubmit={handleProductSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 ml-2">Nombre</label>
                            <input required value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-600 focus:bg-white focus:border-primary focus:outline-none transition-all" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 ml-2">Precio</label>
                            <input required type="number" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-600 focus:bg-white focus:border-primary focus:outline-none transition-all" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 ml-2">Categoría</label>
                            <select value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-600 focus:bg-white focus:border-primary focus:outline-none transition-all appearance-none cursor-pointer">
                                <option value="">Seleccionar...</option>
                                {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 ml-2">Stock</label>
                            <input required type="number" value={productForm.stock} onChange={e => setProductForm({ ...productForm, stock: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-600 focus:bg-white focus:border-primary focus:outline-none transition-all" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 ml-2">Descripción</label>
                        <textarea value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-600 focus:bg-white focus:border-primary focus:outline-none transition-all" rows="3" />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 ml-2">Descuento (%)</label>
                            <input type="number" value={productForm.discount} onChange={e => setProductForm({ ...productForm, discount: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-600 focus:bg-white focus:border-primary focus:outline-none transition-all" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 ml-2">Variaciones</label>
                            <input type="text" placeholder="Ej: Rojo, Azul" value={productForm.variations} onChange={e => setProductForm({ ...productForm, variations: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-600 focus:bg-white focus:border-primary focus:outline-none transition-all" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 ml-2">Imagen Principal</label>
                        <div className="flex gap-2 items-center">
                            <input type="text" placeholder="URL de la imagen" value={productForm.image} onChange={e => setProductForm({ ...productForm, image: e.target.value })} className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-600 focus:bg-white focus:border-primary focus:outline-none transition-all" />
                            <label className="bg-pink-50 px-4 py-3 cursor-pointer rounded-xl font-bold uppercase text-xs text-primary hover:bg-pink-100 transition-colors">
                                Subir <input type="file" onChange={handleImageUpload} className="hidden" />
                            </label>
                        </div>
                    </div>
                    {productForm.image && (
                        <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-100 shadow-sm mx-auto">
                            <img src={productForm.image} className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* Galería de Imágenes */}
                    <div className="space-y-1 border-t border-gray-100 pt-4 mt-4">
                        <label className="text-xs font-bold text-gray-400 ml-2">Galería de Imágenes (Opcional)</label>
                        <div className="flex gap-2 items-center mb-2">
                            <label className="bg-purple-50 px-4 py-3 cursor-pointer rounded-xl font-bold uppercase text-xs text-purple-600 hover:bg-purple-100 transition-colors w-full text-center">
                                + Añadir Imágenes
                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            handleMultiImageUpload(e.target.files);
                                        }
                                    }}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {productForm.images && productForm.images.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {productForm.images.map((img, idx) => (
                                    <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 group">
                                        <img src={img} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newImages = productForm.images.filter((_, i) => i !== idx);
                                                setProductForm({ ...productForm, images: newImages });
                                            }}
                                            className="absolute top-0 right-0 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit" className="w-full bg-secondary text-white p-4 rounded-xl font-bold text-lg hover:bg-primary transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                        {productMode === 'create' ? 'Crear Producto' : 'Guardar Cambios'}
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default ProductModal;
