import { BarChart2, TrendingUp, Users, DollarSign, Package, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from './StatCard';

const OverviewTab = ({ stats, data, productAnalysis, onShowAnalytics }) => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={DollarSign} label="Ventas Totales (Pagado)" value={`$${(stats?.sales || 0).toLocaleString()}`} color="bg-pink-100" iconColor="text-primary" />
            <StatCard icon={Users} label="Usuarios" value={stats?.users || 0} color="bg-purple-100" iconColor="text-purple-500" />
            <StatCard icon={Package} label="Pedidos Totales" value={stats?.orders || 0} color="bg-blue-100" iconColor="text-blue-500" />
            <StatCard icon={TrendingUp} label="Conversión" value={`${(stats?.orders || 0) > 0 ? (((stats?.orders || 0) / (stats?.users || 1)) * 10).toFixed(1) : 0}%`} color="bg-green-100" iconColor="text-green-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2rem] border border-pink-100 shadow-sm relative overflow-hidden">
                <h3 className="font-bold text-lg mb-6 text-secondary flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary fill-pink-200" /> Ventas Mensuales (Info Real)
                </h3>
                <div className="h-72 w-full" style={{ minWidth: 0, minHeight: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f472b6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#f472b6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" vertical={false} />
                            <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12, fontWeight: 'bold' }} tickLine={false} axisLine={false} />
                            <YAxis stroke="#9ca3af" tick={{ fontSize: 12, fontWeight: 'bold' }} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val > 1000 ? (val / 1000).toFixed(0) + 'k' : val}`} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    borderRadius: '1rem',
                                    border: 'none',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    color: '#db2777',
                                    fontWeight: 'bold'
                                }}
                                formatter={(value) => [`$${value.toLocaleString()}`, "Ventas"]}
                            />
                            <Area type="monotone" dataKey="sales" stroke="#db2777" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-pink-100 shadow-sm relative overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-secondary flex items-center gap-2">
                        <BarChart2 className="w-5 h-5 text-blue-400" /> Top Productos Vendidos
                    </h3>
                    <button
                        onClick={onShowAnalytics}
                        className="text-xs font-black uppercase text-primary hover:underline flex items-center gap-1"
                    >
                        Ver Detalle <Sparkles className="w-3 h-3" />
                    </button>
                </div>
                {productAnalysis && productAnalysis.length > 0 ? (
                    <div className="space-y-4 flex-grow overflow-y-auto max-h-[280px] pr-2 custom-scrollbar">
                        {productAnalysis.slice(0, 5).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-xl bg-gray-50 p-1 border border-pink-50 shadow-sm shrink-0 overflow-hidden">
                                    <img src={item.image} alt="" className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="flex-grow">
                                    <p className="text-sm font-bold text-secondary truncate mb-0.5">{item.name}</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(item.count / productAnalysis[0].count) * 100}%` }}
                                                className="h-full bg-gradient-to-r from-primary to-purple-400"
                                            />
                                        </div>
                                        <span className="text-[10px] font-black text-primary w-8">{item.count}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-gray-300 font-bold italic">No hay ventas registradas aún.</div>
                )}
            </div>
        </div>
    </div>
);

export default OverviewTab;
