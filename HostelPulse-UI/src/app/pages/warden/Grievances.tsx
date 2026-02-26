import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { StatusChip } from '../../components/StatusChip';
import { mockGrievances } from '../../data/mockData';
import { Search, Filter } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function WardenGrievances() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGrievances = mockGrievances.filter(grievance => {
    const matchesTab =
      activeTab === 'all' ? true :
      grievance.status === activeTab;

    const matchesSearch =
      searchQuery === '' ||
      grievance.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grievance.roomNumber.includes(searchQuery) ||
      grievance.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grievance.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const openCount = mockGrievances.filter(g => g.status === 'open').length;
  const inProgressCount = mockGrievances.filter(g => g.status === 'in-progress').length;
  const resolvedCount = mockGrievances.filter(g => g.status === 'resolved').length;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Grievances</h1>
        <p className="text-gray-500 mt-1">Track and manage student grievances</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Open</p>
          <p className="text-2xl font-semibold text-blue-600">{openCount}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-2xl font-semibold text-purple-600">{inProgressCount}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Resolved</p>
          <p className="text-2xl font-semibold text-green-600">{resolvedCount}</p>
        </Card>
      </div>

      <Card className="p-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student, category, or description..."
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All ({mockGrievances.length})</TabsTrigger>
            <TabsTrigger value="open">Open ({openCount})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({inProgressCount})</TabsTrigger>
            <TabsTrigger value="resolved">Resolved ({resolvedCount})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-3">
              {filteredGrievances.map((grievance) => (
                <div
                  key={grievance.id}
                  className="flex items-start justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => navigate(`/warden/grievances/${grievance.id}`)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{grievance.studentName}</h4>
                      <span className="text-sm text-gray-500">Room {grievance.roomNumber}</span>
                      <StatusChip status={grievance.priority} />
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{grievance.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{grievance.category} • {grievance.subcategory}</span>
                      <span>{formatDistanceToNow(new Date(grievance.createdAt), { addSuffix: true })}</span>
                      {grievance.assignedTo && (
                        <span className="text-purple-600">Assigned to staff</span>
                      )}
                    </div>
                  </div>
                  <StatusChip status={grievance.status} />
                </div>
              ))}

              {filteredGrievances.length === 0 && (
                <div className="text-center py-12">
                  <Filter className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No grievances found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
