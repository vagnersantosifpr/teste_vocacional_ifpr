import React, { useState, useRef } from 'react';
import { Sparkles, ArrowRight, Compass, CheckCircle2, Award, Users, BookOpen } from 'lucide-react';
import { CourseKey, TrackType } from '../types';
import { COURSES_DATA } from '../data/questions';

interface HomeScreenProps {
  onStartTrack: (track: TrackType) => void;
  onOpenAdmin: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStartTrack, onOpenAdmin }) => {
  const [clickCount, setClickCount] = useState(0);
  const [adminHint, setAdminHint] = useState<string | null>(null);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Easter egg: 5 cliques rápidos no título abrem o Admin
  const handleTitleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (newCount >= 5) {
      setAdminHint("🔓 Modo Administrador desbloqueado!");
      setClickCount(0);
      setTimeout(() => {
        setAdminHint(null);
        onOpenAdmin();
      }, 500);
      return;
    }

    if (newCount >= 2) {
      setAdminHint(`🔧 Quase lá: ${newCount}/5 cliques para o Painel Admin`);
    }

    // Reset contador após 1.8 segundos sem cliques
    clickTimerRef.current = setTimeout(() => {
      setClickCount(0);
      setAdminHint(null);
    }, 1800);
  };

  const specificTracks: { key: CourseKey; label: string; icon: string; colorClass: string; bgClass: string; borderClass: string; desc: string }[] = [
    {
      key: 'agro',
      label: '🌾 Testar afinidade: Agropecuária',
      icon: '🌾',
      colorClass: 'text-[#2F9E41]',
      bgClass: 'bg-[#EAF7ED] hover:bg-[#d8f0dc]',
      borderClass: 'border-[#A7E3B4] hover:border-[#2F9E41]',
      desc: 'Plantas, animais, drones agrícolas e laboratórios vivos.'
    },
    {
      key: 'info',
      label: '💻 Testar afinidade: Informática',
      icon: '💻',
      colorClass: 'text-[#0284C7]',
      bgClass: 'bg-[#E0F2FE] hover:bg-[#bae6fd]',
      borderClass: 'border-[#7DD3FC] hover:border-[#0284C7]',
      desc: 'Programação, desenvolvimento de apps, jogos e redes.'
    },
    {
      key: 'meca',
      label: '⚙️ Testar afinidade: Mecatrônica',
      icon: '⚙️',
      colorClass: 'text-[#7C3AED]',
      bgClass: 'bg-[#F3E8FF] hover:bg-[#e9d5ff]',
      borderClass: 'border-[#D8B4FE] hover:border-[#7C3AED]',
      desc: 'Robótica, eletrônica, modelagem 3D e automação industrial.'
    },
    {
      key: 'comercio',
      label: '💼 Testar afinidade: Comércio',
      icon: '💼',
      colorClass: 'text-[#EA580C]',
      bgClass: 'bg-[#FFEDD5] hover:bg-[#fed7aa]',
      borderClass: 'border-[#FDBA74] hover:border-[#EA580C]',
      desc: 'Marketing, empreendedorismo, finanças e gestão de pessoas.'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 animate-fade-in">
      
      {/* Top Banner Tag */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF7ED] text-[#2F9E41] border border-[#A7E3B4] text-xs sm:text-sm font-semibold shadow-xs">
          <Sparkles className="w-4 h-4 text-[#2F9E41] animate-pulse" />
          <span>Processo Seletivo IFPR 2027 • Ensino Médio Integrado</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 
          id="home-main-title"
          onClick={handleTitleClick}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[1.06] select-none cursor-pointer transition-transform active:scale-95"
          title="Clique 5 vezes para o Painel Admin"
        >
          Descubra a sua Vibe <br className="hidden sm:inline" />
          <span className="text-[#2F9E41]">Profissional no IFPR!</span> 🚀
        </h1>

        {adminHint && (
          <div className="mt-3 inline-block px-4 py-1.5 bg-amber-100 border-2 border-amber-400 text-amber-950 text-xs sm:text-sm font-extrabold rounded-full animate-bounce shadow-xs">
            {adminHint}
          </div>
        )}

        <p className="mt-5 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          O Ensino Médio tá chegando e a dúvida bateu? Relaxa! Escolha uma das opções abaixo e descubra qual curso tem mais a ver com você. É jogo rápido: só 10 perguntas!
        </p>
      </div>

      {/* Action Selection Cards */}
      <div className="space-y-4 mb-12">
        
        {/* 1. DESTAQUE: TESTE GERAL */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#2F9E41] via-[#0284C7] to-[#7C3AED] rounded-3xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <button
            id="btn-start-geral"
            onClick={() => onStartTrack('geral')}
            className="relative w-full p-6 sm:p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-left border-2 border-transparent group-hover:border-[#2F9E41] cursor-pointer group hover:scale-[1.01]"
          >
            <div className="flex items-start sm:items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#2F9E41] flex items-center justify-center text-white text-3xl shadow-md shrink-0 group-hover:scale-110 transition-transform">
                🔍
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-[#2F9E41] transition-colors tracking-tight">
                    Não sei meu curso (Fazer Teste Geral)
                  </span>
                  <span className="text-xs font-black px-3 py-1 bg-[#C8102E] text-white rounded-full uppercase tracking-wider shadow-xs">
                    Recomendado
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-600 font-medium mt-1.5 leading-relaxed">
                  Responda 10 situações do dia a dia e receba um ranking completo com a sua afinidade para os 4 cursos!
                </p>
              </div>
            </div>

            <div className="w-full sm:w-auto flex items-center justify-end shrink-0">
              <div className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#2F9E41] text-white font-extrabold text-base shadow-md group-hover:bg-[#227931] transition-all group-hover:translate-x-1">
                <span>Começar Agora</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
          </button>
        </div>

        {/* Divider / Subtitle for Specific Tracks */}
        <div className="pt-6 pb-2 text-center">
          <div className="flex items-center justify-center gap-3 text-slate-400 text-xs sm:text-sm font-extrabold uppercase tracking-widest">
            <span className="h-0.5 bg-slate-200 w-12 sm:w-28"></span>
            <span className="text-slate-500">Ou faça o teste de afinidade direta</span>
            <span className="h-0.5 bg-slate-200 w-12 sm:w-28"></span>
          </div>
        </div>

        {/* 2 to 5: SPECIFIC TRACKS (Grid 1 col on mobile, 2 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specificTracks.map((item) => (
            <button
              key={item.key}
              id={`btn-start-${item.key}`}
              onClick={() => onStartTrack(item.key)}
              className="p-5 sm:p-6 rounded-2xl border-2 border-slate-100 hover:border-[#2F9E41] bg-white transition-all duration-200 text-left flex items-start gap-4 shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 group-hover:bg-green-50 transition-all shadow-xs">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-[#2F9E41] transition-colors flex items-center justify-between tracking-tight">
                  <span>{item.label}</span>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#2F9E41] group-hover:translate-x-1 transition-all shrink-0 ml-1" />
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Campus Info & Highlights Footer Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2.5 mb-3 text-[#2F9E41] font-bold text-sm">
          <Award className="w-5 h-5" />
          <span>Por que estudar no IFPR Campus Assis Chateaubriand?</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-600">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#2F9E41] shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 block">100% Gratuito de Verdade:</strong>
              Sem taxa de matrícula nem mensalidade durante todo o Ensino Médio.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#2F9E41] shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 block">Diploma Técnico Federal:</strong>
              Você sai com Ensino Médio completo + profissão regulamentada no currículo.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#2F9E41] shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 block">Estrutura & Oportunidades:</strong>
              Laboratórios de ponta, projetos de pesquisa, esportes e bolsas estudantis.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
