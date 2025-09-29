import { Athlete, Event, TestResult, Badge, DashboardStats, PerformanceChartData, LeaderboardEntry } from '../types';

export const mockAthletes: Athlete[] = [
  {
    id: '1',
    sportifyId: 'SP001',
    name: 'Alex Johnson',
    age: 22,
    gender: 'male',
    region: 'North America',
    email: 'alex.johnson@email.com',
    phone: '+1-555-0123',
    performance: {
      averageScore: 87.5,
      totalTests: 15,
      bestScore: 95.2,
      lastTestDate: '2024-01-15'
    },
    badges: [
      { id: '1', name: 'Speed Demon', description: 'Achieved top 10% in speed tests', icon: '⚡', color: '#FFD700', criteria: { type: 'score', value: 90, description: 'Score above 90' }, earnedAt: '2024-01-10' },
      { id: '2', name: 'Consistent Performer', description: 'Completed 10+ tests', icon: '🎯', color: '#4CAF50', criteria: { type: 'participation', value: 10, description: 'Complete 10 tests' }, earnedAt: '2024-01-05' }
    ],
    eligibility: {
      isEligible: true,
      verified: true,
      verificationDate: '2024-01-01'
    },
    createdAt: '2023-12-01',
    lastActive: '2024-01-15'
  },
  {
    id: '2',
    sportifyId: 'SP002',
    name: 'Sarah Chen',
    age: 20,
    gender: 'female',
    region: 'Asia Pacific',
    email: 'sarah.chen@email.com',
    phone: '+86-138-0013-8000',
    performance: {
      averageScore: 92.3,
      totalTests: 12,
      bestScore: 98.1,
      lastTestDate: '2024-01-14'
    },
    badges: [
      { id: '3', name: 'Elite Athlete', description: 'Consistently scores above 90', icon: '🏆', color: '#FF6B6B', criteria: { type: 'score', value: 90, description: 'Average score above 90' }, earnedAt: '2024-01-12' }
    ],
    eligibility: {
      isEligible: true,
      verified: true,
      verificationDate: '2023-12-15'
    },
    createdAt: '2023-11-20',
    lastActive: '2024-01-14'
  },
  {
    id: '3',
    sportifyId: 'SP003',
    name: 'Marcus Williams',
    age: 25,
    gender: 'male',
    region: 'Europe',
    email: 'marcus.williams@email.com',
    phone: '+44-20-7946-0958',
    performance: {
      averageScore: 78.9,
      totalTests: 8,
      bestScore: 85.4,
      lastTestDate: '2024-01-10'
    },
    badges: [],
    eligibility: {
      isEligible: true,
      verified: false
    },
    createdAt: '2023-12-10',
    lastActive: '2024-01-10'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Winter Championship 2024',
    description: 'Annual winter sports championship featuring speed and endurance tests',
    date: '2024-02-15',
    venue: {
      type: 'offline',
      location: 'Olympic Sports Complex, Denver'
    },
    eligibilityRules: {
      minAge: 18,
      maxAge: 30,
      genders: ['male', 'female'],
      regions: ['North America', 'Europe', 'Asia Pacific']
    },
    requiredTests: ['Speed Test', 'Endurance Test', 'Agility Test'],
    registeredAthletes: ['1', '2'],
    status: 'upcoming',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Virtual Sprint Challenge',
    description: 'Online sprint challenge for athletes worldwide',
    date: '2024-01-25',
    venue: {
      type: 'online',
      location: 'Virtual Platform'
    },
    eligibilityRules: {
      minAge: 16,
      maxAge: 35,
      genders: ['male', 'female', 'other'],
      regions: ['North America', 'Europe', 'Asia Pacific', 'South America', 'Africa']
    },
    requiredTests: ['Sprint Test', 'Reaction Time Test'],
    registeredAthletes: ['1', '2', '3'],
    status: 'upcoming',
    createdAt: '2024-01-05'
  }
];

