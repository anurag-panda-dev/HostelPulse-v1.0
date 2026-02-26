import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { AppHeader } from '../../components/AppHeader';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { StatusChip } from '../../components/StatusChip';
import { EmptyState } from '../../components/EmptyState';
import { getLeavesByStudent } from '../../data/mockData';
import { FileText, Plus, Filter } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function LeaveRequests() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const leaves = getLeavesByStudent(user!.id);

  const filteredLeaves = leaves.filter(leave => {
    if (activeTab === 'all') return true;
    return leave.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        title="Leave Requests"
        onBack={() => navigate('/student')}
        actions={
          <Button
            size="sm"
            onClick={() => navigate('/student/requests/leaves/new')}
          >
            <Plus className="w-4 h-4 mr-1" />
            New
          </Button>
        }
      />

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {filteredLeaves.length === 0 ? (
              <EmptyState
                icon={FileText}
                title="No leave requests"
                description={
                  activeTab === 'all'
                    ? 'You haven\'t submitted any leave requests yet.'
                    : `No ${activeTab} leave requests.`
                }
                actionLabel="Request Leave"
                onAction={() => navigate('/student/requests/leaves/new')}
              />
            ) : (
              <div className="space-y-3">
                {filteredLeaves.map((leave) => (
                  <Card
                    key={leave.id}
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/student/requests/leaves/${leave.id}`)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 capitalize">
                          {leave.type.replace('-', ' ')} Leave
                        </h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {leave.reason}
                        </p>
                      </div>
                      <StatusChip status={leave.status} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                      <span>
                        {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}
                      </span>
                      <span>
                        {formatDistanceToNow(new Date(leave.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
