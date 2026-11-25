import type {
  AcademicDepartment,
  AttendanceStatus,
  CampusNotice,
  DayOfWeek,
  GradeLetter,
  SgpaPaper,
  StaffCategory,
  StaffMember,
  SavedStudentProfile,
  StudyNote,
  SubjectAttendance,
  TimetableSlot,
} from '../types/portal';

export const GRADE_POINTS: Record<GradeLetter, number> = {
  O: 10,
  'A+': 9,
  A: 8,
  'B+': 7,
  B: 6,
  C: 5,
  P: 4,
  F: 0,
};

export const GRADE_DESCRIPTIONS: Record<GradeLetter, string> = {
  O: 'O (10) · Outstanding',
  'A+': 'A+ (9) · Excellent',
  A: 'A (8) · Very Good',
  'B+': 'B+ (7) · Good',
  B: 'B (6) · Above Avg',
  C: 'C (5) · Average',
  P: 'P (4) · Pass',
  F: 'F (0) · Fail',
};

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function calculateAttendancePercentage(attended: number, total: number): number {
  if (total <= 0 || attended < 0) return 0;
  const clampedAttended = Math.min(attended, total);
  return Math.round((clampedAttended / total) * 1000) / 10;
}

export function getAttendanceStatus(percentage: number): AttendanceStatus {
  if (percentage >= 75) return 'Safe';
  if (percentage >= 65) return 'Warning';
  return 'Low';
}

export interface EligibilityGuidance {
  mode: 'skip' | 'need' | 'exact' | 'none';
  count: number;
  message: string;
}

export function get75EligibilityGuidance(attended: number, total: number): EligibilityGuidance {
  if (total <= 0) {
    return {
      mode: 'none',
      count: 0,
      message: 'No classes logged yet',
    };
  }

  const safeAttended = Math.min(Math.max(0, attended), total);
  const ratio = safeAttended / total;

  if (ratio >= 0.75) {
    const canSkip = Math.floor((4 * safeAttended - 3 * total) / 3);
    if (canSkip <= 0) {
      return {
        mode: 'exact',
        count: 0,
        message: 'On 75% boundary — attend next class to stay safe',
      };
    }
    return {
      mode: 'skip',
      count: canSkip,
      message: `Can skip next ${canSkip} class${canSkip === 1 ? '' : 'es'} and stay ≥ 75%`,
    };
  }

  const needToAttend = Math.ceil(3 * total - 4 * safeAttended);
  return {
    mode: 'need',
    count: needToAttend,
    message: `Attend next ${needToAttend} consecutive class${needToAttend === 1 ? '' : 'es'} to reach 75%`,
  };
}

export function calculateOverallAttendance(subjects: SubjectAttendance[]): {
  attended: number;
  total: number;
  percentage: number;
} {
  const totals = subjects.reduce(
    (acc, subject) => {
      acc.attended += Math.max(0, Math.min(subject.attended, subject.total));
      acc.total += Math.max(0, subject.total);
      return acc;
    },
    { attended: 0, total: 0 }
  );

  return {
    attended: totals.attended,
    total: totals.total,
    percentage: calculateAttendancePercentage(totals.attended, totals.total),
  };
}

export function calculateSgpa(papers: SgpaPaper[]): {
  sgpa: number;
  totalCredits: number;
  approxPercentage: number;
  hasFail: boolean;
} {
  if (papers.length === 0) {
    return {
      sgpa: 0,
      totalCredits: 0,
      approxPercentage: 0,
      hasFail: false,
    };
  }

  let totalCredits = 0;
  let weightedPoints = 0;
  let hasFail = false;

  for (const paper of papers) {
    const credits = Math.max(0, Number(paper.credits) || 0);
    const point = GRADE_POINTS[paper.grade] ?? 0;
    if (paper.grade === 'F' && credits > 0) {
      hasFail = true;
    }
    totalCredits += credits;
    weightedPoints += credits * point;
  }

  if (totalCredits === 0) {
    return {
      sgpa: 0,
      totalCredits: 0,
      approxPercentage: 0,
      hasFail,
    };
  }

  const sgpa = Math.round((weightedPoints / totalCredits) * 100) / 100;
  const approxPercentage = Math.round(sgpa * 10 * 10) / 10;

  return {
    sgpa,
    totalCredits,
    approxPercentage,
    hasFail,
  };
}

export function getDayName(date: Date = new Date()): DayOfWeek | 'Sunday' {
  const dayIndex = date.getDay();
  const map: Record<number, DayOfWeek | 'Sunday'> = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  return map[dayIndex];
}

