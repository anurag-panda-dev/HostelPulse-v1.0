import { useState } from 'react';
import { AppHeader } from '../../components/AppHeader';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { mockLeaveRequests } from '../../data/mockData';
import { Calendar, User, Home } from 'lucide-react';

export function GuardLeaves() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const approvedLeaves = mockLeaveRequests.filter(leave => {
    if (leave.status !== 'approved') return false;
    const from = new Date(leave.fromDate);
    const to = new Date(leave.toDate);
    const selected = new Date(selectedDate);
    return selected >= from && selected <= to;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader title="Approved Leaves" />

      <div className="p-4 space-y-4">
        {/* Date Selector */}
        <Card className="p-4">
          <Label htmlFor="date">Select Date</Label>
          <Input
            id="date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-2"
          />
        </Card>

        {/* Summary */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-900">{approvedLeaves.length}</p>
            <p className="text-sm text-blue-700 mt-1">
              Students on leave on {new Date(selectedDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </Card>

        {/* Leave List */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Students on Leave</h3>
          {approvedLeaves.length === 0 ? (
            <Card className="p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No approved leaves for this date</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {approvedLeaves.map((leave) => (
                <Card key={leave.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{leave.studentName}</p>
                        <p className="text-sm text-gray-500">Room {leave.roomNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Leave Period</p>
                        <p className="font-medium text-gray-900">
                          {new Date(leave.fromDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          {' - '}
                          {new Date(leave.toDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Home className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="font-medium text-gray-900 capitalize">{leave.type.replace('-', ' ')}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t">
                      <p className="text-sm text-gray-600">{leave.reason}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
