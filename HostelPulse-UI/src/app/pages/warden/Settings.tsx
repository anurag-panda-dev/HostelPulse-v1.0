import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { toast } from 'sonner';
import { Clock, Bell, Shield, Database, Users } from 'lucide-react';

export function Settings() {
  const [attendanceStart, setAttendanceStart] = useState('20:00');
  const [attendanceEnd, setAttendanceEnd] = useState('22:00');
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [autoApproveLocal, setAutoApproveLocal] = useState(false);
  const [requireDocuments, setRequireDocuments] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Settings saved successfully!');
    setLoading(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Configure system settings and preferences</p>
      </div>

      {/* Attendance Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Attendance Settings</h3>
            <p className="text-sm text-gray-500">Configure attendance time windows</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="attendanceStart">Start Time</Label>
            <Input
              id="attendanceStart"
              type="time"
              value={attendanceStart}
              onChange={(e) => setAttendanceStart(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="attendanceEnd">End Time</Label>
            <Input
              id="attendanceEnd"
              type="time"
              value={attendanceEnd}
              onChange={(e) => setAttendanceEnd(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            Students will be able to mark attendance between {attendanceStart} and {attendanceEnd}
          </p>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Bell className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Notification Settings</h3>
            <p className="text-sm text-gray-500">Manage notification preferences</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive email updates for important events</p>
            </div>
            <Switch
              checked={enableNotifications}
              onCheckedChange={setEnableNotifications}
            />
          </div>
        </div>
      </Card>

      {/* Leave Request Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Leave Request Settings</h3>
            <p className="text-sm text-gray-500">Configure leave approval policies</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Auto-approve Local Leaves</p>
              <p className="text-sm text-gray-500">Automatically approve local leave requests (single day)</p>
            </div>
            <Switch
              checked={autoApproveLocal}
              onCheckedChange={setAutoApproveLocal}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Require Supporting Documents</p>
              <p className="text-sm text-gray-500">Make document upload mandatory for leave requests</p>
            </div>
            <Switch
              checked={requireDocuments}
              onCheckedChange={setRequireDocuments}
            />
          </div>
        </div>
      </Card>

      {/* System Information */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <Database className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">System Information</h3>
            <p className="text-sm text-gray-500">HostelPulse v1 system details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-500">Total Students</p>
            </div>
            <p className="text-xl font-semibold text-gray-900">50</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-500">Version</p>
            </div>
            <p className="text-xl font-semibold text-gray-900">1.0.0</p>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => {
            setAttendanceStart('20:00');
            setAttendanceEnd('22:00');
            setEnableNotifications(true);
            setAutoApproveLocal(false);
            setRequireDocuments(true);
            toast.info('Settings reset to defaults');
          }}
        >
          Reset to Defaults
        </Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
}
