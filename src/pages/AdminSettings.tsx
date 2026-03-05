import React, { useEffect, useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { StoreSettings } from '../lib/types';

const DEFAULT_SETTINGS: StoreSettings = {
    whatsapp_number: '5219541234567',
    hours_weekday: '12:00 PM — 10:00 PM',
    hours_weekend: '11:00 AM — 11:00 PM',
    address: 'Calle Alejandro Cárdenas Peralta, La Punta, Zicatela.',
    instagram: 'muu.mex',
    google_maps_url: '',
};

const AdminSettings: React.FC = () => {
    const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [settingsId, setSettingsId] = useState<string | null>(null);

    useEffect(() => { fetchSettings(); }, []);

    const fetchSettings = async () => {
        const { data } = await supabase.from('store_settings').select('*').limit(1).single();
        if (data) {
            setSettingsId(data.id);
            setSettings(data as StoreSettings);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        const payload = { ...settings, updated_at: new Date().toISOString() };
        if (settingsId) {
            await supabase.from('store_settings').update(payload).eq('id', settingsId);
        } else {
            const { data } = await supabase.from('store_settings').insert(payload).select().single();
            if (data) setSettingsId(data.id);
        }
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    if (loading) return <div className="flex items-center justify-center py-32"><Loader2 className="w-8 h-8 text-muu-blue animate-spin" /></div>;

    const fields: { key: keyof StoreSettings; label: string; placeholder: string; type?: string }[] = [
        { key: 'whatsapp_number', label: 'Número WhatsApp (con código de país)', placeholder: '5219541234567' },
        { key: 'hours_weekday', label: 'Horario Semanal (Lun-Vie)', placeholder: '12:00 PM — 10:00 PM' },
        { key: 'hours_weekend', label: 'Horario Fin de Semana', placeholder: '11:00 AM — 11:00 PM' },
        { key: 'address', label: 'Dirección', placeholder: 'Calle, colonia, ciudad...' },
        { key: 'instagram', label: 'Instagram (sin @)', placeholder: 'muu.mex' },
        { key: 'google_maps_url', label: 'URL de Google Maps', placeholder: 'https://maps.google.com/...' },
    ];

    return (
        <div className="flex flex-col gap-8 max-w-2xl">
            <div>
                <h1 className="text-3xl font-display font-black italic uppercase text-muu-deep">Configuración</h1>
                <p className="text-muu-deep/40 text-sm font-medium mt-1">Datos de la tienda MUU Heladería</p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">
                {fields.map(field => (
                    <div key={field.key} className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muu-orange">{field.label}</label>
                        <input
                            type={field.type || 'text'}
                            className="border-2 border-gray-100 rounded-2xl py-3 px-4 outline-none focus:border-muu-blue/30 font-medium transition-colors"
                            value={settings[field.key] as string || ''}
                            onChange={e => setSettings({ ...settings, [field.key]: e.target.value })}
                            placeholder={field.placeholder}
                        />
                    </div>
                ))}

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`muu-button-primary w-full py-4 flex items-center justify-center gap-3 mt-2 transition-all ${saved ? 'bg-green-500' : ''}`}
                >
                    {saving ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Guardando...</>
                    ) : saved ? (
                        <>✅ ¡Configuración guardada!</>
                    ) : (
                        <><Save className="w-5 h-5" /> Guardar Configuración</>
                    )}
                </button>
            </div>

            {/* Quick preview */}
            <div className="bg-muu-cream/50 rounded-3xl p-6 border-2 border-muu-blue/5">
                <h3 className="text-sm font-black uppercase tracking-widest text-muu-orange mb-4">Vista previa</h3>
                <div className="flex flex-col gap-2 text-sm font-medium opacity-70">
                    <p>📍 {settings.address}</p>
                    <p>⏰ L-V: {settings.hours_weekday} | Fin de semana: {settings.hours_weekend}</p>
                    <p>📱 WhatsApp: +{settings.whatsapp_number}</p>
                    <p>📷 Instagram: @{settings.instagram}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
