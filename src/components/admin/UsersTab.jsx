import { Trash2 } from 'lucide-react';

const UsersTab = ({ users, handleDeleteUser, onViewOrders }) => (
    <div className="bg-white border border-pink-100 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-pink-50 text-secondary uppercase text-xs font-bold tracking-wider">
                    <tr><th className="p-6 rounded-tl-[2rem]">Usuario</th><th className="p-6">Email</th><th className="p-6">Rol</th><th className="p-6 rounded-tr-[2rem]">Acciones</th></tr>
                </thead>
                <tbody className="text-sm font-medium">
                    {users.map(u => (
                        <tr key={u._id} className="border-b border-gray-50 hover:bg-pink-50/50 transition-colors group">
                            <td className="p-6 flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-purple-200 text-white rounded-full flex items-center justify-center font-black shadow-sm border-2 border-white">
                                    {u.name.charAt(0)}
                                </div>
                                <span className="font-bold text-gray-600">{u.name}</span>
                            </td>
                            <td className="p-6 text-gray-500">{u.email}</td>
                            <td className="p-6"><span className={`px-3 py-1 rounded-full text-xs uppercase font-bold text-[10px] tracking-wide ${u.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>{u.role}</span></td>
                            <td className="p-6 flex items-center gap-2">
                                <button
                                    onClick={() => onViewOrders(u)}
                                    className="bg-pink-50 text-primary hover:bg-primary hover:text-white px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all"
                                >
                                    Ver Pedidos
                                </button>
                                <button onClick={() => handleDeleteUser(u._id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default UsersTab;
