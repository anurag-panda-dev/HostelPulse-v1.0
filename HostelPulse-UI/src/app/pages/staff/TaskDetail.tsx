import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AppHeader } from '../../components/AppHeader';
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
import { mockTasks, mockGrievances } from '../../data/mockData';
import { Calendar, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = mockTasks.find(t => t.id === id);
  const grievance = task ? mockGrievances.find(g => g.id === task.grievanceId) : null;

  const [status, setStatus] = useState(task?.status || 'pending');
  const [comment, setComment] = useState(task?.comment || '');
  const [loading, setLoading] = useState(false);

  if (!task || !grievance) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader title="Task Detail" onBack={() => navigate('/staff')} />
        <div className="p-4">
          <p>Task not found</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (status === 'completed' && !comment.trim()) {
      toast.error('Please add a comment about the resolution');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Task updated successfully!');
    navigate('/staff');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <AppHeader title="Task Detail" onBack={() => navigate('/staff')} />

      <div className="p-4 space-y-4">
        {/* Status Banner */}
        <Card className={`p-4 ${
          task.status === 'completed' ? 'bg-green-50 border-green-200' :
          task.status === 'in-progress' ? 'bg-purple-50 border-purple-200' :
          'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{task.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                Assigned {new Date(task.createdAt).toLocaleDateString('en-IN')}
              </p>
            </div>
            <StatusChip status={task.status} />
          </div>
        </Card>

        {/* Task Details */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Task Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Description</p>
                <p className="font-medium text-gray-900">{task.description}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium text-gray-900">
                  {new Date(task.createdAt).toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {task.completedAt && (
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="font-medium text-gray-900">
                    {new Date(task.completedAt).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Related Grievance */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-gray-400" />
            <h3 className="font-semibold text-gray-900">Related Grievance</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Student:</span>
              <span className="font-medium text-gray-900">{grievance.studentName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Room:</span>
              <span className="font-medium text-gray-900">{grievance.roomNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Category:</span>
              <span className="font-medium text-gray-900">{grievance.category}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Priority:</span>
              <StatusChip status={grievance.priority} />
            </div>
            <div className="pt-3 border-t">
              <p className="text-sm text-gray-600">{grievance.description}</p>
            </div>
          </div>
        </Card>

        {/* Update Form */}
        {task.status !== 'completed' && (
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Update Task</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={status}
                  onValueChange={setStatus}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="comment">
                  Comment {status === 'completed' && <span className="text-red-500">*</span>}
                </Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add notes about the work done..."
                  rows={4}
                  required={status === 'completed'}
                />
              </div>
            </div>
          </Card>
        )}

        {/* Completed Note */}
        {task.status === 'completed' && task.comment && (
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Completion Note</h3>
            <p className="text-gray-600">{task.comment}</p>
          </Card>
        )}

        {/* Actions */}
        {task.status !== 'completed' && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:static md:border-0 md:bg-transparent">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate('/staff')}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="flex-1"
                onClick={handleSubmit}
                disabled={loading || (status === 'completed' && !comment.trim())}
              >
                {loading ? 'Updating...' : 'Update Task'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
