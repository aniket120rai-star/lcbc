import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateAttendancePercentage,
  calculateOverallAttendance,
  calculateSgpa,
  filterDepartments,
  filterNotes,
  filterNotices,
  filterStaff,
  formatTime12h,
  get75EligibilityGuidance,
  getAttendanceStatus,
  getClassesForDay,
  getDayName,
  getStudentInitials,
  isValidEmailAddress,
  removeSavedStudentProfile,
  upsertSavedStudentProfile,
} from './calculations';
import type {
  AcademicDepartment,
  CampusNotice,
  SavedStudentProfile,
  SgpaPaper,
  StaffMember,
  StudyNote,
  SubjectAttendance,
  TimetableSlot,
} from '../types/portal';

test('attendance percentage calculates and rounds cleanly', () => {
  assert.equal(calculateAttendancePercentage(0, 0), 0);
  assert.equal(calculateAttendancePercentage(15, 20), 75);
  assert.equal(calculateAttendancePercentage(17, 23), 73.9);
  assert.equal(calculateAttendancePercentage(25, 20), 100);
});

test('attendance status classifies Safe, Warning, and Low thresholds', () => {
  assert.equal(getAttendanceStatus(75), 'Safe');
  assert.equal(getAttendanceStatus(82.4), 'Safe');
  assert.equal(getAttendanceStatus(74.9), 'Warning');
  assert.equal(getAttendanceStatus(65), 'Warning');
  assert.equal(getAttendanceStatus(64.9), 'Low');
});

test('75% eligibility calculator handles skip, exact boundary, need, and empty', () => {
  assert.equal(get75EligibilityGuidance(0, 0).mode, 'none');

  const exact = get75EligibilityGuidance(15, 20);
  assert.equal(exact.mode, 'exact');
  assert.equal(exact.count, 0);

  const safeSkip = get75EligibilityGuidance(18, 20);
  assert.equal(safeSkip.mode, 'skip');
  assert.equal(safeSkip.count, 4);

  const needMore = get75EligibilityGuidance(12, 20);
  assert.equal(needMore.mode, 'need');
  assert.equal(needMore.count, 12);
});

test('overall attendance aggregates across subjects', () => {
  const subjects: SubjectAttendance[] = [
    { id: '1', code: 'BCA-301', name: 'DBMS', category: 'Major', attended: 18, total: 20 },
    { id: '2', code: 'BCA-302', name: 'OS', category: 'Major', attended: 12, total: 20 },
  ];
  const overall = calculateOverallAttendance(subjects);
  assert.equal(overall.attended, 30);
  assert.equal(overall.total, 40);
  assert.equal(overall.percentage, 75);
});

test('GU-FYUGP SGPA calculation handles 10-point scale and fail detection', () => {
  const papers: SgpaPaper[] = [
    { id: '1', code: 'CSC-301', title: 'Data Structures', credits: 4, grade: 'O' },
    { id: '2', code: 'CSC-302', title: 'Discrete Math', credits: 4, grade: 'A+' },
    { id: '3', code: 'ENG-301', title: 'AEC English', credits: 2, grade: 'A' },
  ];
  const res = calculateSgpa(papers);
  assert.equal(res.totalCredits, 10);
  assert.equal(res.sgpa, 9.2);
  assert.equal(res.approxPercentage, 92);
  assert.equal(res.hasFail, false);

  const withFail = calculateSgpa([
    ...papers,
    { id: '4', code: 'SEC-301', title: 'Web Lab', credits: 2, grade: 'F' },
  ]);
  assert.equal(withFail.hasFail, true);
  assert.equal(withFail.totalCredits, 12);
});

test('timetable day mapping and sorting works for Monday-Saturday and Sunday closed', () => {
  assert.equal(getDayName(new Date('2026-11-22T10:00:00')), 'Sunday');
  assert.equal(getDayName(new Date('2026-11-23T10:00:00')), 'Monday');

  const slots: TimetableSlot[] = [
    { id: '1', day: 'Monday', subject: 'OS', startTime: '11:30', endTime: '12:30', room: 'R1' },
    { id: '2', day: 'Monday', subject: 'DBMS', startTime: '09:00', endTime: '10:00', room: 'Lab 1' },
  ];
  const monday = getClassesForDay(slots, 'Monday');
  assert.equal(monday.length, 2);
  assert.equal(monday[0].subject, 'DBMS');
  assert.equal(getClassesForDay(slots, 'Sunday').length, 0);
  assert.equal(formatTime12h('14:30'), '2:30 PM');
});

