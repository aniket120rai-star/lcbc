import type {
  AcademicDepartment,
  AlumniMember,
  CampusNotice,
  CellOrWing,
  CollegeEvent,
  EminentVisitor,
  ProgrammeTrack,
  StaffMember,
  StatutoryCommittee,
} from '../types/portal';

export const OFFICIAL_URLS = {
  home: 'https://www.lcbcollege.co.in/',
  prospectus2026: 'http://lcbcollege.co.in/Final%20Pros%2026-27%20LCBC.pdf',
  admissionHelpDesk: 'https://lcbcollege.co.in/admission2627.php',
  onlineServices: 'https://www.lcbcollege.co.in/',
  samarthPortal: 'https://assamadmission.samarth.ac.in/',
  gauhatiUniversity: 'https://www.gauhati.ac.in/',
};

export const COLLEGE_IMAGES = {
  logo: '/assets/aistudio/lcb_college_logo_by_mehbubalam_ddqmjq1-fullview_c2966db8.webp',
  principalPortrait: '/assets/aistudio/principal_51d1ae35.webp',
  frontCampus: '/assets/aistudio/lalit-chandra-bharali-college-guwahati-282374_f86c9c0b.webp',
  centralLibrary: '/assets/aistudio/1635935529_72557ada.webp',
  computerLab: '/assets/aistudio/Computer_Lab_e69d45ce.webp',
  classroom: '/assets/aistudio/206_Front_aaa76111.webp',
  seminarHall: '/assets/aistudio/1635763355_39c8607c.webp',
  goldenJubilee: '/assets/aistudio/1652157939_85ae6ebc.webp',
};

export const TICKER_ANNOUNCEMENTS = [
  {
    id: 'tk-1',
    text: 'Admission Notifications & Merit Lists (Round 2 Non-CUET) open for FYUGP B.A., B.Sc., B.C.A. & B.Sc. IT (2026–27).',
    href: OFFICIAL_URLS.admissionHelpDesk,
  },
  {
    id: 'tk-2',
    text: 'Newly Introduced B.Sc. Physics Major Programme under Gauhati University FYUGP (NEP 2020) for 2026–27.',
    href: OFFICIAL_URLS.prospectus2026,
  },
  {
    id: 'tk-3',
    text: '4th Year Honours (7th & 8th Semester) introduced in Computer Science, Political Science, English, Assamese & Economics.',
    href: OFFICIAL_URLS.home,
  },
];

