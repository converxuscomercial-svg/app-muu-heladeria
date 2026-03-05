import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, MapPin, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col gap-16 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center text-center gap-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-4"
                >
                    <span className="text-muu-orange font-bold uppercase tracking-[0.3em] text-xs">Puerto Escondido, México</span>
                    <h1 className="text-6xl md:text-8xl font-display font-black text-muu-deep tracking-tighter italic uppercase leading-[0.9]">
                        Sabor <span className="text-muu-blue">Playero</span> <br />
                        100% MUU
                    </h1>
                    <p className="max-w-md mx-auto text-lg opacity-60 font-medium">
                        Helados artesanales, bowls frescos y momentos inolvidables en La Punta Zicatela.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-4 mt-4"
                >
                    <Link to="/menu" className="muu-button-primary flex items-center gap-2">
                        Ver Menú <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/club" className="muu-button-secondary">
                        MUU Club
                    </Link>
                </motion.div>

                {/* Floating elements simulation */}
                <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-muu-cream to-transparent rounded-full opacity-50 blur-3xl"></div>
            </section>

            {/* Featured / Daily Top */}
            <section className="flex flex-col gap-8">
                <div className="flex items-end justify-between px-2">
                    <div className="flex flex-col gap-1">
                        <span className="text-muu-orange font-bold uppercase tracking-widest text-[10px]">Los Favoritos</span>
                        <h2 className="text-3xl font-display font-bold italic uppercase text-muu-deep">Top del Día</h2>
                    </div>
                    <Link to="/menu" className="text-sm font-bold text-muu-blue hover:underline">Ver Todo</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((id) => (
                        <div key={id} className="muu-card group cursor-pointer overflow-hidden">
                            <div className="h-64 bg-white rounded-2xl mb-4 overflow-hidden relative">
                                <div className="absolute top-4 left-4 bg-muu-orange text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">Sabor Prohibido</div>
                                <img
                                    src={`https://images.unsplash.com/photo-1576506295286-5cda18df43e7?q=80&w=1000&auto=format&fit=crop`}
                                    alt="Gelato"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="text-xl font-bold">MUU Especial {id}</h3>
                                <p className="text-sm opacity-60">Base de almendra, fresas frescas y un toque de coco de la costa.</p>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-lg font-black text-muu-blue">$85.00</span>
                                    <button className="bg-muu-blue text-white p-2 rounded-full hover:scale-110 transition-transform">
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Info Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
                <div className="muu-card flex flex-col gap-6 justify-center p-8 bg-muu-blue text-white">
                    <h2 className="text-4xl font-display font-bold italic uppercase leading-none">Visítanos en <br />La Punta</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 shrink-0 text-muu-orange" />
                            <div>
                                <p className="font-bold">Dirección</p>
                                <p className="opacity-80 text-sm">Calle Alejandro Cárdenas Peralta, La Punta Zicatela, Puerto Escondido.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Clock className="w-6 h-6 shrink-0 text-muu-orange" />
                            <div>
                                <p className="font-bold">Horario</p>
                                <p className="opacity-80 text-sm">Lunes a Domingo: 12:00 PM - 10:00 PM</p>
                            </div>
                        </div>
                    </div>
                    <button className="mt-4 bg-white text-muu-blue rounded-full py-3 px-6 font-bold flex items-center justify-center gap-2">
                        Cómo llegar <Compass className="w-4 h-4" />
                    </button>
                </div>

                <div className="muu-card flex flex-col gap-6 justify-center p-8 bg-muu-orange text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest border border-white/40 w-fit px-2 py-1 rounded-full">Exclusivo App</span>
                    <h2 className="text-4xl font-display font-bold italic uppercase leading-none">Únete al <br />MUU Club</h2>
                    <p className="opacity-90 font-medium">Acumula puntos en cada compra y canjéalos por helados gratis y experiencias únicas.</p>
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-white text-white" />
                        <Star className="w-5 h-5 fill-white text-white" />
                        <Star className="w-5 h-5 fill-white text-white" />
                        <Star className="w-5 h-5 fill-white text-white" />
                        <Star className="w-5 h-5 fill-white text-white" />
                    </div>
                    <Link to="/club" className="mt-4 bg-muu-blue text-white rounded-full py-3 px-6 font-bold flex items-center justify-center gap-2">
                        Registrarme ahora
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
