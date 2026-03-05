-- ════════════════════════════════════════════════════════════════
--  MUU HELADERÍA — SUPABASE MIGRATION v1.0
--  Run this in: Supabase Dashboard → SQL Editor → New query
-- ════════════════════════════════════════════════════════════════

-- ─── CATEGORIES ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.categories (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name            text NOT NULL,
    slug            text NOT NULL UNIQUE,
    description     text DEFAULT '',
    display_order   int  DEFAULT 0,
    created_at      timestamptz DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read categories" ON public.categories
    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin manage categories" ON public.categories
    FOR ALL TO authenticated USING (auth.role() = 'authenticated');

-- ─── PRODUCTS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.products (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name            text NOT NULL,
    description     text DEFAULT '',
    price           numeric(10,2) NOT NULL,
    category_id     uuid REFERENCES public.categories(id) ON DELETE SET NULL,
    image_url       text DEFAULT '',
    is_vegan        boolean DEFAULT false,
    is_sugar_free   boolean DEFAULT false,
    is_seasonal     boolean DEFAULT false,
    is_active       boolean DEFAULT true,
    created_at      timestamptz DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active products" ON public.products
    FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Admin manage products" ON public.products
    FOR ALL TO authenticated USING (auth.role() = 'authenticated');

-- ─── PROMOS ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.promos (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title           text NOT NULL,
    description     text DEFAULT '',
    code            text NOT NULL UNIQUE,
    image_url       text DEFAULT '',
    expires_at      timestamptz,
    type            text DEFAULT 'Flash' CHECK (type IN ('Flash', 'Club', 'Weekend')),
    is_active       boolean DEFAULT true,
    created_at      timestamptz DEFAULT now()
);

ALTER TABLE public.promos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active promos" ON public.promos
    FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Admin manage promos" ON public.promos
    FOR ALL TO authenticated USING (auth.role() = 'authenticated');

-- ─── CLUB MEMBERS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.club_members (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    phone           text NOT NULL UNIQUE,
    name            text,
    points          int  DEFAULT 0,
    level           text DEFAULT 'Rookie' CHECK (level IN ('Rookie', 'Pro Surf', 'MUU Legend')),
    created_at      timestamptz DEFAULT now(),
    updated_at      timestamptz DEFAULT now()
);

ALTER TABLE public.club_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read own member" ON public.club_members
    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert member" ON public.club_members
    FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admin manage members" ON public.club_members
    FOR ALL TO authenticated USING (auth.role() = 'authenticated');

-- Function to auto-update level based on points
CREATE OR REPLACE FUNCTION update_member_level()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.points >= 3000 THEN
        NEW.level := 'MUU Legend';
    ELSIF NEW.points >= 1000 THEN
        NEW.level := 'Pro Surf';
    ELSE
        NEW.level := 'Rookie';
    END IF;
    NEW.updated_at := now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_member_level ON public.club_members;
CREATE TRIGGER trg_update_member_level
    BEFORE INSERT OR UPDATE ON public.club_members
    FOR EACH ROW EXECUTE FUNCTION update_member_level();

-- ─── ORDERS ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name   text NOT NULL,
    order_type      text NOT NULL CHECK (order_type IN ('en-mesa', 'para-llevar', 'delivery')),
    address         text,
    items           jsonb NOT NULL DEFAULT '[]',
    total           numeric(10,2) NOT NULL,
    status          text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'done')),
    created_at      timestamptz DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert orders" ON public.orders
    FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admin read orders" ON public.orders
    FOR SELECT TO authenticated USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update orders" ON public.orders
    FOR UPDATE TO authenticated USING (auth.role() = 'authenticated');

-- ─── STORE SETTINGS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.store_settings (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    whatsapp_number     text DEFAULT '5219541234567',
    hours_weekday       text DEFAULT '12:00 PM — 10:00 PM',
    hours_weekend       text DEFAULT '11:00 AM — 11:00 PM',
    address             text DEFAULT 'Calle Alejandro Cárdenas Peralta, La Punta, Zicatela.',
    instagram           text DEFAULT 'muu.mex',
    google_maps_url     text DEFAULT '',
    updated_at          timestamptz DEFAULT now()
);

ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read settings" ON public.store_settings
    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin manage settings" ON public.store_settings
    FOR ALL TO authenticated USING (auth.role() = 'authenticated');

-- Insert default settings row
INSERT INTO public.store_settings (whatsapp_number, address)
VALUES ('5219541234567', 'Calle Alejandro Cárdenas Peralta, La Punta, Zicatela.')
ON CONFLICT DO NOTHING;

-- ─── SEED DATA ──────────────────────────────────────────────────

-- Categories
INSERT INTO public.categories (name, slug, description, display_order) VALUES
    ('Helados', 'icecream', 'Nuestras famosas bolas de helado artesanal.', 1),
    ('Bowls', 'bowls', 'Tropicales, frescos y llenos de energía.', 2),
    ('Bebidas', 'drinks', 'Malteadas y refrescos naturales.', 3),
    ('Waffles', 'waffles', 'Waffles crujientes con toppings premium.', 4)
