import { useEffect, useState } from 'react';
import { AlumniAndEventsSection } from './components/AlumniAndEventsSection';
import { AttendanceTracker } from './components/AttendanceTracker';
import { CampusGallerySection } from './components/CampusGallerySection';
import { CampusHub } from './components/CampusHub';
import { DedicatedViews } from './components/DedicatedViews';
import { DepartmentsAndStaffSection } from './components/DepartmentsAndStaffSection';
import { HeroShowcase } from './components/HeroShowcase';
import { NoticesSection } from './components/NoticesSection';
import { OverviewDashboard } from './components/OverviewDashboard';
import { PrincipalDeskSection } from './components/PrincipalDeskSection';
import { ProfileModal } from './components/ProfileModal';
import { ProgrammesSection } from './components/ProgrammesSection';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { SgpaCalculator } from './components/SgpaCalculator';
import { SiteNavbar, type LoginRole } from './components/SiteNavbar';
import { StatutoryCommitteesFooter } from './components/StatutoryCommitteesFooter';
import { StudentLoginView } from './components/StudentLoginView';
import { StudentPortalShell } from './components/StudentPortalShell';
import { TasksAndNotes } from './components/TasksAndNotes';
import { TopUtilityBar } from './components/TopUtilityBar';
import { WeeklyTimetable } from './components/WeeklyTimetable';
import type {
  AcademicProgram,
  CampusNotice,
  PortalState,
  PortalTab,
  SavedStudentProfile,
  SgpaPaper,
  SiteRoute,
  StaffCategory,
  StatutoryCommittee,
  StudentProfile,
  StudyNote,
  StudyTask,
  SubjectAttendance,
  TimetableSlot,
} from './types/portal';
import {
  removeSavedStudentProfile,
  upsertSavedStudentProfile,
} from './utils/calculations';
import { googleSignOut, initGoogleAuth } from './utils/googleAuth';
import {
  clearStudentSession,
  loadPortalState,
  loadStudentSession,
  resetPortalState,
  savePortalState,
  saveStudentSession,
  type StudentSession,
} from './utils/storage';

