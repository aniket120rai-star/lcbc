import type {
  AcademicDepartment,
  CommitteeContact,
  PortalState,
} from '../types/portal';
import { ALL_DEPARTMENTS, COLLEGE_IMAGES, OFFICIAL_2026_NOTICES } from './collegeData';

export const CAMPUS_HERO_IMAGE = COLLEGE_IMAGES.frontCampus;

export const FYUGP_SEMESTERS = [
  'Semester 1 (FYUGP)',
  'Semester 2 (FYUGP)',
  'Semester 3 (FYUGP)',
  'Semester 4 (FYUGP)',
  'Semester 5 (FYUGP)',
  'Semester 6 (FYUGP)',
  'Semester 7 (Honours)',
  'Semester 8 (Honours with Research)',
];

export const ACADEMIC_DEPARTMENTS: AcademicDepartment[] = ALL_DEPARTMENTS;

export const STUDENT_WINGS_AND_FACILITIES = [
  {
    title: 'NCC (National Cadet Corps)',
    category: 'Student Wing',
    description:
      'Active Army Wing unit fostering discipline, drill training, community service, and B/C certificate readiness.',
  },
  {
    title: 'NSS (National Service Scheme)',
    category: 'Student Wing',
    description:
      'Regular campus cleanliness drives, blood donation camps, and adopted-village outreach in Kamrup Metro.',
  },
  {
    title: 'LCBCSU (Students’ Union)',
    category: 'Student Wing',
    description:
      'Lalit Chandra Bharali College Students’ Union representing student welfare, College Week, and cultural events.',
  },
  {
    title: 'Central & Digital Library',
    category: 'Campus Facility',
    description:
      'Thousands of textbooks, Gauhati University reference archives, N-LIST e-journals, and quiet reading hall.',
  },
  {
    title: 'College Canteen & Common Rooms',
    category: 'Campus Facility',
    description:
      'Hygienic subsidized refreshments, separate girls’ & boys’ common rooms, and Wi-Fi enabled courtyard seating.',
  },
];

export const COMMITTEE_CONTACTS: CommitteeContact[] = [
  {
    name: 'Office of the Principal',
    role: 'Dr. Amarendra Kalita, Principal',
    details: 'Administrative Block, Ground Floor · Mon–Sat, 9:00 AM – 4:30 PM',
  },
  {
    name: 'Student Grievance Redressal Committee',
    role: 'Chairperson: Dr. Amarendra Kalita · Co-ordinator: Dr. Pranjal Sarma (98647 21966)',
    email: 'lcbcollege.grievance.cell@gmail.com',
    details: 'Confidential review of examination, classroom, and facility grievances.',
  },
  {
    name: 'Internal Complaint Committee (ICC)',
    role: 'Presiding Officer: Mrs. Kunjalata Brahma Bathari (9435306734) · Mrs. Nazima Hussain Borbora (9706930189)',
    email: 'icclcbcollege@gmail.com',
    details: 'Reconstituted Sept 2026 committee ensuring safe and respectful campus conduct.',
  },
  {
    name: 'Anti-Ragging Committee',
    role: 'Chairperson: Dr. Amarendra Kalita · Secretary: Dr. Basistha Ram Bhuyan (94351 14567 / 94351 14657)',
    email: 'griev.redrassal.lcbcollege@gmail.com',
    details: 'Active campus vigilance squad across Academic Blocks, IT Wing, and Canteen.',
  },
];

