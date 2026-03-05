import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, QrCode, Phone, ArrowRight, Gift, Trophy } from 'lucide-react';

const Club: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [phone, setPhone] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length >= 10) setIsLoggedIn(true);
    };

    if (!isLoggedIn) {
        return (
            <div className="flex flex-col gap-12 max-w-lg mx-auto py-16 px-4 relative">
                <div className="cow-print absolute inset-0 opacity-5 pointer-events-none"></div>

                <div className="flex flex-col gap-6 text-center z-10">
                    <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 10 }}
                        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                        className="w-24 h-24 bg-muu-blue rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-muu-blue/40"
                    >
                        <Star className="w-12 h-12 text-white fill-white" />
                    </motion.div>
                    <h1 className="text-6xl font-display font-black italic uppercase text-muu-deep tracking-tighter leading-none">
                        MUU <span className="text-muu-orange italic">CLUB</span>
                    </h1>
                    <p className="opacity-60 font-bold text-lg leading-relaxed">Únete a la comunidad de los helados no convencionales.</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-8 p-10 bg-white rounded-[3rem] shadow-2xl shadow-muu-blue/5 border-4 border-muu-blue/5 z-10">
                    <div className="flex flex-col gap-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muu-orange ml-2">WhatsApp / Celular</label>
                        <div className="relative group">
                            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muu-deep/20 group-focus-within:text-muu-blue transition-colors" />
                            <input
                                type="tel"
                                placeholder="55 1234 5678"
                                className="w-full bg-muu-cream/30 border-4 border-transparent focus:border-muu-blue/10 rounded-[2rem] py-5 pl-16 pr-6 outline-none transition-all font-black text-xl tracking-[0.2em]"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className="muu-button-primary w-full flex items-center justify-center gap-3 py-6 text-xl shadow-2xl shadow-muu-blue/20">
                        CONTINUAR <ArrowRight className="w-6 h-6" />
                    </button>

                    <p className="text-[10px] text-center opacity-40 leading-relaxed font-black uppercase tracking-widest">
                        Te enviaremos un código secreto por WhatsApp.
                    </p>
                </form>

                <div className="grid grid-cols-2 gap-6 opacity-60 z-10 px-4">
                    <div className="flex items-center gap-4 bg-white/50 p-4 rounded-3xl border border-muu-blue/5">
                        <Gift className="w-6 h-6 text-muu-orange" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Premios</span>
                    </div>
                    <div className="flex items-center gap-4 bg-white/50 p-4 rounded-3xl border border-muu-blue/5">
                        <Trophy className="w-6 h-6 text-muu-blue" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Retos</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-12 pb-24">
            {/* Profile Header */}
            <header className="flex items-center justify-between mt-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-5xl font-display font-black italic uppercase text-muu-deep tracking-tighter leading-none">
                        ¡QUE ONDA, <span className="text-muu-blue">PLAYERO!</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <p className="text-xs font-black text-muu-orange uppercase tracking-widest">Mundo MUU • Est. 2024</p>
                    </div>
                </div>
                <div className="w-16 h-16 bg-muu-cream rounded-[1.5rem] border-4 border-muu-blue/10 flex items-center justify-center overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=muu" alt="Avatar" className="w-full h-full object-cover" />
                </div>
            </header>

            {/* Points Card with Cow Print */}
            <div className="muu-card bg-muu-blue text-white p-10 relative overflow-hidden flex flex-col gap-8 shadow-3xl shadow-muu-blue/40 border-0 rounded-[3rem]">
                <div className="cow-print absolute inset-0 opacity-10 pointer-events-none"></div>
                <div className="flex flex-col gap-2 relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Puntos Acumulados</span>
                    <h2 className="text-8xl font-display font-black italic uppercase tracking-tighter leading-none">1,250</h2>
                </div>

                <div className="relative z-10 flex gap-4">
                    <div className="bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl flex items-center gap-3 border border-white/10">
                        <Star className="w-5 h-5 text-muu-orange fill-muu-orange" />
                        <span className="text-xs font-black uppercase tracking-widest">Nivel Pro Surf</span>
                    </div>
                </div>

                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-[80px]"></div>
            </div>

            {/* QR Scan Section */}
            <div className="flex flex-col gap-8 items-center text-center p-12 bg-muu-cream/50 rounded-[3.5rem] border-4 border-dashed border-muu-blue/10">
                <div className="flex flex-col gap-3">
                    <h3 className="text-3xl font-display font-black italic uppercase tracking-tighter text-muu-deep">CÓDIGO DIGITAL</h3>
                    <p className="text-sm opacity-50 font-bold max-w-[240px] leading-relaxed">Enséñale este código al staff de MUU para sumar tus puntos.</p>
                </div>
                <div className="w-56 h-56 bg-white p-6 rounded-[2.5rem] shadow-2xl flex items-center justify-center border-8 border-muu-blue/5">
                    <QrCode className="w-full h-full text-muu-deep" />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black opacity-30 tracking-[0.5em] uppercase">ID: MUU-CLUB-1994-X</span>
                </div>
            </div>

            {/* Rewards Sections */}
            <div className="flex flex-col gap-8 px-2">
                <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-display font-black italic uppercase text-muu-deep tracking-tighter">CANJES DISPONIBLES</h3>
                    <button className="text-[10px] font-black text-muu-blue uppercase tracking-widest underline underline-offset-8">Historial</button>
                </div>

                <div className="flex flex-col gap-4">
                    {[
                        { title: 'Bola de Helado Gratis', cost: 500, icon: '🍦', color: 'bg-blue-50', text: 'text-blue-500' },
                        { title: 'Bowl de Temporada', cost: 1200, icon: '🥣', color: 'bg-orange-50', text: 'text-orange-500' },
                        { title: 'Tote Bag Edición MUU', cost: 3000, icon: '👜', color: 'bg-green-50', text: 'text-green-500' },
                    ].map((reward) => (
                        <div key={reward.title} className="bg-white border-4 border-muu-blue/5 p-5 rounded-[2.5rem] flex items-center justify-between group hover:border-muu-blue/10 transition-all">
                            <div className="flex items-center gap-5">
                                <div className={`w-16 h-16 ${reward.color} rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm`}>
                                    {reward.icon}
                                </div>
                                <div>
                                    <h4 className="font-black text-muu-deep italic uppercase tracking-tight group-hover:text-muu-blue transition-colors text-lg">{reward.title}</h4>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${reward.text}`}>{reward.cost} Puntos</span>
                                </div>
                            </div>
                            <button
                                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg ${1250 >= reward.cost
                                        ? 'bg-muu-deep text-white hover:scale-105 active:scale-95 shadow-muu-deep/10'
                                        : 'bg-muu-cream text-muu-deep/20 cursor-not-allowed shadow-none'
                                    }`}
                            >
                                {1250 >= reward.cost ? 'CANJEAR' : (reward.cost - 1250) + ' Faltan'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Club;
