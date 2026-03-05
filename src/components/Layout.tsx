import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import MuuLogo from './MuuLogo';

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-white selection:bg-muu-blue selection:text-white">
            <Navbar />
            <main className="pt-32 pb-40 px-6 max-w-7xl mx-auto">
                <Outlet />
            </main>

            {/* Premium Footer */}
            <footer className="py-24 px-6 bg-muu-deep text-white rounded-t-[4rem] border-t-8 border-muu-blue/20 flex flex-col items-center gap-12 relative overflow-hidden">
                <div className="cow-print absolute inset-0 opacity-5 pointer-events-none"></div>

                <div className="flex flex-col items-center gap-4 z-10">
                    <MuuLogo variant="light" className="h-16" />
                    <p className="text-2xl font-display font-black italic uppercase tracking-tighter mt-4">
                        EL MAR <span className="text-muu-orange">TAMBIÉN</span> ES FRÍO
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-12 text-xs font-black uppercase tracking-[0.3em] opacity-60 z-10">
                    <a href="https://instagram.com/muu.mex" target="_blank" className="hover:text-muu-orange transition-colors">Instagram</a>
                    <a href="#" className="hover:text-muu-orange transition-colors">Menú Digital</a>
                    <a href="#" className="hover:text-muu-orange transition-colors">Privacidad</a>
                    <a href="#" className="hover:text-muu-orange transition-colors">Contacto</a>
                </div>

                <div className="flex flex-col items-center gap-2 z-10">
                    <p className="text-[10px] opacity-30 uppercase tracking-[0.4em] text-center max-w-xs">
                        © 2025 MUU HELADERÍA. <br /> LA PUNTA ZICATELA, PUERTO ESCONDIDO.
                    </p>
                    <div className="w-12 h-1 bg-muu-blue/30 rounded-full mt-4"></div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
