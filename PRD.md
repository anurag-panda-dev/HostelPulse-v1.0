# Product Requirement Document: HostelPulse v1

**Version:** 1.0
**Date:** February 25, 2026
**Status:** Draft

---

## 1. Problem Statement

Hostel management today is fragmented, paper-based, and inefficient. Students struggle with:

- **Lack of transparency** in room assignments, payment status, and complaint resolution
- **Manual, time-consuming processes** for leave requests and grievance filing
- **No centralized communication** with hostel administration
- **Attendance tracking** that's prone to proxy/cheating

Administrators face:

- **Manual workload** managing student records, payment verification, and leave approvals
- **Poor visibility** into outstanding grievances and operational issues
- **No audit trail** for attendance and leave records

Guards and staff lack:

- **Digital tools** for attendance tracking and work assignment visibility
- **Real-time information** on approved leaves

**HostelPulse v1** aims to digitize and streamline core hostel operations with a mobile-first platform that connects students, administrators, guards, and staff.

---

## 2. Target Users

### Primary Users

1. **Students (Hostel Residents)**

   - Age: 18-25
   - Tech-savvy, mobile-first users
   - Need: Self-service access to information, quick request submission
2. **Warden/Admin**

   - Age: 30-55
   - Moderate tech comfort
   - Need: Centralized dashboard for approvals, monitoring, and management

### Secondary Users

3. **Guards**

   - Age: 25-50
   - Basic smartphone literacy
   - Need: Simple attendance tracking interface
4. **Support Staff**

   - Age: 25-55
   - Basic smartphone literacy
   - Need: View assigned tasks

**User Base (Initial):** Single hostel, 200-500 students

---

## 3. Core User Flows

### 3.1 Student Flows

#### A. Onboarding & Profile Access

```
Student signs in → Views dashboard → Sees room details (room no, block, floor, roommates) → Access profile (read-only, uploaded by warden)
```

#### B. Leave Request Submission

```
Student navigates to Leave Request → Fills form (name, address, hostel name, room no, year, semester, registration no, phone, parent phone, leave type, dates, place of visit, extra details) → Uploads mentor confirmation document → Submits → Receives confirmation → Waits for warden approval → Receives notification on status
```

#### C. Grievance Filing

```
Student selects "Room Settings/Grievance" → Chooses category (Electrical, Cleaning, Plumbing, Carpentry, Connectivity, Electronics, Food, Safety, Emergency) → Selects sub-category → Sets priority (High/Medium/Low) → Writes description → Uploads image (optional) → Submits → Receives ticket ID → Tracks status
```

#### D. Payment View

```
Student navigates to Payments → Views hostel fees, dues, payment history → (V1: View only)
```

#### E. Message Warden

```
Student opens frontdesk chat → Sends message to warden → Receives response → Ongoing chat thread
```

#### F. QR Attendance

```
Student opens app at designated time → Guard displays QR on their device → Student scans QR → System verifies location proximity (within 2 meters of guard) → Attendance marked → Student receives confirmation with timestamp
```

### 3.2 Warden/Admin Flows

#### A. Student Data Entry

```
Warden logs in → Navigates to Student Management → Adds new student → Enters details (name, registration no, room assignment, year, semester, phone, parent phone, address) → Uploads documents (Aadhaar, etc.) → Assigns room → Saves
```

#### B. Leave Request Approval

```
Warden views pending leave requests → Reviews details and uploaded document → Approves/Rejects with comments → Notification sent to student → Approved leaves visible to guards
```

#### C. Grievance Monitoring

```
Warden views grievance dashboard → Filters by priority/category/status → Reviews grievance → Assigns to staff (Future) OR marks as resolved → Student notified
```

#### D. Frontdesk Messages

```
Warden receives notification → Opens frontdesk inbox → Views student message → Replies → Ongoing conversation
```

#### E. Payment Verification (V1: Manual)

```
Warden receives offline payment info → Marks payment as verified in system → Student's payment status updated → (Future: Auto receipt generation and email)
```

