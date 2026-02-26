import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { UserRole } from '../../types';
import { toast } from 'sonner';

const roles: { value: UserRole; label: string }[] = [
  { value: 'student', label: 'Student' },
  { value: 'guard', label: 'Guard' },
  { value: 'staff', label: 'Staff' },
  { value: 'warden', label: 'Warden' },
];

export function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(identifier, password, selectedRole);

    if (success) {
      toast.success('Login successful!');
      navigate(`/${selectedRole}`);
    } else {
      toast.error('Invalid credentials. Try password: demo123');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">HostelPulse v1</h1>
            <p className="text-sm text-gray-500">Hostel Management System</p>
          </div>

          {/* Role Selector */}
          <div className="mb-6">
            <Label className="mb-2 block">Select Role</Label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((role) => (
                <button
                  key={role.value}
                  onClick={() => setSelectedRole(role.value)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedRole === role.value
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="identifier">
                {selectedRole === 'student' ? 'Student ID / Email' : 'Email'}
              </Label>
              <Input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={
                  selectedRole === 'student'
                    ? 'CS2024001 or email'
                    : 'your@email.com'
                }
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forgot-password"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-medium text-gray-700 mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-gray-600">
              <p><strong>Student:</strong> CS2024001 / demo123</p>
              <p><strong>Guard:</strong> suresh@hostelpulse.com / demo123</p>
              <p><strong>Staff:</strong> amit@hostelpulse.com / demo123</p>
              <p><strong>Warden:</strong> priya@hostelpulse.com / demo123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
