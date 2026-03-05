import React from 'react';

const MuuLogo: React.FC<{ className?: string, variant?: 'light' | 'dark' }> = ({ className = "h-12", variant = 'dark' }) => {
    const isDark = variant === 'dark';

    return (
        <div className={`flex items-center gap-3 font-display font-black tracking-tighter ${className}`}>
            <div className={`relative w-12 h-12 ${isDark ? 'bg-muu-blue' : 'bg-white'} rounded-full flex items-center justify-center shadow-lg transition-transform hover:rotate-6`}>
                <span className={`text-xl italic uppercase ${isDark ? 'text-white' : 'text-muu-blue'} mt-0.5 ml-0.5`}>MUU</span>
                <div className="flex flex-col gap-0.5 ml-0.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white' : 'bg-muu-blue'}`}></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-muu-orange"></div>
                </div>
            </div>
            {/* Optional text part for headers */}
            {/* <span className={`text-3xl uppercase italic ${isDark ? 'text-muu-deep' : 'text-white'}`}>MUU</span> */}
        </div>
    );
};

export default MuuLogo;