### 3.3 Guard Flows

#### A. QR Attendance Generation

```
Guard logs in → Selects "Night Attendance" → Chooses block and year → System generates time-bound QR code (First year: 7:30PM-9:00PM, Second year: 7:30PM-10:00PM) → Guard displays QR on device → Students scan → Guard views live attendance list → Guard marks attendance period closed → System flags absent students
```

#### B. Leave Monitoring

```
Guard views approved leaves for the day → Checks student details (name, room no, leave dates) → (Future: Marks departure/arrival)
```

#### C. Late Entry QR (Future V1.1)

```
Guard generates late entry QR for specific student → Student scans → Late entry logged
```

### 3.4 Staff Flows (Minimal V1)

#### A. View Assigned Work

```
Staff logs in → Views assigned tasks/grievances → (Future: Updates status)
```

---

## 4. Feature List

### 4.1 MVP Features (V1 - Must Have)

#### Authentication & User Management

- [ ] Role-based login (Student, Warden, Guard, Staff)
- [ ] Basic profile view for all users
- [ ] Session management

#### Student Features

- [ ] Dashboard with room details (room no, block, floor, roommates)
- [ ] Read-only profile (data entered by warden)
- [ ] Leave request submission with document upload
- [ ] Grievance submission with category, priority, description, image upload
- [ ] Frontdesk messaging (chat with warden)
- [ ] Payment status view (read-only, no gateway)
- [ ] QR attendance scanning with location verification
- [ ] Notifications (leave status, grievance updates)

#### Warden Features

- [ ] Student data entry and management (manual input with document upload)
- [ ] Leave request review and approval/rejection
- [ ] Grievance monitoring dashboard with filters (category, priority, status)
- [ ] Manual grievance resolution (mark as resolved, add comments)
- [ ] Frontdesk messaging inbox
- [ ] Manual payment verification (mark as paid)
- [ ] Room assignment management
- [ ] View attendance reports

#### Guard Features

- [ ] QR code generation for attendance (block + year selection, time-bound)
- [ ] Live attendance tracking during scanning window
- [ ] View approved leaves for current/upcoming dates
- [ ] Location services enabled for proximity verification

#### Staff Features

- [ ] View assigned grievances/tasks (read-only)
- [ ] Submit task status updates

#### System Features

- [ ] Location-based attendance verification (2-meter proximity check)
- [ ] Document upload and storage (leave confirmations, student documents)
- [ ] Basic notification system (in-app)
- [ ] Attendance time windows (configurable by year: 1st year 7:30-9PM, 2nd year 7:30-10PM)

### 4.2 Future Features (Post-V1)

#### Phase 2 (V1.1)

- [ ] Payment gateway integration (online payments)
- [ ] Automated payment receipt generation and email
- [ ] Late entry QR generation by guards
- [ ] Staff task status updates (in-progress, completed)
- [ ] Room change request submission by students
- [ ] Room change assignment by warden
- [ ] Push notifications (Firebase/OneSignal)
- [ ] Email notifications

#### Phase 3 (V1.2+)

- [ ] Grievance assignment to specific staff members
- [ ] Staff work completion workflow
- [ ] Leave departure/arrival logging by guards
- [ ] Analytics dashboard for warden (attendance trends, grievance patterns)
- [ ] Event announcement system
- [ ] Multi-hostel support
- [ ] Parent portal (view student details, payments)
- [ ] Mess menu and feedback
- [ ] Visitor management

---

## 5. Edge Cases & Validation Rules

### 5.1 Attendance System

- **Location spoofing:** Use device location + additional verification (device fingerprinting in future)
- **QR sharing:** Proximity check ensures student is within 2m of guard's device
- **QR expired:** Time-bound QR invalidates after window closes
- **Student scans multiple times:** System accepts first valid scan only per session
- **Poor network during scan:** Queue scan locally, sync when online (with timestamp validation)
- **Guard phone dies mid-session:** Guard can log in on another device, regenerate QR for same session
- **Student forgets to scan:** Marked absent, can request manual correction from warden

