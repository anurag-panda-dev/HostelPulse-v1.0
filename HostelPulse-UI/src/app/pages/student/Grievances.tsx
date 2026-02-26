import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { AppHeader } from '../../components/AppHeader';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { StatusChip } from '../../components/StatusChip';
import { EmptyState } from '../../components/EmptyState';
import { getGrievancesByStudent } from '../../data/mockData';
import { AlertCircle, Plus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function Grievances() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const grievances = getGrievancesByStudent(user!.id);

  const filteredGrievances = grievances.filter(g => {
    if (activeTab === 'all') return true;
    if (activeTab === 'open') return g.status === 'open';
    if (activeTab === 'in-progress') return g.status === 'in-progress';
    return g.status === 'resolved';
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        title="Grievances"
        onBack={() => navigate('/student')}
        actions={
          <Button
            size="sm"
            onClick={() => navigate('/student/requests/grievances/new')}
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
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {filteredGrievances.length === 0 ? (
              <EmptyState
                icon={AlertCircle}
                title="No grievances"
                description={
                  activeTab === 'all'
                    ? 'You haven\'t submitted any grievances yet.'
                    : `No ${activeTab.replace('-', ' ')} grievances.`
                }
                actionLabel="Report Issue"
                onAction={() => navigate('/student/requests/grievances/new')}
              />
            ) : (
              <div className="space-y-3">
                {filteredGrievances.map((grievance) => (
                  <Card
                    key={grievance.id}
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/student/requests/grievances/${grievance.id}`)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">{grievance.category}</h4>
                          <StatusChip status={grievance.priority} />
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {grievance.description}
                        </p>
                      </div>
                      <StatusChip status={grievance.status} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                      <span>{grievance.subcategory}</span>
                      <span>
                        {formatDistanceToNow(new Date(grievance.createdAt), { addSuffix: true })}
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
