import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Sparkles, HelpCircle, ChevronRight } from 'lucide-react';
import { CourseKey, Question, QuestionOption, TrackType } from '../types';
import { COURSES_DATA } from '../data/questions';

interface QuizScreenProps {
  track: TrackType;
  questions: Question[];
  onFinishGeneralQuiz: (answers: { questionId: number; chosenCourse: CourseKey }[]) => void;
  onFinishSpecificQuiz: (courseKey: CourseKey, totalScore: number) => void;
  onCancel: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  track,
  questions,
  onFinishGeneralQuiz,
  onFinishSpecificQuiz,
  onCancel,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Armazena as respostas acumuladas
  const [generalAnswers, setGeneralAnswers] = useState<{ questionId: number; chosenCourse: CourseKey }[]>([]);
  const [specificScores, setSpecificScores] = useState<number[]>([]);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Nome e tema da trilha
  const trackInfo = track === 'geral'
    ? {
        title: 'Trilha Geral de Vocação',
        subtitle: 'Descobrindo sua afinidade entre todos os cursos',
        icon: '🔍',
        badgeColor: 'bg-[#EAF7ED] text-[#2F9E41] border-[#A7E3B4]',
        progressColor: 'bg-[#2F9E41]'
      }
    : {
        title: `Teste de Afinidade: ${COURSES_DATA[track].shortName}`,
        subtitle: COURSES_DATA[track].tagline,
        icon: COURSES_DATA[track].icon,
        badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        progressColor: COURSES_DATA[track].themeColor
      };

  const handleSelectOption = (option: QuestionOption) => {
    if (isTransitioning) return;

    setSelectedOptionId(option.id);
    setIsTransitioning(true);

    // Salva pontuação
    if (track === 'geral' && option.courseKey) {
      const newAnswers = [...generalAnswers, { questionId: currentQuestion.id, chosenCourse: option.courseKey }];
      setGeneralAnswers(newAnswers);

      setTimeout(() => {
        if (currentIndex + 1 < totalQuestions) {
          setCurrentIndex(prev => prev + 1);
          setSelectedOptionId(null);
          setIsTransitioning(false);
        } else {
          onFinishGeneralQuiz(newAnswers);
        }
      }, 350);
    } else {
      const points = option.points ?? 0;
      const newScores = [...specificScores, points];
      setSpecificScores(newScores);

      setTimeout(() => {
        if (currentIndex + 1 < totalQuestions) {
          setCurrentIndex(prev => prev + 1);
          setSelectedOptionId(null);
          setIsTransitioning(false);
        } else {
          const totalPoints = newScores.reduce((acc, curr) => acc + curr, 0);
          onFinishSpecificQuiz(track as CourseKey, totalPoints);
        }
      }, 350);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0 && !isTransitioning) {
      setCurrentIndex(prev => prev - 1);
      setSelectedOptionId(null);
      if (track === 'geral') {
        setGeneralAnswers(prev => prev.slice(0, -1));
      } else {
        setSpecificScores(prev => prev.slice(0, -1));
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-10 animate-fade-in">
      
      {/* Top Header Card with Track Details & Progress */}
      <div className="bg-white rounded-2xl border-2 border-slate-100 p-5 sm:p-6 shadow-md mb-6">
        
        {/* Navigation & Track Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <button
            onClick={currentIndex === 0 ? onCancel : handlePreviousQuestion}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors py-1.5 px-3 rounded-xl hover:bg-slate-100 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>{currentIndex === 0 ? 'Cancelar' : 'Anterior'}</span>
          </button>

          <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black border ${trackInfo.badgeColor} shadow-xs`}>
            <span>{trackInfo.icon}</span>
            <span className="truncate max-w-[180px] sm:max-w-none">{trackInfo.title}</span>
          </div>

          <div className="text-xs sm:text-sm font-black text-slate-800">
            <span className="text-[#2F9E41] text-base">{currentIndex + 1}</span>
            <span className="text-slate-400">/{totalQuestions}</span>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-extrabold text-slate-600 tracking-wide">
            <span>PROGRESSO DA TRILHA</span>
            <span className="text-[#2F9E41] font-black">{progressPercent}%</span>
          </div>
          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: track === 'geral' ? '#2F9E41' : COURSES_DATA[track as CourseKey].themeColor
              }}
            ></div>
          </div>
        </div>

      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border-2 border-slate-100 p-6 sm:p-9 shadow-xl mb-6 transition-all duration-300">
        
        {/* Question Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center justify-center px-3.5 py-1 rounded-lg bg-slate-900 text-white font-black text-xs uppercase tracking-wider">
            Pergunta {currentIndex + 1} de {totalQuestions}
          </span>
          {track === 'geral' && (
            <span className="text-xs text-slate-500 font-bold hidden sm:inline">
              Escolha a alternativa que mais combina com você
            </span>
          )}
        </div>

        {/* Question Prompt */}
        <h2 className="text-xl sm:text-3xl font-black text-slate-900 leading-snug tracking-tight mb-8">
          {currentQuestion.prompt}
        </h2>

        {/* Options List */}
        <div className="space-y-3.5">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            
            // Visual styles for specific Sim / Talvez / Nao vs General ABCD
            let badgeBg = "bg-slate-100 text-slate-700";
            let activeBorder = "border-[#2F9E41] bg-[#EAF7ED]";
            
            if (option.points === 10) {
              badgeBg = "bg-emerald-100 text-emerald-800 font-black";
              activeBorder = "border-[#2F9E41] bg-[#EAF7ED]";
            } else if (option.points === 5) {
              badgeBg = "bg-amber-100 text-amber-800 font-black";
              activeBorder = "border-amber-500 bg-amber-50";
            } else if (option.points === 0) {
              badgeBg = "bg-rose-100 text-rose-800 font-black";
              activeBorder = "border-rose-400 bg-rose-50";
            }

            return (
              <button
                key={option.id}
                id={`option-${currentIndex}-${idx}`}
                onClick={() => handleSelectOption(option)}
                disabled={isTransitioning}
                className={`w-full p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-150 flex items-center justify-between gap-4 cursor-pointer group select-none shadow-xs ${
                  isSelected
                    ? `${activeBorder} shadow-md scale-[0.99]`
                    : 'border-slate-100 bg-white hover:border-[#2F9E41] hover:shadow-md hover:scale-[1.01]'
                }`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  
                  {/* Letter or Point Icon */}
                  {option.letter ? (
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-base shrink-0 transition-colors shadow-xs ${
                      isSelected ? 'bg-[#2F9E41] text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-green-100 group-hover:text-green-800'
                    }`}>
                      {option.letter}
                    </span>
                  ) : (
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-xs ${badgeBg}`}>
                      {option.points === 10 ? '✓' : option.points === 5 ? '~' : '✕'}
                    </span>
                  )}

                  {/* Option Text */}
                  <span className={`text-base sm:text-lg font-bold leading-snug ${
                    isSelected ? 'text-slate-950 font-black' : 'text-slate-800'
                  }`}>
                    {option.text}
                  </span>
                </div>

                {/* Right Selection Indicator */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  isSelected
                    ? 'border-[#2F9E41] bg-[#2F9E41] text-white'
                    : 'border-slate-300 group-hover:border-[#2F9E41]'
                }`}>
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Helpful Hint for Teenagers */}
      <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-400 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Não existe resposta certa ou errada. Seja sincero(a) com a sua vibe!</span>
      </div>

    </div>
  );
};
