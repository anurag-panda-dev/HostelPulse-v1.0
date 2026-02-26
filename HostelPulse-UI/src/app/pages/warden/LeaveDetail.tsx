import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { StatusChip } from '../../components/StatusChip';
import { mockLeaveRequests } from '../../data/mockData';
import { Calendar, User, FileText, MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';

export function WardenLeaveDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const leave = mockLeaveRequests.find(l => l.id === id);

  const [comment, setComment] = useState('');
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!leave) {
    return (
      <div className="p-4 md:p-6">
        <p>Leave request not found</p>
      </div>
    );
  }

  const handleApprove = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Leave request approved');
    navigate('/warden/leaves');
  };

  const handleReject = async () => {
    if (!comment.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Leave request rejected');
    navigate('/warden/leaves');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => navigate('/warden/leaves')}>
          ← Back
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Leave Request Details</h1>
        </div>
      </div>

      {/* Status Banner */}
      <Card className={`p-4 ${
        leave.status === 'approved' ? 'bg-green-50 border-green-200' :
        leave.status === 'rejected' ? 'bg-red-50 border-red-200' :
        'bg-yellow-50 border-yellow-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              {leave.status === 'approved' && 'Request Approved'}
              {leave.status === 'rejected' && 'Request Rejected'}
              {leave.status === 'pending' && 'Awaiting Your Review'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {leave.status === 'approved' && 'This leave request has been approved.'}
              {leave.status === 'rejected' && 'This leave request has been rejected.'}
              {leave.status === 'pending' && 'Please review and take action on this leave request.'}
            </p>
          </div>
          <StatusChip status={leave.status} />
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
                  <p className="font-medium text-gray-900">{leave.studentName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Room Number</p>
                  <p className="font-medium text-gray-900">{leave.roomNumber}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Leave Details */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Leave Details</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Leave Type</p>
                  <p className="font-medium text-gray-900 capitalize">{leave.type.replace('-', ' ')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium text-gray-900">
                    {new Date(leave.fromDate).toLocaleDateString('en-IN', { 
                      weekday: 'long',
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                  <p className="text-sm text-gray-500">to</p>
                  <p className="font-medium text-gray-900">
                    {new Date(leave.toDate).toLocaleDateString('en-IN', { 
                      weekday: 'long',
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {Math.ceil((new Date(leave.toDate).getTime() - new Date(leave.fromDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} day(s)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Reason</p>
                  <p className="font-medium text-gray-900">{leave.reason}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Submitted On</p>
                  <p className="font-medium text-gray-900">
                    {new Date(leave.createdAt).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Warden's Comment */}
          {leave.wardenComment && (
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Your Comment</h3>
              <p className="text-gray-600">{leave.wardenComment}</p>
            </Card>
          )}
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          {leave.status === 'pending' && (
            <>
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Review Actions</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="comment">Comment (Optional for approval, Required for rejection)</Label>
                    <Textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add your comments..."
                      rows={4}
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      onClick={() => setShowApproveDialog(true)}
                      disabled={loading}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Leave
                    </Button>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => setShowRejectDialog(true)}
                      disabled={loading}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject Leave
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Review Guidelines</h3>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Check student's attendance record</li>
                  <li>Verify reason validity</li>
                  <li>Consider leave duration</li>
                  <li>Provide clear comments if rejecting</li>
                </ul>
              </Card>
            </>
          )}

          {leave.status !== 'pending' && (
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Request Status</h3>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  leave.status === 'approved' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {leave.status === 'approved' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 capitalize">{leave.status}</p>
                  <p className="text-sm text-gray-500">Request has been processed</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Approve Dialog */}
      <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <AlertDialogTitle className="text-center">Approve Leave Request?</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              This will approve the leave request for {leave.studentName}.
              {comment && <p className="mt-2 text-sm">Your comment: "{comment}"</p>}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleApprove}>
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <AlertDialogTitle className="text-center">Reject Leave Request?</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              This will reject the leave request for {leave.studentName}.
              {!comment.trim() && (
                <p className="mt-2 text-sm text-red-600">Please add a comment explaining the rejection.</p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleReject}
              disabled={!comment.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
