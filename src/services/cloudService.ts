/**
 * Serviço de Integração com Nuvem (API) e Armazenamento Local
 * IFPR Campus Assis Chateaubriand - Processo Seletivo 2027
 */

import { AppStats, CourseKey, TestSubmissionPayload } from '../types';

// Constante para configuração do endpoint REST da Nuvem (Google Sheets Script, Firebase, Node API, etc.)
export const CLOUD_API_URL = "https://teste-vocacional-ifpr.onrender.com/api/stat";

const STORAGE_KEY_TESTS = 'ifpr_vocacional_tests_v1';
const STORAGE_KEY_CUSTOM_API = 'ifpr_vocacional_custom_api_url';

// Recupera a URL ativa (configurada em código ou sobrescrita no painel admin)
export function getActiveCloudApiUrl(): string {
  if (typeof window !== 'undefined') {
    const customUrl = localStorage.getItem(STORAGE_KEY_CUSTOM_API);
    if (customUrl && customUrl.trim().length > 0) {
      return customUrl.trim();
    }
  }
  return CLOUD_API_URL;
}

export function setActiveCloudApiUrl(url: string): void {
  if (typeof window !== 'undefined') {
    if (url.trim().length > 0) {
      localStorage.setItem(STORAGE_KEY_CUSTOM_API, url.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY_CUSTOM_API);
    }
  }
}

/**
 * Função assíncrona para envio de resultados para a nuvem
 * com fallback transparente para localStorage.
 */
export async function salvarDadosNuvem(payload: TestSubmissionPayload): Promise<{ success: boolean; source: 'cloud' | 'local'; error?: string }> {
  // Salva primeiro localmente como garantia incondicional
  salvarLocalmente(payload);

  const activeUrl = getActiveCloudApiUrl();

  if (!activeUrl || activeUrl.trim() === "") {
    console.info("[IFPR Vocacional] CLOUD_API_URL não configurada. Dado salvo com sucesso no localStorage.");
    return { success: true, source: 'local' };
  }

  try {
    const response = await fetch(activeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.info("[IFPR Vocacional] Resultado enviado com sucesso para a Nuvem:", activeUrl);
    return { success: true, source: 'cloud' };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.warn("[IFPR Vocacional] Falha ao enviar para nuvem. Fallback ativo no localStorage:", errorMessage);
    return { success: false, source: 'local', error: errorMessage };
  }
}

/**
 * Função assíncrona para buscar métricas e estatísticas globais
 */
export async function buscarDadosNuvem(): Promise<{ stats: AppStats; source: 'cloud' | 'local' }> {
  const activeUrl = getActiveCloudApiUrl();

  if (activeUrl && activeUrl.trim() !== "") {
    try {
      const response = await fetch(activeUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const cloudData = await response.json();
        if (cloudData && typeof cloudData.totalTests === 'number') {
          return { stats: cloudData, source: 'cloud' };
        }
      }
    } catch (err) {
      console.warn("[IFPR Vocacional] Erro ao buscar da nuvem. Carregando dados locais:", err);
    }
  }

  // Fallback: calcula a partir dos dados do localStorage
  const localStats = calcularEstatisticasLocais();
  return { stats: localStats, source: 'local' };
}

// Salva o registro no histórico local
function salvarLocalmente(item: TestSubmissionPayload): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getLocalHistory();
    current.unshift(item);
    // Guarda até os últimos 200 registros locais
    localStorage.setItem(STORAGE_KEY_TESTS, JSON.stringify(current.slice(0, 200)));
  } catch (e) {
    console.error("Erro ao salvar no localStorage:", e);
  }
}

export function getLocalHistory(): TestSubmissionPayload[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TESTS);
    if (!raw) {
      // Seed inicial demonstrativo para o campus não começar com tela vazia
      const seedData: TestSubmissionPayload[] = [
        { track: 'geral', trackName: 'Trilha Geral', winnerOrCourse: 'Informática', winnerKey: 'info', percentage: 40, timestamp: new Date(Date.now() - 3600000 * 4).toISOString() },
        { track: 'geral', trackName: 'Trilha Geral', winnerOrCourse: 'Agropecuária', winnerKey: 'agro', percentage: 50, timestamp: new Date(Date.now() - 3600000 * 6).toISOString() },
        { track: 'geral', trackName: 'Trilha Geral', winnerOrCourse: 'Mecatrônica', winnerKey: 'meca', percentage: 40, timestamp: new Date(Date.now() - 3600000 * 12).toISOString() },
        { track: 'geral', trackName: 'Trilha Geral', winnerOrCourse: 'Comércio', winnerKey: 'comercio', percentage: 30, timestamp: new Date(Date.now() - 3600000 * 18).toISOString() },
        { track: 'agro', trackName: 'Agropecuária Específico', winnerOrCourse: 'Agropecuária', winnerKey: 'agro', percentage: 90, affinityLevel: 'Alta Vocação', timestamp: new Date(Date.now() - 3600000 * 20).toISOString() },
        { track: 'info', trackName: 'Informática Específico', winnerOrCourse: 'Informática', winnerKey: 'info', percentage: 85, affinityLevel: 'Alta Vocação', timestamp: new Date(Date.now() - 3600000 * 24).toISOString() },
        { track: 'meca', trackName: 'Mecatrônica Específico', winnerOrCourse: 'Mecatrônica', winnerKey: 'meca', percentage: 75, affinityLevel: 'Alta Vocação', timestamp: new Date(Date.now() - 3600000 * 30).toISOString() },
        { track: 'comercio', trackName: 'Comércio Específico', winnerOrCourse: 'Comércio', winnerKey: 'comercio', percentage: 65, affinityLevel: 'Interesse Moderado', timestamp: new Date(Date.now() - 3600000 * 36).toISOString() }
      ];
      localStorage.setItem(STORAGE_KEY_TESTS, JSON.stringify(seedData));
      return seedData;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Erro ao ler localStorage:", e);
    return [];
  }
}

export function calcularEstatisticasLocais(): AppStats {
  const history = getLocalHistory();
  
  const stats: AppStats = {
    totalTests: history.length,
    generalWinners: {
      agro: 0,
      info: 0,
      meca: 0,
      comercio: 0
    },
    specificTests: {
      agro: 0,
      info: 0,
      meca: 0,
      comercio: 0
    },
    recentHistory: history
  };

  history.forEach(sub => {
    if (sub.track === 'geral') {
      if (sub.winnerKey && stats.generalWinners[sub.winnerKey] !== undefined) {
        stats.generalWinners[sub.winnerKey]++;
      } else {
        // Fallback por nome
        const name = (sub.winnerOrCourse || '').toLowerCase();
        if (name.includes('agro')) stats.generalWinners.agro++;
        else if (name.includes('info')) stats.generalWinners.info++;
        else if (name.includes('meca')) stats.generalWinners.meca++;
        else if (name.includes('com')) stats.generalWinners.comercio++;
      }
    } else {
      const key = sub.track as CourseKey;
      if (stats.specificTests[key] !== undefined) {
        stats.specificTests[key]++;
      }
    }
  });

  return stats;
}

export function limparDadosLocais(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_TESTS);
  }
}
