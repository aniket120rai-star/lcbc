export type PortalTab =
  | 'overview'
  | 'attendance'
  | 'timetable'
  | 'tasks'
  | 'sgpa'
  | 'campus';

export type SiteRoute =
  | 'home'
  | 'news'
  | 'about'
  | 'administration'
  | 'programmes'
  | 'departments'
  | 'cells'
  | 'staff'
  | 'library'
  | 'iqac'
  | 'alumni'
  | 'portal';

export type AcademicProgram = 'BA' | 'B.Sc' | 'BCA' | 'B.Sc IT' | 'PGDCA';

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export type GradeLetter = 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'P' | 'F';

export type AttendanceStatus = 'Safe' | 'Warning' | 'Low';

export interface StudentProfile {
  name: string;
  program: AcademicProgram;
  semester: string;
  rollNumber: string;
  email?: string;
  avatarUrl?: string;
  authProvider?: 'local' | 'google';
}

export interface SavedStudentProfile extends StudentProfile {
  id: string;
  savedAt: string;
}

export interface SubjectAttendance {
  id: string;
  code: string;
  name: string;
  category: string;
  attended: number;
  total: number;
}

export interface TimetableSlot {
  id: string;
  day: DayOfWeek;
  subject: string;
  startTime: string;
  endTime: string;
  room: string;
  instructor?: string;
}

export interface StudyTask {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  completed: boolean;
  type: 'Assignment' | 'Exam' | 'Practical' | 'Other';
}

export interface StudyNote {
  id: string;
  title: string;
  subject: string;
  resourceType: 'Study Note' | 'PYQ Paper' | 'Syllabus' | 'Reference Link';
  content: string;
  url?: string;
  updatedAt: string;
}

export interface SgpaPaper {
  id: string;
  code: string;
  title: string;
  credits: number;
  grade: GradeLetter;
}

export type NoticeCategory =
  | 'Administration'
  | 'Examinations'
  | 'Admissions'
  | 'Scholarships'
  | 'Tenders & Quotations'
  | 'Campus Life'
  | 'Personal';

export interface CampusNotice {
  id: string;
  title: string;
  date: string;
  category: NoticeCategory;
  summary: string;
  isPersonal?: boolean;
  externalUrl?: string;
}

export interface AcademicDepartment {
  name: string;
  stream: 'Arts' | 'Science' | 'Self-Financing IT';
  level: string;
  focus: string;
  honours4thYear?: boolean;
}

export interface CommitteeContact {
  name: string;
  role: string;
  email?: string;
  details: string;
}

export interface StatutoryCommittee {
  id: 'grievance' | 'icc' | 'antiragging';
  title: string;
  shortTitle: string;
  chairperson?: string;
  members: { role: string; name: string; phone?: string }[];
  email: string;
  mandate: string;
  helplineNote: string;
}

export interface ProgrammeTrack {
  id: 'ug' | 'honours4' | 'pgdca';
  label: string;
  subtitle: string;
  items: {
    code: string;
    name: string;
    duration: string;
    eligibility: string;
    admissionFee: string;
    annualFee: string;
    highlights: string;
  }[];
}

export type StaffCategory = 'Teaching' | 'Library' | 'Non-Teaching';

export interface StaffMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  category: StaffCategory;
  qualification?: string;
}

export interface AlumniMember {
  id: string;
  name: string;
  batch: string;
  stream: string;
  distinction: string;
  quote: string;
}

export interface CollegeEvent {
  id: string;
  title: string;
  dateLabel: string;
  organizer: string;
  description: string;
}

export interface EminentVisitor {
  id: string;
  name: string;
  designation: string;
  occasion: string;
}

export interface CellOrWing {
  id: string;
  group: 'Cell' | 'Club' | 'Student Wing';
  name: string;
  coordinator: string;
  focus: string;
}

export interface PortalState {
  profile: StudentProfile;
  savedProfiles: SavedStudentProfile[];
  subjects: SubjectAttendance[];
  timetable: TimetableSlot[];
  tasks: StudyTask[];
  notes: StudyNote[];
  sgpaPapers: SgpaPaper[];
  notices: CampusNotice[];
}
