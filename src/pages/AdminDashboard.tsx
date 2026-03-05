import React, { useEffect, useState } from 'react';
import { TrendingUp, ShoppingBag, Gift, Users, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Stats {
    ordersToday: number;
    totalOrders: number;
    activePromos: number;
    clubMembers: number;
}

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<Stats>({ ordersToday: 0, totalOrders: 0, activePromos: 0, clubMembers: 0 });
    const [loading, setLoading] = useState(true);
    const [recentOrders, setRecentOrders] = useState<{ id: string; customer_name: string; total: number; order_type: string; created_at: string }[]>([]);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const [
                { count: totalOrders },
                { count: ordersToday },
                { count: activePromos },
                { count: clubMembers },
                { data: orders },
            ] = await Promise.all([
                supabase.from('orders').select('*', { count: 'exact', head: true }),
                supabase.from('orders').select('*', { count: 'exact', head: true }).gte('created_at', today.toISOString()),
                supabase.from('promos').select('*', { count: 'exact', head: true }).eq('is_active', true),
                supabase.from('club_members').select('*', { count: 'exact', head: true }),
                supabase.from('orders').select('id, customer_name, total, order_type, created_at').order('created_at', { ascending: false }).limit(5),
            ]);

            setStats({
                ordersToday: ordersToday ?? 0,
                totalOrders: totalOrders ?? 0,
                activePromos: activePromos ?? 0,
                clubMembers: clubMembers ?? 0,
            });
            setRecentOrders((orders ?? []) as typeof recentOrders);
        } catch (e) {
            console.error('Dashboard error', e);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: 'Pedidos Hoy', value: stats.ordersToday, icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Total Pedidos', value: stats.totalOrders, icon: ShoppingBag, color: 'text-green-500', bg: 'bg-green-50' },
        { label: 'Promos Activas', value: stats.activePromos, icon: Gift, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'MUU Club Users', value: stats.clubMembers, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
    ];

    if (loading) return (
        <div className="flex items-center justify-center py-32">
            <Loader2 className="w-10 h-10 text-muu-blue animate-spin" />
        </div>
    );

    return (
        <div className="flex flex-col gap-10">
            <header className="flex flex-col gap-1">
                <h1 className="text-3xl font-display font-black italic uppercase text-muu-deep">¡Hola, Admin MUU!</h1>
                <p className="text-muu-deep/40 font-medium">Así va la heladería hoy en Puerto Escondido.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-muu-deep">{stat.value.toLocaleString()}</h3>
                            <p className="text-muu-deep/40 text-xs font-bold uppercase tracking-widest mt-1">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-display font-black italic uppercase text-muu-deep">Últimos Pedidos</h3>
                    <span className="text-xs text-muu-blue font-black uppercase tracking-widest">Tiempo real</span>
                </div>
                {recentOrders.length === 0 ? (
                    <p className="text-muu-deep/30 text-sm font-medium text-center py-8">No hay pedidos aún. ¡Comparte la app!</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-muu-blue/10 rounded-full flex items-center justify-center font-black text-muu-blue text-sm">
                                        {order.customer_name[0]?.toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-muu-deep">{order.customer_name}</p>
                                        <p className="text-[10px] uppercase font-bold text-gray-400">{order.order_type} · {new Date(order.created_at).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                </div>
                                <div className="font-black text-muu-blue">${order.total}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
