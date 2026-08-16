export type CourseKey = 'agro' | 'info' | 'meca' | 'comercio';

export type TrackType = 'geral' | CourseKey;

export interface QuestionOption {
  id: string;
  letter?: string;
  text: string;
  courseKey?: CourseKey; // For general track
  points?: number;       // For specific tracks (Sim=10, Talvez=5, Nao=0)
}

export interface Question {
  id: number;
  prompt: string;
  subtitle?: string;
  options: QuestionOption[];
}

export interface CourseData {
  key: CourseKey;
  shortName: string;
  fullName: string;
  tagline: string;
  icon: string;
  themeColor: string;
  themeLightBg: string;
  themeBorder: string;
  resultTitle: string;
  about: string;
  whereToWork: string;
  keySkills: string[];
  campusPerks: string[];
}

export interface GeneralRankingItem {
  courseKey: CourseKey;
  name: string;
  score: number;
  percentage: number;
  icon: string;
  color: string;
}

export interface GeneralTestResult {
  track: 'geral';
  ranking: GeneralRankingItem[];
  winner: CourseData;
  timestamp: string;
}

export type AffinityLevel = 'Alta Vocação' | 'Interesse Moderado' | 'Baixa Vocação';

export interface SpecificTestResult {
  track: CourseKey;
  course: CourseData;
  score: number;
  maxScore: number;
  percentage: number;
  affinityLevel: AffinityLevel;
  message: string;
  timestamp: string;
}

export type QuizResult = GeneralTestResult | SpecificTestResult;

export interface TestSubmissionPayload {
  track: TrackType;
  trackName: string;
  winnerOrCourse: string;
  winnerKey?: CourseKey;
  percentage: number;
  affinityLevel?: string;
  timestamp: string;
}

export interface AppStats {
  totalTests: number;
  generalWinners: {
    agro: number;
    info: number;
    meca: number;
    comercio: number;
  };
  specificTests: {
    agro: number;
    info: number;
    meca: number;
    comercio: number;
  };
  recentHistory: TestSubmissionPayload[];
}
