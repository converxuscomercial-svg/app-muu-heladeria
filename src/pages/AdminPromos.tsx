import React, { useEffect, useState } from 'react';
import { Plus, Pencil, ToggleRight, ToggleLeft, Loader2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Promo } from '../lib/types';

const AdminPromos: React.FC = () => {
    const [promos, setPromos] = useState<Promo[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Promo | null>(null);
    const [saving, setSaving] = useState(false);

    const emptyForm = { title: '', description: '', code: '', image_url: '', expires_at: '', type: 'Flash' as Promo['type'], is_active: true };
    const [form, setForm] = useState(emptyForm);

    useEffect(() => { fetchPromos(); }, []);

    const fetchPromos = async () => {
        const { data } = await supabase.from('promos').select('*').order('created_at', { ascending: false });
        setPromos((data as Promo[]) ?? []);
        setLoading(false);
    };

    const openCreate = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
    const openEdit = (p: Promo) => {
        setEditing(p);
        const expDate = p.expires_at ? new Date(p.expires_at).toISOString().split('T')[0] : '';
        setForm({ title: p.title, description: p.description, code: p.code, image_url: p.image_url, expires_at: expDate, type: p.type, is_active: p.is_active });
        setShowForm(true);
    };

    const handleSave = async () => {
        if (!form.title || !form.code) return;
        setSaving(true);
        const payload = { ...form, expires_at: form.expires_at ? new Date(form.expires_at).toISOString() : null };
        if (editing) {
            await supabase.from('promos').update(payload).eq('id', editing.id);
        } else {
            await supabase.from('promos').insert(payload);
        }
        setShowForm(false); setSaving(false); fetchPromos();
    };

    const toggleActive = async (p: Promo) => {
        await supabase.from('promos').update({ is_active: !p.is_active }).eq('id', p.id);
        setPromos(promos.map(pr => pr.id === p.id ? { ...pr, is_active: !pr.is_active } : pr));
    };

    if (loading) return <div className="flex items-center justify-center py-32"><Loader2 className="w-8 h-8 text-muu-blue animate-spin" /></div>;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-black italic uppercase text-muu-deep">Promos</h1>
                    <p className="text-muu-deep/40 text-sm font-medium mt-1">{promos.filter(p => p.is_active).length} activas</p>
                </div>
                <button onClick={openCreate} className="muu-button-primary flex items-center gap-2 py-3 px-6 text-sm">
                    <Plus className="w-4 h-4" /> Nueva Promo
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-lg flex flex-col gap-5 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-display font-black italic uppercase text-muu-deep">{editing ? 'Editar' : 'Nueva'} Promo</h2>
                            <button onClick={() => setShowForm(false)} className="p-2 rounded-full hover:bg-gray-100"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="flex flex-col gap-4">
                            {[
                                { key: 'title', label: 'Título *', placeholder: 'Ej: 2x1 en Helados' },
                                { key: 'description', label: 'Descripción', placeholder: 'Detalle de la promo...' },
                                { key: 'code', label: 'Código *', placeholder: 'MARTESMUU' },
                                { key: 'image_url', label: 'URL Imagen', placeholder: 'https://...' },
                            ].map(f => (
                                <div key={f.key} className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muu-orange">{f.label}</label>
                                    <input className="border-2 border-gray-100 rounded-2xl py-3 px-4 outline-none focus:border-muu-blue/30 font-medium" value={form[f.key as keyof typeof form] as string} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} />
                                </div>
                            ))}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muu-orange">Vence</label>
                                    <input type="date" className="border-2 border-gray-100 rounded-2xl py-3 px-4 outline-none focus:border-muu-blue/30 font-medium" value={form.expires_at} onChange={e => setForm({ ...form, expires_at: e.target.value })} />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muu-orange">Tipo</label>
                                    <select className="border-2 border-gray-100 rounded-2xl py-3 px-4 outline-none focus:border-muu-blue/30 font-medium" value={form.type} onChange={e => setForm({ ...form, type: e.target.value as Promo['type'] })}>
                                        {['Flash', 'Club', 'Weekend'].map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 accent-muu-blue" />
                                <span className="text-sm font-bold">Promo activa</span>
                            </label>
                        </div>
                        <button onClick={handleSave} disabled={saving} className="muu-button-primary w-full py-4 flex items-center justify-center gap-2">
                            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                            {saving ? 'Guardando...' : editing ? 'Actualizar' : 'Crear Promo'}
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="divide-y divide-gray-50">
                    {promos.map(promo => (
                        <div key={promo.id} className={`flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors ${!promo.is_active ? 'opacity-40' : ''}`}>
                            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-muu-cream shrink-0">
                                <img src={promo.image_url || 'https://images.unsplash.com/photo-1516559828984-fb3b923c5750?q=80&w=200'} alt={promo.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow min-w-0">
                                <h4 className="font-black text-muu-deep italic uppercase text-sm">{promo.title}</h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-muu-blue font-black text-xs">{promo.code}</span>
                                    <span className="text-[10px] text-muu-deep/30 uppercase font-bold">· {promo.type}</span>
                                </div>
                            </div>
                            {promo.expires_at && (
                                <span className="text-xs text-muu-deep/40 font-bold shrink-0">{new Date(promo.expires_at).toLocaleDateString('es-MX')}</span>
                            )}
                            <div className="flex items-center gap-2 shrink-0">
                                <button onClick={() => openEdit(promo)} className="p-2 text-muu-deep/40 hover:text-muu-blue rounded-xl hover:bg-muu-blue/5">
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button onClick={() => toggleActive(promo)} className={`p-2 rounded-xl ${promo.is_active ? 'text-green-500 hover:bg-green-50' : 'text-gray-300'}`}>
                                    {promo.is_active ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPromos;
