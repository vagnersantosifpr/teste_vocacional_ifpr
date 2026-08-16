import React, { useState } from 'react';
import { 
  RotateCcw, 
  Share2, 
  Check, 
  Sparkles, 
  Award, 
  Building2, 
  BookOpen, 
  Briefcase, 
  ChevronRight, 
  ExternalLink,
  CloudCheck,
  CheckCircle2,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { GeneralTestResult, SpecificTestResult, TrackType, CourseKey } from '../types';
import { COURSES_DATA } from '../data/questions';

interface ResultScreenProps {
  result: GeneralTestResult | SpecificTestResult;
  onRestart: () => void;
  onSelectTrack: (track: TrackType) => void;
  cloudSyncStatus: { success: boolean; source: 'cloud' | 'local' } | null;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onRestart,
  onSelectTrack,
  cloudSyncStatus,
}) => {
  const [copied, setCopied] = useState(false);

  const isGeneral = result.track === 'geral';
  const generalResult = isGeneral ? (result as GeneralTestResult) : null;
  const specificResult = !isGeneral ? (result as SpecificTestResult) : null;

  const winnerData = isGeneral 
    ? generalResult!.winner 
    : specificResult!.course;

  const handleShare = async () => {
    let shareText = '';
    if (isGeneral && generalResult) {
      shareText = `🚀 Fiz o Teste Vocacional do IFPR Campus Assis Chateaubriand!\nMeu match principal foi: ${generalResult.winner.fullName} (${generalResult.ranking[0].percentage}% de afinidade)!\nDescubra o seu também para o PS 2027!`;
    } else if (specificResult) {
      shareText = `🎯 Fiz o Teste de Afinidade para ${specificResult.course.shortName} no IFPR Assis Chateaubriand!\nResultado: ${specificResult.affinityLevel} (${specificResult.percentage}% de afinidade)!\nConfira o seu para o PS 2027!`;
    }

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 animate-fade-in space-y-8">
      
      {/* Cloud Sync Status Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-[#2F9E41]" />
          <span>
            {cloudSyncStatus?.source === 'cloud' 
              ? '✨ Resultado registrado com sucesso na Nuvem IFPR!' 
              : '💾 Resultado registrado com sucesso nas estatísticas locais!'}
          </span>
        </div>
      </div>

      {/* Hero Result Banner */}
      <div className="text-center space-y-4">
        <div className="inline-block p-5 rounded-3xl bg-[#EAF7ED] border-2 border-[#A7E3B4] shadow-md">
          <span className="text-5xl sm:text-6xl">{winnerData.icon}</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
          {isGeneral ? winnerData.resultTitle : `Resultado: ${winnerData.shortName}`}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-medium leading-relaxed">
          {isGeneral 
            ? 'Com base nas suas escolhas do dia a dia, este é o curso que mais combina com a sua personalidade e seus objetivos!'
            : `Avaliação do seu perfil de interesse para o curso técnico do IFPR Assis Chateaubriand.`}
        </p>
      </div>

      {/* SPECIFIC TRACK AFFINITY BADGE CARD */}
      {!isGeneral && specificResult && (
        <div className="bg-white rounded-3xl border-2 border-slate-100 p-6 sm:p-9 shadow-xl text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="flex items-center justify-between text-sm font-extrabold text-slate-700 tracking-wide">
              <span>SEU NÍVEL DE AFINIDADE</span>
              <span className="text-3xl font-black text-[#2F9E41]">{specificResult.percentage}%</span>
            </div>

            {/* Affinity Meter Bar */}
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${specificResult.percentage}%`,
                  backgroundColor: specificResult.percentage >= 70 ? '#2F9E41' : specificResult.percentage >= 35 ? '#EA580C' : '#64748B'
                }}
              ></div>
            </div>

            {/* Level Tag */}
            <div className="pt-2">
              <span className={`inline-block px-5 py-2 rounded-full text-base font-black shadow-xs ${
                specificResult.affinityLevel === 'Alta Vocação'
                  ? 'bg-emerald-100 text-emerald-950 border-2 border-emerald-400'
                  : specificResult.affinityLevel === 'Interesse Moderado'
                  ? 'bg-amber-100 text-amber-950 border-2 border-amber-400'
                  : 'bg-slate-100 text-slate-900 border-2 border-slate-300'
              }`}>
                {specificResult.affinityLevel === 'Alta Vocação' && '🔥 '}
                {specificResult.affinityLevel === 'Interesse Moderado' && '💡 '}
                {specificResult.affinityLevel === 'Baixa Vocação' && '🧭 '}
                {specificResult.affinityLevel}
              </span>
            </div>

            <p className="text-base text-slate-700 font-medium leading-relaxed">
              {specificResult.message}
            </p>
          </div>
        </div>
      )}

      {/* GENERAL TRACK RANKING LIST */}
      {isGeneral && generalResult && (
        <div className="bg-white rounded-3xl border-2 border-slate-100 p-6 sm:p-9 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
                <TrendingUp className="w-6 h-6 text-[#2F9E41] stroke-[2.5]" />
                <span>Ranking Completo de Afinidade</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Veja como ficou a distribuição dos seus interesses entre os 4 cursos técnicos
              </p>
            </div>
            <span className="text-xs font-black px-3.5 py-1 bg-slate-900 text-white rounded-full uppercase tracking-wider">
              10 Questões
            </span>
          </div>

          <div className="space-y-4">
            {generalResult.ranking.map((item, index) => {
              const courseData = COURSES_DATA[item.courseKey];
              const isFirst = index === 0;

              return (
                <div 
                  key={item.courseKey}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                    isFirst 
                      ? 'bg-[#EAF7ED] border-[#2F9E41] shadow-md' 
                      : 'bg-white border-slate-100 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-xs ${
                        isFirst ? 'bg-[#2F9E41] text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {index + 1}º
                      </span>
                      <span className="text-2xl shrink-0">{item.icon}</span>
                      <div>
                        <span className="font-extrabold text-base sm:text-lg text-slate-900 block sm:inline">
                          {item.name}
                        </span>
                        {isFirst && (
                          <span className="sm:ml-2.5 text-xs font-black px-2.5 py-0.5 bg-[#2F9E41] text-white rounded-full uppercase tracking-wider shadow-xs">
                            Match Principal
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-lg sm:text-2xl font-black ${isFirst ? 'text-[#2F9E41]' : 'text-slate-800'}`}>
                        {item.percentage}%
                      </span>
                      <span className="text-xs text-slate-400 block -mt-1 font-bold">
                        ({item.score} de 10)
                      </span>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div 
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: isFirst ? '#2F9E41' : courseData.themeColor 
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* HIGHLIGHT DETAILS CARD FOR 1º PLACE / COURSE DETAILS */}
      <div className="bg-white rounded-3xl border-2 border-slate-100 p-6 sm:p-9 shadow-xl space-y-6">
        
        <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
          <div className="w-14 h-14 rounded-2xl bg-[#EAF7ED] text-[#2F9E41] border border-[#A7E3B4] flex items-center justify-center font-bold text-3xl shrink-0 shadow-xs">
            {winnerData.icon}
          </div>
          <div>
            <span className="text-xs font-black text-[#2F9E41] uppercase tracking-wider block">
              Conheça Tudo Sobre o Curso
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {winnerData.fullName}
            </h3>
          </div>
        </div>

        {/* Sobre & Onde Trabalhar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-slate-50/90 rounded-2xl p-6 border-2 border-slate-100 space-y-2.5">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
              <BookOpen className="w-5 h-5 text-[#2F9E41] stroke-[2.5]" />
              <span>O que você vai aprender (Sobre):</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {winnerData.about}
            </p>
          </div>

          <div className="bg-slate-50/90 rounded-2xl p-6 border-2 border-slate-100 space-y-2.5">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
              <Briefcase className="w-5 h-5 text-[#C8102E] stroke-[2.5]" />
              <span>Onde você poderá trabalhar:</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {winnerData.whereToWork}
            </p>
          </div>

        </div>

        {/* Skills & Campus Advantages */}
        <div className="pt-3 border-t border-slate-100">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3.5">
            Destaques e Vantagens no Campus Assis Chateaubriand
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {winnerData.campusPerks.map((perk, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-slate-800 font-semibold bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <Check className="w-4 h-4 text-[#2F9E41] stroke-[3] shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ACTION BUTTONS & CTAS */}
      <div className="space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            id="btn-restart-quiz"
            onClick={onRestart}
            className="w-full py-4 px-6 rounded-2xl bg-[#2F9E41] hover:bg-[#227931] text-white font-black text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02]"
          >
            <RotateCcw className="w-5 h-5 stroke-[2.5]" />
            <span>Refazer o Teste</span>
          </button>

          <button
            id="btn-share-result"
            onClick={handleShare}
            className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 font-black text-lg shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02]"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-[#2F9E41] stroke-[3]" />
                <span className="text-[#2F9E41]">Copiado para o clipboard!</span>
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5 text-slate-700 stroke-[2.5]" />
                <span>Compartilhar Resultado</span>
              </>
            )}
          </button>
        </div>

        {/* Explore other tracks quick bar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs text-center space-y-3">
          <p className="text-xs sm:text-sm font-semibold text-slate-700">
            Quer testar outro curso ou fazer a Trilha Geral?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => onSelectTrack('geral')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              🔍 Trilha Geral
            </button>
            <button
              onClick={() => onSelectTrack('agro')}
              className="px-3 py-1.5 rounded-xl bg-[#EAF7ED] hover:bg-[#d4f2da] text-[#2F9E41] text-xs font-semibold transition-colors cursor-pointer"
            >
              🌾 Agropecuária
            </button>
            <button
              onClick={() => onSelectTrack('info')}
              className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              💻 Informática
            </button>
            <button
              onClick={() => onSelectTrack('meca')}
              className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              ⚙️ Mecatrônica
            </button>
            <button
              onClick={() => onSelectTrack('comercio')}
              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              💼 Comércio
            </button>
          </div>
        </div>

        {/* Processo Seletivo IFPR 2027 Information Card */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-7 text-white shadow-lg space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#C8102E] text-white text-xs font-bold tracking-wider uppercase">
                PS 2027
              </span>
              <h4 className="font-bold text-base sm:text-lg">
                IFPR Campus Assis Chateaubriand
              </h4>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#2F9E41]" />
              <span>Assis Chateaubriand - PR</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            As inscrições para o Processo Seletivo do Ensino Médio Integrado são gratuitas ou com taxa social reduzida. Fique ligado no edital oficial e venha estudar na melhor instituição pública federal da nossa região!
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-slate-300">
            <span>📚 Cursos Técnicos Integrados ao Ensino Médio • Duração de 3 anos</span>
            <a
              href="https://assischateaubriand.ifpr.edu.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white font-semibold hover:text-[#2F9E41] transition-colors"
            >
              <span>Site Oficial do Campus</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
