import type { PortalState } from '../types/portal';
import { createInitialPortalState } from '../data/seedData';

const STORAGE_KEY = 'lcb_college_portal_state_v2';

export function loadPortalState(): PortalState {
  if (typeof window === 'undefined') {
    return createInitialPortalState();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = createInitialPortalState();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw) as Partial<PortalState>;
    const fallback = createInitialPortalState();
    return {
      profile: parsed.profile ?? fallback.profile,
      savedProfiles:
        Array.isArray(parsed.savedProfiles) && parsed.savedProfiles.length > 0
          ? parsed.savedProfiles
          : fallback.savedProfiles,
      subjects: Array.isArray(parsed.subjects) ? parsed.subjects : fallback.subjects,
      timetable: Array.isArray(parsed.timetable) ? parsed.timetable : fallback.timetable,
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : fallback.tasks,
      notes: Array.isArray(parsed.notes) ? parsed.notes : fallback.notes,
      sgpaPapers: Array.isArray(parsed.sgpaPapers) ? parsed.sgpaPapers : fallback.sgpaPapers,
      notices: Array.isArray(parsed.notices) ? parsed.notices : fallback.notices,
    };
  } catch {
    return createInitialPortalState();
  }
}

export function savePortalState(state: PortalState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

export function resetPortalState(): PortalState {
  const fresh = createInitialPortalState();
  savePortalState(fresh);
  clearStudentSession();
  return fresh;
}

const STUDENT_SESSION_KEY = 'lcb_student_session_v1';

export interface StudentSession {
  authenticated: boolean;
  rememberMe: boolean;
  lastLoginAt?: string;
}

export function loadStudentSession(): StudentSession {
  if (typeof window === 'undefined') {
    return { authenticated: false, rememberMe: true };
  }
  try {
    const raw =
      window.localStorage.getItem(STUDENT_SESSION_KEY) ??
      window.sessionStorage.getItem(STUDENT_SESSION_KEY);
    if (!raw) {
      return { authenticated: false, rememberMe: true };
    }
    const parsed = JSON.parse(raw) as Partial<StudentSession>;
    return {
      authenticated: Boolean(parsed.authenticated),
      rememberMe: parsed.rememberMe !== false,
      lastLoginAt: parsed.lastLoginAt,
    };
  } catch {
    return { authenticated: false, rememberMe: true };
  }
}

export function saveStudentSession(session: StudentSession): void {
  if (typeof window === 'undefined') return;
  try {
    const payload = JSON.stringify(session);
    if (session.rememberMe) {
      window.localStorage.setItem(STUDENT_SESSION_KEY, payload);
      window.sessionStorage.removeItem(STUDENT_SESSION_KEY);
    } else {
      window.sessionStorage.setItem(STUDENT_SESSION_KEY, payload);
      window.localStorage.removeItem(STUDENT_SESSION_KEY);
    }
  } catch {
    // Ignore storage errors gracefully
  }
}

export function clearStudentSession(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STUDENT_SESSION_KEY);
    window.sessionStorage.removeItem(STUDENT_SESSION_KEY);
  } catch {
    // Ignore storage errors gracefully
  }
}
