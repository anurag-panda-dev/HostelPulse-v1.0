import {
  User,
  Student,
  LeaveRequest,
  Grievance,
  AttendanceRecord,
  Payment,
  Message,
  Task,
  Notification,
} from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'S001',
    studentId: 'CS2024001',
    name: 'Rahul Sharma',
    role: 'student',
    email: 'rahul@example.com',
    phone: '+91 98765 43210',
    roomNumber: '101',
    block: 'A',
    year: 2,
    course: 'B.Tech Computer Science',
    guardianName: 'Mr. Sharma',
    guardianPhone: '+91 98765 00001',
    documents: [
      { id: 'D1', name: 'Aadhar Card', type: 'pdf', url: '#', uploadedAt: '2024-01-15' },
      { id: 'D2', name: 'Photo', type: 'image', url: '#', uploadedAt: '2024-01-15' },
    ],
  } as Student,
  {
    id: 'G001',
    name: 'Suresh Kumar',
    role: 'guard',
    email: 'suresh@hostelpulse.com',
    phone: '+91 98765 11111',
  },
  {
    id: 'ST001',
    name: 'Amit Patel',
    role: 'staff',
    email: 'amit@hostelpulse.com',
    phone: '+91 98765 22222',
  },
  {
    id: 'W001',
    name: 'Dr. Priya Singh',
    role: 'warden',
    email: 'priya@hostelpulse.com',
    phone: '+91 98765 33333',
  },
];

// Mock Leave Requests
export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'L001',
    studentId: 'S001',
    studentName: 'Rahul Sharma',
    roomNumber: '101',
    type: 'home',
    fromDate: '2026-03-01',
    toDate: '2026-03-05',
    reason: 'Family function - sister\'s wedding',
    status: 'pending',
    createdAt: '2026-02-24T10:30:00Z',
    attachments: [],
  },
  {
    id: 'L002',
    studentId: 'S001',
    studentName: 'Rahul Sharma',
    roomNumber: '101',
    type: 'medical',
    fromDate: '2026-02-10',
    toDate: '2026-02-12',
    reason: 'Medical checkup at home',
    status: 'approved',
    createdAt: '2026-02-05T14:20:00Z',
    wardenComment: 'Approved. Please submit medical certificate on return.',
    attachments: [],
  },
  {
    id: 'L003',
    studentId: 'S001',
    studentName: 'Rahul Sharma',
    roomNumber: '101',
    type: 'local',
    fromDate: '2026-01-20',
    toDate: '2026-01-20',
    reason: 'Shopping',
    status: 'rejected',
    createdAt: '2026-01-19T09:15:00Z',
    wardenComment: 'Insufficient reason for leave. Please use weekend hours.',
  },
];

// Mock Grievances
export const mockGrievances: Grievance[] = [
  {
    id: 'GR001',
    studentId: 'S001',
    studentName: 'Rahul Sharma',
    roomNumber: '101',
    category: 'Maintenance',
    subcategory: 'Electrical',
    priority: 'high',
    description: 'Fan not working in room 101. Getting very hot.',
    status: 'in-progress',
    createdAt: '2026-02-24T08:00:00Z',
    assignedTo: 'ST001',
  },
  {
    id: 'GR002',
    studentId: 'S001',
    studentName: 'Rahul Sharma',
    roomNumber: '101',
    category: 'Food',
    subcategory: 'Quality',
    priority: 'medium',
    description: 'Breakfast quality has deteriorated over the past week.',
    status: 'open',
    createdAt: '2026-02-23T07:30:00Z',
  },
  {
    id: 'GR003',
    studentId: 'S001',
    studentName: 'Rahul Sharma',
    roomNumber: '101',
    category: 'Maintenance',
    subcategory: 'Plumbing',
    priority: 'low',
    description: 'Tap in washroom drips constantly',
    status: 'resolved',
    createdAt: '2026-02-15T16:45:00Z',
    assignedTo: 'ST001',
    resolutionNote: 'Tap washer replaced',
    resolvedAt: '2026-02-16T10:00:00Z',
  },
];

