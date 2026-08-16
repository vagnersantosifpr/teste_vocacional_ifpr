/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Teste Vocacional - IFPR Campus Assis Chateaubriand (Processo Seletivo 2027)
 * Desenvolvido com foco em UX/UI para estudantes de 13 a 15 anos.
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { AdminScreen } from './components/AdminScreen';
import { 
  CourseKey, 
  GeneralRankingItem, 
  GeneralTestResult, 
  QuizResult, 
  SpecificTestResult, 
  TestSubmissionPayload, 
  TrackType,
  AffinityLevel
} from './types';
import { 
  COURSES_DATA, 
  GENERAL_QUESTIONS, 
  TRACK_QUESTIONS_MAP 
} from './data/questions';
import { 
  CLOUD_API_URL, 
  salvarDadosNuvem, 
  buscarDadosNuvem 
} from './services/cloudService';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'quiz' | 'result' | 'admin'>('home');
  const [activeTrack, setActiveTrack] = useState<TrackType>('geral');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [cloudSyncStatus, setCloudSyncStatus] = useState<{ success: boolean; source: 'cloud' | 'local' } | null>(null);

  // Iniciar Trilha
  const handleStartTrack = (track: TrackType) => {
    setActiveTrack(track);
    setCurrentScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Finalizar Trilha Geral (10 perguntas)
  const handleFinishGeneralQuiz = async (answers: { questionId: number; chosenCourse: CourseKey }[]) => {
    // Contagem de pontos por curso (cada resposta = 1 ponto para o curso correspondente)
    const counts: Record<CourseKey, number> = {
      agro: 0,
      info: 0,
      meca: 0,
      comercio: 0,
    };

    answers.forEach(ans => {
      if (counts[ans.chosenCourse] !== undefined) {
        counts[ans.chosenCourse]++;
      }
    });

    const coursesKeys: CourseKey[] = ['agro', 'info', 'meca', 'comercio'];

    // Monta itens do ranking com porcentagem: (Pontos do Curso / 10) * 100
    const rankingItems: GeneralRankingItem[] = coursesKeys.map(key => {
      const score = counts[key];
      const percentage = Math.round((score / 10) * 100);
      return {
        courseKey: key,
        name: COURSES_DATA[key].shortName,
        score,
        percentage,
        icon: COURSES_DATA[key].icon,
        color: COURSES_DATA[key].themeColor,
      };
    });

    // Ordena por pontuação descrescente. Em caso de empate, decide por ordem alfabética do nome do curso.
    rankingItems.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.name.localeCompare(b.name, 'pt-BR');
    });

    const winnerKey = rankingItems[0].courseKey;
    const winnerCourse = COURSES_DATA[winnerKey];

    const resultObj: GeneralTestResult = {
      track: 'geral',
      ranking: rankingItems,
      winner: winnerCourse,
      timestamp: new Date().toISOString(),
    };

    setQuizResult(resultObj);
    setCurrentScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Envio para a Nuvem / LocalStorage Fallback
    const payload: TestSubmissionPayload = {
      track: 'geral',
      trackName: 'Trilha Geral de Vocação',
      winnerOrCourse: winnerCourse.shortName,
      winnerKey: winnerKey,
      percentage: rankingItems[0].percentage,
      timestamp: resultObj.timestamp,
    };

    const syncResult = await salvarDadosNuvem(payload);
    setCloudSyncStatus(syncResult);
  };

  // Finalizar Trilha Específica (10 perguntas de afirmação, máx 100 pts)
  const handleFinishSpecificQuiz = async (courseKey: CourseKey, totalScore: number) => {
    const course = COURSES_DATA[courseKey];
    const maxScore = 100;
    const percentage = Math.min(100, Math.max(0, Math.round((totalScore / maxScore) * 100)));

    let affinityLevel: AffinityLevel = 'Baixa Vocação';
    let message = '';

    if (percentage >= 70) {
      affinityLevel = 'Alta Vocação';
      message = `Sensacional! Seu perfil tem tudo a ver com o curso de ${course.shortName}. Você demonstrou grande afinidade com as atividades práticas, mercado e tecnologias desta área. O IFPR Campus Assis Chateaubriand é o lugar perfeito para você transformar esse talento em uma profissão!`;
    } else if (percentage >= 35) {
      affinityLevel = 'Interesse Moderado';
      message = `Você possui um interesse legal em alguns pontos de ${course.shortName}! Vale a pena pesquisar a grade curricular completa do curso ou experimentar a Trilha Geral para descobrir se outro curso do IFPR tem um alinhamento ainda maior com você.`;
    } else {
      affinityLevel = 'Baixa Vocação';
      message = `Parece que ${course.shortName} não é a sua vibe principal no momento, e tá tudo bem! O IFPR Campus Assis Chateaubriand oferece outros cursos incríveis em Agropecuária, Informática, Mecatrônica e Comércio. Experimente a Trilha Geral para encontrar seu match perfeito!`;
    }

    const resultObj: SpecificTestResult = {
      track: courseKey,
      course,
      score: totalScore,
      maxScore,
      percentage,
      affinityLevel,
      message,
      timestamp: new Date().toISOString(),
    };

    setQuizResult(resultObj);
    setCurrentScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Envio para a Nuvem / LocalStorage Fallback
    const payload: TestSubmissionPayload = {
      track: courseKey,
      trackName: `Afinidade Específica: ${course.shortName}`,
      winnerOrCourse: course.shortName,
      winnerKey: courseKey,
      percentage,
      affinityLevel,
      timestamp: resultObj.timestamp,
    };

    const syncResult = await salvarDadosNuvem(payload);
    setCloudSyncStatus(syncResult);
  };

  const handleGoHome = () => {
    setCurrentScreen('home');
    setQuizResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    setCurrentScreen('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Perguntas a serem exibidas na tela de quiz
  const currentQuestions = activeTrack === 'geral'
    ? GENERAL_QUESTIONS
    : TRACK_QUESTIONS_MAP[activeTrack as CourseKey];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-[#1E293B]">
      
      {/* Institutional Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onGoHome={handleGoHome}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Screen Router */}
      <main className="flex-1 flex flex-col justify-center">
        {currentScreen === 'home' && (
          <HomeScreen
            onStartTrack={handleStartTrack}
            onOpenAdmin={handleOpenAdmin}
          />
        )}

        {currentScreen === 'quiz' && (
          <QuizScreen
            track={activeTrack}
            questions={currentQuestions}
            onFinishGeneralQuiz={handleFinishGeneralQuiz}
            onFinishSpecificQuiz={handleFinishSpecificQuiz}
            onCancel={handleGoHome}
          />
        )}

        {currentScreen === 'result' && quizResult && (
          <ResultScreen
            result={quizResult}
            onRestart={handleGoHome}
            onSelectTrack={handleStartTrack}
            cloudSyncStatus={cloudSyncStatus}
          />
        )}

        {currentScreen === 'admin' && (
          <AdminScreen
            onBackToApp={handleGoHome}
          />
        )}
      </main>

      {/* Institutional Subtle Footer */}
      <footer className="border-t border-slate-200/80 bg-white/70 py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2F9E41]"></span>
            <span>Instituto Federal do Paraná - Campus Assis Chateaubriand</span>
          </div>
          <div>
            <span>Processo Seletivo 2027 • Ensino Médio Integrado 100% Gratuito</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
