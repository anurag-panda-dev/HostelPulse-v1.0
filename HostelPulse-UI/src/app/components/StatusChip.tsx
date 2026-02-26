import { cn } from './ui/utils';

type Status =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'open'
  | 'in-progress'
  | 'resolved'
  | 'completed'
  | 'high'
  | 'medium'
  | 'low'
  | 'emergency'
  | 'present'
  | 'absent'
  | 'paid'
  | 'partial'
  | 'sent'
  | 'sending'
  | 'failed';

interface StatusChipProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<
  Status,
  { label: string; className: string }
> = {
  // Leave status
  pending: { label: 'Pending', className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  approved: { label: 'Approved', className: 'bg-green-50 text-green-700 border-green-200' },
  rejected: { label: 'Rejected', className: 'bg-red-50 text-red-700 border-red-200' },
  
  // Grievance status
  open: { label: 'Open', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  'in-progress': { label: 'In Progress', className: 'bg-purple-50 text-purple-700 border-purple-200' },
  resolved: { label: 'Resolved', className: 'bg-green-50 text-green-700 border-green-200' },
  completed: { label: 'Completed', className: 'bg-green-50 text-green-700 border-green-200' },
  
  // Priority
  low: { label: 'Low', className: 'bg-gray-50 text-gray-700 border-gray-200' },
  medium: { label: 'Medium', className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  high: { label: 'High', className: 'bg-orange-50 text-orange-700 border-orange-200' },
  emergency: { label: 'Emergency', className: 'bg-red-50 text-red-700 border-red-200' },
  
  // Attendance
  present: { label: 'Present', className: 'bg-green-50 text-green-700 border-green-200' },
  absent: { label: 'Absent', className: 'bg-red-50 text-red-700 border-red-200' },
  
  // Payment
  paid: { label: 'Paid', className: 'bg-green-50 text-green-700 border-green-200' },
  partial: { label: 'Partial', className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  
  // Message
  sent: { label: 'Sent', className: 'bg-green-50 text-green-700 border-green-200' },
  sending: { label: 'Sending...', className: 'bg-gray-50 text-gray-700 border-gray-200' },
  failed: { label: 'Failed', className: 'bg-red-50 text-red-700 border-red-200' },
};

export function StatusChip({ status, className }: StatusChipProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