### 5.2 Leave Requests

- **Overlapping leaves:** System allows (students can extend leaves)
- **Leave without mentor confirmation upload:** Form validation requires file upload
- **Retroactive leave requests:** Allow (common use case), but flag for warden review
- **Leave cancellation:** Student can cancel pending requests; warden can revoke approved leaves

### 5.3 Grievances

- **Duplicate complaints:** Allow, track by unique ticket ID
- **Emergency complaints:** High priority grievances send urgent notification to warden
- **Image upload fails:** Allow submission without image, student can add later
- **Grievance re-opening:** Students can comment on resolved grievances to reopen (Future)

### 5.4 Payments

- **Partial payments:** Warden can record partial amount, dues updated accordingly
- **Payment disputes:** Student can message warden via frontdesk
- **Late payment fees:** Manual calculation by warden in V1

### 5.5 Room Management

- **Over-capacity:** System validates max occupancy per room during assignment
- **Room swap:** Requires warden approval (Future - room change request feature)
- **Mid-semester room change:** Warden can reassign, student profile updates

### 5.6 Messaging

- **Abusive messages:** Manual moderation by warden, option to flag (Future)
- **Message flood protection:** Rate limiting (max 10 messages per hour per student)
- **Warden offline:** Messages queue, warden sees all on next login

### 5.7 User Management

- **Student graduation/checkout:** Warden can deactivate account
- **Forgotten password:** Password reset via email/phone OTP
- **Concurrent logins:** Allow, track last active device

---

## 6. Non-Goals (Out of Scope for V1)

❌ **Multi-hostel management** - V1 supports single hostel only
❌ **Payment gateway integration** - V1 is payment tracking only, no online payments
❌ **Automated receipt generation** - Manual process in V1
❌ **Parent portal** - Future feature
❌ **Advanced analytics** - Basic reports only in V1
❌ **Mess management** - Separate module for future
❌ **Visitor management** - Not in V1
❌ **Staff task workflow** - Staff has read-only access in V1
❌ **Room change requests** - Manual process via frontdesk messaging in V1
❌ **Event management** - Basic notifications only
❌ **Attendance biometric integration** - QR-only in V1
❌ **External system integrations** - Standalone app in V1
❌ **iOS app** - Android + Web only in V1
❌ **Offline mode** - Requires internet connection (except queued attendance scans)

---

## 7. Success Metrics

### 7.1 Adoption Metrics (First 3 Months)

- **80%+ student active users** (logged in at least once per week)
- **100% warden adoption** (daily active use)
- **90%+ guard adoption** (using QR attendance daily)

### 7.2 Operational Efficiency Metrics

- **Leave request processing time:** < 24 hours average (from submission to approval/rejection)
- **Grievance acknowledgment:** < 4 hours (warden views complaint)
- **Attendance completion:** 95%+ students marked present/absent within designated time window
- **Attendance accuracy:** < 5% proxy/cheating incidents

### 7.3 Engagement Metrics

- **Average student session time:** 3-5 minutes
- **Frontdesk messaging:** 70%+ messages receive warden response within 24 hours
- **Grievance submission rate:** 10-20 complaints per week (indicates trust in system)
- **Leave request completion rate:** 95%+ (students complete form and upload document)

### 7.4 Quality Metrics

- **App crash rate:** < 1%
- **QR scan success rate:** > 95% (on first attempt)
- **Document upload success rate:** > 90%
- **User-reported bugs:** < 5 critical bugs per month

### 7.5 Satisfaction Metrics (Quarterly Surveys)

- **Student satisfaction:** 4/5 average rating
- **Warden satisfaction:** Features save 5+ hours per week vs manual processes
- **Guard satisfaction:** QR system faster than manual roll call

---

## 8. Technical Considerations (High-Level)

### 8.1 Platform

