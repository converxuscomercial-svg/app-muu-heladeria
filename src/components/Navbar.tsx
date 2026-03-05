import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, ShoppingCart, User, Gift } from 'lucide-react';
import MuuLogo from './MuuLogo';
import { useCartStore } from '../store/cartStore';

const Navbar: React.FC = () => {
    const cartItems = useCartStore((state) => state.items);
    const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

    const items = [
        { to: '/', icon: Home, label: 'Home' },
        { to: '/menu', icon: Compass, label: 'Menú' },
        { to: '/promos', icon: Gift, label: 'Promos' },
        { to: '/club', icon: User, label: 'MUU Club' },
    ];

    return (
        <>
            {/* Nav Header (Always Top) */}
            <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-xl z-50 border-b-4 border-muu-blue/5 px-6 py-4 flex items-center justify-between">
                <NavLink to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
                    <MuuLogo className="h-10" />
                </NavLink>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex gap-10">
                    {items.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `font-black text-xs uppercase tracking-[0.2em] transition-all hover:text-muu-blue flex items-center gap-2 ${isActive ? 'text-muu-blue' : 'text-muu-deep/60'}`
                            }
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <NavLink
                    to="/cart"
                    className="p-3 relative bg-muu-blue text-white rounded-2xl hover:scale-110 transition-transform shadow-lg shadow-muu-blue/20"
                >
                    <ShoppingCart className="w-6 h-6" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-muu-orange text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-black border-4 border-white">
                            {cartCount}
                        </span>
                    )}
                </NavLink>
            </header>

            {/* Mobile Bottom Bar (Only Mobile) */}
            <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-muu-deep rounded-[2.5rem] px-8 py-5 flex items-center justify-between shadow-2xl z-50 lg:hidden border-4 border-white/10">
                {items.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-muu-orange scale-125' : 'text-white/40'}`
                        }
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{item.label.split(' ')[0]}</span>
                    </NavLink>
                ))}
            </nav>
        </>
    );
};

export default Navbar;