export const OFFICIAL_2026_NOTICES: CampusNotice[] = [
  {
    id: 'not-sep-28',
    title: 'Constitution of Election Grievance Redressal Cell — Students’ Union Elections 2026–27',
    date: '2026-09-28',
    category: 'Administration',
    summary:
      'Notification regarding constitution of the Election Grievance Redressal Cell for LCBCSU Elections 2026–27 in accordance with Lyngdoh Committee guidelines.',
    externalUrl: OFFICIAL_URLS.home,
  },
  {
    id: 'not-sep-24-icc',
    title: 'Reconstitution of Internal Complaint Committee (ICC) for Academic Session 2026–27',
    date: '2026-09-24',
    category: 'Administration',
    summary:
      'Reconstituted ICC led by Presiding Officer Mrs. Kunjalata Brahma Bathari and Mrs. Nazima Hussain Borbora to ensure workplace and campus safety.',
    externalUrl: OFFICIAL_URLS.home,
  },
  {
    id: 'not-sep-24-ro',
    title: 'Appointment of Returning Officer — Students’ Union Elections 2026–27',
    date: '2026-09-24',
    category: 'Administration',
    summary:
      'Official notification appointing the Returning Officer and polling schedule for Lalit Chandra Bharali College Students’ Union (LCBCSU) Elections 2026–27.',
    externalUrl: OFFICIAL_URLS.home,
  },
  {
    id: 'not-aug-21',
    title: 'FYUGP B.A. 4th Year Honours Admission Notice (Session 2026–27)',
    date: '2026-08-21',
    category: 'Admissions',
    summary:
      'Admission schedule, CGPA eligibility, and document verification dates for 4th Year Honours in Assamese, Economics, English, and Political Science.',
    externalUrl: OFFICIAL_URLS.admissionHelpDesk,
  },
  {
    id: 'not-aug-20',
    title: 'FYUGP B.Sc. 4th Year Honours Admission Notice (Session 2026–27)',
    date: '2026-08-20',
    category: 'Admissions',
    summary:
      'Merit verification and admission window for B.Sc. 4th Year Honours in Computer Science and allied Science disciplines under Gauhati University NEP 2020.',
    externalUrl: OFFICIAL_URLS.admissionHelpDesk,
  },
  {
    id: 'not-aug-18',
    title: 'Walk-in Interview Notice for Teaching Assistant — Department of Philosophy',
    date: '2026-08-18',
    category: 'Administration',
    summary:
      'Applications and walk-in interview details for contractual Teaching Assistant engagement in the Department of Philosophy at LCB College, Maligaon.',
    externalUrl: OFFICIAL_URLS.home,
  },
  {
    id: 'not-aug-10',
    title: 'Notice Inviting Quotations — Interactive Smart Display Panels & Computers',
    date: '2026-08-10',
    category: 'Tenders & Quotations',
    summary:
      'Sealed quotations invited from authorized vendors for supply and installation of Smart Interactive Display Panels and desktop computers for IT & smart classrooms.',
    externalUrl: OFFICIAL_URLS.home,
  },
  {
    id: 'not-aug-01',
    title: 'Introduction of 4th Year Honours in Five Departments under GU-FYUGP (NEP 2020)',
    date: '2026-08-01',
    category: 'Admissions',
    summary:
      'Gauhati University approves 4th Year Honours programmes in Computer Science, Political Science, English, Assamese, and Economics starting 2026–27.',
    externalUrl: OFFICIAL_URLS.prospectus2026,
  },
  {
    id: 'not-jul-29',
    title: 'Dr. Bani Kanta Kakati Merit Award 2026 — Verification & Document Submission',
    date: '2026-07-29',
    category: 'Scholarships',
    summary:
      'Eligible Pragyan Bharati / Dr. Bani Kanta Kakati Merit Award 2026 candidates are notified to complete Aadhaar-linked verification at the college scholarship counter.',
    externalUrl: OFFICIAL_URLS.home,
  },
];

export const PRINCIPAL_INFO = {
  name: 'Dr. Amarendra Kalita',
  credentials: 'M.Sc., Ph.D.',
  designation: 'Principal, Lalit Chandra Bharali College',
  summary:
    'Established in 1971 by the visionary citizens of Maligaon and Pandu railway hub, Lalit Chandra Bharali College has grown from a modest evening college into a vibrant provincialised degree institution affiliated to Gauhati University and accredited with NAAC B++ Grade.',
  highlights: [
    'Provincialised Arts & Science undergraduate streams under Gauhati University',
    'Pioneer in non-traditional subjects including Computer Science and Electronics',
    'Dedicated self-sustaining IT wing offering BCA, B.Sc. IT, and PGDCA',
    'Golden Jubilee milestone (1971–2021) & transition to NEP 2020 4-Year FYUGP',
  ],
  fullMessage: [
    'It is with immense pride and institutional warmth that I welcome students, parents, researchers, and alumni to Lalit Chandra Bharali College (LCB College), Maligaon, Guwahati. Founded in 1971 to bring quality higher education to the historic railway settlement and surrounding Kamrup region, our institution has steadfastly upheld academic inclusivity and intellectual discipline for more than five decades.',
    'Having celebrated our Golden Jubilee and earned NAAC B++ accreditation, LCB College has continually adapted to the evolving educational landscape. Alongside provincialised honours and major programmes across Arts and Science, we were among the early colleges in Guwahati to introduce non-traditional and technology-forward disciplines such as Computer Science and Electronics, complemented by our self-sustaining professional programmes in BCA, B.Sc. IT, and PGDCA.',
    'From the 2026–27 academic session, our implementation of the Gauhati University Four-Year Undergraduate Programme (FYUGP) under NEP 2020 expands further—featuring the newly introduced B.Sc. Physics Major programme as well as 4th Year Honours tracks in Computer Science, Political Science, English, Assamese, and Economics. Supported by an upgraded Central & Digital Library, smart classrooms, and vibrant NCC, NSS, and cultural units, we remain committed to shaping confident, ethical graduates ready for higher research and modern careers.',
  ],
};

