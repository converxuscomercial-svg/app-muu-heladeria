import React, { useState } from 'react';
import { Star, ShieldCheck, QrCode, Phone, ArrowRight, Gift } from 'lucide-react';

const Club: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [phone, setPhone] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length >= 10) setIsLoggedIn(true);
    };

    if (!isLoggedIn) {
        return (
            <div className="flex flex-col gap-10 max-w-md mx-auto py-12">
                <div className="flex flex-col gap-4 text-center">
                    <div className="w-20 h-20 bg-muu-cream rounded-full flex items-center justify-center mx-auto">
                        <Star className="w-10 h-10 text-muu-blue" />
                    </div>
                    <h1 className="text-4xl font-display font-black italic uppercase text-muu-deep tracking-tighter">
                        Únete al <span className="text-muu-blue">Club</span>
                    </h1>
                    <p className="opacity-60 font-medium">Accede a recompensas, retos y el menú secreto de MUU.</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-6 p-8 muu-card">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">WhatsApp / Teléfono</label>
                        <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muu-deep/30 group-focus-within:text-muu-blue transition-colors" />
                            <input
                                type="tel"
                                placeholder="55 1234 5678"
                                className="w-full bg-white border-2 border-muu-blue/5 rounded-2xl py-4 pl-12 pr-4 focus:border-muu-blue/20 outline-none transition-all font-bold tracking-widest"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className="muu-button-primary w-full flex items-center justify-center gap-2 py-4">
                        Continuar <ArrowRight className="w-5 h-5" />
                    </button>

                    <p className="text-[10px] text-center opacity-40 leading-relaxed font-bold uppercase">
                        Te enviaremos un código de acceso por WhatsApp.
                    </p>
                </form>

                <div className="grid grid-cols-2 gap-4 opacity-60">
                    <div className="flex flex-col gap-2 p-4 text-center">
                        <ShieldCheck className="w-6 h-6 mx-auto text-green-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Seguro</span>
                    </div>
                    <div className="flex flex-col gap-2 p-4 text-center">
                        <Gift className="w-6 h-6 mx-auto text-muu-orange" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Premios</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-10">
            {/* Profile Header */}
            <header className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-display font-black italic uppercase text-muu-deep tracking-tighter">
                        ¡Hola, <span className="text-muu-blue">Playero!</span>
                    </h1>
                    <p className="text-sm font-bold text-muu-orange uppercase tracking-widest">Mundo MUU • Miembro desde 2024</p>
                </div>
                <div className="w-14 h-14 bg-muu-cream rounded-full border-2 border-muu-blue/10 flex items-center justify-center font-bold text-muu-blue">
                    JD
                </div>
            </header>

            {/* Points Card */}
            <div className="muu-card bg-muu-blue text-white p-8 relative overflow-hidden flex flex-col gap-6 shadow-2xl shadow-muu-blue/30">
                <div className="flex flex-col gap-1 relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Puntos Totales</span>
                    <h2 className="text-6xl font-display font-black italic uppercase tracking-tighter">1,250</h2>
                </div>

                <div className="relative z-10 flex gap-4">
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 border border-white/5">
                        <Star className="w-4 h-4 text-muu-orange fill-muu-orange" />
                        <span className="text-sm font-bold">Nivel Oro</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 border border-white/5">
                        <ShieldCheck className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-bold">MUU Lover</span>
                    </div>
                </div>

                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            {/* QR Scan Section */}
            <div className="flex flex-col gap-6 items-center text-center p-8 bg-muu-cream rounded-[3rem] border-2 border-dashed border-muu-blue/10">
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold italic uppercase tracking-tighter">Tu Código QR</h3>
                    <p className="text-xs opacity-60 font-medium max-w-[200px]">Enséñale este código al cajero para sumar puntos.</p>
                </div>
                <div className="w-48 h-48 bg-white p-4 rounded-3xl shadow-xl flex items-center justify-center border-4 border-muu-blue/5">
                    <QrCode className="w-full h-full text-muu-deep" />
                </div>
                <span className="text-[10px] font-black opacity-30 tracking-[0.4em] uppercase">MUU-CLUB-7829-X</span>
            </div>

            {/* Rewards Sections */}
            <div className="flex flex-col gap-6">
                <div className="flex items-end justify-between px-2">
                    <h3 className="text-2xl font-display font-bold italic uppercase text-muu-deep">Canjes Disponibles</h3>
                    <button className="text-xs font-bold text-muu-blue underline underline-offset-4">Ver Historial</button>
                </div>

                <div className="flex flex-col gap-4">
                    {[
                        { title: 'Bola de Helado Gratis', cost: 500, icon: '🍦', bg: 'bg-blue-50' },
                        { title: 'Bowl de Temporada', cost: 1200, icon: '🥣', bg: 'bg-orange-50' },
                        { title: 'Tote Bag Edición MUU', cost: 3000, icon: '👜', bg: 'bg-green-50' },
                    ].map((reward) => (
                        <div key={reward.title} className="bg-white border border-muu-blue/5 p-4 rounded-3xl flex items-center justify-between group hover:shadow-lg transition-all">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 ${reward.bg} rounded-2xl flex items-center justify-center text-2xl`}>
                                    {reward.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-muu-deep group-hover:text-muu-blue transition-colors">{reward.title}</h4>
                                    <span className="text-[10px] font-black text-muu-orange uppercase tracking-widest">{reward.cost} Puntos</span>
                                </div>
                            </div>
                            <button
                                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${1250 >= reward.cost ? 'bg-muu-blue text-white shadow-md active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {1250 >= reward.cost ? 'Canjear' : 'Faltan ' + (reward.cost - 1250)}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Club;
