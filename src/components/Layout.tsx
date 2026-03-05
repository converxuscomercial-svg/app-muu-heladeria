import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-24 pb-32 px-4 max-w-7xl mx-auto md:px-8">
                <Outlet />
            </main>

            {/* Footer (Simplified for MVP) */}
            <footer className="mt-12 py-12 px-6 bg-muu-cream text-muu-deep rounded-t-[3rem] border-t border-muu-blue/10 flex flex-col items-center gap-6">
                <div className="text-xl font-display font-bold text-muu-blue tracking-tighter italic uppercase">MUU</div>
                <div className="flex gap-8 text-sm font-semibold opacity-60 uppercase tracking-widest">
                    <a href="#" className="hover:text-muu-blue transition-colors">Instagram</a>
                    <a href="#" className="hover:text-muu-blue transition-colors">Ubicación</a>
                    <a href="#" className="hover:text-muu-blue transition-colors">WhatsApp</a>
                </div>
                <p className="text-[10px] opacity-40 uppercase tracking-widest text-center max-w-xs">
                    © 2024 MUU Heladería. La Punta Zicatela, Puerto Escondido. Sabor playero en cada bola.
                </p>
            </footer>
        </div>
    );
};

export default Layout;