export function createInitialPortalState(): PortalState {
  const defaultProfile = {
    name: 'Rishabh Choudhury',
    program: 'BCA' as const,
    semester: 'Semester 3 (FYUGP)',
    rollNumber: 'LCB-24-BCA-038',
    authProvider: 'local' as const,
  };

  return {
    profile: defaultProfile,
    savedProfiles: [
      {
        ...defaultProfile,
        id: 'prof-demo-1',
        savedAt: '2026-11-01T09:00:00.000Z',
      },
    ],
    subjects: [
      {
        id: 'subj-1',
        code: 'BCA-MAJ-301',
        name: 'Database Management Systems',
        category: 'Major Core',
        attended: 26,
        total: 30,
      },
      {
        id: 'subj-2',
        code: 'BCA-MAJ-302',
        name: 'Data Structures & Algorithms',
        category: 'Major Core',
        attended: 22,
        total: 29,
      },
      {
        id: 'subj-3',
        code: 'CSC-MIN-301',
        name: 'Operating Systems',
        category: 'Minor',
        attended: 17,
        total: 24,
      },
      {
        id: 'subj-4',
        code: 'MAT-IDC-301',
        name: 'Discrete Mathematics',
        category: 'IDC',
        attended: 15,
        total: 20,
      },
      {
        id: 'subj-5',
        code: 'BCA-SEC-301',
        name: 'Web Technologies Lab',
        category: 'SEC',
        attended: 11,
        total: 18,
      },
      {
        id: 'subj-6',
        code: 'ENG-AEC-301',
        name: 'Academic Communication',
        category: 'AEC',
        attended: 14,
        total: 16,
      },
    ],
    timetable: [
      {
        id: 'tt-1',
        day: 'Monday',
        subject: 'Database Management Systems',
        startTime: '09:15',
        endTime: '10:15',
        room: 'IT Block Room 202',
        instructor: 'Dept. of Computer Science',
      },
      {
        id: 'tt-2',
        day: 'Monday',
        subject: 'Data Structures & Algorithms',
        startTime: '10:30',
        endTime: '11:30',
        room: 'IT Block Room 202',
        instructor: 'Dept. of Computer Science',
      },
      {
        id: 'tt-3',
        day: 'Monday',
        subject: 'Web Technologies Lab',
        startTime: '13:00',
        endTime: '15:00',
        room: 'Central Computer Lab 1',
        instructor: 'IT Faculty',
      },
      {
        id: 'tt-4',
        day: 'Tuesday',
        subject: 'Operating Systems',
        startTime: '09:15',
        endTime: '10:15',
        room: 'Science Block 104',
        instructor: 'Dept. of Computer Science',
      },
      {
        id: 'tt-5',
        day: 'Tuesday',
        subject: 'Discrete Mathematics',
        startTime: '11:30',
        endTime: '12:30',
        room: 'Main Building Room 12',
        instructor: 'Dept. of Mathematics',
      },
      {
        id: 'tt-6',
        day: 'Tuesday',
        subject: 'Academic Communication',
        startTime: '14:00',
        endTime: '15:00',
        room: 'Arts Block Room 8',
        instructor: 'Dept. of English',
      },
      {
        id: 'tt-7',
        day: 'Wednesday',
        subject: 'Database Management Systems',
        startTime: '09:15',
        endTime: '10:15',
        room: 'IT Block Room 202',
      },
      {
        id: 'tt-8',
        day: 'Wednesday',
        subject: 'DBMS Practical Session',
        startTime: '10:30',
        endTime: '12:30',
        room: 'Central Computer Lab 2',
      },
      {
        id: 'tt-9',
        day: 'Wednesday',
        subject: 'Operating Systems',
        startTime: '13:30',
        endTime: '14:30',
        room: 'Science Block 104',
      },
      {
        id: 'tt-10',
        day: 'Thursday',
        subject: 'Data Structures & Algorithms',
        startTime: '09:15',
        endTime: '10:15',
        room: 'IT Block Room 202',
      },
      {
        id: 'tt-11',
        day: 'Thursday',
        subject: 'Discrete Mathematics',
        startTime: '10:30',
        endTime: '11:30',
        room: 'Main Building Room 12',
      },
      {
        id: 'tt-12',
        day: 'Thursday',
        subject: 'Web Technologies Lab',
        startTime: '13:30',
        endTime: '15:30',
        room: 'Central Computer Lab 1',
      },
      {
        id: 'tt-13',
        day: 'Friday',
        subject: 'Database Management Systems',
        startTime: '09:15',
        endTime: '10:15',
        room: 'IT Block Room 202',
      },
      {
        id: 'tt-14',
        day: 'Friday',
        subject: 'Academic Communication',
        startTime: '11:30',
        endTime: '12:30',
        room: 'Arts Block Room 8',
      },
      {
        id: 'tt-15',
        day: 'Friday',
        subject: 'DSA Coding Tutorial',
        startTime: '14:00',
        endTime: '16:00',
        room: 'Central Computer Lab 1',
      },
      {
        id: 'tt-16',
        day: 'Saturday',
        subject: 'Operating Systems Seminar',
        startTime: '09:30',
        endTime: '11:00',
        room: 'Digital Library Hall',
      },
      {
        id: 'tt-17',
        day: 'Saturday',
        subject: 'NSS / Mentoring Hour',
        startTime: '11:30',
        endTime: '13:00',
        room: 'Main Courtyard',
      },
    ],
    tasks: [
      {
        id: 'task-1',
        title: 'Submit ER Diagram & Normalization Assignment (Unit 3)',
        subject: 'Database Management Systems',
        dueDate: '2026-11-28',
        completed: false,
        type: 'Assignment',
      },
      {
        id: 'task-2',
        title: 'Complete AVL Tree & Graph Traversal Lab Record',
        subject: 'Data Structures & Algorithms',
        dueDate: '2026-11-30',
        completed: false,
        type: 'Practical',
      },
      {
        id: 'task-3',
        title: 'GU Odd Semester Sessional Exam — Operating Systems',
        subject: 'Operating Systems',
        dueDate: '2026-12-03',
        completed: false,
        type: 'Exam',
      },
      {
        id: 'task-4',
        title: 'Verify GU Examination Form & Fee Receipt at Office Counter',
        subject: 'Administration',
        dueDate: '2026-11-26',
        completed: true,
        type: 'Other',
      },
    ],
    notes: [
      {
        id: 'note-1',
        title: 'GU-FYUGP BCA 3rd Sem Syllabus & Credit Matrix',
        subject: 'Database Management Systems',
        resourceType: 'Syllabus',
        content:
          'Covers Relational Algebra, SQL DDL/DML, Functional Dependencies, 1NF–BCNF, Transactions, and Concurrency Control.',
        url: 'https://www.gauhati.ac.in/academics/fyugp',
        updatedAt: '2026-11-10',
      },
      {
        id: 'note-2',
        title: 'DBMS Previous Year Question Paper (2024–2025)',
        subject: 'Database Management Systems',
        resourceType: 'PYQ Paper',
        content:
          'Key repeated 10-mark questions: B+ Tree indexing vs Hashing, 3NF decomposition proof, ACID properties & Two-Phase Locking.',
        url: 'https://www.lcbcollege.co.in/',
        updatedAt: '2026-11-15',
      },
      {
        id: 'note-3',
        title: 'CPU Scheduling & Deadlock Quick Revision Sheet',
        subject: 'Operating Systems',
        resourceType: 'Study Note',
        content:
          'FCFS, SJF, Round Robin Gantt chart steps + Banker’s Algorithm safety check and four Coffman conditions for deadlock.',
        updatedAt: '2026-11-18',
      },
      {
        id: 'note-4',
        title: 'Graph Algorithms & Recurrence Relations PYQ Set',
        subject: 'Data Structures & Algorithms',
        resourceType: 'PYQ Paper',
        content:
          'Includes Dijkstra, Kruskal MST, Master Theorem practice problems, and infix-to-postfix stack trace examples.',
        url: 'https://www.lcbcollege.co.in/',
        updatedAt: '2026-11-20',
      },
    ],
    sgpaPapers: [
      {
        id: 'sgpa-1',
        code: 'BCA-MAJ-301',
        title: 'Database Management Systems',
        credits: 4,
        grade: 'A+',
      },
      {
        id: 'sgpa-2',
        code: 'BCA-MAJ-302',
        title: 'Data Structures & Algorithms',
        credits: 4,
        grade: 'A',
      },
      {
        id: 'sgpa-3',
        code: 'CSC-MIN-301',
        title: 'Operating Systems',
        credits: 4,
        grade: 'A+',
      },
      {
        id: 'sgpa-4',
        code: 'MAT-IDC-301',
        title: 'Discrete Mathematics',
        credits: 3,
        grade: 'B+',
      },
      {
        id: 'sgpa-5',
        code: 'BCA-SEC-301',
        title: 'Web Technologies Lab',
        credits: 3,
        grade: 'O',
      },
      {
        id: 'sgpa-6',
        code: 'ENG-AEC-301',
        title: 'Academic Communication',
        credits: 2,
        grade: 'A',
      },
    ],
    notices: OFFICIAL_2026_NOTICES,
  };
}
