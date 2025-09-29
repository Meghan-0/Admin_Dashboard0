import React from 'react';
import { 
  Users, 
  Calendar, 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Flag
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { getDashboardStats, getPerformanceChartData, getLeaderboardData } from '../services/mockData';

const Dashboard: React.FC = () => {
  const stats = getDashboardStats();
  const performanceData = getPerformanceChartData();
  const leaderboardData = getLeaderboardData().slice(0, 5);

  const recentActivityData = [
    { name: 'Week 1', tests: 45, athletes: 12 },
    { name: 'Week 2', tests: 52, athletes: 15 },
    { name: 'Week 3', tests: 38, athletes: 10 },
    { name: 'Week 4', tests: 61, athletes: 18 },
  ];

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    change?: string;
    delay?: number;
  }> = ({ title, value, icon, color, change, delay = 0 }) => (
    <div 
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center">
        <div className={`p-4 rounded-2xl ${color} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
          {icon}
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {change && (
            <p className="text-sm text-green-600 flex items-center font-medium">
              <TrendingUp className="h-4 w-4 mr-1" />
              {change}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Dashboard Overview
        </h1>
        <p className="text-lg text-gray-600">
          Welcome back! Here's what's happening with your athlete assessments.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Athletes"
          value={stats.totalAthletes}
          icon={<Users className="h-6 w-6 text-white" />}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          change="+12% from last month"
          delay={0}
        />
        <StatCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          icon={<Calendar className="h-6 w-6 text-white" />}
          color="bg-gradient-to-r from-green-500 to-green-600"
          delay={100}
        />
        <StatCard
          title="Completed Tests"
          value={stats.completedTests}
          icon={<FileText className="h-6 w-6 text-white" />}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          change="+8% from last week"
          delay={200}
        />
        <StatCard
          title="Avg Performance"
          value={`${stats.averagePerformance.toFixed(1)}%`}
          icon={<TrendingUp className="h-6 w-6 text-white" />}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
          delay={300}
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Recent Reports"
          value={stats.recentReports}
          icon={<FileText className="h-6 w-6 text-white" />}
          color="bg-indigo-500"
        />
        <StatCard
          title="Pending Verifications"
          value={stats.pendingVerifications}
          icon={<AlertTriangle className="h-6 w-6 text-white" />}
          color="bg-yellow-500"
        />
        <StatCard
          title="Flagged Attempts"
          value={stats.flaggedAttempts}
          icon={<Flag className="h-6 w-6 text-white" />}
          color="bg-red-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={recentActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="tests" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Tests Completed"
              />
              <Line 
                type="monotone" 
                dataKey="athletes" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Active Athletes"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Leaderboard and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-3">
            {leaderboardData.map((athlete, index) => (
              <div key={athlete.athleteId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-orange-600' : 'bg-gray-300'
                  }`}>
                    {athlete.rank}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{athlete.athleteName}</p>
                    <p className="text-sm text-gray-500">{athlete.region}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{athlete.score.toFixed(1)}%</p>
                  <p className="text-sm text-gray-500">{athlete.badges} badges</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Test verification completed</p>
                <p className="text-sm text-gray-500">Sarah Chen's speed test verified</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Flag className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Suspicious activity flagged</p>
                <p className="text-sm text-gray-500">Marcus Williams' test flagged for review</p>
                <p className="text-xs text-gray-400">4 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">New athlete registered</p>
                <p className="text-sm text-gray-500">Alex Johnson joined the platform</p>
                <p className="text-xs text-gray-400">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Calendar className="h-5 w-5 text-purple-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Event created</p>
                <p className="text-sm text-gray-500">Winter Championship 2024 scheduled</p>
                <p className="text-xs text-gray-400">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