export const PROGRAMME_TRACKS: ProgrammeTrack[] = [
  {
    id: 'ug',
    label: 'Undergraduate (FYUGP)',
    subtitle: '3/4-Year Gauhati University NEP 2020 Degree & Self-Financed IT Programmes',
    items: [
      {
        code: 'FYUGP-BA',
        name: 'Bachelor of Arts (B.A.)',
        duration: '3 / 4 Years (6–8 Semesters)',
        eligibility: '10+2 (Higher Secondary) in Arts / Science / Commerce from AHSEC or equivalent.',
        admissionFee: '₹ 4,050',
        annualFee: '₹ 4,850 (Pragyan Bharati Fee Waiver eligible)',
        highlights: 'Majors & Minors in Assamese, Bengali, Economics, Education, English, Hindi, History, Philosophy, Political Science, Mathematics.',
      },
      {
        code: 'FYUGP-BSC',
        name: 'Bachelor of Science (B.Sc.)',
        duration: '3 / 4 Years (6–8 Semesters)',
        eligibility: '10+2 (Science) with minimum 45% aggregate in Physics, Chemistry/Electronics, and Mathematics/CS.',
        admissionFee: '₹ 4,950',
        annualFee: '₹ 5,950 (Includes Practical Lab Fee)',
        highlights: 'Includes Newly Introduced B.Sc. Physics Major, plus Computer Science, Electronics, Mathematics, and Statistics.',
      },
      {
        code: 'FYUGP-BCA',
        name: 'Bachelor of Computer Applications (BCA)',
        duration: '3 / 4 Years (6–8 Semesters)',
        eligibility: '10+2 in any stream with Mathematics / Computer Science / IT (min 45% aggregate).',
        admissionFee: '₹ 14,500',
        annualFee: '₹ 24,000 / Year (Self-Financed)',
        highlights: 'Dedicated Computer Labs, DBMS, DSA, Web Technologies, Python/Java, and Semester Project.',
      },
      {
        code: 'FYUGP-BSCIT',
        name: 'B.Sc. Information Technology (B.Sc. IT)',
        duration: '3 / 4 Years (6–8 Semesters)',
        eligibility: '10+2 Science or Mathematics / Computer Science background (min 45%).',
        admissionFee: '₹ 13,500',
        annualFee: '₹ 22,500 / Year (Self-Financed)',
        highlights: 'Enterprise networking, software engineering, cloud systems, and applied computing.',
      },
    ],
  },
  {
    id: 'honours4',
    label: '4th Year FYUGP Honours',
    subtitle: '7th & 8th Semester Honours / Honours with Research under NEP 2020 (Launched 2026–27)',
    items: [
      {
        code: 'HONS-CSC',
        name: '4th Year Honours in Computer Science',
        duration: '1 Year (Semesters 7 & 8)',
        eligibility: 'Successful completion of 6 semesters (120 credits) under GU-FYUGP with zero backlogs and ≥ 7.5 CGPA for Research.',
        admissionFee: '₹ 5,400',
        annualFee: '₹ 6,400',
        highlights: 'Advanced Algorithms, AI/ML Foundations, Dissertation / Research Project under GU faculty supervision.',
      },
      {
        code: 'HONS-POL',
        name: '4th Year Honours in Political Science',
        duration: '1 Year (Semesters 7 & 8)',
        eligibility: '120 credits completed in GU-FYUGP B.A. Political Science Major with zero backlogs.',
        admissionFee: '₹ 4,600',
        annualFee: '₹ 5,400',
        highlights: 'North-East Governance, Public Policy Analysis, Constitutional Research Seminar & Dissertation.',
      },
      {
        code: 'HONS-ENG',
        name: '4th Year Honours in English',
        duration: '1 Year (Semesters 7 & 8)',
        eligibility: '120 credits completed in GU-FYUGP B.A. English Major with zero backlogs.',
        admissionFee: '₹ 4,600',
        annualFee: '₹ 5,400',
        highlights: 'Postcolonial Studies, Literary Theory, Academic Research Methodology & Thesis.',
      },
      {
        code: 'HONS-ASM',
        name: '4th Year Honours in Assamese',
        duration: '1 Year (Semesters 7 & 8)',
        eligibility: '120 credits completed in GU-FYUGP B.A. Assamese Major with zero backlogs.',
        admissionFee: '₹ 4,600',
        annualFee: '₹ 5,400',
        highlights: 'Assamese Philology, Manuscript Studies, Folklore of Assam & Honours Dissertation.',
      },
      {
        code: 'HONS-ECO',
        name: '4th Year Honours in Economics',
        duration: '1 Year (Semesters 7 & 8)',
        eligibility: '120 credits completed in GU-FYUGP B.A. Economics Major with zero backlogs.',
        admissionFee: '₹ 4,600',
        annualFee: '₹ 5,400',
        highlights: 'Econometrics, Development Economics of NE India & Quantitative Research Project.',
      },
    ],
  },
  {
    id: 'pgdca',
    label: 'PGDCA (Postgraduate Diploma)',
    subtitle: '1-Year Job-Oriented Postgraduate Diploma in Computer Applications (Self-Financed)',
    items: [
      {
        code: 'PGDCA-1YR',
        name: 'Post Graduate Diploma in Computer Applications (PGDCA)',
        duration: '1 Year (2 Semesters)',
        eligibility: 'Bachelor’s Degree (B.A. / B.Sc. / B.Com / Equivalent) from a recognized university.',
        admissionFee: '₹ 9,500',
        annualFee: '₹ 16,500 (Total Programme Fee)',
        highlights: 'Office Automation, SQL & RDBMS, C/Python Programming, Web Design, Tally & Industrial Project Viva.',
      },
    ],
  },
];

