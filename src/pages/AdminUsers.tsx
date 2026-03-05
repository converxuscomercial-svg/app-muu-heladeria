import React, { useEffect, useState } from 'react';
import { Loader2, Search, Star, Plus, Minus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ClubMember } from '../lib/types';

const LEVEL_COLORS: Record<string, string> = {
    'Rookie': 'bg-orange-50 text-orange-500',
    'Pro Surf': 'bg-blue-50 text-blue-500',
    'MUU Legend': 'bg-yellow-50 text-yellow-600',
};

const AdminUsers: React.FC = () => {
    const [members, setMembers] = useState<ClubMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [adjustingId, setAdjustingId] = useState<string | null>(null);
    const [pointsDelta, setPointsDelta] = useState<{ [id: string]: number }>({});

    useEffect(() => { fetchMembers(); }, []);

    const fetchMembers = async () => {
        const { data } = await supabase.from('club_members').select('*').order('points', { ascending: false });
        setMembers((data as ClubMember[]) ?? []);
        setLoading(false);
    };

    const adjustPoints = async (member: ClubMember, delta: number) => {
        const newPoints = Math.max(0, member.points + delta);
        await supabase.from('club_members').update({ points: newPoints }).eq('id', member.id);
        setMembers(members.map(m => m.id === member.id ? { ...m, points: newPoints } : m));
        setAdjustingId(null);
    };

    const filtered = members.filter(m =>
        m.phone.includes(search) || (m.name?.toLowerCase().includes(search.toLowerCase()) ?? false)
    );

    if (loading) return <div className="flex items-center justify-center py-32"><Loader2 className="w-8 h-8 text-muu-blue animate-spin" /></div>;

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-display font-black italic uppercase text-muu-deep">MUU Club</h1>
                <p className="text-muu-deep/40 text-sm font-medium mt-1">{members.length} miembros registrados</p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muu-deep/20" />
                <input
                    type="text"
                    placeholder="Buscar por nombre o teléfono..."
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-muu-blue/20 font-medium"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total Miembros', value: members.length },
                    { label: 'Pro Surf +', value: members.filter(m => m.level !== 'Rookie').length },
                    { label: 'Puntos Promedio', value: Math.round(members.reduce((a, m) => a + m.points, 0) / (members.length || 1)) },
                ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
                        <p className="text-2xl font-black text-muu-deep">{s.value.toLocaleString()}</p>
                        <p className="text-[10px] text-muu-deep/40 uppercase font-black tracking-widest mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Members List */}
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                {filtered.length === 0 ? (
                    <p className="text-center py-12 text-muu-deep/30 font-medium">No hay miembros que coincidan</p>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {filtered.map((member, i) => (
                            <div key={member.id} className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
                                <span className="w-6 text-center text-xs font-black text-muu-deep/20">{i + 1}</span>
                                <div className="w-10 h-10 bg-muu-cream rounded-full flex items-center justify-center font-black text-muu-blue text-sm shrink-0">
                                    {member.name ? member.name[0].toUpperCase() : member.phone.slice(-1)}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <p className="font-bold text-sm text-muu-deep">{member.name || '(Sin nombre)'}</p>
                                    <p className="text-[11px] text-muu-deep/40 font-medium">{member.phone}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${LEVEL_COLORS[member.level]}`}>
                                    {member.level}
                                </span>
                                <div className="flex items-center gap-2">
                                    <Star className="w-3.5 h-3.5 text-muu-orange fill-muu-orange" />
                                    <span className="font-black text-muu-deep">{member.points.toLocaleString()}</span>
                                </div>

                                {/* Quick adjust points */}
                                {adjustingId === member.id ? (
                                    <div className="flex items-center gap-1.5">
                                        <button onClick={() => adjustPoints(member, -(pointsDelta[member.id] || 50))} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <input
                                            type="number"
                                            className="w-16 border-2 border-muu-blue/10 rounded-xl py-1 px-2 text-center text-xs font-bold outline-none"
                                            value={pointsDelta[member.id] || 50}
                                            onChange={e => setPointsDelta({ ...pointsDelta, [member.id]: parseInt(e.target.value) || 0 })}
                                        />
                                        <button onClick={() => adjustPoints(member, pointsDelta[member.id] || 50)} className="p-1.5 text-green-500 hover:bg-green-50 rounded-lg transition-colors">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => setAdjustingId(null)} className="text-[10px] text-muu-deep/40 font-bold px-2">✕</button>
                                    </div>
                                ) : (
                                    <button onClick={() => { setAdjustingId(member.id); setPointsDelta({ ...pointsDelta, [member.id]: 50 }); }} className="text-[10px] font-black text-muu-blue hover:underline whitespace-nowrap">
                                        Ajustar
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;
