import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Zap, Calendar, Copy, Check, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Promo } from '../lib/types';

const FALLBACK_PROMOS: Promo[] = [
    {
        id: '1',
        title: '2x1 en Helados Clásicos',
        description: 'Solo hoy martes en La Punta. Menciona este código en caja.',
        code: 'MARTESMUU',
        image_url: 'https://images.unsplash.com/photo-1516559828984-fb3b923c5750?q=80&w=1000&auto=format&fit=crop',
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'Flash',
        is_active: true,
        created_at: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Puntos Dobles en Bowls',
        description: 'En todos tus pedidos de Bowls durante este fin de semana.',
        code: 'BOWLPOWER',
        image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop',
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'Club',
        is_active: true,
        created_at: new Date().toISOString(),
    },
];

const Promos: React.FC = () => {
    const [promos, setPromos] = useState<Promo[]>([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        fetchPromos();
    }, []);

    const fetchPromos = async () => {
        try {
            const { data } = await supabase
                .from('promos')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false });

            setPromos(data && data.length > 0 ? (data as Promo[]) : FALLBACK_PROMOS);
        } catch {
            setPromos(FALLBACK_PROMOS);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code).catch(() => { });
        setCopied(code);
        setTimeout(() => setCopied(null), 2000);
    };

    const formatExpiry = (dateStr: string): string => {
        const d = new Date(dateStr);
        const now = new Date();
        const diffMs = d.getTime() - now.getTime();
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays <= 0) return 'Expirado';
        if (diffDays === 1) return 'Hoy';
        if (diffDays <= 7) return `${diffDays} días`;
        return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="w-12 h-12 text-muu-blue animate-spin" />
            <p className="font-black text-muu-blue uppercase tracking-widest text-xs">Cargando promos...</p>
        </div>
    );

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
                <span className="text-muu-orange font-black uppercase tracking-widest text-xs">Ofertas Exclusivas</span>
                <h1 className="text-5xl font-display font-black italic uppercase text-muu-deep tracking-tighter leading-none">
                    Promos <span className="text-muu-blue">MUU</span>
                </h1>
                <p className="opacity-60 font-medium text-lg">Solo para los locales y amigos de la App MUU.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {promos.map((promo, i) => (
                    <motion.div
                        key={promo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="muu-card p-0 overflow-hidden flex flex-col group"
                    >
                        <div className="relative h-52 overflow-hidden">
                            <img
                                src={promo.image_url || 'https://images.unsplash.com/photo-1516559828984-fb3b923c5750?q=80&w=1000&auto=format&fit=crop'}
                                alt={promo.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                                {promo.type === 'Flash'
                                    ? <Zap className="w-4 h-4 text-muu-orange fill-muu-orange" />
                                    : <Gift className="w-4 h-4 text-muu-blue" />}
                                <span className="text-[10px] font-black uppercase tracking-widest">{promo.type}</span>
                            </div>
                        </div>

                        <div className="p-7 flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <h2 className="text-2xl font-display font-black italic uppercase text-muu-deep tracking-tighter leading-tight">
                                    {promo.title}
                                </h2>
                                <p className="text-sm opacity-60 leading-relaxed font-medium">{promo.description}</p>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-muu-cream rounded-2xl border border-muu-blue/5">
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase font-black opacity-30 tracking-widest">Código</span>
                                    <span className="text-2xl font-display font-black italic text-muu-blue tracking-tighter">{promo.code}</span>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(promo.code)}
                                    className={`p-3 rounded-2xl transition-all ${copied === promo.code
                                        ? 'bg-green-500 text-white scale-95'
                                        : 'bg-white text-muu-blue hover:shadow-md border border-muu-blue/5'
                                        }`}
                                >
                                    {copied === promo.code ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-bold text-muu-orange/80 uppercase tracking-widest">
                                <Calendar className="w-3.5 h-3.5" />
                                Vence: {formatExpiry(promo.expires_at)}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CTA Card */}
            <div className="muu-card bg-muu-blue p-10 flex flex-col items-center text-center gap-6 text-white rounded-[3rem] relative overflow-hidden border-0">
                <div className="cow-print absolute inset-0 opacity-10 pointer-events-none" />
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center relative z-10">
                    <Gift className="w-8 h-8 text-muu-orange" />
                </div>
                <div className="flex flex-col gap-2 relative z-10">
                    <h3 className="text-3xl font-display font-black italic uppercase tracking-tighter">
                        ¿Tienes un código físico?
                    </h3>
                    <p className="opacity-70 text-base font-medium leading-relaxed max-w-xs">
                        Canjéalo en tu perfil del MUU Club para sumar puntos o redimir premios.
                    </p>
                </div>
                <a href="/club" className="relative z-10 bg-white text-muu-blue px-12 py-4 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95">
                    Ir a mi Perfil
                </a>
            </div>
        </div>
    );
};

export default Promos;
