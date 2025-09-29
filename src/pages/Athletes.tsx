import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Trophy,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Users
} from 'lucide-react';
import { mockAthletes } from '../services/mockData';
import { Athlete } from '../types';

const Athletes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterEligibility, setFilterEligibility] = useState('all');
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);

  const regions = ['all', ...Array.from(new Set(mockAthletes.map(a => a.region)))];

  const filteredAthletes = useMemo(() => {
    return mockAthletes.filter(athlete => {
      const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          athlete.sportifyId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = filterRegion === 'all' || athlete.region === filterRegion;
      const matchesEligibility = filterEligibility === 'all' || 
                                (filterEligibility === 'eligible' && athlete.eligibility.isEligible) ||
                                (filterEligibility === 'ineligible' && !athlete.eligibility.isEligible);
      
      return matchesSearch && matchesRegion && matchesEligibility;
    });
  }, [searchTerm, filterRegion, filterEligibility]);

  const AthleteCard: React.FC<{ athlete: Athlete }> = ({ athlete }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group animate-slide-up">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            {athlete.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">{athlete.name}</h3>
              <span className="text-sm text-gray-500">#{athlete.sportifyId}</span>
            </div>
            <div className="flex items-center space-x-4 mt-1">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {athlete.age} years
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                {athlete.region}
              </div>
            </div>
            <div className="flex items-center mt-2">
              {athlete.eligibility.isEligible ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Eligible
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <XCircle className="h-3 w-3 mr-1" />
                  Ineligible
                </span>
              )}
              {athlete.eligibility.verified && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedAthlete(athlete)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Average Score</p>
          <p className="text-lg font-semibold text-gray-900">{athlete.performance.averageScore.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Tests</p>
          <p className="text-lg font-semibold text-gray-900">{athlete.performance.totalTests}</p>
        </div>
      </div>
      
      {athlete.badges.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Badges</p>
          <div className="flex flex-wrap gap-2">
            {athlete.badges.map(badge => (
              <span
                key={badge.id}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: `${badge.color}20`, color: badge.color }}
              >
                <Trophy className="h-3 w-3 mr-1" />
                {badge.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Athlete Management
          </h1>
          <p className="text-lg text-gray-600">
            Manage athlete profiles, performance data, and eligibility status
          </p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold">
          Add Athlete
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 animate-slide-up">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region === 'all' ? 'All Regions' : region}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility</label>
            <select
              value={filterEligibility}
              onChange={(e) => setFilterEligibility(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="eligible">Eligible</option>
              <option value="ineligible">Ineligible</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAthletes.map(athlete => (
          <AthleteCard key={athlete.id} athlete={athlete} />
        ))}
      </div>

      {filteredAthletes.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No athletes found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Athlete Detail Modal */}
      {selectedAthlete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Athlete Details</h3>
              <button
                onClick={() => setSelectedAthlete(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedAthlete.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sportify ID</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedAthlete.sportifyId}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedAthlete.age} years</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <p className="mt-1 text-sm text-gray-900 capitalize">{selectedAthlete.gender}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Region</label>
                <p className="mt-1 text-sm text-gray-900">{selectedAthlete.region}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <p className="mt-1 text-sm text-gray-900">{selectedAthlete.email}</p>
                <p className="text-sm text-gray-900">{selectedAthlete.phone}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Avg Score</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{selectedAthlete.performance.averageScore.toFixed(1)}%</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Tests</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{selectedAthlete.performance.totalTests}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Best Score</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{selectedAthlete.performance.bestScore.toFixed(1)}%</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedAthlete(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Athletes;