export function getClassesForDay(
  timetable: TimetableSlot[],
  day: DayOfWeek | 'Sunday'
): TimetableSlot[] {
  if (day === 'Sunday') return [];
  return timetable
    .filter((slot) => slot.day === day)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function formatTime12h(time24: string): string {
  const [hStr, mStr] = time24.split(':');
  const hour = Number(hStr);
  const minute = Number(mStr);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return time24;
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
}

export function filterNotes(
  notes: StudyNote[],
  subjectFilter: string,
  query: string
): StudyNote[] {
  const normalizedQuery = query.trim().toLowerCase();
  return notes.filter((note) => {
    const matchesSubject =
      subjectFilter === 'All' || note.subject === subjectFilter;
    if (!matchesSubject) return false;
    if (!normalizedQuery) return true;
    return (
      note.title.toLowerCase().includes(normalizedQuery) ||
      note.subject.toLowerCase().includes(normalizedQuery) ||
      note.content.toLowerCase().includes(normalizedQuery) ||
      note.resourceType.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function filterNotices(
  notices: CampusNotice[],
  categoryFilter: string,
  query: string
): CampusNotice[] {
  const normalizedQuery = query.trim().toLowerCase();
  return notices.filter((notice) => {
    const matchesCategory =
      categoryFilter === 'All' || notice.category === categoryFilter;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      notice.title.toLowerCase().includes(normalizedQuery) ||
      notice.summary.toLowerCase().includes(normalizedQuery) ||
      notice.category.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function filterDepartments(
  departments: AcademicDepartment[],
  streamFilter: 'All' | 'Arts' | 'Science' | 'Self-Financing IT',
  query: string = ''
): AcademicDepartment[] {
  const normalizedQuery = query.trim().toLowerCase();
  return departments.filter((dept) => {
    const matchesStream = streamFilter === 'All' || dept.stream === streamFilter;
    if (!matchesStream) return false;
    if (!normalizedQuery) return true;
    return (
      dept.name.toLowerCase().includes(normalizedQuery) ||
      dept.focus.toLowerCase().includes(normalizedQuery) ||
      dept.level.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function filterStaff(
  staff: StaffMember[],
  category: StaffCategory,
  query: string = ''
): StaffMember[] {
  const normalizedQuery = query.trim().toLowerCase();
  return staff.filter((member) => {
    if (member.category !== category) return false;
    if (!normalizedQuery) return true;
    return (
      member.name.toLowerCase().includes(normalizedQuery) ||
      member.designation.toLowerCase().includes(normalizedQuery) ||
      member.department.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function getStudentInitials(name: string): string {
  const cleaned = name.trim();
  if (!cleaned) return 'ST';
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function isValidEmailAddress(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export function upsertSavedStudentProfile(
  profiles: SavedStudentProfile[],
  incoming: Omit<SavedStudentProfile, 'id' | 'savedAt'> & {
    id?: string;
    savedAt?: string;
  },
  options: { forceNew?: boolean } = {}
): SavedStudentProfile[] {
  const normalizedRoll = incoming.rollNumber.trim().toLowerCase();
  const normalizedEmail = (incoming.email ?? '').trim().toLowerCase();
  const nowIso = incoming.savedAt ?? new Date().toISOString();

  const existingIndex = options.forceNew
    ? -1
    : profiles.findIndex((item) => {
        if (incoming.id && item.id === incoming.id) return true;
        if (normalizedEmail && (item.email ?? '').trim().toLowerCase() === normalizedEmail) {
          return true;
        }
        return item.rollNumber.trim().toLowerCase() === normalizedRoll;
      });

  if (existingIndex >= 0) {
    const existing = profiles[existingIndex];
    const updated: SavedStudentProfile = {
      ...existing,
      ...incoming,
      name: incoming.name.trim(),
      rollNumber: incoming.rollNumber.trim(),
      email: incoming.email?.trim() || undefined,
      avatarUrl: incoming.avatarUrl?.trim() || undefined,
      id: existing.id,
      savedAt: nowIso,
    };
    return [updated, ...profiles.filter((_, idx) => idx !== existingIndex)];
  }

  const created: SavedStudentProfile = {
    ...incoming,
    name: incoming.name.trim(),
    rollNumber: incoming.rollNumber.trim(),
    email: incoming.email?.trim() || undefined,
    avatarUrl: incoming.avatarUrl?.trim() || undefined,
    id:
      incoming.id ??
      `prof-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    savedAt: nowIso,
  };
  return [created, ...profiles];
}

export function removeSavedStudentProfile(
  profiles: SavedStudentProfile[],
  id: string
): SavedStudentProfile[] {
  return profiles.filter((p) => p.id !== id);
}
