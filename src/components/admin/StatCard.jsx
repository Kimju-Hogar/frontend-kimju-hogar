import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, color, iconColor }) => (
    <div className="p-6 bg-white border border-pink-100 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className={`absolute top-0 right-0 w-24 h-24 ${color} rounded-full blur-2xl -mr-10 -mt-10 opacity-50 group-hover:opacity-80 transition-opacity`} />
        <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 ${color} rounded-2xl`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
        </div>
        <h3 className="text-3xl font-display font-black text-secondary mb-1 relative z-10">{value}</h3>
        <p className="text-xs font-bold uppercase text-gray-400 relative z-10 tracking-wider">{label}</p>
    </div>
);

export default StatCard;
