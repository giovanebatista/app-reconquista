'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface PaywallPlanProps {
  title: string;
  price: string;
  period: string;
  planId: string;
  isRecommended?: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

export default function PaywallPlan({
  title,
  price,
  period,
  isRecommended,
  isSelected,
  onSelect,
}: PaywallPlanProps) {
  return (
    <button
      onClick={onSelect}
      className={`relative w-full p-6 rounded-2xl border-2 transition-all duration-300 ${
        isSelected
          ? 'border-[#FFD645] bg-[#FFD645]/10 scale-105'
          : 'border-white/20 bg-white/5 hover:border-white/40'
      }`}
    >
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFD645] text-black px-4 py-1 rounded-full text-sm font-bold">
          Mais escolhido pelos alunos
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-left">
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-white/60 text-sm">{period}</p>
        </div>
        
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          isSelected ? 'border-[#FFD645] bg-[#FFD645]' : 'border-white/40'
        }`}>
          {isSelected && <Check className="w-4 h-4 text-black" />}
        </div>
      </div>
      
      <div className="text-left">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#FFD645]">R$ {price}</span>
          <span className="text-white/60 text-sm">/{period}</span>
        </div>
      </div>
    </button>
  );
}
