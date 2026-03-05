import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Info, Leaf, Soup } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const CATEGORIES = [
    { id: 'icecream', name: 'Helados', icon: '🍦' },
    { id: 'bowls', name: 'Bowls', icon: '🥣' },
    { id: 'specials', name: 'Especiales', icon: '✨' },
    { id: 'seasonal', name: 'Temporada', icon: '🌴' },
    { id: 'toppings', name: 'Toppings', icon: '🥜' },
];

const PRODUCTS = [
    {
        id: '1',
        name: 'MUU Clásico',
        description: 'Nuestra firma. Vainilla de Papantla con toppings de chocolate amargo.',
        price: 75,
        category: 'icecream',
        tags: ['vegano'],
        image: 'https://images.unsplash.com/photo-1501443762994-82bd5dabb89a?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: '2',
        name: 'Bowl Acai La Punta',
        description: 'Base de acai orgánico, granola artesanal y frutas de temporada.',
        price: 120,
        category: 'bowls',
        tags: ['sin-azucar'],
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: '3',
        name: 'MUU Coco Loco',
        description: 'Helado de coco real servido en medio coco con ralladura fresca.',
        price: 95,
        category: 'icecream',
        tags: ['vegano', 'sin-gluten'],
        image: 'https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: '4',
        name: 'Choco-MUU',
        description: 'Chocolate 70% cacao de Oaxaca con trozos de avellana.',
        price: 85,
        category: 'icecream',
        tags: [],
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000&auto=format&fit=crop',
    },
];

const Menu: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('icecream');
    const [searchQuery, setSearchQuery] = useState('');
    const addItem = useCartStore((state) => state.addItem);

    const filteredProducts = PRODUCTS.filter(p =>
        (activeCategory === 'all' || p.category === activeCategory) &&
        (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="flex flex-col gap-8">
            {/* Header & Search */}
            <div className="flex flex-col gap-4">
                <h1 className="text-5xl font-display font-black italic uppercase text-muu-deep tracking-tighter">
                    Nuestro <span className="text-muu-blue">Menú</span>
                </h1>
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muu-deep/30 group-focus-within:text-muu-blue transition-colors" />
                    <input
                        type="text"
                        placeholder="¿Qué se te antoja hoy?"
                        className="w-full bg-muu-cream border-none rounded-muu py-4 pl-12 pr-4 focus:ring-2 focus:ring-muu-blue/20 transition-all font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Categories Horizontal Scroll */}
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 mask-fade-right">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex items-center gap-2 whitespace-nowrap px-5 py-3 rounded-full font-bold transition-all border ${activeCategory === cat.id
                            ? 'bg-muu-blue text-white border-muu-blue shadow-lg scale-105'
                            : 'bg-white text-muu-deep/40 border-muu-blue/10 hover:border-muu-blue/30'
                            }`}
                    >
                        <span>{cat.icon}</span>
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={product.id}
                            className="muu-card p-0 overflow-hidden flex flex-col group"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    {product.tags.includes('vegano') && (
                                        <div className="bg-green-500 text-white p-2 rounded-full shadow-lg" title="Vegano">
                                            <Leaf className="w-4 h-4" />
                                        </div>
                                    )}
                                    {product.tags.includes('sin-azucar') && (
                                        <div className="bg-muu-orange text-white p-2 rounded-full shadow-lg" title="Sin Azúcar">
                                            <Soup className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col gap-2 flex-grow">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold text-muu-deep">{product.name}</h3>
                                    <span className="text-xl font-black text-muu-blue">${product.price}</span>
                                </div>
                                <p className="text-sm text-muu-deep/60 leading-relaxed">
                                    {product.description}
                                </p>
                                <div className="mt-6 flex gap-2">
                                    <button
                                        onClick={() => addItem({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            quantity: 1,
                                            image: product.image
                                        })}
                                        className="flex-grow muu-button-primary py-2.5 text-sm flex items-center justify-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" /> Agregar
                                    </button>
                                    <button className="muu-button-secondary p-2.5 flex items-center justify-center">
                                        <Info className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 opacity-40 gap-4">
                    <Search className="w-12 h-12" />
                    <p className="text-xl font-bold italic">No encontramos ese sabor...</p>
                </div>
            )}
        </div>
    );
};

export default Menu;
