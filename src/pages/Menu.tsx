import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Info, Leaf, Soup, Star } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { supabase } from '../lib/supabase';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category_id: string;
    image_url: string;
    is_vegan: boolean;
    is_sugar_free: boolean;
    is_seasonal: boolean;
}

interface Category {
    id: string;
    name: string;
    slug: string;
}

const Menu: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const addItem = useCartStore((state) => state.addItem);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data: catData } = await supabase.from('categories').select('*').order('display_order');
            const { data: prodData } = await supabase.from('products').select('*');

            if (catData) setCategories(catData);
            if (prodData) setProducts(prodData);
        } catch (error) {
            console.error('Error fetching menu:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        const categorySlug = categories.find(c => c.id === p.category_id)?.slug;
        const matchesCategory = activeCategory === 'all' || categorySlug === activeCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-16 h-16 border-4 border-muu-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="font-black text-muu-blue uppercase tracking-widest text-xs">Cargando la frescura...</p>
        </div>
    );

    return (
        <div className="flex flex-col gap-10">
            {/* Header */}
            <header className="flex flex-col gap-4">
                <h1 className="text-6xl font-display font-black italic uppercase text-muu-deep tracking-tighter leading-none">
                    EL <span className="text-muu-blue text-7xl">MENÚ</span>
                </h1>
                <p className="text-lg font-bold opacity-50 px-1 italic">TÚ.. YO.. MUU..</p>
            </header>

            {/* Sticky Search & Categories */}
            <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl py-4 -mx-6 px-6 flex flex-col gap-6">
                <div className="relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muu-deep/30 group-focus-within:text-muu-blue transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar sabor, bowl o antojo..."
                        className="w-full bg-muu-cream/50 border-4 border-muu-blue/5 rounded-3xl py-5 pl-16 pr-6 focus:border-muu-blue/20 focus:bg-white outline-none transition-all font-bold text-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border-2 ${activeCategory === 'all'
                                ? 'bg-muu-blue text-white border-muu-blue shadow-lg shadow-muu-blue/20'
                                : 'bg-white text-muu-deep/40 border-muu-blue/5 hover:border-muu-blue/20'
                            }`}
                    >
                        Todos
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.slug)}
                            className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border-2 ${activeCategory === cat.slug
                                    ? 'bg-muu-blue text-white border-muu-blue shadow-lg shadow-muu-blue/20'
                                    : 'bg-white text-muu-deep/40 border-muu-blue/5 hover:border-muu-blue/20'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                <AnimatePresence mode='popLayout'>
                    {filteredProducts.map((product) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={product.id}
                            className="muu-card p-0 flex flex-col sm:flex-row overflow-hidden border-4 border-muu-blue/5 hover:border-muu-blue/20 transition-all bg-muu-cream/10"
                        >
                            <div className="w-full sm:w-48 aspect-square bg-muu-cream relative overflow-hidden shrink-0">
                                <img
                                    src={product.image_url || "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=1000"}
                                    alt={product.name}
                                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all"
                                />
                                {product.is_seasonal && (
                                    <div className="absolute top-3 left-3 bg-muu-orange text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-lg">
                                        <Star className="w-2.5 h-2.5 fill-white" /> Seasonal
                                    </div>
                                )}
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-start gap-2 mb-2">
                                    <h3 className="text-2xl font-black italic uppercase text-muu-deep leading-tight">{product.name}</h3>
                                    <span className="text-xl font-black text-muu-blue font-display shrink-0">${product.price}</span>
                                </div>
                                <p className="text-xs font-medium opacity-50 flex-grow line-clamp-2 mb-4 leading-relaxed">
                                    {product.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {product.is_vegan && (
                                        <span className="flex items-center gap-1 text-[8px] font-black uppercase text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-100">
                                            <Leaf className="w-2.5 h-2.5" /> Vegan
                                        </span>
                                    )}
                                    {product.is_sugar_free && (
                                        <span className="flex items-center gap-1 text-[8px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                                            <Soup className="w-2.5 h-2.5" /> Sin Azúcar
                                        </span>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => addItem({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            quantity: 1,
                                            image: product.image_url
                                        })}
                                        className="flex-grow muu-button-primary py-3.5 text-[10px] font-black flex items-center justify-center gap-2 uppercase tracking-widest shadow-xl shadow-muu-blue/10"
                                    >
                                        <Plus className="w-4 h-4" /> Agregar
                                    </button>
                                    <button className="bg-muu-cream p-3.5 rounded-2xl text-muu-deep/40 hover:text-muu-blue transition-colors border-2 border-muu-blue/5">
                                        <Info className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20 opacity-30 flex flex-col items-center gap-4">
                    <Compass className="w-16 h-16" />
                    <p className="font-black uppercase tracking-widest text-xs">No encontramos nada tan frío por aquí...</p>
                </div>
            )}
        </div>
    );
};

export default Menu;
