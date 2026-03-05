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
            {/* Desktop Header */}
            <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-muu-blue/10 px-6 py-4 flex items-center justify-between shadow-sm lg:flex hidden">
                <MuuLogo />
                <nav className="flex gap-8">
                    {items.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `font-semibold text-sm transition-colors hover:text-muu-blue flex items-center gap-1 ${isActive ? 'text-muu-blue border-b-2 border-muu-blue pb-1' : 'text-muu-deep'
                                }`
                            }
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
                <NavLink
                    to="/cart"
                    className="p-2 relative bg-muu-cream rounded-full text-muu-blue hover:scale-105 transition-transform"
                >
                    <ShoppingCart className="w-6 h-6" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-muu-orange text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            {cartCount}
                        </span>
                    )}
                </NavLink>
            </header>

            {/* Mobile Bottom Bar */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white border border-muu-blue/20 rounded-[2rem] px-8 py-4 flex items-center justify-between shadow-2xl z-50 lg:hidden">
                {items.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-muu-blue scale-110' : 'text-muu-deep/40'
                            }`
                        }
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.label.split(' ')[0]}</span>
                    </NavLink>
                ))}
                <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 transition-all relative ${isActive ? 'text-muu-blue scale-110' : 'text-muu-deep/40'
                        }`
                    }
                >
                    <ShoppingCart className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Carrito</span>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-muu-orange text-white text-[8px] w-3 h-3 rounded-full flex items-center justify-center font-bold">
                            {cartCount}
                        </span>
                    )}
                </NavLink>
            </nav>
        </>
    );
};

export default Navbar;
