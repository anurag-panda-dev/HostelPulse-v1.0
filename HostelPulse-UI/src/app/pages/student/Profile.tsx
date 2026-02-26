import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { AppHeader } from '../../components/AppHeader';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Student } from '../../types';
import { User, Phone, Mail, Home, BookOpen, Users2, FileText, LogOut, MessageCircle } from 'lucide-react';

export function StudentProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const student = user as Student;

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader title="Profile" />

      <div className="p-4 space-y-4">
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-semibold">
              {student.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{student.name}</h2>
              <p className="text-gray-500">{student.studentId}</p>
              <p className="text-sm text-gray-400 mt-1">Student</p>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{student.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{student.phone}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Hostel Information */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Hostel Details</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Home className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Room Details</p>
                <p className="font-medium text-gray-900">
                  Room {student.roomNumber}, Block {student.block}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Course</p>
                <p className="font-medium text-gray-900">{student.course}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users2 className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Year</p>
                <p className="font-medium text-gray-900">Year {student.year}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Guardian Information */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Guardian Details</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Guardian Name</p>
                <p className="font-medium text-gray-900">{student.guardianName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Guardian Phone</p>
                <p className="font-medium text-gray-900">{student.guardianPhone}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Documents */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Documents</h3>
          <div className="space-y-2">
            {student.documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-500">
                      Uploaded {new Date(doc.uploadedAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/student/chat')}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Message Warden
          </Button>

          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