// Mock Attendance Records
export const mockAttendance: AttendanceRecord[] = [
  {
    id: 'A001',
    studentId: 'S001',
    studentName: 'Rahul Sharma',
    roomNumber: '101',
    date: '2026-02-25',
    status: 'present',
    timestamp: '2026-02-25T20:15:00Z',
    guardId: 'G001',
    guardName: 'Suresh Kumar',
  },
  {
    id: 'A002',
    studentId: 'S001',
    studentName: 'Rahul Sharma',
    roomNumber: '101',
    date: '2026-02-24',
    status: 'present',
    timestamp: '2026-02-24T20:10:00Z',
    guardId: 'G001',
    guardName: 'Suresh Kumar',
  },
  {
    id: 'A003',
    studentId: 'S001',
    studentName: 'Rahul Sharma',
    roomNumber: '101',
    date: '2026-02-23',
    status: 'present',
    timestamp: '2026-02-23T20:20:00Z',
    guardId: 'G001',
    guardName: 'Suresh Kumar',
  },
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: 'P001',
    studentId: 'S001',
    studentName: 'Rahul Sharma',
    roomNumber: '101',
    amount: 25000,
    type: 'hostel-fee',
    status: 'paid',
    dueDate: '2026-02-01',
    paidDate: '2026-01-28',
    paidAmount: 25000,
  },
  {
    id: 'P002',
    studentId: 'S001',
    studentName: 'Rahul Sharma',
    roomNumber: '101',
    amount: 15000,
    type: 'mess-fee',
    status: 'pending',
    dueDate: '2026-03-01',
  },
  {
    id: 'P003',
    studentId: 'S001',
    studentName: 'Rahul Sharma',
    roomNumber: '101',
    amount: 500,
    type: 'fine',
    status: 'pending',
    dueDate: '2026-02-28',
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'M001',
    senderId: 'S001',
    senderName: 'Rahul Sharma',
    senderRole: 'student',
    receiverId: 'frontdesk',
    content: 'Hi, I need to update my phone number in records.',
    timestamp: '2026-02-24T10:00:00Z',
    status: 'sent',
  },
  {
    id: 'M002',
    senderId: 'frontdesk',
    senderName: 'Front Desk',
    senderRole: 'warden',
    receiverId: 'S001',
    content: 'Hello Rahul, please visit the office with your ID proof to update contact details.',
    timestamp: '2026-02-24T10:05:00Z',
    status: 'sent',
  },
  {
    id: 'M003',
    senderId: 'S001',
    senderName: 'Rahul Sharma',
    senderRole: 'student',
    receiverId: 'frontdesk',
    content: 'Okay, I will come tomorrow morning.',
    timestamp: '2026-02-24T10:07:00Z',
    status: 'sent',
  },
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: 'T001',
    grievanceId: 'GR001',
    title: 'Fix fan in Room 101',
    description: 'Fan not working in room 101. Getting very hot.',
    assignedToId: 'ST001',
    assignedToName: 'Amit Patel',
    status: 'in-progress',
    createdAt: '2026-02-24T09:00:00Z',
  },
  {
    id: 'T002',
    grievanceId: 'GR003',
    title: 'Fix dripping tap in Room 101',
    description: 'Tap in washroom drips constantly',
    assignedToId: 'ST001',
    assignedToName: 'Amit Patel',
    status: 'completed',
    createdAt: '2026-02-15T17:00:00Z',
    completedAt: '2026-02-16T10:00:00Z',
    comment: 'Tap washer replaced',
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'N001',
    userId: 'S001',
    type: 'grievance',
    title: 'Grievance Updated',
    message: 'Your grievance #GR001 is now in progress',
    timestamp: '2026-02-24T09:00:00Z',
    read: false,
    actionUrl: '/student/requests/grievances/GR001',
  },
  {
    id: 'N002',
    userId: 'S001',
    type: 'payment',
    title: 'Payment Due',
    message: 'Mess fee payment of ₹15,000 due on Mar 1',
    timestamp: '2026-02-23T08:00:00Z',
    read: false,
    actionUrl: '/student/payments',
  },
  {
    id: 'N003',
    userId: 'S001',
    type: 'leave',
    title: 'Leave Approved',
    message: 'Your medical leave request has been approved',
    timestamp: '2026-02-05T15:00:00Z',
    read: true,
    actionUrl: '/student/requests/leaves/L002',
  },
];

// Helper functions
export function getLeavesByStudent(studentId: string) {
  return mockLeaveRequests.filter(l => l.studentId === studentId);
}

export function getGrievancesByStudent(studentId: string) {
  return mockGrievances.filter(g => g.studentId === studentId);
}

export function getAttendanceByStudent(studentId: string) {
  return mockAttendance.filter(a => a.studentId === studentId);
}

export function getPaymentsByStudent(studentId: string) {
  return mockPayments.filter(p => p.studentId === studentId);
}

export function getMessagesByUser(userId: string) {
  return mockMessages.filter(m => m.senderId === userId || m.receiverId === userId);
}

export function getTasksByStaff(staffId: string) {
  return mockTasks.filter(t => t.assignedToId === staffId);
}

export function getNotificationsByUser(userId: string) {
  return mockNotifications.filter(n => n.userId === userId);
}
