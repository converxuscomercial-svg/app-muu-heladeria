import React, { useEffect, useState } from 'react';
import { Plus, Pencil, ToggleLeft, ToggleRight, Loader2, X, Leaf, Snowflake, Droplet } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Product, Category } from '../lib/types';

const AdminProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Product | null>(null);
    const [saving, setSaving] = useState(false);

    const emptyForm: Omit<Product, 'id' | 'created_at'> = {
        name: '', description: '', price: 0, category_id: '',
        image_url: '', is_vegan: false, is_sugar_free: false, is_seasonal: false, is_active: true,
    };
    const [form, setForm] = useState(emptyForm);

    useEffect(() => { fetchAll(); }, []);

    const fetchAll = async () => {
        const { data: cats } = await supabase.from('categories').select('*').order('display_order');
        setCategories((cats as Category[]) ?? []);
        // Get all products including inactive ones for admin
        const { data: allProds } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        setProducts((allProds as Product[]) ?? []);
        setLoading(false);
    };

    const openCreate = () => {
        setEditing(null);
        setForm(emptyForm);
        setShowForm(true);
    };

    const openEdit = (p: Product) => {
        setEditing(p);
        setForm({ name: p.name, description: p.description, price: p.price, category_id: p.category_id, image_url: p.image_url, is_vegan: p.is_vegan, is_sugar_free: p.is_sugar_free, is_seasonal: p.is_seasonal, is_active: p.is_active });
        setShowForm(true);
    };

    const handleSave = async () => {
        if (!form.name || !form.price || !form.category_id) return;
        setSaving(true);
        if (editing) {
            await supabase.from('products').update(form).eq('id', editing.id);
        } else {
            await supabase.from('products').insert(form);
        }
        setShowForm(false);
        setSaving(false);
        fetchAll();
    };

    const toggleActive = async (p: Product) => {
        await supabase.from('products').update({ is_active: !p.is_active }).eq('id', p.id);
        setProducts(products.map(pr => pr.id === p.id ? { ...pr, is_active: !pr.is_active } : pr));
    };

    if (loading) return (
        <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 text-muu-blue animate-spin" />
        </div>
    );

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-black italic uppercase text-muu-deep">Productos</h1>
                    <p className="text-muu-deep/40 text-sm font-medium mt-1">{products.length} productos en total</p>
                </div>
                <button onClick={openCreate} className="muu-button-primary flex items-center gap-2 py-3 px-6 text-sm">
                    <Plus className="w-4 h-4" /> Nuevo Producto
                </button>
            </div>

            {/* Modal Form */}
            {showForm && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-lg flex flex-col gap-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-display font-black italic uppercase text-muu-deep">
                                {editing ? 'Editar' : 'Nuevo'} Producto
                            </h2>
                            <button onClick={() => setShowForm(false)} className="p-2 rounded-full hover:bg-gray-100">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 flex flex-col gap-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muu-orange">Nombre *</label>
                                <input className="border-2 border-gray-100 rounded-2xl py-3 px-4 outline-none focus:border-muu-blue/30 font-medium" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ej: Surf Bowl" />
                            </div>
                            <div className="col-span-2 flex flex-col gap-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muu-orange">Descripción</label>
                                <textarea className="border-2 border-gray-100 rounded-2xl py-3 px-4 outline-none focus:border-muu-blue/30 h-20 resize-none font-medium" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="..." />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muu-orange">Precio * ($)</label>
                                <input type="number" className="border-2 border-gray-100 rounded-2xl py-3 px-4 outline-none focus:border-muu-blue/30 font-bold" value={form.price || ''} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} placeholder="0" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muu-orange">Categoría *</label>
                                <select className="border-2 border-gray-100 rounded-2xl py-3 px-4 outline-none focus:border-muu-blue/30 font-medium" value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}>
                                    <option value="">Seleccionar...</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="col-span-2 flex flex-col gap-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muu-orange">URL de Imagen</label>
                                <input className="border-2 border-gray-100 rounded-2xl py-3 px-4 outline-none focus:border-muu-blue/30 font-medium" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
                            </div>
                            <div className="col-span-2 flex gap-4 flex-wrap">
                                {[
                                    { key: 'is_vegan', label: '🌱 Vegano' },
                                    { key: 'is_sugar_free', label: '💧 Sin Azúcar' },
                                    { key: 'is_seasonal', label: '⭐ Temporal' },
                                    { key: 'is_active', label: '✅ Activo' },
                                ].map(f => (
                                    <label key={f.key} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={form[f.key as keyof typeof form] as boolean} onChange={e => setForm({ ...form, [f.key]: e.target.checked })} className="w-4 h-4 accent-muu-blue" />
                                        <span className="text-xs font-bold">{f.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button onClick={handleSave} disabled={saving || !form.name || !form.category_id} className="muu-button-primary w-full py-4 flex items-center justify-center gap-2">
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            {saving ? 'Guardando...' : editing ? 'Actualizar Producto' : 'Crear Producto'}
                        </button>
                    </div>
                </div>
            )}

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="divide-y divide-gray-50">
                    {products.map(product => (
                        <div key={product.id} className={`flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors ${!product.is_active ? 'opacity-40' : ''}`}>
                            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-muu-cream shrink-0">
                                <img src={product.image_url || 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=200'} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-black text-muu-deep uppercase italic text-sm">{product.name}</h4>
                                    {product.is_vegan && <Leaf className="w-3 h-3 text-green-500" />}
                                    {product.is_sugar_free && <Droplet className="w-3 h-3 text-blue-500" />}
                                    {product.is_seasonal && <Snowflake className="w-3 h-3 text-muu-orange" />}
                                </div>
                                <p className="text-[11px] text-muu-deep/40 truncate font-medium">{product.description}</p>
                            </div>
                            <span className="font-black text-muu-blue shrink-0">${product.price}</span>
                            <div className="flex items-center gap-2 shrink-0">
                                <button onClick={() => openEdit(product)} className="p-2 text-muu-deep/40 hover:text-muu-blue rounded-xl hover:bg-muu-blue/5 transition-all">
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button onClick={() => toggleActive(product)} className={`p-2 rounded-xl transition-all ${product.is_active ? 'text-green-500 hover:bg-green-50' : 'text-gray-300 hover:bg-gray-50'}`}>
                                    {product.is_active ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
