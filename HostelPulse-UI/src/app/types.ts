// Core types for HostelPulse
export type UserRole = 'student' | 'guard' | 'staff' | 'warden';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Student extends User {
  role: 'student';
  studentId: string;
  roomNumber: string;
  block: string;
  year: number;
  course: string;
  guardianName: string;
  guardianPhone: string;
  documents: Document[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  type: 'home' | 'local' | 'medical' | 'other';
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  wardenComment?: string;
  attachments?: string[];
}

export interface Grievance {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  category: string;
  subcategory: string;
  priority: 'low' | 'medium' | 'high' | 'emergency';
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
  assignedTo?: string;
  resolutionNote?: string;
  resolvedAt?: string;
  attachments?: string[];
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  date: string;
  status: 'present' | 'absent';
  timestamp?: string;
  guardId?: string;
  guardName?: string;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  amount: number;
  type: 'hostel-fee' | 'mess-fee' | 'fine' | 'other';
  status: 'paid' | 'pending' | 'partial';
  dueDate: string;
  paidDate?: string;
  paidAmount?: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  receiverId: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'sending' | 'failed';
}

export interface Task {
  id: string;
  grievanceId: string;
  title: string;
  description: string;
  assignedToId: string;
  assignedToName: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
  completedAt?: string;
  comment?: string;
}

export interface QRSession {
  id: string;
  guardId: string;
  block: string;
  year: number;
  qrCode: string;
  startTime: string;
  endTime: string;
  active: boolean;
  scannedCount: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}
