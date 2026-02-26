import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AppHeader } from '../../components/AppHeader';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { QrCode, Clock, Users, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export function ActiveQRSession() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [scannedStudents, setScannedStudents] = useState([
    { id: '1', name: 'Rahul Sharma', room: '101', time: '20:15' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    // Simulate new scans
    const scanSimulator = setInterval(() => {
      if (Math.random() > 0.7) {
        const newStudent = {
          id: Date.now().toString(),
          name: `Student ${scannedStudents.length + 1}`,
          room: `${100 + scannedStudents.length + 1}`,
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        };
        setScannedStudents((prev) => [newStudent, ...prev]);
        toast.success(`${newStudent.name} marked present`);
      }
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(scanSimulator);
    };
  }, [scannedStudents.length]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCloseSession = () => {
    if (confirm('Are you sure you want to close this attendance session?')) {
      toast.success('Attendance session closed');
      navigate('/guard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader title="Active QR Session" onBack={() => navigate('/guard')} />

      <div className="p-4 space-y-4">
        {/* Timer & Stats */}
        <Card className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <div className="text-center mb-4">
            <Clock className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm opacity-90 mb-1">Time Remaining</p>
            <p className="text-3xl font-bold">{formatTime(timeLeft)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{scannedStudents.length}</p>
              <p className="text-sm opacity-90">Students Scanned</p>
            </div>
            <div>
              <p className="text-2xl font-bold">50</p>
              <p className="text-sm opacity-90">Total Students</p>
            </div>
          </div>
        </Card>

        {/* QR Code Display */}
        <Card className="p-6">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-4">Students, scan this code:</h3>
            
            {/* QR Code Placeholder */}
            <div className="w-64 h-64 mx-auto bg-white border-4 border-gray-900 p-4 mb-4">
              <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 flex items-center justify-center relative">
                <QrCode className="w-32 h-32 text-white" />
                {/* QR Pattern simulation */}
                <div className="absolute inset-4 grid grid-cols-8 grid-rows-8 gap-0.5">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Block</p>
                <p className="font-semibold text-gray-900">Block A</p>
              </div>
              <div>
                <p className="text-gray-500">Year</p>
                <p className="font-semibold text-gray-900">2nd Year</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Scans */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Scans</h3>
            <span className="text-sm text-gray-500">{scannedStudents.length} scanned</span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {scannedStudents.slice(0, 10).map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">Room {student.room}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{student.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/guard/attendance')}
          >
            <Users className="w-4 h-4 mr-2" />
            View Full Attendance List
          </Button>

          <Button
            variant="destructive"
            className="w-full"
            onClick={handleCloseSession}
          >
            Close Attendance Session
          </Button>
        </div>
      </div>
    </div>
  );
}