test('notes, notices, departments, and staff filters match criteria cleanly', () => {
  const notes: StudyNote[] = [
    {
      id: '1',
      title: 'SQL Normalization PYQ 2024',
      subject: 'Database Management Systems',
      resourceType: 'PYQ Paper',
      content: '1NF, 2NF, 3NF, BCNF questions',
      updatedAt: '2026-10-12',
    },
    {
      id: '2',
      title: 'CPU Scheduling Notes',
      subject: 'Operating Systems',
      resourceType: 'Study Note',
      content: 'Round robin and SJF',
      updatedAt: '2026-10-15',
    },
  ];
  assert.equal(filterNotes(notes, 'All', 'normalization').length, 1);
  assert.equal(filterNotes(notes, 'Operating Systems', '').length, 1);

  const notices: CampusNotice[] = [
    {
      id: 'n1',
      title: 'FYUGP 4th Year Honours Admission',
      date: '2026-08-21',
      category: 'Admissions',
      summary: 'Merit list published.',
    },
    {
      id: 'n2',
      title: 'ICC Reconstitution',
      date: '2026-09-24',
      category: 'Administration',
      summary: 'Committee update.',
    },
  ];
  assert.equal(filterNotices(notices, 'Admissions', '').length, 1);
  assert.equal(filterNotices(notices, 'All', 'ICC').length, 1);

  const depts: AcademicDepartment[] = [
    { name: 'Assamese', stream: 'Arts', level: 'BA Major', focus: 'Literature' },
    { name: 'Physics', stream: 'Science', level: 'B.Sc Major', focus: 'Optics & Quantum' },
    { name: 'BCA', stream: 'Self-Financing IT', level: 'UG', focus: 'Software' },
  ];
  assert.equal(filterDepartments(depts, 'Science', '').length, 1);
  assert.equal(filterDepartments(depts, 'All', 'optics').length, 1);

  const staff: StaffMember[] = [
    { id: 's1', name: 'Dr. Pranjal Sarma', designation: 'Associate Professor', department: 'Physics', category: 'Teaching' },
    { id: 's2', name: 'Sri Bikash Kalita', designation: 'Librarian', department: 'Central Library', category: 'Library' },
  ];
  assert.equal(filterStaff(staff, 'Teaching', 'Physics').length, 1);
  assert.equal(filterStaff(staff, 'Library', '').length, 1);
});

test('student profile helpers validate emails, compute initials, and upsert/remove saved logins', () => {
  assert.equal(getStudentInitials('Rishabh Choudhury'), 'RC');
  assert.equal(getStudentInitials('Aniket'), 'AN');
  assert.equal(getStudentInitials(''), 'ST');

  assert.equal(isValidEmailAddress('aniket120rai@gmail.com'), true);
  assert.equal(isValidEmailAddress('invalid-email'), false);
  assert.equal(isValidEmailAddress(''), false);

  const initial: SavedStudentProfile[] = [
    {
      id: 'prof-1',
      name: 'Rishabh Choudhury',
      program: 'BCA',
      semester: 'Semester 3 (FYUGP)',
      rollNumber: 'LCB-24-BCA-038',
      savedAt: '2026-11-01T10:00:00.000Z',
    },
  ];

  // Adding a new student profile prepends it
  const withSecond = upsertSavedStudentProfile(initial, {
    name: 'Aniket Rai',
    program: 'B.Sc IT',
    semester: 'Semester 5 (FYUGP)',
    rollNumber: 'LCB-24-IT-012',
    email: 'aniket120rai@gmail.com',
    avatarUrl: 'https://example.com/photo.jpg',
    authProvider: 'google',
    savedAt: '2026-11-24T10:00:00.000Z',
  });
  assert.equal(withSecond.length, 2);
  assert.equal(withSecond[0].name, 'Aniket Rai');
  assert.equal(withSecond[0].email, 'aniket120rai@gmail.com');

  // Updating by matching email updates existing entry without duplicating
  const updatedSecond = upsertSavedStudentProfile(withSecond, {
    name: 'Aniket Kumar Rai',
    program: 'B.Sc IT',
    semester: 'Semester 5 (FYUGP)',
    rollNumber: 'LCB-24-IT-012',
    email: 'ANIKET120RAI@gmail.com',
    savedAt: '2026-11-24T11:00:00.000Z',
  });
  assert.equal(updatedSecond.length, 2);
  assert.equal(updatedSecond[0].name, 'Aniket Kumar Rai');

  // forceNew creates a separate login entry even if rollNumber matches
  const forced = upsertSavedStudentProfile(
    updatedSecond,
    {
      name: 'Priya Das',
      program: 'BA',
      semester: 'Semester 1 (FYUGP)',
      rollNumber: 'LCB-24-IT-012',
    },
    { forceNew: true }
  );
  assert.equal(forced.length, 3);

  const afterRemove = removeSavedStudentProfile(forced, 'prof-1');
  assert.equal(afterRemove.length, 2);
  assert.equal(afterRemove.some((p) => p.id === 'prof-1'), false);
});
