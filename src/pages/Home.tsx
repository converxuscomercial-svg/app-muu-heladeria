import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col gap-16 overflow-x-hidden relative bg-white">
            {/* Decorative Beach Vibes */}
            <div className="fixed top-0 right-0 w-32 h-full cow-print opacity-5 pointer-events-none z-0 hidden lg:block"></div>
            <div className="fixed top-0 left-0 w-32 h-full cow-print opacity-5 pointer-events-none z-0 hidden lg:block"></div>

            {/* Hero Section */}
            <section className="relative flex flex-col items-center text-center gap-10 py-16 px-6 max-w-5xl mx-auto z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div className="bg-muu-blue/5 rounded-full px-8 py-3 mb-10 w-fit mx-auto border border-muu-blue/10 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-muu-orange animate-pulse"></span>
                        <span className="text-muu-blue font-black uppercase tracking-[0.4em] text-[10px]">La Punta • Zicatela • Est. 2025</span>
                    </div>

                    <h1 className="text-7xl md:text-[11rem] font-display font-black text-muu-deep tracking-tighter italic uppercase leading-[0.7] mb-12">
                        EL MAR <br />
                        TAMBIÉN <br />
                        <span className="text-muu-blue">ES FRÍO</span>
                    </h1>

                    <div className="relative inline-block mb-12">
                        <p className="text-3xl md:text-5xl font-display font-black text-muu-deep italic uppercase tracking-tighter">
                            TÚ.. YO.. <span className="text-muu-blue underline decoration-muu-orange/40 decoration-8 underline-offset-8">MUU..</span>
                        </p>
                    </div>

                    <p className="max-w-xl mx-auto text-lg md:text-xl opacity-60 font-bold mb-12 leading-relaxed">
                        Helados "bien chimbas", bowls tropicales y vibras de surf en el corazón de Puerto Escondido.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md mx-auto">
                        <Link to="/menu" className="muu-button-primary flex-grow flex items-center justify-center gap-3 py-6 text-xl shadow-2xl shadow-muu-blue/20">
                            VER MENÚ <ArrowRight className="w-6 h-6" />
                        </Link>
                        <Link to="/club" className="muu-button-secondary flex-grow bg-white border-4 border-muu-blue/5 py-6 text-xl">
                            MUU CLUB
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Dynamic Grid / Highlights */}
            <section className="px-6 flex flex-col gap-12 z-10 relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
                    <div className="flex flex-col gap-2">
                        <span className="text-muu-orange font-black uppercase tracking-widest text-xs">Lo más fresco</span>
                        <h2 className="text-5xl md:text-7xl font-display font-black italic uppercase text-muu-deep tracking-tighter">Favorites MUU</h2>
                    </div>
                    <Link to="/menu" className="muu-button-primary px-10 py-4 text-sm bg-muu-deep shadow-xl">Explorar Todo</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[
                        { id: 1, name: 'Surf Bowl', desc: 'Acai, granola de la casa, fruta de temporada y crema de cacahuate.', price: 115, tag: 'Bestseller' },
                        { id: 2, name: 'Double Cow', desc: 'Dos bolas de helado artesanal en vaso decorado cow-print.', price: 85, tag: 'Classic' },
                        { id: 3, name: 'MUU-Shake', desc: 'Malteada cremosa con trozos de waffle y toppings premium.', price: 95, tag: 'Indulgent' },
                    ].map((p) => (
                        <div key={p.id} className="muu-card p-0 overflow-hidden group border-4 border-muu-blue/5 flex flex-col h-full bg-muu-cream/30">
                            <div className="aspect-square bg-muu-cream relative overflow-hidden">
                                <div className="absolute top-6 left-6 z-20">
                                    <span className="bg-muu-orange text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
                                        {p.tag}
                                    </span>
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=1000"
                                    alt={p.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out grayscale-[20%] group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-muu-deep/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow gap-4">
                                <div className="flex justify-between items-start gap-4">
                                    <h3 className="text-3xl font-black italic uppercase text-muu-deep leading-none">{p.name}</h3>
                                    <span className="text-2xl font-black text-muu-blue">${p.price}</span>
                                </div>
                                <p className="text-sm font-medium opacity-50 leading-relaxed mb-4">{p.desc}</p>
                                <button className="w-full py-4 rounded-2xl bg-white border-2 border-muu-blue/10 font-black text-xs uppercase tracking-widest hover:bg-muu-blue hover:text-white hover:border-muu-blue transition-all">
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Visual Identity Section */}
            <section className="bg-muu-deep text-white py-24 px-6 relative overflow-hidden">
                <div className="cow-print absolute inset-0 opacity-10"></div>
                <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
                    <div className="flex flex-col items-center text-center gap-6">
                        <Star className="w-16 h-16 text-muu-orange fill-muu-orange mb-4" />
                        <h2 className="text-6xl md:text-9xl font-display font-black italic uppercase tracking-tighter leading-[0.8]">Mucho <br /><span className="text-muu-orange">Más Que</span> <br />Helado</h2>
                        <p className="max-w-2xl mx-auto opacity-70 text-lg md:text-xl font-medium pt-8">
                            Cada cucharada es una pequeña revolución de sabor inspirada en el litoral oaxaqueño.
                        </p>
                    </div>
                </div>
            </section>

            {/* Location & Club Split */}
            <section className="px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 pb-20">
                <div className="bg-muu-cream rounded-[3rem] p-12 flex flex-col gap-10 border-4 border-muu-blue/5">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-muu-blue rounded-3xl flex items-center justify-center">
                            <MapPin className="text-white w-8 h-8" />
                        </div>
                        <h3 className="text-4xl font-display font-black italic uppercase text-muu-deep tracking-tighter">La Ola del Sabor</h3>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-muu-orange uppercase tracking-[0.3em]">Encuéntranos</span>
                            <p className="text-xl font-bold opacity-80 leading-snug">Calle Alejandro Cárdenas Peralta, La Punta, Zicatela.</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-muu-orange uppercase tracking-[0.3em]">Horarios</span>
                            <p className="text-xl font-bold opacity-80">12:00 PM — 10:00 PM • Todos los días</p>
                        </div>
                    </div>
                    <button className="mt-4 w-full bg-muu-deep text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl">Abrir en Google Maps</button>
                </div>

                <div className="bg-muu-blue rounded-[3rem] p-12 text-white flex flex-col gap-10 shadow-3xl shadow-muu-blue/30 relative overflow-hidden">
                    <div className="cow-print absolute inset-0 opacity-10"></div>
                    <div className="flex justify-between items-start relative z-10">
                        <h3 className="text-5xl font-display font-black italic uppercase tracking-tighter leading-none">MUU CLUB <br /><span className="text-muu-orange">REWARDS</span></h3>
                        <Star className="w-12 h-12 text-muu-orange fill-muu-orange" />
                    </div>
                    <p className="text-xl opacity-80 font-medium leading-relaxed relative z-10">
                        Únete, acumula puntos con cada compra y canjéalos por helados gratis y mercancía exclusiva.
                    </p>
                    <Link to="/club" className="mt-auto bg-white text-muu-blue py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-center shadow-xl relative z-10">Unirme al Club</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