ON CONFLICT (slug) DO NOTHING;

-- Products (using subqueries for category_id)
INSERT INTO public.products (category_id, name, description, price, is_seasonal, is_vegan, is_sugar_free, image_url) VALUES

-- Helados
((SELECT id FROM categories WHERE slug = 'icecream' LIMIT 1),
 'MUU Coco Loco', 'Helado artesanal de coco fresco, cremoso y natural.', 65, false, true, false,
 'https://images.unsplash.com/photo-1557142046-c704a3adf364?auto=format&fit=crop&q=80&w=800'),

((SELECT id FROM categories WHERE slug = 'icecream' LIMIT 1),
 'Double Cow', 'Vainilla y chocolate con trozos de brownie y fudge caliente.', 85, false, false, false,
 'https://images.unsplash.com/photo-1587563871167-1ee9c2e5a8f9?auto=format&fit=crop&q=80&w=800'),

((SELECT id FROM categories WHERE slug = 'icecream' LIMIT 1),
 'MUU Clásico', 'Una bola perfecta de helado de vainilla artesanal con cono crujiente.', 55, false, false, false,
 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&q=80&w=800'),

((SELECT id FROM categories WHERE slug = 'icecream' LIMIT 1),
 'Choco MUU Intenso', 'Helado de chocolate oscuro belga con chips de cacao.', 75, false, true, false,
 'https://images.unsplash.com/photo-1514849302-984523450cf4?auto=format&fit=crop&q=80&w=800'),

((SELECT id FROM categories WHERE slug = 'icecream' LIMIT 1),
 'Mango Sunset', 'Sorbete de mango Ataulfo 100% natural, ideal para el calor.', 65, true, true, true,
 'https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&q=80&w=800'),

-- Bowls
((SELECT id FROM categories WHERE slug = 'bowls' LIMIT 1),
 'Surf Bowl', 'Base de acai con granola artesanal, plátano y fresas frescas.', 115, false, true, false,
 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&q=80&w=800'),

((SELECT id FROM categories WHERE slug = 'bowls' LIMIT 1),
 'Bowl Zicatela', 'Frutas tropicales frescas con miel de agave y semillas de chía.', 95, true, true, true,
 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&q=80&w=800'),

((SELECT id FROM categories WHERE slug = 'bowls' LIMIT 1),
 'MUU Power Bowl', 'Proteína vegana, açaí, granola premium y frutas del mar.', 125, false, true, false,
 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'),

-- Bebidas
((SELECT id FROM categories WHERE slug = 'drinks' LIMIT 1),
 'MUU-Shake', 'Malteada cremosa con helado artesanal, waffles y toppings.', 95, false, false, false,
 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&q=80&w=800'),

((SELECT id FROM categories WHERE slug = 'drinks' LIMIT 1),
 'Limonada de Coco', 'Limonada fresca con agua de coco y menta. Refrescante total.', 55, true, true, false,
 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=800'),

-- Waffles
((SELECT id FROM categories WHERE slug = 'waffles' LIMIT 1),
 'Waffle Playero', 'Waffle belga con helado, frutas tropicales y miel de agave.', 105, false, false, false,
 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=800'),

((SELECT id FROM categories WHERE slug = 'waffles' LIMIT 1),
 'Waffle Choco-MUU', 'Waffle con doble helado de chocolate, granola y chispas.', 115, false, false, false,
 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=800')

ON CONFLICT DO NOTHING;

-- Promos
INSERT INTO public.promos (title, description, code, image_url, expires_at, type, is_active) VALUES
    (
        '2x1 en Helados Clásicos',
        'Solo hoy martes en La Punta. Menciona este código en caja y llévate dos por el precio de uno.',
        'MARTESMUU',
        'https://images.unsplash.com/photo-1516559828984-fb3b923c5750?q=80&w=1000&auto=format&fit=crop',
        now() + interval '30 days',
        'Flash',
        true
    ),
    (
        'Puntos Dobles en Bowls',
        'En todos tus pedidos de Bowls durante este fin de semana. Acumula el doble de puntos MUU.',
        'BOWLPOWER',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop',
        now() + interval '7 days',
        'Club',
        true
    ),
    (
        'Bienvenida MUU Club',
        'Por registrarte en el MUU Club, te regalamos 100 puntos de bienvenida. ¡Úsalos en tu próxima visita!',
        'WELCOME100',
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop',
        now() + interval '90 days',
        'Club',
        true
    )
ON CONFLICT (code) DO NOTHING;

-- ════════════════════════════════════════════════════════════════
-- ✅ Migration complete!
-- Tables created: categories, products, promos, club_members, orders, store_settings
-- Seed data inserted: 4 categories, 12 products, 3 promos, 1 settings row
-- ════════════════════════════════════════════════════════════════