export const ALL_DEPARTMENTS: AcademicDepartment[] = [
  {
    name: 'Assamese',
    stream: 'Arts',
    level: 'B.A. Major / Minor / 4th Yr Honours',
    focus: 'Assamese literature, Sankardeva studies, linguistics, and regional heritage.',
    honours4thYear: true,
  },
  {
    name: 'Bengali',
    stream: 'Arts',
    level: 'B.A. Major / Minor / AEC',
    focus: 'Modern Bengali prose, Rabindra Sahitya, and comparative Indian literature.',
  },
  {
    name: 'Economics',
    stream: 'Arts',
    level: 'B.A. Major / Minor / 4th Yr Honours',
    focus: 'Microeconomics, public finance, econometrics, and North-East development.',
    honours4thYear: true,
  },
  {
    name: 'Education',
    stream: 'Arts',
    level: 'B.A. Major / Minor',
    focus: 'Educational psychology, curriculum pedagogy, and inclusive education.',
  },
  {
    name: 'English',
    stream: 'Arts',
    level: 'B.A. Major / Minor / 4th Yr Honours',
    focus: 'British & Indian writing in English, literary criticism, and academic writing.',
    honours4thYear: true,
  },
  {
    name: 'Hindi',
    stream: 'Arts',
    level: 'B.A. Major / Minor / AEC',
    focus: 'Hindi sahitya, functional Hindi, journalism, and translation studies.',
  },
  {
    name: 'History',
    stream: 'Arts',
    level: 'B.A. Major / Minor / IDC',
    focus: 'Ancient, medieval, modern Indian history, and Ahom & Assam heritage.',
  },
  {
    name: 'Philosophy',
    stream: 'Arts',
    level: 'B.A. Major / Minor',
    focus: 'Indian & Western philosophy, formal logic, epistemology, and applied ethics.',
  },
  {
    name: 'Political Science',
    stream: 'Arts',
    level: 'B.A. Major / Minor / 4th Yr Honours',
    focus: 'Indian Constitution, political theory, public policy, and international relations.',
    honours4thYear: true,
  },
  {
    name: 'Computer Science',
    stream: 'Science',
    level: 'B.Sc. Major / Minor / 4th Yr Honours',
    focus: 'Data structures, algorithms, operating systems, DBMS, and software engineering.',
    honours4thYear: true,
  },
  {
    name: 'Electronics',
    stream: 'Science',
    level: 'B.Sc. Major / Minor',
    focus: 'Analog & digital circuits, microprocessors, embedded systems, and instrumentation.',
  },
  {
    name: 'Mathematics',
    stream: 'Science',
    level: 'B.Sc. / B.A. Major / Minor',
    focus: 'Calculus, linear algebra, differential equations, and real & complex analysis.',
  },
  {
    name: 'Physics',
    stream: 'Science',
    level: 'B.Sc. Major (New 2026–27) / Minor',
    focus: 'Classical mechanics, electromagnetism, optics, and quantum mechanics.',
  },
  {
    name: 'Statistics',
    stream: 'Science',
    level: 'B.Sc. Major / Minor',
    focus: 'Probability theory, statistical inference, sampling, and applied data analytics.',
  },
  {
    name: 'Environmental Studies',
    stream: 'Science',
    level: 'Compulsory VAC / Multidisciplinary',
    focus: 'Biodiversity of Brahmaputra valley, ecology, and environmental conservation.',
  },
  {
    name: 'BCA (Bachelor of Computer Applications)',
    stream: 'Self-Financing IT',
    level: '3/4-Year UG Professional',
    focus: 'Full-stack web development, DBMS, Python/Java, networking, and lab practicums.',
  },
  {
    name: 'B.Sc. IT (Information Technology)',
    stream: 'Self-Financing IT',
    level: '3/4-Year UG Professional',
    focus: 'Enterprise IT infrastructure, cloud computing, cybersecurity, and software design.',
  },
  {
    name: 'PGDCA (Postgraduate Diploma in CA)',
    stream: 'Self-Financing IT',
    level: '1-Year Postgraduate Diploma',
    focus: 'RDBMS, C/Python fundamentals, web applications, and office automation lab.',
  },
];