- **Mobile:** Android app (React Native / Flutter)
- **Web:** Admin dashboard for warden (responsive web app)
- **Backend:** REST API (FastAPI/Django)

### 8.2 Key Technical Requirements

- **Location services:** GPS accuracy ±2 meters for attendance proximity check
- **QR generation:** Dynamic, time-bound QR codes with encryption
- **File storage:** Cloud storage for documents/images (50MB limit per file)
- **Database:** Relational DB for structured data (student records, attendance logs)
- **Authentication:** JWT-based, role-based access control (RBAC)
- **Real-time:** WebSocket for live attendance updates and messaging

### 8.3 Security & Privacy

- **Data encryption:** In-transit (HTTPS) and at-rest
- **Document access:** Role-based (only warden can access student documents)
- **Location data:** Used only during attendance, not stored long-term
- **GDPR compliance:** Student data export/deletion on request

---

## 9. Open Questions & Risks

### Open Questions

1. **Payment gateway preference?** (Razorpay, Paytm, Stripe) - Parking for V1.1
2. **Notification infrastructure?** (Firebase Cloud Messaging vs OneSignal)
3. **Document retention policy?** How long to store student documents after graduation?
4. **Attendance correction workflow?** How do students request manual attendance correction?
5. **Multi-language support needed?** Regional language support in V1?

### Risks

| Risk                                           | Impact | Mitigation                                                               |
| ---------------------------------------------- | ------ | ------------------------------------------------------------------------ |
| Students bypass location check (VPN, spoofing) | High   | Implement device fingerprinting, random spot checks                      |
| Low internet connectivity in hostel            | High   | Offline queue for attendance scans with server-side timestamp validation |
| Warden overwhelmed with notifications          | Medium | Implement notification batching, daily digest emails                     |
| Guards resist QR system                        | Medium | Training sessions, emphasize time savings vs roll call                   |
| Data privacy concerns                          | High   | Clear privacy policy, minimal data collection, student consent           |
| Scalability issues with QR scans               | Medium | Load testing before rollout, CDN for QR image delivery                   |

---

## 10. Launch Plan

### Phase 1: Internal Testing (Week 1-2)

- Deploy to staging environment
- Test with 20 volunteer students + 1 warden + 1 guard
- Gather feedback, fix critical bugs

### Phase 2: Pilot Rollout (Week 3-4)

- Deploy to single hostel block (50-100 students)
- Monitor adoption and performance
- Iterate based on feedback

### Phase 3: Full Rollout (Week 5-6)

- Deploy to entire hostel
- Training sessions for wardens and guards
- 24/7 support for first week

### Phase 4: Stabilization (Week 7-12)

- Monitor metrics
- Fix bugs
- Gather feature requests for V1.1

---

## 11. Appendix

### 11.1 Grievance Categories & Sub-Categories

**Electrical**

- Light not working
- Fan issue
- Socket/switchboard problem
- Power outage

**Cleaning**

- Room cleaning required
- Corridor/washroom cleaning
- Garbage disposal issue
- Pest control needed

**Plumbing**

- Tap/faucet leak
- Toilet/flush issue
- Water supply problem
- Drainage blockage

**Carpentry**

- Furniture repair (bed, chair, table)
- Door/window issue
- Cupboard/almirah problem

**Connectivity**

- WiFi not working
- Slow internet speed
- Network coverage issue

**Electronics**

- Geyser issue
- Cooler/AC problem
- Other appliances

**Food**

- Meal quality complaint
- Hygiene concern
- Menu feedback

**Safety**

- Security concern
- Fire safety issue
- First aid needed

**Emergency**

- Medical emergency
- Urgent repair needed
- Safety threat

### 11.2 Leave Types

- Home leave
- Medical leave
- Academic (conference, workshop, exam)
- Personal emergency
- Festival/cultural event
- Other (specify)

---

**Document Owner:** Product Manager
**Stakeholders:** Development Team, Hostel Administration, Student Representatives
**Next Review:** Post-pilot rollout (Week 4)
