import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, Send, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const Cart: React.FC = () => {
    const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
    const [orderType, setOrderType] = useState<'para-llevar' | 'en-mesa' | 'delivery'>('en-mesa');
    const [customerName, setCustomerName] = useState('');
    const [address, setAddress] = useState('');

    const handleWhatsAppOrder = () => {
        if (items.length === 0) return;

        const orderItemsText = items
            .map(i => `- ${i.quantity}x ${i.name} ($${i.price * i.quantity})`)
            .join('%0A');

        const message = `*NUEVO PEDIDO MUU*%0A%0A` +
            `*Cliente:* ${customerName || 'Anonimo'}%0A` +
            `*Modalidad:* ${orderType}%0A` +
            (orderType === 'delivery' ? `*Dirección:* ${address}%0A` : '') +
            `%0A*Detalle:*%0A${orderItemsText}%0A%0A` +
            `*TOTAL:* $${total()}%0A%0A` +
            `_Enviado desde la App MUU_`;

        window.open(`https://wa.me/5219541234567?text=${message}`, '_blank');
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
                <div className="w-24 h-24 bg-muu-cream rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-muu-blue opacity-20" />
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-display font-bold italic uppercase text-muu-deep">Tu carrito está vacío</h2>
                    <p className="opacity-60 max-w-xs mx-auto">¿En serio no vas a probar nada de MUU hoy?</p>
                </div>
                <a href="/menu" className="muu-button-primary mt-4 px-12">Explorar Sabores</a>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 flex flex-col gap-6">
                <h1 className="text-4xl font-display font-black italic uppercase text-muu-deep tracking-tighter">
                    Tu <span className="text-muu-blue">Pedido</span>
                </h1>

                <div className="flex flex-col gap-4">
                    <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                key={item.id}
                                className="muu-card flex items-center gap-4 p-4"
                            >
                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                                <div className="flex-grow">
                                    <h3 className="font-bold text-muu-deep">{item.name}</h3>
                                    <p className="text-muu-blue font-black">${item.price}</p>
                                </div>
                                <div className="flex items-center gap-3 bg-white rounded-full px-3 py-1 border border-muu-blue/10">
                                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-muu-blue">
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-muu-blue">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <button onClick={clearCart} className="text-sm font-bold text-red-500/60 hover:text-red-500 underline w-fit">
                    Vaciar carrito
                </button>
            </div>

            <div className="flex flex-col gap-6">
                <div className="muu-card flex flex-col gap-6 sticky top-24">
                    <h2 className="text-2xl font-display font-bold italic uppercase text-muu-deep">Finalizar</h2>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Nombre</label>
                            <input
                                type="text"
                                placeholder="¿Cómo te llamas?"
                                className="bg-white border-2 border-muu-blue/5 rounded-2xl py-3 px-4 focus:border-muu-blue/20 outline-none transition-all"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Modalidad</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['en-mesa', 'para-llevar', 'delivery'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setOrderType(type as any)}
                                        className={`text-[10px] font-bold uppercase py-2 rounded-xl border-2 transition-all ${orderType === type
                                                ? 'bg-muu-blue text-white border-muu-blue'
                                                : 'bg-white text-muu-deep/40 border-muu-blue/5'
                                            }`}
                                    >
                                        {type.replace('-', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {orderType === 'delivery' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="flex flex-col gap-2"
                            >
                                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Dirección</label>
                                <textarea
                                    placeholder="Calle, número, referencias..."
                                    className="bg-white border-2 border-muu-blue/5 rounded-2xl py-3 px-4 focus:border-muu-blue/20 outline-none transition-all h-24 resize-none"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </motion.div>
                        )}
                    </div>

                    <div className="pt-6 border-t border-muu-blue/10 flex flex-col gap-2">
                        <div className="flex justify-between items-center opacity-60 text-sm">
                            <span>Subtotal</span>
                            <span>${total()}</span>
                        </div>
                        {orderType === 'delivery' && (
                            <div className="flex justify-between items-center opacity-60 text-sm">
                                <span>Envío (estimado)</span>
                                <span>$25-30</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center text-xl font-black text-muu-blue pt-2 font-display italic uppercase">
                            <span>Total</span>
                            <span>${total()}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleWhatsAppOrder}
                        className="muu-button-primary w-full flex items-center justify-center gap-3 py-4"
                    >
                        Pedir por WhatsApp <Send className="w-5 h-5" />
                    </button>
                    <p className="text-[10px] text-center opacity-40 uppercase tracking-widest">
                        Se abrirá WhatsApp para completar tu pedido
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cart;