export const STAFF_DIRECTORY: StaffMember[] = [
  { id: 'st-1', name: 'Dr. Amarendra Kalita', designation: 'Principal', department: 'Administration', category: 'Teaching', qualification: 'M.Sc., Ph.D.' },
  { id: 'st-2', name: 'Dr. Pranjal Sarma', designation: 'Associate Professor & Coordinator (Grievance Cell)', department: 'Physics', category: 'Teaching', qualification: 'M.Sc., Ph.D.' },
  { id: 'st-3', name: 'Dr. Basistha Ram Bhuyan', designation: 'Associate Professor & Secretary (Anti-Ragging)', department: 'Assamese', category: 'Teaching', qualification: 'M.A., Ph.D.' },
  { id: 'st-4', name: 'Mrs. Kunjalata Brahma Bathari', designation: 'Associate Professor & Presiding Officer (ICC)', department: 'Political Science', category: 'Teaching', qualification: 'M.A., M.Phil.' },
  { id: 'st-5', name: 'Mrs. Nazima Hussain Borbora', designation: 'Associate Professor & Member (ICC)', department: 'English', category: 'Teaching', qualification: 'M.A., M.Phil.' },
  { id: 'st-6', name: 'Dr. Monalisa Deka', designation: 'Associate Professor & HoD', department: 'Economics', category: 'Teaching', qualification: 'M.A., Ph.D.' },
  { id: 'st-7', name: 'Mr. Hiranya Kumar Das', designation: 'Assistant Professor & HoD', department: 'Computer Science & IT', category: 'Teaching', qualification: 'MCA, M.Tech.' },
  { id: 'st-8', name: 'Dr. Ananya Baruah', designation: 'Assistant Professor', department: 'History', category: 'Teaching', qualification: 'M.A., Ph.D.' },
  { id: 'st-9', name: 'Dr. Rituraj Bora', designation: 'Assistant Professor', department: 'Mathematics', category: 'Teaching', qualification: 'M.Sc., Ph.D.' },
  { id: 'st-10', name: 'Ms. Barnali Goswami', designation: 'Assistant Professor', department: 'Electronics', category: 'Teaching', qualification: 'M.Sc., NET' },
  { id: 'st-11', name: 'Dr. Pallabi Choudhury', designation: 'Assistant Professor', department: 'Education', category: 'Teaching', qualification: 'M.A., Ph.D.' },
  { id: 'st-12', name: 'Mr. Subhashish Bhattacharjee', designation: 'Assistant Professor', department: 'Bengali', category: 'Teaching', qualification: 'M.A., SLET' },

  { id: 'lib-1', name: 'Mrs. Gitika Kalita', designation: 'Librarian', department: 'Central & Digital Library', category: 'Library', qualification: 'M.L.I.Sc., NET' },
  { id: 'lib-2', name: 'Sri Dipakjyoti Sarma', designation: 'Assistant Librarian', department: 'Central Library', category: 'Library', qualification: 'B.L.I.Sc.' },
  { id: 'lib-3', name: 'Sri Prafulla Baishya', designation: 'Library Bearer', department: 'Reading Hall & Periodicals', category: 'Library', qualification: 'Senior Grade' },

  { id: 'nt-1', name: 'Sri Nabin Chandra Das', designation: 'Head Assistant (Office)', department: 'Principal’s Office & Accounts', category: 'Non-Teaching' },
  { id: 'nt-2', name: 'Smt. Binita Devi', designation: 'Upper Division Assistant', department: 'Student Academic Counter', category: 'Non-Teaching' },
  { id: 'nt-3', name: 'Sri Rajeshwar Kalita', designation: 'Junior Assistant (IT & Samarth)', department: 'Admissions & Exam Cell', category: 'Non-Teaching' },
  { id: 'nt-4', name: 'Sri Kamaleswar Rabha', designation: 'Laboratory Assistant', department: 'Science & Electronics Block', category: 'Non-Teaching' },
];

