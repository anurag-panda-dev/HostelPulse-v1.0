import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { StatusChip } from '../../components/StatusChip';
import { mockLeaveRequests } from '../../data/mockData';
import { Search, Filter } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function WardenLeaves() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeaves = mockLeaveRequests.filter(leave => {
    const matchesTab =
      activeTab === 'all' ? true :
      leave.status === activeTab;

    const matchesSearch =
      searchQuery === '' ||
      leave.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.roomNumber.includes(searchQuery) ||
      leave.reason.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const pendingCount = mockLeaveRequests.filter(l => l.status === 'pending').length;
  const approvedCount = mockLeaveRequests.filter(l => l.status === 'approved').length;
  const rejectedCount = mockLeaveRequests.filter(l => l.status === 'rejected').length;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Leave Requests</h1>
        <p className="text-gray-500 mt-1">Review and manage student leave requests</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-semibold text-yellow-600">{pendingCount}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Approved</p>
          <p className="text-2xl font-semibold text-green-600">{approvedCount}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Rejected</p>
          <p className="text-2xl font-semibold text-red-600">{rejectedCount}</p>
        </Card>
      </div>

      <Card className="p-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, room, or reason..."
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All ({mockLeaveRequests.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-3">
              {filteredLeaves.map((leave) => (
                <div
                  key={leave.id}
                  className="flex items-start justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => navigate(`/warden/leaves/${leave.id}`)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{leave.studentName}</h4>
                      <span className="text-sm text-gray-500">Room {leave.roomNumber}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{leave.reason}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="capitalize">{leave.type.replace('-', ' ')}</span>
                      <span>
                        {new Date(leave.fromDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        {' - '}
                        {new Date(leave.toDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                      <span>{formatDistanceToNow(new Date(leave.createdAt), { addSuffix: true })}</span>
                    </div>
                  </div>
                  <StatusChip status={leave.status} />
                </div>
              ))}

              {filteredLeaves.length === 0 && (
                <div className="text-center py-12">
                  <Filter className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No leave requests found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
