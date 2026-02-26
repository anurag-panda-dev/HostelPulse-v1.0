import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { AppHeader } from '../../components/AppHeader';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { StatusChip } from '../../components/StatusChip';
import { getAttendanceByStudent } from '../../data/mockData';
import { QrCode, CheckCircle2, Info } from 'lucide-react';

export function Attendance() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const attendance = getAttendanceByStudent(user!.id);
  const todayAttendance = attendance.find(a => a.date === new Date().toISOString().split('T')[0]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader title="Attendance" />

      <div className="p-4 space-y-4">
        {/* Today's Status */}
        <Card className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm opacity-90">Today's Attendance</p>
              <h2 className="text-2xl font-semibold">
                {todayAttendance ? 'Marked' : 'Not Marked'}
              </h2>
            </div>
            {todayAttendance && (
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            )}
          </div>
          {todayAttendance && (
            <p className="text-sm opacity-90">
              Marked at {new Date(todayAttendance.timestamp!).toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          )}
        </Card>

        {/* Instructions */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-1">How to mark attendance</h3>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Tap the "Scan QR Code" button below</li>
                <li>Allow camera permission if prompted</li>
                <li>Scan the QR code shown by the guard</li>
                <li>Your attendance will be marked automatically</li>
              </ol>
              <p className="text-sm text-blue-700 mt-2">
                <strong>Timing:</strong> Attendance can be marked during designated hours (usually 8-10 PM)
              </p>
            </div>
          </div>
        </Card>

        {/* Scan Button */}
        {!todayAttendance && (
          <Button
            size="lg"
            className="w-full h-14"
            onClick={() => navigate('/student/attendance/scan')}
          >
            <QrCode className="w-5 h-5 mr-2" />
            Scan QR Code
          </Button>
        )}

        {/* Recent Attendance History */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Recent History</h3>
          <div className="space-y-2">
            {attendance.slice(0, 7).map((record) => (
              <Card key={record.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {new Date(record.date).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </p>
                    {record.timestamp && (
                      <p className="text-sm text-gray-500 mt-1">
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
        </div>

        {/* Statistics */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">This Month</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-semibold text-green-600">
                {attendance.filter(a => a.status === 'present').length}
              </p>
              <p className="text-sm text-gray-500">Days Present</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-red-600">
                {attendance.filter(a => a.status === 'absent').length}
              </p>
              <p className="text-sm text-gray-500">Days Absent</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
