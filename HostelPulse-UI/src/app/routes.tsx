import { createBrowserRouter, Navigate } from 'react-router';
import { Login } from './pages/auth/Login';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { StudentLayout } from './layouts/StudentLayout';
import { GuardLayout } from './layouts/GuardLayout';
import { StaffLayout } from './layouts/StaffLayout';
import { WardenLayout } from './layouts/WardenLayout';

// Student pages
import { StudentDashboard } from './pages/student/Dashboard';
import { LeaveRequests } from './pages/student/LeaveRequests';
import { NewLeave } from './pages/student/NewLeave';
import { LeaveDetail } from './pages/student/LeaveDetail';
import { Grievances } from './pages/student/Grievances';
import { NewGrievance } from './pages/student/NewGrievance';
import { GrievanceDetail } from './pages/student/GrievanceDetail';
import { Attendance } from './pages/student/Attendance';
import { QRScanner } from './pages/student/QRScanner';
import { Payments } from './pages/student/Payments';
import { Chat } from './pages/student/Chat';
import { StudentProfile } from './pages/student/Profile';
import { Notifications } from './pages/student/Notifications';

// Guard pages
import { QRSetup } from './pages/guard/QRSetup';
import { ActiveQRSession } from './pages/guard/ActiveQRSession';
import { GuardAttendance } from './pages/guard/Attendance';
import { GuardLeaves } from './pages/guard/Leaves';
import { GuardProfile } from './pages/guard/Profile';

// Staff pages
import { StaffTasks } from './pages/staff/Tasks';
import { TaskDetail } from './pages/staff/TaskDetail';
import { StaffProfile } from './pages/staff/Profile';

// Warden pages
import { WardenDashboard } from './pages/warden/Dashboard';
import { StudentsList } from './pages/warden/Students';
import { AddEditStudent } from './pages/warden/AddEditStudent';
import { WardenLeaves } from './pages/warden/Leaves';
import { WardenLeaveDetail } from './pages/warden/LeaveDetail';
import { WardenGrievances } from './pages/warden/Grievances';
import { WardenGrievanceDetail } from './pages/warden/GrievanceDetail';
import { AttendanceReports } from './pages/warden/AttendanceReports';
import { WardenPayments } from './pages/warden/Payments';
import { ChatInbox } from './pages/warden/ChatInbox';
import { Settings } from './pages/warden/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  
  // Student routes
  {
    path: '/student',
    element: <StudentLayout />,
    children: [
      { index: true, element: <StudentDashboard /> },
      { path: 'notifications', element: <Notifications /> },
      { path: 'requests/leaves', element: <LeaveRequests /> },
      { path: 'requests/leaves/new', element: <NewLeave /> },
      { path: 'requests/leaves/:id', element: <LeaveDetail /> },
      { path: 'requests/grievances', element: <Grievances /> },
      { path: 'requests/grievances/new', element: <NewGrievance /> },
      { path: 'requests/grievances/:id', element: <GrievanceDetail /> },
      { path: 'attendance', element: <Attendance /> },
      { path: 'attendance/scan', element: <QRScanner /> },
      { path: 'payments', element: <Payments /> },
      { path: 'chat', element: <Chat /> },
      { path: 'profile', element: <StudentProfile /> },
    ],
  },
  
  // Guard routes
  {
    path: '/guard',
    element: <GuardLayout />,
    children: [
      { index: true, element: <QRSetup /> },
      { path: 'qr-session', element: <ActiveQRSession /> },
      { path: 'attendance', element: <GuardAttendance /> },
      { path: 'leaves', element: <GuardLeaves /> },
      { path: 'profile', element: <GuardProfile /> },
    ],
  },
  
  // Staff routes
  {
    path: '/staff',
    element: <StaffLayout />,
    children: [
      { index: true, element: <StaffTasks /> },
      { path: 'tasks/:id', element: <TaskDetail /> },
      { path: 'profile', element: <StaffProfile /> },
    ],
  },
  
  // Warden routes
  {
    path: '/warden',
    element: <WardenLayout />,
    children: [
      { index: true, element: <WardenDashboard /> },
      { path: 'students', element: <StudentsList /> },
      { path: 'students/new', element: <AddEditStudent /> },
      { path: 'students/:id/edit', element: <AddEditStudent /> },
      { path: 'leaves', element: <WardenLeaves /> },
      { path: 'leaves/:id', element: <WardenLeaveDetail /> },
      { path: 'grievances', element: <WardenGrievances /> },
      { path: 'grievances/:id', element: <WardenGrievanceDetail /> },
      { path: 'attendance', element: <AttendanceReports /> },
      { path: 'payments', element: <WardenPayments /> },
      { path: 'chat', element: <ChatInbox /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);