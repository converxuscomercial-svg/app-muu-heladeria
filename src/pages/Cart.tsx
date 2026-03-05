import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, Send, ShoppingBag, CheckCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { supabase } from '../lib/supabase';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5219541234567';

const Cart: React.FC = () => {
    const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
    const [orderType, setOrderType] = useState<'para-llevar' | 'en-mesa' | 'delivery'>('en-mesa');
    const [customerName, setCustomerName] = useState('');
    const [address, setAddress] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleWhatsAppOrder = async () => {
        if (items.length === 0) return;

        setSending(true);

        // Try to save order to Supabase
        try {
            await supabase.from('orders').insert({
                customer_name: customerName || 'Anónimo',
                order_type: orderType,
                address: orderType === 'delivery' ? address : null,
                items: items,
                total: total(),
                status: 'pending',
            });
        } catch (err) {
            // Non-blocking — order still goes through WhatsApp
            console.warn('Could not save order to DB:', err);
        }

        const orderItemsText = items
            .map(i => `- ${i.quantity}x ${i.name} ($${i.price * i.quantity})`)
            .join('%0A');

        const message =
            `*🍦 NUEVO PEDIDO MUU*%0A%0A` +
            `*Cliente:* ${customerName || 'Anónimo'}%0A` +
            `*Modalidad:* ${orderType.replace('-', ' ').toUpperCase()}%0A` +
            (orderType === 'delivery' ? `*Dirección:* ${address}%0A` : '') +
            `%0A*Detalle del Pedido:*%0A${orderItemsText}%0A%0A` +
            `*TOTAL: $${total()}*%0A%0A` +
            `_Pedido enviado desde la App MUU_ 🤙`;

        setSending(false);
        setSent(true);

        setTimeout(() => {
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
            clearCart();
            setSent(false);
        }, 800);
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-28 h-28 bg-muu-cream rounded-[2.5rem] flex items-center justify-center border-4 border-muu-blue/5"
                >
                    <ShoppingBag className="w-14 h-14 text-muu-blue opacity-20" />
                </motion.div>
                <div className="flex flex-col gap-3">
                    <h2 className="text-4xl font-display font-black italic uppercase text-muu-deep tracking-tighter">
                        Tu carrito está
                        <span className="text-muu-blue"> vacío</span>
                    </h2>
                    <p className="opacity-50 max-w-xs mx-auto font-medium text-lg">
                        ¿En serio no vas a probar nada de MUU hoy?
                    </p>
                </div>
                <a href="/menu" className="muu-button-primary mt-4 px-12 py-4 text-sm uppercase tracking-widest font-black">
                    Explorar Sabores
                </a>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="flex items-end justify-between">
                    <h1 className="text-5xl font-display font-black italic uppercase text-muu-deep tracking-tighter leading-none">
                        Tu <span className="text-muu-blue">Pedido</span>
                    </h1>
                    <span className="text-xs text-muu-blue font-black uppercase tracking-widest opacity-60">
                        {items.reduce((a, i) => a + i.quantity, 0)} items
                    </span>
                </div>

                <div className="flex flex-col gap-4">
                    <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20, height: 0 }}
                                key={item.id}
                                className="muu-card flex items-center gap-4 p-4"
                            >
                                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-muu-cream">
                                    <img
                                        src={item.image || 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800'}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-black text-muu-deep uppercase italic text-lg leading-tight">{item.name}</h3>
                                    <p className="text-muu-blue font-black text-xl">${item.price}</p>
                                </div>
                                <div className="flex items-center gap-2 bg-muu-cream rounded-full px-3 py-2 border-2 border-muu-blue/5">
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="p-1 hover:text-muu-blue transition-colors rounded-full"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="font-black w-6 text-center text-lg">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="p-1 hover:text-muu-blue transition-colors rounded-full"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="font-black text-muu-deep text-lg">${item.price * item.quantity}</span>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <button
                    onClick={clearCart}
                    className="text-sm font-bold text-red-400/70 hover:text-red-500 underline w-fit transition-colors"
                >
                    Vaciar carrito
                </button>
            </div>

            {/* Order Summary */}
            <div className="flex flex-col gap-6">
                <div className="muu-card flex flex-col gap-6 sticky top-28 border-4 border-muu-blue/5">
                    <h2 className="text-3xl font-display font-black italic uppercase text-muu-deep tracking-tighter leading-none">
                        Finalizar
                    </h2>

                    <div className="flex flex-col gap-4">
                        {/* Name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muu-orange">
                                Tu Nombre
                            </label>
                            <input
                                type="text"
                                placeholder="¿Cómo te llamas?"
                                className="bg-muu-cream/50 border-4 border-muu-blue/5 rounded-2xl py-3 px-4 focus:border-muu-blue/20 focus:bg-white outline-none transition-all font-bold"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>

                        {/* Order type */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muu-orange">
                                Modalidad
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { key: 'en-mesa', label: 'En Mesa' },
                                    { key: 'para-llevar', label: 'Llevar' },
                                    { key: 'delivery', label: 'Delivery' },
                                ].map((type) => (
                                    <button
                                        key={type.key}
                                        onClick={() => setOrderType(type.key as typeof orderType)}
                                        className={`text-[10px] font-black uppercase py-3 rounded-2xl border-2 transition-all ${orderType === type.key
                                            ? 'bg-muu-blue text-white border-muu-blue shadow-lg shadow-muu-blue/20'
                                            : 'bg-white text-muu-deep/40 border-muu-blue/5 hover:border-muu-blue/20'
                                            }`}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Delivery address */}
                        <AnimatePresence>
                            {orderType === 'delivery' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex flex-col gap-2 overflow-hidden"
                                >
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muu-orange">
                                        Dirección de entrega
                                    </label>
                                    <textarea
                                        placeholder="Calle, número, referencias..."
                                        className="bg-muu-cream/50 border-4 border-muu-blue/5 rounded-2xl py-3 px-4 focus:border-muu-blue/20 focus:bg-white outline-none transition-all h-24 resize-none font-medium"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Totals */}
                    <div className="pt-4 border-t-2 border-muu-blue/5 flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm font-medium opacity-50">
                            <span>Subtotal</span>
                            <span>${total()}</span>
                        </div>
                        {orderType === 'delivery' && (
                            <div className="flex justify-between items-center text-sm font-medium opacity-50">
                                <span>Envío estimado</span>
                                <span>$25–30</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center text-2xl font-black text-muu-blue pt-2 font-display italic uppercase">
                            <span>Total</span>
                            <span>${total()}</span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleWhatsAppOrder}
                        disabled={sending || sent}
                        className={`muu-button-primary w-full flex items-center justify-center gap-3 py-5 text-sm uppercase tracking-widest font-black transition-all ${sent ? 'bg-green-500' : ''}`}
                    >
                        {sent ? (
                            <>
                                <CheckCircle className="w-5 h-5" />
                                ¡Pedido enviado!
                            </>
                        ) : sending ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Procesando...
                            </span>
                        ) : (
                            <>
                                Pedir por WhatsApp <Send className="w-5 h-5" />
                            </>
                        )}
                    </button>
                    <p className="text-[10px] text-center opacity-40 uppercase tracking-widest">
                        Se abrirá WhatsApp para confirmar tu pedido
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cart;
