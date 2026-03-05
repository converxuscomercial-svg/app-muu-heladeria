import React from 'react';

const MuuLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
    return (
        <div className={`flex items-center gap-2 font-display font-bold text-muu-blue tracking-tighter ${className}`}>
            <div className="relative w-10 h-10 bg-muu-blue rounded-full flex items-center justify-center overflow-hidden">
                {/* Simple placeholder for the actual SVG/Image logo */}
                <span className="text-white text-xl">M</span>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-muu-orange rounded-full border-2 border-white"></div>
            </div>
            <span className="text-2xl uppercase italic">MUU</span>
        </div>
    );
};

export default MuuLogo;