function makeId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function App() {
  const [state, setState] = useState<PortalState>(() => loadPortalState());
  const [studentSession, setStudentSession] = useState<StudentSession>(() =>
    loadStudentSession()
  );
  const [activeRoute, setActiveRoute] = useState<SiteRoute>('home');
  const [activePortalTab, setActivePortalTab] = useState<PortalTab>('overview');
  const [sectionContext, setSectionContext] = useState<string | undefined>(undefined);

  const [activeCommitteeId, setActiveCommitteeId] =
    useState<StatutoryCommittee['id'] | null>(null);
  const [loginRole, setLoginRole] = useState<LoginRole | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  useEffect(() => {
    savePortalState(state);
  }, [state]);

  useEffect(() => {
    const unsubscribe = initGoogleAuth();
    return () => unsubscribe();
  }, []);

  const handleNavigate = (route: SiteRoute, sectionId?: string) => {
    setActiveRoute(route);
    setSectionContext(sectionId);
    if (sectionId) {
      window.setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveProfile = (profile: StudentProfile) => {
    setState((prev) => ({
      ...prev,
      profile,
      savedProfiles: upsertSavedStudentProfile(prev.savedProfiles, profile),
    }));
  };

  const handleSaveNewProfile = (profile: StudentProfile) => {
    setState((prev) => ({
      ...prev,
      profile,
      savedProfiles: upsertSavedStudentProfile(prev.savedProfiles, profile, {
        forceNew: true,
      }),
    }));
  };

  const handleSelectSavedProfile = (saved: SavedStudentProfile) => {
    const nextProfile: StudentProfile = {
      name: saved.name,
      program: saved.program,
      semester: saved.semester,
      rollNumber: saved.rollNumber,
      email: saved.email,
      avatarUrl: saved.avatarUrl,
      authProvider: saved.authProvider,
    };
    setState((prev) => ({
      ...prev,
      profile: nextProfile,
    }));
  };

  const handleDeleteSavedProfile = (id: string) => {
    setState((prev) => ({
      ...prev,
      savedProfiles: removeSavedStudentProfile(prev.savedProfiles, id),
    }));
  };

  const handleResetDemoData = () => {
    void googleSignOut();
    const fresh = resetPortalState();
    setState(fresh);
    setStudentSession({ authenticated: false, rememberMe: true });
  };

  const handleStudentLogin = ({
    name,
    rollNumber,
    program,
    semester,
    email,
    avatarUrl,
    authProvider,
    saveAsNewProfile,
    rememberMe,
  }: {
    name: string;
    rollNumber: string;
    program: AcademicProgram;
    semester: string;
    email?: string;
    avatarUrl?: string;
    authProvider?: 'local' | 'google';
    saveAsNewProfile?: boolean;
    rememberMe: boolean;
  }) => {
    const nextProfile: StudentProfile = {
      name: name.trim() || state.profile.name,
      rollNumber: rollNumber.trim(),
      program,
      semester: semester || state.profile.semester,
      email: email?.trim() || undefined,
      avatarUrl,
      authProvider: authProvider ?? 'local',
    };

    setState((prev) => ({
      ...prev,
      profile: nextProfile,
      savedProfiles: upsertSavedStudentProfile(prev.savedProfiles, nextProfile, {
        forceNew: Boolean(saveAsNewProfile),
      }),
    }));

    const nextSession: StudentSession = {
      authenticated: true,
      rememberMe,
      lastLoginAt: new Date().toISOString(),
    };
    saveStudentSession(nextSession);
    setStudentSession(nextSession);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStudentSignOut = () => {
    void googleSignOut();
    clearStudentSession();
    setStudentSession({ authenticated: false, rememberMe: true });
    setActivePortalTab('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkPresent = (id: string) => {
    setState((prev) => ({
      ...prev,
      subjects: prev.subjects.map((s) =>
        s.id === id ? { ...s, attended: s.attended + 1, total: s.total + 1 } : s
      ),
    }));
  };

  const handleMarkAbsent = (id: string) => {
    setState((prev) => ({
      ...prev,
      subjects: prev.subjects.map((s) =>
        s.id === id ? { ...s, total: s.total + 1 } : s
      ),
    }));
  };

  const handleAddSubject = (subject: Omit<SubjectAttendance, 'id'>) => {
    setState((prev) => ({
      ...prev,
      subjects: [...prev.subjects, { ...subject, id: makeId('subj') }],
    }));
  };

  const handleDeleteSubject = (id: string) => {
    setState((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((s) => s.id !== id),
    }));
  };

  const handleAddSlot = (slot: Omit<TimetableSlot, 'id'>) => {
    setState((prev) => ({
      ...prev,
      timetable: [...prev.timetable, { ...slot, id: makeId('tt') }],
    }));
  };

  const handleDeleteSlot = (id: string) => {
    setState((prev) => ({
      ...prev,
      timetable: prev.timetable.filter((slot) => slot.id !== id),
    }));
  };

  const handleAddTask = (task: Omit<StudyTask, 'id'>) => {
    setState((prev) => ({
      ...prev,
      tasks: [{ ...task, id: makeId('task') }, ...prev.tasks],
    }));
  };

  const handleToggleTask = (id: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    }));
  };

  const handleDeleteTask = (id: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t.id !== id),
    }));
  };

  const handleAddNote = (note: Omit<StudyNote, 'id' | 'updatedAt'>) => {
    const todayIso = new Date().toISOString().slice(0, 10);
    setState((prev) => ({
      ...prev,
      notes: [
        { ...note, id: makeId('note'), updatedAt: todayIso },
        ...prev.notes,
      ],
    }));
  };

  const handleDeleteNote = (id: string) => {
    setState((prev) => ({
      ...prev,
      notes: prev.notes.filter((n) => n.id !== id),
    }));
  };

  const handleAddSgpaPaper = () => {
    setState((prev) => ({
      ...prev,
      sgpaPapers: [
        ...prev.sgpaPapers,
        {
          id: makeId('sgpa'),
          code: `PAPER-${prev.sgpaPapers.length + 1}`,
          title: 'New Course Paper',
          credits: 4,
          grade: 'A',
        },
      ],
    }));
  };

  const handleUpdateSgpaPaper = (id: string, patch: Partial<SgpaPaper>) => {
    setState((prev) => ({
      ...prev,
      sgpaPapers: prev.sgpaPapers.map((p) =>
        p.id === id ? { ...p, ...patch } : p
      ),
    }));
  };

  const handleRemoveSgpaPaper = (id: string) => {
    setState((prev) => ({
      ...prev,
      sgpaPapers: prev.sgpaPapers.filter((p) => p.id !== id),
    }));
  };

  const handlePinReminder = (notice: Omit<CampusNotice, 'id'>) => {
    setState((prev) => ({
      ...prev,
      notices: [{ ...notice, id: makeId('not') }, ...prev.notices],
    }));
  };

  const handleDeleteNotice = (id: string) => {
    setState((prev) => ({
      ...prev,
      notices: prev.notices.filter((n) => n.id !== id),
    }));
  };

  const initialDepartmentStream =
    sectionContext === 'dept-arts'
      ? 'Arts'
      : sectionContext === 'dept-science'
      ? 'Science'
      : sectionContext === 'dept-it'
      ? 'Self-Financing IT'
      : 'All';

  const initialStaffTab: StaffCategory =
    sectionContext === 'staff-library'
      ? 'Library'
      : sectionContext === 'staff-nonteaching'
      ? 'Non-Teaching'
      : 'Teaching';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <TopUtilityBar onOpenCommittee={setActiveCommitteeId} />

      <SiteNavbar
        activeRoute={activeRoute}
        onNavigate={handleNavigate}
        onOpenLogin={setLoginRole}
      />

      <main className="flex-1">
        {activeRoute === 'home' && (
          <>
            <HeroShowcase onNavigate={handleNavigate} />
            <NoticesSection
              notices={state.notices}
              onPinReminder={handlePinReminder}
              onDeleteNotice={handleDeleteNotice}
            />
            <PrincipalDeskSection />
            <ProgrammesSection />
            <DepartmentsAndStaffSection focusMode="both" />
            <AlumniAndEventsSection />
            <CampusGallerySection />
          </>
        )}

        {activeRoute === 'news' && (
          <NoticesSection
            notices={state.notices}
            onPinReminder={handlePinReminder}
            onDeleteNotice={handleDeleteNotice}
          />
        )}

        {(activeRoute === 'about' ||
          activeRoute === 'administration' ||
          activeRoute === 'cells' ||
          activeRoute === 'library' ||
          activeRoute === 'iqac') && (
          <DedicatedViews
            route={activeRoute}
            onBackHome={() => handleNavigate('home')}
          />
        )}

        {activeRoute === 'programmes' && <ProgrammesSection />}

        {activeRoute === 'departments' && (
          <DepartmentsAndStaffSection
            key={`dept-${sectionContext ?? 'all'}`}
            initialStream={initialDepartmentStream}
            focusMode="departments"
          />
        )}

        {activeRoute === 'staff' && (
          <DepartmentsAndStaffSection
            key={`staff-${sectionContext ?? 'teaching'}`}
            initialStaffTab={initialStaffTab}
            focusMode="staff"
          />
        )}

        {activeRoute === 'alumni' && <AlumniAndEventsSection />}

        {activeRoute === 'portal' &&
          (!studentSession.authenticated ? (
            <StudentLoginView
              profile={state.profile}
              savedProfiles={state.savedProfiles}
              onLoginSuccess={handleStudentLogin}
              onDeleteSavedProfile={handleDeleteSavedProfile}
              onBackHome={() => handleNavigate('home')}
            />
          ) : (
            <>
              <StudentPortalShell
                activeTab={activePortalTab}
                onSelectTab={setActivePortalTab}
                profile={state.profile}
                onOpenProfile={() => setProfileModalOpen(true)}
                onBackHome={() => handleNavigate('home')}
                onSignOut={handleStudentSignOut}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {activePortalTab === 'overview' && (
                <OverviewDashboard
                  state={state}
                  onNavigate={setActivePortalTab}
                  onOpenProfile={() => setProfileModalOpen(true)}
                />
              )}
              {activePortalTab === 'attendance' && (
                <AttendanceTracker
                  subjects={state.subjects}
                  onMarkPresent={handleMarkPresent}
                  onMarkAbsent={handleMarkAbsent}
                  onAddSubject={handleAddSubject}
                  onDeleteSubject={handleDeleteSubject}
                />
              )}
              {activePortalTab === 'timetable' && (
                <WeeklyTimetable
                  timetable={state.timetable}
                  subjects={state.subjects}
                  onAddSlot={handleAddSlot}
                  onDeleteSlot={handleDeleteSlot}
                />
              )}
              {activePortalTab === 'tasks' && (
                <TasksAndNotes
                  tasks={state.tasks}
                  notes={state.notes}
                  subjects={state.subjects}
                  onAddTask={handleAddTask}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                  onAddNote={handleAddNote}
                  onDeleteNote={handleDeleteNote}
                />
              )}
              {activePortalTab === 'sgpa' && (
                <SgpaCalculator
                  papers={state.sgpaPapers}
                  onAddPaper={handleAddSgpaPaper}
                  onUpdatePaper={handleUpdateSgpaPaper}
                  onRemovePaper={handleRemoveSgpaPaper}
                />
              )}
              {activePortalTab === 'campus' && (
                <CampusHub
                  notices={state.notices}
                  onPinReminder={handlePinReminder}
                  onDeleteNotice={handleDeleteNotice}
                />
              )}
              </div>
            </>
          ))}
      </main>

      <StatutoryCommitteesFooter
        activeCommitteeId={activeCommitteeId}
        onOpenCommittee={setActiveCommitteeId}
        onCloseCommittee={() => setActiveCommitteeId(null)}
        loginRole={loginRole}
        onCloseLogin={() => setLoginRole(null)}
        onNavigate={handleNavigate}
        onRequestReset={() => setResetModalOpen(true)}
      />

      <ProfileModal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        profile={state.profile}
        savedProfiles={state.savedProfiles}
        onSave={handleSaveProfile}
        onSaveNewProfile={handleSaveNewProfile}
        onSelectSavedProfile={handleSelectSavedProfile}
        onDeleteSavedProfile={handleDeleteSavedProfile}
        onRequestReset={() => setResetModalOpen(true)}
      />

      <ResetConfirmModal
        open={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirmReset={handleResetDemoData}
      />
    </div>
  );
}
