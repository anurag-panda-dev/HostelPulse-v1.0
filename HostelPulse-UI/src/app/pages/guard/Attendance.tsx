import { useState } from 'react';
import { AppHeader } from '../../components/AppHeader';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { StatusChip } from '../../components/StatusChip';
import { mockAttendance } from '../../data/mockData';
import { Search } from 'lucide-react';

export function GuardAttendance() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = mockAttendance.filter(a => a.date === today);

  const filteredAttendance = todayAttendance.filter(record => {
    const matchesTab =
      activeTab === 'all' ? true :
      activeTab === 'present' ? record.status === 'present' :
      record.status === 'absent';

    const matchesSearch =
      searchQuery === '' ||
      record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.roomNumber.includes(searchQuery);

    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader title="Live Attendance" />

      <div className="p-4 space-y-4">
        {/* Summary Card */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Today's Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-900">
                {todayAttendance.filter(a => a.status === 'present').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Present</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-900">
                {todayAttendance.filter(a => a.status === 'absent').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Absent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-900">50</p>
              <p className="text-xs text-gray-500 mt-1">Total</p>
            </div>
          </div>
        </Card>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or room..."
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="present">Present</TabsTrigger>
            <TabsTrigger value="absent">Absent</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-2">
              {filteredAttendance.map((record) => (
                <Card key={record.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{record.studentName}</h4>
                      <p className="text-sm text-gray-500">Room {record.roomNumber}</p>
                      {record.timestamp && (
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(record.timestamp).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      )}
                    </div>
                    <StatusChip status={record.status} />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
