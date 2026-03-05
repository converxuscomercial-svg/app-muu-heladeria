import React from 'react';
import { TrendingUp, ShoppingBag, Gift, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const stats = [
        { label: 'Visitas Hoy', value: '1,234', icon: TrendingUp, color: 'text-blue-500', trend: '+12%', up: true },
        { label: 'Ventas (Whats)', value: '$45,200', icon: ShoppingBag, color: 'text-green-500', trend: '-3%', up: false },
        { label: 'Promos Abiertas', value: '89', icon: Gift, color: 'text-orange-500', trend: '+5%', up: true },
        { label: 'MUU Club Users', value: '156', icon: Users, color: 'text-purple-500', trend: '+18%', up: true },
    ];

    return (
        <div className="flex flex-col gap-10">
            <header className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold">¡Hola, Admin MUU!</h1>
                <p className="text-gray-400">Así va la heladería hoy en Puerto Escondido.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.trend} {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black">{stat.value}</h3>
                            <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6">
                    <h3 className="text-xl font-bold">Top Sabores</h3>
                    <div className="flex flex-col gap-4">
                        {[
                            { name: 'MUU Clásico', sales: 45, color: 'bg-muu-blue' },
                            { name: 'Coco Loco', sales: 38, color: 'bg-orange-400' },
                            { name: 'Choco-MUU', sales: 32, color: 'bg-amber-800' },
                            { name: 'Acai Bowl', sales: 28, color: 'bg-purple-600' },
                        ].map((item) => (
                            <div key={item.name} className="flex flex-col gap-2">
                                <div className="flex justify-between text-sm font-bold">
                                    <span>{item.name}</span>
                                    <span>{item.sales}%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div className={`${item.color} h-full`} style={{ width: `${item.sales}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6">
                    <h3 className="text-xl font-bold">Últimos Registros MUU Club</h3>
                    <div className="flex flex-col gap-4">
                        {[
                            { name: 'María López', points: 150, time: 'Hace 5 min' },
                            { name: 'Juan Pérez', points: 45, time: 'Hace 15 min' },
                            { name: 'Carlos Díaz', points: 280, time: 'Hace 1 hora' },
                            { name: 'Ana Sofía', points: 12, time: 'Hace 2 horas' },
                        ].map((user) => (
                            <div key={user.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-muu-blue shadow-sm">
                                        {user.name[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{user.name}</p>
                                        <p className="text-[10px] uppercase font-bold text-gray-400">{user.time}</p>
                                    </div>
                                </div>
                                <div className="text-muu-orange font-black text-sm">+{user.points} pts</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