export const mockTestResults: TestResult[] = [
  {
    id: '1',
    athleteId: '1',
    eventId: '1',
    testType: 'Speed Test',
    score: 95.2,
    maxScore: 100,
    metrics: {
      '100m_time': 10.8,
      'reaction_time': 0.12,
      'acceleration': 8.5
    },
    videoUrl: 'https://example.com/video1.mp4',
    images: ['https://example.com/image1.jpg'],
    submittedAt: '2024-01-15T10:30:00Z',
    verified: true,
    flagged: false,
    verifiedBy: 'admin',
    verifiedAt: '2024-01-15T11:00:00Z'
  },
  {
    id: '2',
    athleteId: '2',
    eventId: '1',
    testType: 'Speed Test',
    score: 98.1,
    maxScore: 100,
    metrics: {
      '100m_time': 10.2,
      'reaction_time': 0.10,
      'acceleration': 9.1
    },
    videoUrl: 'https://example.com/video2.mp4',
    images: ['https://example.com/image2.jpg'],
    submittedAt: '2024-01-14T14:20:00Z',
    verified: true,
    flagged: false,
    verifiedBy: 'admin',
    verifiedAt: '2024-01-14T15:00:00Z'
  },
  {
    id: '3',
    athleteId: '3',
    eventId: '2',
    testType: 'Sprint Test',
    score: 72.3,
    maxScore: 100,
    metrics: {
      '50m_time': 6.8,
      'reaction_time': 0.18,
      'acceleration': 6.2
    },
    videoUrl: 'https://example.com/video3.mp4',
    images: ['https://example.com/image3.jpg'],
    submittedAt: '2024-01-10T09:15:00Z',
    verified: false,
    flagged: true,
    flagReason: 'Suspicious acceleration pattern detected',
    verifiedBy: undefined,
    verifiedAt: undefined
  }
];

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Speed Demon',
    description: 'Achieved top 10% in speed tests',
    icon: '⚡',
    color: '#FFD700',
    criteria: {
      type: 'score',
      value: 90,
      description: 'Score above 90 in speed tests'
    }
  },
  {
    id: '2',
    name: 'Consistent Performer',
    description: 'Completed 10+ tests',
    icon: '🎯',
    color: '#4CAF50',
    criteria: {
      type: 'participation',
      value: 10,
      description: 'Complete 10 tests'
    }
  },
  {
    id: '3',
    name: 'Elite Athlete',
    description: 'Consistently scores above 90',
    icon: '🏆',
    color: '#FF6B6B',
    criteria: {
      type: 'score',
      value: 90,
      description: 'Average score above 90'
    }
  },
  {
    id: '4',
    name: 'Streak Master',
    description: 'Maintained 7-day test streak',
    icon: '🔥',
    color: '#FF5722',
    criteria: {
      type: 'streak',
      value: 7,
      description: 'Complete tests for 7 consecutive days'
    }
  }
];

export const getDashboardStats = (): DashboardStats => ({
  totalAthletes: mockAthletes.length,
  upcomingEvents: mockEvents.filter(e => e.status === 'upcoming').length,
  completedTests: mockTestResults.filter(t => t.verified).length,
  averagePerformance: mockAthletes.reduce((sum, a) => sum + a.performance.averageScore, 0) / mockAthletes.length,
  recentReports: mockTestResults.filter(t => {
    const submittedDate = new Date(t.submittedAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return submittedDate > weekAgo;
  }).length,
  pendingVerifications: mockTestResults.filter(t => !t.verified && !t.flagged).length,
  flaggedAttempts: mockTestResults.filter(t => t.flagged).length
});

export const getPerformanceChartData = (): PerformanceChartData[] => [
  { name: 'Speed', value: 85, color: '#FF6B6B' },
  { name: 'Endurance', value: 78, color: '#4ECDC4' },
  { name: 'Agility', value: 92, color: '#45B7D1' },
  { name: 'Strength', value: 88, color: '#96CEB4' },
  { name: 'Flexibility', value: 75, color: '#FFEAA7' }
];

export const getLeaderboardData = (): LeaderboardEntry[] => {
  return mockAthletes
    .map(athlete => ({
      rank: 0, // Will be set after sorting
      athleteId: athlete.id,
      athleteName: athlete.name,
      score: athlete.performance.averageScore,
      badges: athlete.badges.length,
      region: athlete.region
    }))
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
};
