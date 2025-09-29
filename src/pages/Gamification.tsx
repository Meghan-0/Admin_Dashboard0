import React, { useState } from 'react';
import { 
  Trophy, 
  Plus, 
  Edit, 
  Trash2, 
  Crown, 
  Star, 
  Target,
  Users,
  TrendingUp,
  Award,
  Flame
} from 'lucide-react';
import { mockBadges, getLeaderboardData } from '../services/mockData';
import { Badge, LeaderboardEntry } from '../types';

const Gamification: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'badges' | 'leaderboard' | 'rules'>('badges');
  const [showCreateBadge, setShowCreateBadge] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [newBadge, setNewBadge] = useState({
    name: '',
    description: '',
    icon: '🏆',
    color: '#FFD700',
    criteriaType: 'score' as 'score' | 'streak' | 'participation' | 'achievement',
    criteriaValue: 0,
    criteriaDescription: ''
  });

  const leaderboardData = getLeaderboardData();

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Award className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-orange-600" />;
    return <span className="text-sm font-bold text-gray-500">#{rank}</span>;
  };

  const getCriteriaIcon = (type: string) => {
    switch (type) {
      case 'score': return <Target className="h-4 w-4" />;
      case 'streak': return <Flame className="h-4 w-4" />;
      case 'participation': return <Users className="h-4 w-4" />;
      case 'achievement': return <Trophy className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const BadgeCard: React.FC<{ badge: Badge }> = ({ badge }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${badge.color}20` }}
          >
            {badge.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{badge.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{badge.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedBadge(badge)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          {getCriteriaIcon(badge.criteria.type)}
          <span className="text-sm font-medium text-gray-700">Criteria:</span>
          <span className="text-sm text-gray-600">{badge.criteria.description}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Value:</span>
            <span 
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${badge.color}20`, color: badge.color }}
            >
              {badge.criteria.value}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Earned by {Math.floor(Math.random() * 50) + 10} athletes
          </div>
        </div>
      </div>
    </div>
  );

  const LeaderboardRow: React.FC<{ entry: LeaderboardEntry; index: number }> = ({ entry, index }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-8 h-8">
          {getRankIcon(entry.rank)}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{entry.athleteName}</h4>
          <p className="text-sm text-gray-500">{entry.region}</p>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{entry.score.toFixed(1)}%</p>
          <p className="text-xs text-gray-500">Avg Score</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{entry.badges}</p>
          <p className="text-xs text-gray-500">Badges</p>
        </div>
        <div className="flex items-center space-x-1">
          <Trophy className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-900">{entry.rank}</span>
        </div>
      </div>
    </div>
  );

  const handleCreateBadge = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    console.log('Creating badge:', newBadge);
    setShowCreateBadge(false);
    setNewBadge({
      name: '',
      description: '',
      icon: '🏆',
      color: '#FFD700',
      criteriaType: 'score',
      criteriaValue: 0,
      criteriaDescription: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gamification Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage badges, leaderboards, and engagement features
          </p>
        </div>
        <button
          onClick={() => setShowCreateBadge(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Badge
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'badges', name: 'Badges', icon: Trophy },
            { id: 'leaderboard', name: 'Leaderboard', icon: TrendingUp },
            { id: 'rules', name: 'Rules & Settings', icon: Target }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockBadges.map(badge => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Leaderboard</h3>
            <div className="space-y-3">
              {leaderboardData.map((entry, index) => (
                <LeaderboardRow key={entry.athleteId} entry={entry} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Badge Rules</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Target className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Score-based Badges</p>
                    <p className="text-sm text-gray-600">Awarded when athletes achieve specific score thresholds</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Flame className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Streak Badges</p>
                    <p className="text-sm text-gray-600">Awarded for consistent daily participation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Participation Badges</p>
                    <p className="text-sm text-gray-600">Awarded for completing a certain number of tests</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Leaderboard Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Update Frequency</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                    <option>Real-time</option>
                    <option>Every hour</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scoring Method</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                    <option>Average Score</option>
                    <option>Best Score</option>
                    <option>Total Points</option>
                    <option>Weighted Average</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Display Limit</label>
                  <input
                    type="number"
                    defaultValue={50}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Badge Modal */}
      {showCreateBadge && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create New Badge</h3>
              <button
                onClick={() => setShowCreateBadge(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Trash2 className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreateBadge} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Badge Name</label>
                  <input
                    type="text"
                    required
                    value={newBadge.name}
                    onChange={(e) => setNewBadge({...newBadge, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter badge name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <input
                    type="text"
                    value={newBadge.icon}
                    onChange={(e) => setNewBadge({...newBadge, icon: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="🏆"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  value={newBadge.description}
                  onChange={(e) => setNewBadge({...newBadge, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter badge description"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <input
                    type="color"
                    value={newBadge.color}
                    onChange={(e) => setNewBadge({...newBadge, color: e.target.value})}
                    className="w-full h-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Criteria Type</label>
                  <select
                    value={newBadge.criteriaType}
                    onChange={(e) => setNewBadge({...newBadge, criteriaType: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="score">Score</option>
                    <option value="streak">Streak</option>
                    <option value="participation">Participation</option>
                    <option value="achievement">Achievement</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Criteria Value</label>
                  <input
                    type="number"
                    required
                    value={newBadge.criteriaValue}
                    onChange={(e) => setNewBadge({...newBadge, criteriaValue: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Criteria Description</label>
                  <input
                    type="text"
                    required
                    value={newBadge.criteriaDescription}
                    onChange={(e) => setNewBadge({...newBadge, criteriaDescription: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Score above 90"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateBadge(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Badge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Badge Details</h3>
              <button
                onClick={() => setSelectedBadge(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Trash2 className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl"
                  style={{ backgroundColor: `${selectedBadge.color}20` }}
                >
                  {selectedBadge.icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{selectedBadge.name}</h4>
                  <p className="text-gray-600">{selectedBadge.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Criteria Type</label>
                  <p className="mt-1 text-sm text-gray-900 capitalize">{selectedBadge.criteria.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Criteria Value</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBadge.criteria.value}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Criteria Description</label>
                <p className="mt-1 text-sm text-gray-900">{selectedBadge.criteria.description}</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedBadge(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Edit Badge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gamification;
