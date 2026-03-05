import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, QrCode, Phone, ArrowRight, Gift, Trophy, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ClubMember } from '../lib/types';

const LEVEL_COLORS: Record<string, string> = {
    'Rookie': 'text-muu-orange',
    'Pro Surf': 'text-muu-blue',
    'MUU Legend': 'text-yellow-500',
};

const LEVEL_THRESHOLD = [
    { level: 'Rookie', min: 0, max: 999 },
    { level: 'Pro Surf', min: 1000, max: 2999 },
    { level: 'MUU Legend', min: 3000, max: Infinity },
];

const REWARDS = [
    { title: 'Bola de Helado Gratis', cost: 500, icon: '🍦', color: 'bg-blue-50', text: 'text-blue-500' },
    { title: 'Bowl de Temporada', cost: 1200, icon: '🥣', color: 'bg-orange-50', text: 'text-orange-500' },
    { title: 'Tote Bag Edición MUU', cost: 3000, icon: '👜', color: 'bg-green-50', text: 'text-green-500' },
];

const Club: React.FC = () => {
    const [step, setStep] = useState<'phone' | 'loading' | 'dashboard'>('phone');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [member, setMember] = useState<ClubMember | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleJoin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.replace(/\D/g, '').length < 10) return;
        setError(null);
        setStep('loading');

        try {
            // Check if member exists
            const normalizedPhone = phone.replace(/\D/g, '');
            const { data: existingMember } = await supabase
                .from('club_members')
                .select('*')
                .eq('phone', normalizedPhone)
                .single();

            if (existingMember) {
                setMember(existingMember as ClubMember);
                setStep('dashboard');
                return;
            }

            // Create new member with welcome bonus (100 pts)
            const { data: newMember, error: insertError } = await supabase
                .from('club_members')
                .insert({
                    phone: normalizedPhone,
                    name: name.trim() || null,
                    points: 100, // Welcome bonus
                })
                .select()
                .single();

            if (insertError) throw insertError;

            setMember(newMember as ClubMember);
            setStep('dashboard');
        } catch (err: unknown) {
            console.error('Club error:', err);
            setError('Hubo un problema. Intenta de nuevo.');
            setStep('phone');
        }
    };

    const getProgress = (points: number) => {
        const current = LEVEL_THRESHOLD.find(t => points >= t.min && points <= t.max);
        const next = LEVEL_THRESHOLD.find(t => t.min > points);
        if (!next) return { pct: 100, remaining: 0, nextLevel: 'MUU Legend' };
        const pct = Math.round(((points - (current?.min ?? 0)) / (next.min - (current?.min ?? 0))) * 100);
        return { pct, remaining: next.min - points, nextLevel: next.level };
    };

    // ── Phone / Join form ─────────────────────────
    if (step === 'phone') {
        return (
            <div className="flex flex-col gap-12 max-w-lg mx-auto py-10 px-4 relative">
                <div className="cow-print absolute inset-0 opacity-5 pointer-events-none" />

                <div className="flex flex-col gap-6 text-center z-10">
                    <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 10 }}
                        transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
                        className="w-24 h-24 bg-muu-blue rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-muu-blue/40"
                    >
                        <Star className="w-12 h-12 text-white fill-white" />
                    </motion.div>
                    <h1 className="text-6xl font-display font-black italic uppercase text-muu-deep tracking-tighter leading-none">
                        MUU <span className="text-muu-orange italic">CLUB</span>
                    </h1>
                    <p className="opacity-60 font-bold text-lg leading-relaxed">
                        Únete para acumular puntos y ganar helados gratis. ¡100 puntos de bienvenida!
                    </p>
                </div>

                <form onSubmit={handleJoin} className="flex flex-col gap-6 p-10 bg-white rounded-[3rem] shadow-2xl shadow-muu-blue/5 border-4 border-muu-blue/5 z-10">
                    <div className="flex flex-col gap-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muu-orange ml-2">Tu Nombre (opcional)</label>
                        <input
                            type="text"
                            placeholder="¿Cómo te llamas?"
                            className="w-full bg-muu-cream/30 border-4 border-transparent focus:border-muu-blue/10 rounded-[2rem] py-4 px-6 outline-none transition-all font-bold text-lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muu-orange ml-2">WhatsApp / Celular *</label>
                        <div className="relative group">
                            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muu-deep/20 group-focus-within:text-muu-blue transition-colors" />
                            <input
                                type="tel"
                                placeholder="55 1234 5678"
                                className="w-full bg-muu-cream/30 border-4 border-transparent focus:border-muu-blue/10 rounded-[2rem] py-5 pl-16 pr-6 outline-none transition-all font-black text-xl tracking-[0.2em]"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-3 text-red-500 bg-red-50 px-4 py-3 rounded-2xl text-sm font-bold">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <button type="submit" className="muu-button-primary w-full flex items-center justify-center gap-3 py-6 text-xl shadow-2xl shadow-muu-blue/20 font-black uppercase tracking-widest">
                        ENTRAR AL CLUB <ArrowRight className="w-6 h-6" />
                    </button>

                    <p className="text-[10px] text-center opacity-40 leading-relaxed font-black uppercase tracking-widest">
                        Si ya eres miembro, ingresamos tu número y obtienes tus puntos.
                    </p>
                </form>

                <div className="grid grid-cols-2 gap-6 opacity-70 z-10 px-4">
                    {[
                        { icon: Gift, label: 'Premios exclusivos', color: 'text-muu-orange' },
                        { icon: Trophy, label: 'Niveles y retos', color: 'text-muu-blue' },
                        { icon: Star, label: '100 pts bienvenida', color: 'text-yellow-500' },
                        { icon: ShieldCheck, label: 'Datos seguros', color: 'text-green-500' },
                    ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3 bg-white/70 p-4 rounded-3xl border border-muu-blue/5">
                            <item.icon className={`w-5 h-5 ${item.color}`} />
                            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ── Loading ────────────────────────────────────
    if (step === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
                <Loader2 className="w-12 h-12 text-muu-blue animate-spin" />
                <p className="font-black text-muu-blue uppercase tracking-widest text-xs">Verificando membresía...</p>
            </div>
        );
    }

    // ── Dashboard ──────────────────────────────────
    if (!member) return null;
    const { pct, remaining, nextLevel } = getProgress(member.points);

    return (
        <div className="flex flex-col gap-10 pb-24 max-w-2xl mx-auto">
            {/* Header */}
            <header className="flex items-center justify-between mt-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-5xl font-display font-black italic uppercase text-muu-deep tracking-tighter leading-none">
                        ¡QUE ONDA,{' '}
                        <span className="text-muu-blue">{member.name ? member.name.toUpperCase() : 'PLAYERO'}!</span>
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-xs font-black text-muu-orange uppercase tracking-widest">
                            MUU Club Activo · {member.phone}
                        </p>
                    </div>
                </div>
                <div className="w-16 h-16 bg-muu-cream rounded-[1.5rem] border-4 border-muu-blue/10 flex items-center justify-center overflow-hidden">
                    <img
                        src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${member.phone}`}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
            </header>

            {/* Points Card */}
            <div className="bg-muu-blue text-white p-10 relative overflow-hidden flex flex-col gap-6 shadow-2xl shadow-muu-blue/40 border-0 rounded-[3rem]">
                <div className="cow-print absolute inset-0 opacity-10 pointer-events-none" />
                <div className="relative z-10 flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Puntos Acumulados</span>
                    <h2 className="text-8xl font-display font-black italic uppercase tracking-tighter leading-none">
                        {member.points.toLocaleString()}
                    </h2>
                </div>
                <div className="relative z-10 flex items-center gap-4">
                    <div className="bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-white/10">
                        <Star className="w-4 h-4 text-muu-orange fill-muu-orange" />
                        <span className={`text-xs font-black uppercase tracking-widest ${LEVEL_COLORS[member.level] || ''}`}>
                            {member.level}
                        </span>
                    </div>
                </div>

                {/* Level progress */}
                {member.level !== 'MUU Legend' && (
                    <div className="relative z-10 flex flex-col gap-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-70">
                            <span>{member.level}</span>
                            <span>{nextLevel} · faltan {remaining.toLocaleString()} pts</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="h-full bg-muu-orange rounded-full"
                            />
                        </div>
                    </div>
                )}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />
            </div>

            {/* QR Code */}
            <div className="flex flex-col gap-6 items-center text-center p-10 bg-muu-cream/50 rounded-[3.5rem] border-4 border-dashed border-muu-blue/10">
                <div className="flex flex-col gap-2">
                    <h3 className="text-3xl font-display font-black italic uppercase tracking-tighter text-muu-deep">
                        MI CÓDIGO MUU
                    </h3>
                    <p className="text-sm opacity-50 font-bold max-w-[240px] leading-relaxed">
                        Enséñale este código al staff para sumar tus puntos
                    </p>
                </div>
                <div className="w-52 h-52 bg-white p-5 rounded-[2.5rem] shadow-2xl flex items-center justify-center border-8 border-muu-blue/5">
                    <QrCode className="w-full h-full text-muu-deep" />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black opacity-30 tracking-[0.5em] uppercase">
                        MUU-{member.phone.slice(-6).toUpperCase()}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-black text-green-500 uppercase tracking-widest justify-center">
                        <CheckCircle2 className="w-3 h-3" />
                        Membresía activa
                    </div>
                </div>
            </div>

            {/* Rewards */}
            <div className="flex flex-col gap-6 px-1">
                <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-display font-black italic uppercase text-muu-deep tracking-tighter">
                        CANJES DISPONIBLES
                    </h3>
                </div>

                <div className="flex flex-col gap-4">
                    {REWARDS.map((reward) => (
                        <div
                            key={reward.title}
                            className="bg-white border-4 border-muu-blue/5 p-5 rounded-[2.5rem] flex items-center justify-between group hover:border-muu-blue/15 transition-all"
                        >
                            <div className="flex items-center gap-5">
                                <div className={`w-16 h-16 ${reward.color} rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm`}>
                                    {reward.icon}
                                </div>
                                <div>
                                    <h4 className="font-black text-muu-deep italic uppercase tracking-tight group-hover:text-muu-blue transition-colors text-lg leading-tight">
                                        {reward.title}
                                    </h4>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${reward.text}`}>
                                        {reward.cost.toLocaleString()} Puntos
                                    </span>
                                </div>
                            </div>
                            <button
                                disabled={member.points < reward.cost}
                                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg ${member.points >= reward.cost
                                    ? 'bg-muu-deep text-white hover:scale-105 active:scale-95 shadow-muu-deep/10'
                                    : 'bg-muu-cream text-muu-deep/20 cursor-not-allowed shadow-none'
                                    }`}
                            >
                                {member.points >= reward.cost ? 'CANJEAR' : `${(reward.cost - member.points).toLocaleString()} faltan`}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Logout */}
                <button
                    onClick={() => { setStep('phone'); setMember(null); setPhone(''); }}
                    className="text-xs font-bold text-muu-deep/30 hover:text-red-500 underline w-fit mx-auto mt-4 transition-colors"
                >
                    Cambiar número / Salir
                </button>
            </div>
        </div>
    );
};

export default Club;
