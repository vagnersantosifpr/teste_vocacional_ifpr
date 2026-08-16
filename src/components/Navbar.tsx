import React from 'react';
import { ArrowLeft, Sparkles, Shield, GraduationCap } from 'lucide-react';

interface NavbarProps {
  currentScreen: 'home' | 'quiz' | 'result' | 'admin';
  onGoHome: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onGoHome, onOpenAdmin }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* IFPR Brand / Home Button */}
        <div className="flex items-center gap-3">
          {currentScreen !== 'home' && (
            <button
              onClick={onGoHome}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-sm font-medium"
              title="Voltar para a página inicial"
              aria-label="Voltar para o início"
            >
              <ArrowLeft className="w-5 h-5 text-[#2F9E41]" />
              <span className="hidden sm:inline">Início</span>
            </button>
          )}

          <div 
            onClick={onGoHome} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            {/* IFPR Emblem Simulation */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2F9E41] to-[#227931] flex items-center justify-center shadow-xs text-white font-bold text-sm tracking-tight relative overflow-hidden group-hover:scale-105 transition-transform">
              <span className="font-extrabold">IF</span>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C8102E] rounded-full border-2 border-white"></div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900">
                  IFPR
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EAF7ED] text-[#2F9E41] border border-[#A7E3B4]">
                  PS 2027
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium -mt-0.5 leading-none">
                Campus Assis Chateaubriand
              </p>
            </div>
          </div>
        </div>

        {/* Right Info / Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-800 font-medium bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <GraduationCap className="w-3.5 h-3.5 text-[#2F9E41]" />
            <span>Ensino Médio Técnico Gratuito</span>
          </div>

          {currentScreen === 'admin' ? (
            <button
              onClick={onGoHome}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#2F9E41] text-white hover:bg-[#227931] transition-colors shadow-xs"
            >
              Voltar ao Teste
            </button>
          ) : (
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Painel de Estatísticas"
              aria-label="Acessar painel administrativo"
            >
              <Shield className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
