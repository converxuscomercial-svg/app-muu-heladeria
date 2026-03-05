// ─────────────────────────────────────────
// MUU Heladería — Shared TypeScript Types
// ─────────────────────────────────────────

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    display_order: number;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category_id: string;
    image_url: string;
    is_vegan: boolean;
    is_sugar_free: boolean;
    is_seasonal: boolean;
    is_active: boolean;
    created_at?: string;
}

export interface ClubMember {
    id: string;
    user_id: string;
    phone: string;
    name: string | null;
    points: number;
    level: 'Rookie' | 'Pro Surf' | 'MUU Legend';
    created_at: string;
}

export interface Promo {
    id: string;
    title: string;
    description: string;
    code: string;
    image_url: string;
    expires_at: string;
    type: 'Flash' | 'Club' | 'Weekend';
    is_active: boolean;
    created_at: string;
}

export interface Order {
    id?: string;
    customer_name: string;
    order_type: 'en-mesa' | 'para-llevar' | 'delivery';
    address?: string;
    items: OrderItem[];
    total: number;
    status?: 'pending' | 'confirmed' | 'done';
    created_at?: string;
}

export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface StoreSettings {
    id?: string;
    whatsapp_number: string;
    hours_weekday: string;
    hours_weekend: string;
    address: string;
    instagram: string;
    google_maps_url: string;
}
