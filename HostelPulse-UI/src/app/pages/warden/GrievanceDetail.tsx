import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { StatusChip } from '../../components/StatusChip';
import { mockGrievances, mockUsers } from '../../data/mockData';
import { Calendar, User, FileText, AlertCircle, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

export function WardenGrievanceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const grievance = mockGrievances.find(g => g.id === id);

  const [status, setStatus] = useState(grievance?.status || 'open');
  const [assignedTo, setAssignedTo] = useState(grievance?.assignedTo || '');
  const [resolutionNote, setResolutionNote] = useState(grievance?.resolutionNote || '');
  const [loading, setLoading] = useState(false);

  const staffMembers = mockUsers.filter(u => u.role === 'staff');

  if (!grievance) {
    return (
      <div className="p-4 md:p-6">
        <p>Grievance not found</p>
      </div>
    );
  }

  const handleUpdate = async () => {
    if (status === 'resolved' && !resolutionNote.trim()) {
      toast.error('Please provide a resolution note');
      return;
    }

    if (status === 'in-progress' && !assignedTo) {
      toast.error('Please assign a staff member');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Grievance updated successfully!');
    navigate('/warden/grievances');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => navigate('/warden/grievances')}>
          ← Back
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Grievance Details</h1>
        </div>
      </div>

      {/* Status Banner */}
      <Card className={`p-4 ${
        grievance.status === 'resolved' ? 'bg-green-50 border-green-200' :
        grievance.status === 'in-progress' ? 'bg-purple-50 border-purple-200' :
        'bg-blue-50 border-blue-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              {grievance.status === 'resolved' && 'Grievance Resolved'}
              {grievance.status === 'in-progress' && 'In Progress'}
              {grievance.status === 'open' && 'New Grievance'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {grievance.status === 'resolved' && 'This grievance has been marked as resolved.'}
              {grievance.status === 'in-progress' && 'Staff is working on this grievance.'}
              {grievance.status === 'open' && 'This grievance requires attention.'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusChip status={grievance.status} />
            <StatusChip status={grievance.priority} />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student Information */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Student Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{grievance.studentName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Room Number</p>
                  <p className="font-medium text-gray-900">{grievance.roomNumber}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Grievance Details */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Grievance Details</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium text-gray-900">{grievance.category} • {grievance.subcategory}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="font-medium text-gray-900">{grievance.description}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Reported On</p>
                  <p className="font-medium text-gray-900">
                    {new Date(grievance.createdAt).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {grievance.assignedTo && (
                <div className="flex items-start gap-3">
                  <UserCheck className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Assigned To</p>
                    <p className="font-medium text-gray-900">Staff Member</p>
                  </div>
                </div>
              )}

              {grievance.resolvedAt && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Resolved On</p>
                    <p className="font-medium text-gray-900">
                      {new Date(grievance.resolvedAt).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Resolution Note */}
          {grievance.resolutionNote && (
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Resolution Note</h3>
              <p className="text-gray-600">{grievance.resolutionNote}</p>
            </Card>
          )}
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          {grievance.status !== 'resolved' && (
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Manage Grievance</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(status === 'in-progress' || status === 'resolved') && (
                  <div>
                    <Label htmlFor="assignTo">Assign To Staff</Label>
                    <Select value={assignedTo} onValueChange={setAssignedTo}>
                      <SelectTrigger id="assignTo">
                        <SelectValue placeholder="Select staff member" />
                      </SelectTrigger>
                      <SelectContent>
                        {staffMembers.map(staff => (
                          <SelectItem key={staff.id} value={staff.id}>
                            {staff.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {status === 'resolved' && (
                  <div>
                    <Label htmlFor="resolution">
                      Resolution Note <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="resolution"
                      value={resolutionNote}
                      onChange={(e) => setResolutionNote(e.target.value)}
                      placeholder="Describe how the grievance was resolved..."
                      rows={4}
                      className="mt-2"
                      required
                    />
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={handleUpdate}
                  disabled={loading || (status === 'resolved' && !resolutionNote.trim()) || (status === 'in-progress' && !assignedTo)}
                >
                  {loading ? 'Updating...' : 'Update Grievance'}
                </Button>
              </div>
            </Card>
          )}

          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Priority Guidelines</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li><strong>Emergency:</strong> Immediate action required</li>
              <li><strong>High:</strong> Address within 24 hours</li>
              <li><strong>Medium:</strong> Address within 2-3 days</li>
              <li><strong>Low:</strong> Address as resources allow</li>
            </ul>
          </Card>

          {grievance.status === 'resolved' && (
            <Card className="p-6 bg-green-50 border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Grievance Resolved</h3>
              <p className="text-sm text-green-800">
                This grievance has been successfully resolved and closed.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
