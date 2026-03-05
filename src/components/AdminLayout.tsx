import React from 'react';
import { LayoutDashboard, ShoppingBag, Gift, Users, Settings } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-gray-50 text-muu-deep">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-6 gap-8">
                <div className="text-2xl font-display font-bold text-muu-blue tracking-tighter italic uppercase">Admin MUU</div>

                <nav className="flex flex-col gap-2">
                    {[
                        { to: '/admin', icon: LayoutDashboard, label: 'Resumen', end: true },
                        { to: '/admin/products', icon: ShoppingBag, label: 'Productos' },
                        { to: '/admin/promos', icon: Gift, label: 'Promociones' },
                        { to: '/admin/users', icon: Users, label: 'MUU Club' },
                        { to: '/admin/settings', icon: Settings, label: 'Ajustes' },
                    ].map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-xl font-semibold transition-all ${isActive ? 'bg-muu-blue text-white shadow-md' : 'text-gray-400 hover:bg-gray-100 hover:text-muu-deep'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-gray-100">
                    <NavLink to="/" className="text-xs font-bold uppercase tracking-widest text-muu-blue hover:underline">Volver a la App</NavLink>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-10">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
