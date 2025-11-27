'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface OnboardingQuestionProps {
  question: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

export default function OnboardingQuestion({
  question,
  options,
  selectedOption,
  onSelect,
}: OnboardingQuestionProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
        {question}
      </h2>
      
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className={`w-full p-4 md:p-5 rounded-xl border-2 transition-all duration-300 text-left relative ${
              selectedOption === option
                ? 'border-[#FFD645] bg-[#FFD645]/10'
                : 'border-white/20 bg-white/5 hover:border-white/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-white text-base md:text-lg pr-8">
                {option}
              </span>
              {selectedOption === option && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FFD645] flex items-center justify-center">
                  <Check className="w-4 h-4 text-black" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
