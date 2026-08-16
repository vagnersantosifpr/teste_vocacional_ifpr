import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  BarChart3, 
  Database, 
  RefreshCw, 
  ShieldCheck, 
  Award, 
  Globe, 
  Layers, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Save
} from 'lucide-react';
import { AppStats, CourseKey } from '../types';
import { 
  buscarDadosNuvem, 
  getActiveCloudApiUrl, 
  setActiveCloudApiUrl, 
  limparDadosLocais 
} from '../services/cloudService';
import { COURSES_DATA } from '../data/questions';

interface AdminScreenProps {
  onBackToApp: () => void;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({ onBackToApp }) => {
  const [stats, setStats] = useState<AppStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'cloud' | 'local'>('local');
  const [apiUrlInput, setApiUrlInput] = useState('');
  const [urlSaveMessage, setUrlSaveMessage] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await buscarDadosNuvem();
      setStats(result.stats);
      setDataSource(result.source);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setApiUrlInput(getActiveCloudApiUrl());
    loadData();
  }, []);

  const handleSaveApiUrl = () => {
    setActiveCloudApiUrl(apiUrlInput);
    setUrlSaveMessage("Configuração de API salva!");
    setTimeout(() => setUrlSaveMessage(null), 3000);
    loadData();
  };

  const handleClearData = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    limparDadosLocais();
    setConfirmClear(false);
    loadData();
  };

  const coursesList: { key: CourseKey; label: string; icon: string; color: string; bg: string }[] = [
    { key: 'agro', label: 'Agropecuária', icon: '🌾', color: '#2F9E41', bg: 'bg-[#EAF7ED]' },
    { key: 'info', label: 'Informática', icon: '💻', color: '#0284C7', bg: 'bg-[#E0F2FE]' },
    { key: 'meca', label: 'Mecatrônica', icon: '🤖', color: '#7C3AED', bg: 'bg-[#F3E8FF]' },
    { key: 'comercio', label: 'Comércio', icon: '🛍️', color: '#EA580C', bg: 'bg-[#FFEDD5]' },
  ];

  const totalGeneralWinners = stats 
    ? (stats.generalWinners.agro + stats.generalWinners.info + stats.generalWinners.meca + stats.generalWinners.comercio)
    : 0;

  const totalSpecificTests = stats 
    ? (stats.specificTests.agro + stats.specificTests.info + stats.specificTests.meca + stats.specificTests.comercio)
    : 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12 animate-fade-in space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Painel Administrativo</span>
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              dataSource === 'cloud' 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-amber-100 text-amber-900'
            }`}>
              {dataSource === 'cloud' ? '☁️ Conectado à Nuvem' : '💾 Modo LocalStorage'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            📊 Painel de Estatísticas Globais
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Métricas de testes vocacionais realizados para o IFPR Campus Assis Chateaubriand
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            title="Atualizar dados"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Atualizar</span>
          </button>

          <button
            onClick={onBackToApp}
            className="py-2.5 px-4 rounded-xl bg-[#2F9E41] hover:bg-[#227931] text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para o App</span>
          </button>
        </div>
      </div>

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Total de Testes</span>
            <Database className="w-4 h-4 text-[#2F9E41]" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900">
            {stats?.totalTests ?? 0}
          </div>
          <p className="text-xs text-slate-500">
            Submissões registradas até o momento
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Trilhas Gerais Feitas</span>
            <Award className="w-4 h-4 text-[#0284C7]" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900">
            {totalGeneralWinners}
          </div>
          <p className="text-xs text-slate-500">
            Alunos que descobriram o ranking completo
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Testes Específicos</span>
            <Layers className="w-4 h-4 text-[#7C3AED]" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900">
            {totalSpecificTests}
          </div>
          <p className="text-xs text-slate-500">
            Aprofundamentos de afinidade por curso
          </p>
        </div>

      </div>

      {/* METRIC CARD 1: 1º Lugar na Trilha Geral */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Vencedores em 1º Lugar (Trilha Geral)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Quantas vezes cada curso foi o principal match recomendado aos alunos
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-slate-100 rounded-full text-slate-600">
            Total: {totalGeneralWinners}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coursesList.map(course => {
            const count = stats?.generalWinners[course.key] ?? 0;
            const percent = totalGeneralWinners > 0 ? Math.round((count / totalGeneralWinners) * 100) : 0;

            return (
              <div 
                key={course.key} 
                className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{course.icon}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                    {percent}%
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900">{course.label}</h3>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {count} <span className="text-xs text-slate-400 font-normal">vitórias</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${percent}%`, backgroundColor: course.color }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* METRIC CARD 2: Testes Específicos por Curso */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#2F9E41]" />
              <span>Testes Específicos Concluídos por Curso</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Contagem de testes de 10 afirmações respondidos para cada área técnica
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-slate-100 rounded-full text-slate-600">
            Total: {totalSpecificTests}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coursesList.map(course => {
            const count = stats?.specificTests[course.key] ?? 0;
            const percent = totalSpecificTests > 0 ? Math.round((count / totalSpecificTests) * 100) : 0;

            return (
              <div 
                key={course.key} 
                className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{course.icon}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                    {percent}%
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900">{course.label}</h3>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {count} <span className="text-xs text-slate-400 font-normal">testes</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${percent}%`, backgroundColor: course.color }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECENT SUBMISSIONS HISTORY TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-slate-700" />
              <span>Histórico de Submissões Recentes</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Últimos registros de testes finalizados pelos usuários
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {stats?.recentHistory?.length ?? 0} registros
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="pb-3 px-2">Trilha</th>
                <th className="pb-3 px-2">Resultado / Curso</th>
                <th className="pb-3 px-2">Afinidade / Score</th>
                <th className="pb-3 px-2">Data / Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats?.recentHistory && stats.recentHistory.length > 0 ? (
                stats.recentHistory.slice(0, 10).map((sub, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-2 font-medium text-slate-900">
                      {sub.trackName || (sub.track === 'geral' ? 'Trilha Geral' : `Específico (${sub.track})`)}
                    </td>
                    <td className="py-3 px-2">
                      <span className="font-bold text-slate-800">
                        {sub.winnerOrCourse}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="font-semibold text-[#2F9E41]">
                        {sub.percentage}%
                      </span>
                      {sub.affinityLevel && (
                        <span className="ml-2 text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {sub.affinityLevel}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-slate-400 text-xs">
                      {new Date(sub.timestamp).toLocaleString('pt-BR')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    Nenhuma submissão registrada ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CLOUD API & SETTINGS CONFIGURATION CARD */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900">
              Configuração da Nuvem (CLOUD_API_URL)
            </h3>
            <p className="text-xs text-slate-500">
              Defina ou altere a URL do endpoint REST para envio e recebimento de dados
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Endpoint REST (Nuvem / Google Sheets Webhook / API)
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={apiUrlInput}
                onChange={(e) => setApiUrlInput(e.target.value)}
                placeholder="https://sua-api.exemplo.com/endpoint ou Google Apps Script URL"
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2F9E41] focus:border-transparent"
              />
              <button
                onClick={handleSaveApiUrl}
                className="px-5 py-2.5 bg-[#2F9E41] hover:bg-[#227931] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer shrink-0"
              >
                <Save className="w-4 h-4" />
                <span>Salvar URL</span>
              </button>
            </div>
            {urlSaveMessage && (
              <p className="text-xs font-semibold text-[#2F9E41] mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{urlSaveMessage}</span>
              </p>
            )}
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              * Quando vazia, o sistema opera de forma transparente com armazenamento seguro local (localStorage). 
              Ao preencher, o sistema faz requisições POST para gravação de novos resultados e GET para recuperação das estatísticas.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              <span className="font-bold text-slate-700 block mb-0.5">Gerenciamento de Dados Locais</span>
              Limpar o histórico de testes armazenado neste navegador
            </div>

            <button
              onClick={handleClearData}
              className={`px-4 py-2 text-xs font-bold rounded-xl border transition-colors flex items-center gap-1.5 cursor-pointer ${
                confirmClear
                  ? 'bg-rose-600 text-white border-rose-600 hover:bg-rose-700 animate-pulse'
                  : 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{confirmClear ? 'Confirmar Limpeza de Dados?' : 'Limpar Histórico Local'}</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