export const ALUMNI_PRIDE: AlumniMember[] = [
  { id: 'al-1', name: 'Tarali Mazumder', batch: 'Alumna · Arts', stream: 'Assamese & Cultural Heritage', distinction: 'Noted Assamese Playback Singer & Cultural Icon', quote: 'LCB College gave my voice its earliest stage and lifelong mentors.' },
  { id: 'al-2', name: 'Tilak Baishya', batch: 'Alumnus · Science', stream: 'Physical Sciences', distinction: 'Senior Academician & Educational Administrator', quote: 'Maligaon’s academic discipline at LCB shaped my career in public education.' },
  { id: 'al-3', name: 'Champak Goswami', batch: 'Alumnus · Arts', stream: 'Humanities', distinction: 'Journalist, Columnist & Literary Contributor', quote: 'The Central Library and debate circles taught us how to ask sharper questions.' },
  { id: 'al-4', name: 'Jesu Neelkamal Borah', batch: 'Alumnus · IT / CS', stream: 'Computer Applications', distinction: 'Principal Software Architect & Technology Leader', quote: 'Being part of LCB’s early Computer Science labs opened doors across the tech industry.' },
  { id: 'al-5', name: 'Tony Bayan', batch: 'Alumnus · Arts', stream: 'Political Science', distinction: 'Public Policy Analyst & Youth Leadership Mentor', quote: 'LCBCSU and campus seminars built our foundation in civic leadership.' },
  { id: 'al-6', name: 'Rahul Kumar Das', batch: 'Alumnus · Science', stream: 'Electronics & Physics', distinction: 'Senior Telecommunications Engineer, NF Railway', quote: 'Right beside the railway hub, LCB nurtured practical engineering confidence.' },
  { id: 'al-7', name: 'Hari Prasad Sharma', batch: 'Alumnus · Arts', stream: 'Economics', distinction: 'Banking Executive & Financial Inclusion Advisor', quote: 'Our Economics faculty made quantitative thinking accessible and grounded.' },
  { id: 'al-8', name: 'Deepjyoti Kalita', batch: 'Alumnus · IT', stream: 'BCA', distinction: 'Cybersecurity Specialist & Cloud Systems Consultant', quote: 'Hands-on lab guidance in the IT block turned curiosity into an engineering career.' },
  { id: 'al-9', name: 'Ashim Talukdar', batch: 'Alumnus · Arts', stream: 'History', distinction: 'Assam Civil Services Officer & Heritage Researcher', quote: 'LCB’s inclusive courtyard reflects the very best of Guwahati’s academic spirit.' },
  { id: 'al-10', name: 'Prabin Sikdar', batch: 'Alumnus · Science', stream: 'Mathematics', distinction: 'Senior Data Scientist & Quantitative Researcher', quote: 'Rigorous foundations in Mathematics & Statistics from LCB remain unmatched.' },
];

