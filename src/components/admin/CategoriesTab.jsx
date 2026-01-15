import { Image as ImageIcon, Sparkles } from 'lucide-react';

const CategoriesTab = ({ categories, newCategory, setNewCategory, newCategoryImage, newCategoryIcon, setNewCategoryIcon, availableIcons, handleCategoryImageUpload, handleCreateCategory, handleDeleteCategory, categoryMode, editingCategory, handleEditCategoryClick, handleCancelEdit }) => (
    <div className="space-y-6">
        <div className="bg-white p-8 border border-pink-100 rounded-[2rem] shadow-sm flex flex-col gap-4 max-w-2xl">
            <div className="w-full">
                <label className="text-xs font-bold text-gray-400 uppercase ml-2 mb-1 block">
                    {categoryMode === 'edit' ? `Editar: ${editingCategory?.name}` : 'Nueva Categoría'}
                </label>
                <form onSubmit={handleCreateCategory} className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Nombre de la categoría..."
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-600 focus:bg-white focus:border-primary focus:outline-none transition-all placeholder:text-gray-300"
                            autoFocus
                        />
                        <div className="flex gap-2 items-center">
                            <label className="bg-pink-100 px-4 py-2 cursor-pointer rounded-xl font-bold uppercase text-[10px] text-primary hover:bg-pink-200 transition-colors flex items-center gap-2 whitespace-nowrap h-full">
                                <ImageIcon className="w-4 h-4" /> {newCategoryImage ? 'Cambiar Img' : 'Subir Img'}
                                <input type="file" onChange={handleCategoryImageUpload} className="hidden" />
                            </label>
                        </div>
                    </div>

                    {/* Image Preview */}
                    {newCategoryImage && (
                        <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-100 shadow-sm relative group">
                            <img src={newCategoryImage} className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* Icon Picker */}
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-2 mb-2 block">O selecciona un Icono Cute:</label>
                        <div className="flex gap-3 flex-wrap">
                            {availableIcons.map((item) => (
                                <button
                                    key={item.name}
                                    type="button"
                                    onClick={() => setNewCategoryIcon(item.name)}
                                    className={`p-3 rounded-xl border-2 transition-all ${newCategoryIcon === item.name ? 'border-primary bg-pink-50 text-primary scale-110' : 'border-gray-100 text-gray-400 hover:border-pink-100 hover:text-pink-400'}`}
                                    title={item.name}
                                >
                                    <item.icon className="w-5 h-5" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        {categoryMode === 'edit' && (
                            <button type="button" onClick={handleCancelEdit} className="bg-gray-100 text-gray-500 px-6 py-3 rounded-xl font-bold uppercase text-xs hover:bg-gray-200 transition-colors">
                                Cancelar
                            </button>
                        )}
                        <button type="submit" className="bg-secondary text-white px-6 py-3 rounded-xl font-bold uppercase text-xs hover:bg-primary transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto">
                            {categoryMode === 'edit' ? 'Guardar Cambios' : 'Crear Categoría'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div className="bg-white border border-pink-100 rounded-[2rem] shadow-sm overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-pink-50 text-secondary uppercase text-xs font-bold">
                    <tr><th className="p-6">Icono/Img</th><th className="p-6">Nombre</th><th className="p-6">Slug</th><th className="p-6">Productos</th><th className="p-6">Acciones</th></tr>
                </thead>
                <tbody className="text-sm font-medium">
                    {categories.map(c => {
                        const IconComp = availableIcons.find(i => i.name === c.icon)?.icon || Sparkles;
                        return (
                            <tr key={c._id} className="border-b border-gray-50 hover:bg-pink-50/50 transition-colors">
                                <td className="p-6">
                                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                                        {c.image ? (
                                            <img src={c.image} className="w-full h-full object-cover" />
                                        ) : (
                                            <IconComp className="w-5 h-5 text-primary" />
                                        )}
                                    </div>
                                </td>
                                <td className="p-6 font-bold text-gray-600">{c.name}</td>
                                <td className="p-6 text-gray-400 text-xs italic">{c.slug}</td>
                                <td className="p-6">
                                    <span className="bg-pink-50 text-primary font-black px-3 py-1 rounded-full text-xs">
                                        {c.productCount || 0}
                                    </span>
                                </td>
                                <td className="p-6 flex gap-2">
                                    <button onClick={() => handleEditCategoryClick(c)} className="bg-blue-50 text-blue-500 hover:bg-blue-100 px-3 py-1 rounded-full text-xs font-bold transition-colors">
                                        Editar
                                    </button>
                                    <button onClick={() => handleDeleteCategory(c._id)} className="bg-red-50 text-red-500 hover:bg-red-100 px-3 py-1 rounded-full text-xs font-bold transition-colors">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
);

export default CategoriesTab;
