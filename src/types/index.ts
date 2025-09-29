export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'moderator';
}

export interface Athlete {
  id: string;
  sportifyId: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  region: string;
  email: string;
  phone: string;
  profileImage?: string;
  performance: {
    averageScore: number;
    totalTests: number;
    bestScore: number;
    lastTestDate: string;
  };
  badges: Badge[];
  eligibility: {
    isEligible: boolean;
    verified: boolean;
    verificationDate?: string;
  };
  createdAt: string;
  lastActive: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  venue: {
    type: 'online' | 'offline';
    location: string;
  };
  eligibilityRules: {
    minAge: number;
    maxAge: number;
    genders: string[];
    regions: string[];
  };
  requiredTests: string[];
  registeredAthletes: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface TestResult {
  id: string;
  athleteId: string;
  eventId: string;
  testType: string;
  score: number;
  maxScore: number;
  metrics: Record<string, number>;
  videoUrl?: string;
  images: string[];
  submittedAt: string;
  verified: boolean;
  flagged: boolean;
  flagReason?: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  criteria: {
    type: 'score' | 'streak' | 'participation' | 'achievement';
    value: number;
    description: string;
  };
  earnedAt?: string;
}

export interface DashboardStats {
  totalAthletes: number;
  upcomingEvents: number;
  completedTests: number;
  averagePerformance: number;
  recentReports: number;
  pendingVerifications: number;
  flaggedAttempts: number;
}

export interface PerformanceChartData {
  name: string;
  value: number;
  color?: string;
}

export interface LeaderboardEntry {
  rank: number;
  athleteId: string;
  athleteName: string;
  score: number;
  badges: number;
  region: string;
}