export const COLLEGE_EVENTS: CollegeEvent[] = [
  {
    id: 'ev-1',
    title: 'Two-Day Workshop on MOOCs & Digital Pedagogy',
    dateLabel: 'Academic Initiative · IQAC',
    organizer: 'IQAC & Dept. of Computer Science',
    description: 'Hands-on training for faculty and honours students on SWAYAM/NPTEL credit integration and e-content creation under NEP 2020.',
  },
  {
    id: 'ev-2',
    title: 'International Women’s Day Celebration & Symposium',
    dateLabel: 'March 8 · Annual Observance',
    organizer: 'Women’s Cell & ICC',
    description: 'Keynote addresses on gender equity, legal awareness, and celebrating women achievers across Assam.',
  },
  {
    id: 'ev-3',
    title: 'Red Cross & Disaster Management Preparedness Camp',
    dateLabel: 'Community Outreach · NSS & NCC',
    organizer: 'NSS Unit & Indian Red Cross Society',
    description: 'First-aid certification, flood-relief response drills, and voluntary blood donation drive in Kamrup Metro.',
  },
  {
    id: 'ev-4',
    title: 'Inter-College Rabha Sangeet Competition',
    dateLabel: 'Cultural Heritage · Golden Jubilee Legacy',
    organizer: 'Cultural Cell & LCBCSU',
    description: 'Celebrating Kalaguru Bishnu Prasad Rabha’s musical legacy with participants from colleges affiliated to Gauhati University.',
  },
  {
    id: 'ev-5',
    title: 'ICT Orientation & Digital Library Induction',
    dateLabel: 'Semester Induction · IT Wing',
    organizer: 'Central Library & Self-Financed IT Dept.',
    description: 'Freshers’ workshop on Samarth e-governance, N-LIST e-journals, and smart classroom etiquette.',
  },
];

export const EMINENT_VISITORS: EminentVisitor[] = [
  { id: 'vis-1', name: 'Dr. Himanta Biswa Sarma', designation: 'Hon’ble Chief Minister of Assam', occasion: 'Golden Jubilee & Institutional Milestone Address' },
  { id: 'vis-2', name: 'Dr. Alak Kumar Buragohain', designation: 'Former Vice-Chancellor, Dibrugarh University & Chairperson', occasion: 'Academic Convocation & NEP 2020 Keynote' },
  { id: 'vis-3', name: 'Dr. Abani Kumar Bhagabati', designation: 'Eminent Geographer & Former Professor, Gauhati University', occasion: 'Brahmaputra Valley Ecology & Research Lecture' },
  { id: 'vis-4', name: 'Dr. Devahari Talukdar', designation: 'Renowned Scientist & Academic Advisor', occasion: 'National Science Day & Physics Seminar' },
  { id: 'vis-5', name: 'Ms. Chinmoyee Talukdar', designation: 'Senior Administrator & Public Policy Leader', occasion: 'Women’s Empowerment & Civil Service Orientation' },
  { id: 'vis-6', name: 'Mr. Deepak Sharma', designation: 'Industry Leader & Technology Mentor', occasion: 'Career Readiness & IT Entrepreneurship Conclave' },
];

export const STATUTORY_COMMITTEES: StatutoryCommittee[] = [
  {
    id: 'grievance',
    title: 'Student Grievance Redressal Committee',
    shortTitle: 'Grievance Cell',
    chairperson: 'Dr. Amarendra Kalita (Principal)',
    members: [
      { role: 'Chairperson', name: 'Dr. Amarendra Kalita (Principal)' },
      { role: 'Co-ordinator', name: 'Dr. Pranjal Sarma', phone: '98647 21966' },
    ],
    email: 'lcbcollege.grievance.cell@gmail.com',
    mandate:
      'Prompt, confidential, and impartial resolution of academic, examination, scholarship, library, and campus facility grievances submitted by students.',
    helplineNote: 'Students may write directly to the official cell email or meet the Co-ordinator during college hours (9:00 AM – 4:30 PM).',
  },
  {
    id: 'icc',
    title: 'Internal Complaint Committee (ICC)',
    shortTitle: 'ICC',
    chairperson: 'Mrs. Kunjalata Brahma Bathari (Presiding Officer)',
    members: [
      { role: 'Presiding Officer', name: 'Mrs. Kunjalata Brahma Bathari', phone: '9435306734' },
      { role: 'Senior Member', name: 'Mrs. Nazima Hussain Borbora', phone: '9706930189' },
    ],
    email: 'icclcbcollege@gmail.com',
    mandate:
      'Reconstituted under UGC & POSH guidelines (Sept 2026) to maintain a zero-tolerance environment against sexual harassment and ensure dignity and safety for all students and staff.',
    helplineNote: 'All disclosures are handled with strict confidentiality and statutory priority.',
  },
  {
    id: 'antiragging',
    title: 'Anti-Ragging Committee',
    shortTitle: 'Anti-Ragging',
    chairperson: 'Dr. Amarendra Kalita (Principal)',
    members: [
      { role: 'Chairperson', name: 'Dr. Amarendra Kalita (Principal)' },
      { role: 'Secretary', name: 'Dr. Basistha Ram Bhuyan', phone: '94351 14567 / 94351 14657' },
    ],
    email: 'griev.redrassal.lcbcollege@gmail.com',
    mandate:
      'Active monitoring across Academic Blocks, IT Wing, Canteen, and Common Rooms to enforce UGC Anti-Ragging Regulations and protect freshers.',
    helplineNote: 'Immediate 24×7 helpline response via Secretary contact numbers for any ragging-related complaint.',
  },
];

