import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Flag, 
  AlertTriangle,
  Play,
  Image as ImageIcon,
  FileText
} from 'lucide-react';
import { mockTestResults, mockAthletes, mockEvents } from '../services/mockData';
import { TestResult } from '../types';

const TestData: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFlagged, setFilterFlagged] = useState('all');
  const [selectedTest, setSelectedTest] = useState<TestResult | null>(null);

  const getAthleteName = (athleteId: string) => {
    const athlete = mockAthletes.find(a => a.id === athleteId);
    return athlete ? athlete.name : 'Unknown Athlete';
  };

  const getEventName = (eventId: string) => {
    const event = mockEvents.find(e => e.id === eventId);
    return event ? event.name : 'Unknown Event';
  };

  const filteredTests = useMemo(() => {
    return mockTestResults.filter(test => {
      const athleteName = getAthleteName(test.athleteId).toLowerCase();
      const eventName = getEventName(test.eventId).toLowerCase();
      const matchesSearch = athleteName.includes(searchTerm.toLowerCase()) ||
                          eventName.includes(searchTerm.toLowerCase()) ||
                          test.testType.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || 
                           (filterStatus === 'verified' && test.verified) ||
                           (filterStatus === 'pending' && !test.verified && !test.flagged) ||
                           (filterStatus === 'flagged' && test.flagged);
      
      const matchesFlagged = filterFlagged === 'all' ||
                            (filterFlagged === 'flagged' && test.flagged) ||
                            (filterFlagged === 'clean' && !test.flagged);
      
      return matchesSearch && matchesStatus && matchesFlagged;
    });
  }, [searchTerm, filterStatus, filterFlagged]);

  const TestCard: React.FC<{ test: TestResult }> = ({ test }) => {
    const athleteName = getAthleteName(test.athleteId);
    const eventName = getEventName(test.eventId);

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{test.testType}</h3>
              <div className="flex items-center space-x-2">
                {test.verified ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </span>
                ) : test.flagged ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <Flag className="h-3 w-3 mr-1" />
                    Flagged
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Pending
                  </span>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Athlete:</span> {athleteName}</p>
              <p><span className="font-medium">Event:</span> {eventName}</p>
              <p><span className="font-medium">Submitted:</span> {new Date(test.submittedAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedTest(test)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Score</p>
            <p className="text-2xl font-bold text-gray-900">{test.score.toFixed(1)}/{test.maxScore}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Percentage</p>
            <p className="text-2xl font-bold text-gray-900">{((test.score / test.maxScore) * 100).toFixed(1)}%</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {test.videoUrl && (
              <div className="flex items-center text-sm text-gray-600">
                <Play className="h-4 w-4 mr-1" />
                Video
              </div>
            )}
            {test.images.length > 0 && (
              <div className="flex items-center text-sm text-gray-600">
                <ImageIcon className="h-4 w-4 mr-1" />
                {test.images.length} image{test.images.length > 1 ? 's' : ''}
              </div>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {Object.keys(test.metrics).length} metrics
          </div>
        </div>

        {test.flagged && test.flagReason && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <Flag className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
              <div>
                <p className="text-sm font-medium text-red-800">Flagged for Review</p>
                <p className="text-sm text-red-700">{test.flagReason}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const generatePDF = (test: TestResult) => {
    // In a real app, this would generate and download a PDF
    console.log('Generating PDF for test:', test.id);
    alert('PDF generation would be implemented here');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Test Data Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Review, verify, and manage athlete test submissions and performance data
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Verify All
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by athlete, event, or test type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Flagged</label>
            <select
              value={filterFlagged}
              onChange={(e) => setFilterFlagged(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="flagged">Flagged Only</option>
              <option value="clean">Clean Only</option>
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
        {filteredTests.map(test => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>

      {filteredTests.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No test data found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Test Detail Modal */}
      {selectedTest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Test Details</h3>
              <button
                onClick={() => setSelectedTest(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Test Type</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedTest.testType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Score</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {selectedTest.score.toFixed(1)}/{selectedTest.maxScore} ({(selectedTest.score / selectedTest.maxScore * 100).toFixed(1)}%)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Athlete</label>
                  <p className="mt-1 text-sm text-gray-900">{getAthleteName(selectedTest.athleteId)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Event</label>
                  <p className="mt-1 text-sm text-gray-900">{getEventName(selectedTest.eventId)}</p>
                </div>
              </div>

              {/* Metrics */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Performance Metrics</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(selectedTest.metrics).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 capitalize">{key.replace('_', ' ')}</p>
                      <p className="text-lg font-semibold text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media */}
              {(selectedTest.videoUrl || selectedTest.images.length > 0) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Media</label>
                  <div className="flex space-x-4">
                    {selectedTest.videoUrl && (
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <Play className="h-5 w-5 text-gray-500" />
                        <span className="text-sm text-gray-700">Video Available</span>
                      </div>
                    )}
                    {selectedTest.images.length > 0 && (
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <ImageIcon className="h-5 w-5 text-gray-500" />
                        <span className="text-sm text-gray-700">{selectedTest.images.length} Image{selectedTest.images.length > 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Status and Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  {selectedTest.verified ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Verified
                    </span>
                  ) : selectedTest.flagged ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      <Flag className="h-4 w-4 mr-1" />
                      Flagged
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Pending Review
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => generatePDF(selectedTest)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                  {!selectedTest.verified && !selectedTest.flagged && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verify
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestData;
