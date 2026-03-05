import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Zap, Calendar, Copy, Check } from 'lucide-react';

const PROMOS = [
    {
        id: '1',
        title: '2x1 en Helados Clásicos',
        description: 'Solo hoy martes en La Punta. Menciona este código en caja.',
        code: 'MARTESMUU',
        image: 'https://images.unsplash.com/photo-1516559828984-fb3b923c5750?q=80&w=1000&auto=format&fit=crop',
        expires: 'Hoy',
        type: 'Flash'
    },
    {
        id: '2',
        title: 'Acumula Puntos Dobles',
        description: 'En todos tus pedidos de Bowls durante este fin de semana.',
        code: 'BOWLPOWER',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop',
        expires: 'Dom, 10 Mar',
        type: 'Club'
    },
];

const Promos: React.FC = () => {
    const [copied, setCopied] = React.useState<string | null>(null);

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(code);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-display font-black italic uppercase text-muu-deep tracking-tighter">
                    Promos <span className="text-muu-blue">Exclusivas</span>
                </h1>
                <p className="opacity-60 font-medium">Solo para los locales y amigos de la App MUU.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PROMOS.map((promo) => (
                    <motion.div
                        key={promo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="muu-card p-0 overflow-hidden flex flex-col group"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={promo.image}
                                alt={promo.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                                {promo.type === 'Flash' ? <Zap className="w-4 h-4 text-muu-orange fill-muu-orange" /> : <Gift className="w-4 h-4 text-muu-blue" />}
                                <span className="text-[10px] font-black uppercase tracking-widest">{promo.type}</span>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-bold">{promo.title}</h2>
                                <p className="text-sm opacity-60 leading-relaxed font-medium">{promo.description}</p>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-muu-cream rounded-2xl border border-muu-blue/5">
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase font-black opacity-30 tracking-widest">Código</span>
                                    <span className="text-xl font-display font-black italic text-muu-blue tracking-tighter">{promo.code}</span>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(promo.code)}
                                    className={`p-3 rounded-xl transition-all ${copied === promo.code ? 'bg-green-500 text-white' : 'bg-white text-muu-blue hover:shadow-md'
                                        }`}
                                >
                                    {copied === promo.code ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-bold text-muu-orange/80 uppercase tracking-widest">
                                <Calendar className="w-3.5 h-3.5" />
                                Vence: {promo.expires}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bonus Card */}
            <div className="muu-card bg-muu-blue p-8 flex flex-col items-center text-center gap-4 text-white">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                    <Gift className="w-8 h-8 text-muu-orange" />
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-display font-bold italic uppercase">¿Tienes un código físico?</h3>
                    <p className="opacity-80 text-sm">Canjéalo directamente en tu perfil del MUU Club para sumar puntos o redimir premios.</p>
                </div>
                <button className="muu-button-secondary bg-white text-muu-blue w-full max-w-xs">
                    Ir a mi perfil
                </button>
            </div>
        </div>
    );
};

export default Promos;
