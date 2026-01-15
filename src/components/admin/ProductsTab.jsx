import { Search, Filter, Plus, Upload, CheckCircle, Trash2, Edit } from 'lucide-react';

const ProductsTab = ({
    products, searchTerm, setSearchTerm, filterCategory, setFilterCategory,
    handleDeleteProduct, setProductMode, setShowProductModal, downloadCsvTemplate,
    file, setFile, handleUpload, uploadStatus, uploadMsg, handleEditClick
}) => {
    const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const uniqueHelper = products.map(p => p.category).filter(Boolean);
    const uniqueCategories = ['all', ...new Set(uniqueHelper)];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 bg-white p-6 rounded-[2rem] border border-pink-100 shadow-sm">
                <div className="flex items-center space-x-4 w-full md:w-2/3">
                    <div className="flex items-center space-x-2 flex-1 bg-gray-50 p-3 rounded-xl border border-transparent focus-within:border-pink-200 focus-within:bg-white transition-all">
                        <Search className="text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar producto..."
                            className="w-full bg-transparent outline-none font-bold text-sm text-gray-600 placeholder:text-gray-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-3 w-4 h-4 text-pink-300" />
                        <select
                            className="pl-10 pr-8 py-3 border border-pink-100 rounded-xl font-bold text-xs uppercase text-gray-500 appearance-none bg-white focus:border-primary focus:outline-none transition-colors cursor-pointer hover:bg-pink-50"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            {uniqueCategories.map(c => <option key={c} value={c}>{c === 'all' ? 'Todas' : c}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => { setProductMode('create'); setShowProductModal(true); }}
                        className="bg-secondary text-white px-6 py-3 font-bold text-xs rounded-xl hover:bg-primary transition-all flex items-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Nuevo Producto
                    </button>
                </div>
            </div>

            <div className="bg-white border-2 border-dashed border-pink-200 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between transition-colors hover:border-primary-light">
                <div className="flex items-center mb-4 md:mb-0">
                    <div className="bg-pink-50 p-4 rounded-full mr-4"><Upload className="w-6 h-6 text-primary" /></div>
                    <div>
                        <h4 className="font-bold text-lg text-secondary">Carga Masiva</h4>
                        <button onClick={downloadCsvTemplate} className="text-primary text-xs font-bold underline mt-1 hover:text-primary-dark">Descargar Plantilla CSV</button>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} className="text-xs font-bold text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-pink-50 file:text-primary hover:file:bg-pink-100" />
                    {file && <button onClick={handleUpload} className="bg-secondary text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-primary transition-colors">Subir</button>}
                </div>
                {uploadStatus === 'success' && <div className="text-green-500 font-bold text-sm ml-4 flex items-center bg-green-50 px-3 py-1 rounded-full"><CheckCircle className="w-4 h-4 mr-1" /> {uploadMsg}</div>}
            </div>

            <div className="bg-white border border-pink-100 rounded-[2rem] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-pink-50 text-secondary uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="p-6 rounded-tl-[2rem]">Producto</th>
                                <th className="p-6">Precio</th>
                                <th className="p-6">Stock</th>
                                <th className="p-6">Cat</th>
                                <th className="p-6 rounded-tr-[2rem]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium">
                            {filtered.map(product => (
                                <tr key={product._id} className="border-b border-gray-50 hover:bg-pink-50/50 transition-colors">
                                    <td className="p-6 flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                            <img src={product.image || "https://via.placeholder.com/40"} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-secondary text-sm">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 font-bold text-gray-500">${product.price.toLocaleString()}</td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock < 10 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>{product.stock} un.</span>
                                    </td>
                                    <td className="p-6"><span className="bg-gray-50 text-gray-500 border border-gray-100 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide">{product.category}</span></td>
                                    <td className="p-6 flex space-x-2">
                                        <button onClick={() => handleEditClick(product)} className="p-2 hover:bg-primary hover:text-white text-gray-400 transition-colors rounded-xl"><Edit className="w-4 h-4" /></button>
                                        <button onClick={() => handleDeleteProduct(product._id)} className="p-2 hover:bg-red-400 hover:text-white text-gray-400 transition-colors rounded-xl"><Trash2 className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductsTab;