export const CELLS_AND_WINGS: CellOrWing[] = [
  { id: 'cw-1', group: 'Cell', name: 'Internal Quality Assurance Cell (IQAC)', coordinator: 'IQAC Coordinator & Principal', focus: 'NAAC accreditation quality benchmarks, academic audits, and faculty development.' },
  { id: 'cw-2', group: 'Cell', name: 'Career Counselling & Placement Cell', coordinator: 'Faculty Placement Committee', focus: 'Campus recruitment drives, UPSC/APSC coaching orientation, and IT internships.' },
  { id: 'cw-3', group: 'Cell', name: 'Women’s Study & Empowerment Cell', coordinator: 'Senior Women Faculty Members', focus: 'Gender sensitization, International Women’s Day symposiums, and health camps.' },
  { id: 'cw-4', group: 'Cell', name: 'Research & Publication Cell', coordinator: 'Academic Research Committee', focus: 'Peer-reviewed college journals, minor research projects, and seminar proceedings.' },
  { id: 'cw-5', group: 'Club', name: 'Eco & Nature Club', coordinator: 'Dept. of Environmental Studies', focus: 'Green campus audits, plantation drives around Nilachal foothills, and biodiversity awareness.' },
  { id: 'cw-6', group: 'Club', name: 'Literary & Debate Club', coordinator: 'Depts. of English & Assamese', focus: 'Inter-college debates, wall magazines, and creative writing workshops.' },
  { id: 'cw-7', group: 'Club', name: 'IT & Coding Club', coordinator: 'Dept. of Computer Science & BCA', focus: 'Hackathons, open-source sprints, and peer programming mentorship.' },
  { id: 'cw-8', group: 'Student Wing', name: 'NCC (National Cadet Corps)', coordinator: 'Associate NCC Officer (ANO)', focus: 'Army Wing drill training, national integration camps, and B & C Certificate preparedness.' },
  { id: 'cw-9', group: 'Student Wing', name: 'NSS (National Service Scheme)', coordinator: 'NSS Programme Officer', focus: 'Blood donation camps, Red Cross disaster preparedness, and adopted village outreach.' },
  { id: 'cw-10', group: 'Student Wing', name: 'LCBCSU (Students’ Union)', coordinator: 'Elected Student Representatives', focus: 'Annual College Week, cultural festivals, sports meets, and student welfare advocacy.' },
];

export const GOVERNING_BODY = [
  { role: 'President, Governing Body', name: 'Nominated President (Govt. of Assam)', affiliation: 'Higher Education Department Representative' },
  { role: 'Principal & Secretary (Ex-Officio)', name: 'Dr. Amarendra Kalita, M.Sc., Ph.D.', affiliation: 'Lalit Chandra Bharali College' },
  { role: 'University Nominee', name: 'Gauhati University Representative', affiliation: 'Affiliating University Nominee' },
  { role: 'University Nominee', name: 'Academic Council Nominee', affiliation: 'Gauhati University' },
  { role: 'Teachers’ Representative', name: 'Senior Faculty Nominees (2)', affiliation: 'Elected Teaching Staff' },
  { role: 'Non-Teaching Representative', name: 'Office Staff Representative', affiliation: 'Administrative Wing' },
  { role: 'Guardian Representatives', name: 'Parent & Donor Representatives', affiliation: 'Maligaon Community' },
];
