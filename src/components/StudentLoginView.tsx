import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Eye,
  EyeOff,
  GraduationCap,
  Hash,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
  Trash2,
  User,
  UserCheck,
  UserPlus,
} from 'lucide-react';
import { COLLEGE_IMAGES, OFFICIAL_URLS } from '../data/collegeData';
import { FYUGP_SEMESTERS } from '../data/seedData';
import type {
  AcademicProgram,
  SavedStudentProfile,
  StudentProfile,
} from '../types/portal';
import { isValidEmailAddress } from '../utils/calculations';
import { googleSignInWithGmail } from '../utils/googleAuth';
import { GoogleSignInButton } from './GoogleSignInButton';
import { StudentAvatar } from './StudentAvatar';

interface StudentLoginViewProps {
  profile: StudentProfile;
  savedProfiles: SavedStudentProfile[];
  onLoginSuccess: (payload: {
    name: string;
    rollNumber: string;
    program: AcademicProgram;
    semester: string;
    email?: string;
    avatarUrl?: string;
    authProvider?: 'local' | 'google';
    saveAsNewProfile?: boolean;
    rememberMe: boolean;
  }) => void;
  onDeleteSavedProfile: (id: string) => void;
  onBackHome: () => void;
}

const STREAMS: AcademicProgram[] = ['BA', 'B.Sc', 'BCA', 'B.Sc IT', 'PGDCA'];

export function StudentLoginView({
  profile,
  savedProfiles,
  onLoginSuccess,
  onDeleteSavedProfile,
  onBackHome,
}: StudentLoginViewProps) {
  const [authMode, setAuthMode] = useState<'signin' | 'new_profile'>('signin');
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email ?? '');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(profile.avatarUrl);
  const [authProvider, setAuthProvider] = useState<'local' | 'google'>(
    profile.authProvider ?? 'local'
  );
  const [rollNumber, setRollNumber] = useState(profile.rollNumber);
  const [semester, setSemester] = useState(profile.semester || FYUGP_SEMESTERS[2]);
  const [pin, setPin] = useState('');
  const [program, setProgram] = useState<AcademicProgram>(profile.program);
  const [rememberMe, setRememberMe] = useState(true);
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleStatus, setGoogleStatus] = useState('');
  const [logoError, setLogoError] = useState(false);
  const [campusImgError, setCampusImgError] = useState(false);

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email ?? '');
    setAvatarUrl(profile.avatarUrl);
    setAuthProvider(profile.authProvider ?? 'local');
    setRollNumber(profile.rollNumber);
    setProgram(profile.program);
    setSemester(profile.semester || FYUGP_SEMESTERS[2]);
  }, [profile]);

  const handleSelectMode = (mode: 'signin' | 'new_profile') => {
    setAuthMode(mode);
    setError('');
    setGoogleStatus('');
    if (mode === 'new_profile') {
      setName('');
      setEmail('');
      setAvatarUrl(undefined);
      setAuthProvider('local');
      setRollNumber('');
      setPin('');
    } else {
      setName(profile.name);
      setEmail(profile.email ?? '');
      setAvatarUrl(profile.avatarUrl);
      setAuthProvider(profile.authProvider ?? 'local');
      setRollNumber(profile.rollNumber);
      setProgram(profile.program);
      setSemester(profile.semester || FYUGP_SEMESTERS[2]);
    }
  };

  const handlePickSavedProfile = (saved: SavedStudentProfile) => {
    setAuthMode('signin');
    setName(saved.name);
    setEmail(saved.email ?? '');
    setAvatarUrl(saved.avatarUrl);
    setAuthProvider(saved.authProvider ?? 'local');
    setRollNumber(saved.rollNumber);
    setProgram(saved.program);
    setSemester(saved.semester);
    setError('');
    setGoogleStatus('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedName = name.trim();
    const cleanedRoll = rollNumber.trim();
    const cleanedEmail = email.trim();

    if (authMode === 'new_profile' && !cleanedName) {
      setError('Please enter your Student Full Name.');
      return;
    }
    if (cleanedEmail && !isValidEmailAddress(cleanedEmail)) {
      setError('Please enter a valid Gmail ID / email address.');
      return;
    }
    if (!cleanedRoll) {
      setError('Please enter your LCB College Roll Number or Registration ID.');
      return;
    }
    if (pin.trim().length < 4) {
      setError(
        'Please enter your Student PIN or Date of Birth password (minimum 4 characters).'
      );
      return;
    }

    setError('');
    onLoginSuccess({
      name: cleanedName || profile.name,
      rollNumber: cleanedRoll,
      program,
      semester,
      email: cleanedEmail || undefined,
      avatarUrl,
      authProvider,
      saveAsNewProfile: authMode === 'new_profile',
      rememberMe,
    });
  };

  const handleGoogleLogin = async () => {
    setError('');
    setGoogleStatus('');
    setGoogleLoading(true);
    try {
      const googleUser = await googleSignInWithGmail();

      if (authMode === 'new_profile') {
        setName(googleUser.name);
        setEmail(googleUser.email);
        setAvatarUrl(googleUser.avatarUrl);
        setAuthProvider('google');
        setGoogleStatus(
          `Synced ${googleUser.email} and profile picture. Complete your Roll No & PIN below to save.`
        );
      } else {
        onLoginSuccess({
          name: googleUser.name,
          rollNumber: rollNumber.trim() || profile.rollNumber || 'LCB-24-BCA-038',
          program,
          semester,
          email: googleUser.email,
          avatarUrl: googleUser.avatarUrl,
          authProvider: 'google',
          saveAsNewProfile: true,
          rememberMe,
        });
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Google sign-in could not be completed.';
      setError(msg);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setError('');
    onLoginSuccess({
      name: profile.name || 'Rishabh Choudhury',
      rollNumber: profile.rollNumber || 'LCB-24-BCA-038',
      program: profile.program,
      semester: profile.semester || FYUGP_SEMESTERS[2],
      email: profile.email,
      avatarUrl: profile.avatarUrl,
      authProvider: profile.authProvider ?? 'local',
      rememberMe: true,
    });
  };

  return (
    <section
      aria-label="Student Login Portal"
      className="relative overflow-hidden bg-slate-100 border-b border-slate-200"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-120px)] items-stretch">
        {/* Left Pane (Desktop) / Below Form (Mobile): Full-Bleed Branded College Visual Showcase */}
        <div className="order-2 lg:order-1 lg:col-span-6 relative bg-[#0b1428] text-white flex flex-col justify-between p-7 sm:p-10 lg:p-14 overflow-hidden">
          {!campusImgError && (
            <img
              src={COLLEGE_IMAGES.frontCampus}
              alt="Lalit Chandra Bharali College Campus Front Elevation, Maligaon"
              referrerPolicy="no-referrer"
              onError={() => setCampusImgError(true)}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-50 scale-[1.02]"
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-[#091124]/92 via-[#0f172a]/76 to-[#1e3a8a]/84"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#091124]/95 via-transparent to-[#091124]/55"
          />

          {/* Top Bar inside Branded Pane */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={onBackHome}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to College Home</span>
            </button>

            <span className="text-xs font-medium text-amber-300/95 tracking-wide">
              Est. 1971 · Gauhati University · NAAC B++
            </span>
          </div>

          {/* Center Institutional Identity & Floating Crest */}
          <div className="relative z-10 my-10 lg:my-auto py-4 space-y-7 max-w-xl">
            <div className="flex items-center gap-4">
              <div className="animate-float-slow shrink-0">
                {!logoError ? (
                  <img
                    src={COLLEGE_IMAGES.logo}
                    alt="Lalit Chandra Bharali College Official Seal"
                    referrerPolicy="no-referrer"
                    onError={() => setLogoError(true)}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-1.5 object-contain border-2 border-amber-300/60 shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1e3a8a] text-amber-300 font-serif font-bold text-xl flex items-center justify-center border-2 border-amber-300/60 shadow-xl">
                    LCB
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                  Student Academic Portal
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-white leading-[1.15] mt-1 [text-wrap:balance]">
                  Lalit Chandra Bharali College
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5">
                  Maligaon, Guwahati — 781011, Assam
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-lg">
              Sign in or save a new student profile with your Gmail ID to sync your profile picture and manage your GU-FYUGP attendance, timetable, tasks, and SGPA records.
            </p>

            {/* Translucent Branded Highlights Strip */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 space-y-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-100">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>Real-time 75% Gauhati University attendance buffer calculator</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-100">
                <Calendar className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>Monday–Saturday department schedule &amp; exam deadlines</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-100">
                <Award className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>10-point NEP 2020 SGPA planner &amp; Gmail-synced student profile</span>
              </div>
            </div>
          </div>

          {/* Bottom Official Links */}
          <div className="relative z-10 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={OFFICIAL_URLS.admissionHelpDesk}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-300 hover:underline whitespace-nowrap"
              >
                Admission Help Desk 2026–27
                <ExternalLink className="w-3 h-3" />
              </a>
              <span aria-hidden="true" className="text-slate-500">
                ·
              </span>
              <a
                href={OFFICIAL_URLS.samarthPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-white hover:underline whitespace-nowrap"
              >
                Samarth e-Portal
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <span className="text-slate-400">Golden Jubilee Institution</span>
          </div>
        </div>

        {/* Right Pane (Desktop) / Primary Above-the-Fold (Mobile): Ambient Backdrop + Glassmorphism Login Card */}
        <div className="order-1 lg:order-2 lg:col-span-6 relative flex items-center justify-center p-4 sm:p-6 lg:px-8 lg:py-5 bg-gradient-to-br from-slate-200/80 via-[#e0e7ff]/75 to-amber-100/65 overflow-hidden">
          {/* Subtle Floating Ambient Geometric Backdrop Layers */}
          <div
            aria-hidden="true"
            className="animate-float-gentle pointer-events-none absolute -top-20 -right-16 w-96 h-96 rounded-full bg-[#1e3a8a]/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="animate-float-slow pointer-events-none absolute -bottom-24 -left-16 w-96 h-96 rounded-full bg-amber-400/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="animate-float-slow pointer-events-none hidden sm:block absolute top-14 right-14 w-28 h-28 rounded-2xl border border-[#1e3a8a]/15 bg-white/45 backdrop-blur-md shadow-sm rotate-12"
          />
          <div
            aria-hidden="true"
            className="animate-float-gentle pointer-events-none hidden sm:block absolute bottom-14 left-12 w-24 h-24 rounded-2xl border border-amber-500/25 bg-amber-100/45 backdrop-blur-md shadow-sm -rotate-12"
          />

          {/* Glassmorphism Login Card */}
          <div className="relative z-10 w-full max-w-md bg-white/75 backdrop-blur-2xl border border-white/95 ring-1 ring-[#1e3a8a]/10 rounded-2xl p-5 sm:p-6 shadow-[0_24px_64px_-16px_rgba(15,23,42,0.22)]">
            <div className="space-y-1 mb-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1e3a8a]">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>LCB College Student Authentication</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0f172a] leading-snug">
                {authMode === 'new_profile'
                  ? 'Create & Save Student Profile'
                  : 'Welcome Back, Scholar'}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {authMode === 'new_profile'
                  ? 'Add your full name, roll number, and Gmail ID to save a new profile login.'
                  : 'Sign in with your saved Roll Number or connect your Gmail ID for your profile pic.'}
              </p>
            </div>

            {/* Mode Switcher */}
            <div
              role="tablist"
              aria-label="Student login mode"
              className="grid grid-cols-2 gap-1 p-1 bg-slate-200/70 rounded-xl border border-slate-200/80 mb-3.5"
            >
              <button
                type="button"
                role="tab"
                aria-selected={authMode === 'signin'}
                onClick={() => handleSelectMode('signin')}
                className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  authMode === 'signin'
                    ? 'bg-[#1e3a8a] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={authMode === 'new_profile'}
                onClick={() => handleSelectMode('new_profile')}
                className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  authMode === 'new_profile'
                    ? 'bg-[#1e3a8a] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5 shrink-0" />
                <span>New Profile Login</span>
              </button>
            </div>

            {/* Saved Student Profiles Switcher */}
            {authMode === 'signin' && savedProfiles.length > 0 && (
              <div className="mb-3.5 space-y-1.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Saved Student Profiles
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-28 overflow-y-auto pr-0.5">
                  {savedProfiles.map((saved) => {
                    const isSelected =
                      saved.rollNumber.trim().toLowerCase() ===
                        rollNumber.trim().toLowerCase() &&
                      saved.name.trim().toLowerCase() === name.trim().toLowerCase();
                    return (
                      <div
                        key={saved.id}
                        className={`group relative flex items-center justify-between gap-1.5 rounded-xl border px-2.5 py-1.5 min-w-0 transition-all ${
                          isSelected
                            ? 'bg-blue-50/90 border-[#1e3a8a]/50 shadow-xs'
                            : 'bg-white/75 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handlePickSavedProfile(saved)}
                          className="flex items-center gap-2 text-left min-w-0 flex-1"
                        >
                          <StudentAvatar
                            name={saved.name}
                            avatarUrl={saved.avatarUrl}
                            size="sm"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-[#0f172a] truncate">
                              {saved.name}
                            </p>
                            <p className="text-[10px] font-mono text-slate-500 truncate">
                              {saved.rollNumber}
                            </p>
                          </div>
                        </button>
                        {savedProfiles.length > 1 && (
                          <button
                            type="button"
                            onClick={() => onDeleteSavedProfile(saved.id)}
                            aria-label={`Remove saved profile ${saved.name}`}
                            className="p-1 text-slate-400 hover:text-red-600 rounded-md transition-colors shrink-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Synced Gmail Avatar Preview */}
            {(avatarUrl || (authMode === 'new_profile' && googleStatus)) && (
              <div className="mb-3.5 flex items-center gap-3 px-3 py-2 rounded-xl bg-blue-50/80 border border-blue-200/80">
                <StudentAvatar
                  name={name || email || 'Student'}
                  avatarUrl={avatarUrl}
                  size="sm"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-[#0f172a] truncate">
                    {name || 'Student Profile'}
                  </p>
                  <p className="text-[11px] text-[#1e3a8a] truncate">
                    {email || 'Gmail linked'}
                  </p>
                </div>
                {avatarUrl && (
                  <span className="text-[10px] font-semibold text-emerald-700 shrink-0">
                    Pic Synced
                  </span>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-2.5">
              {error && (
                <div
                  role="alert"
                  className="px-3 py-2 text-xs text-red-700 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-xl"
                >
                  {error}
                </div>
              )}
              {googleStatus && (
                <div
                  role="status"
                  className="px-3 py-2 text-xs text-emerald-800 bg-emerald-50/90 border border-emerald-200 rounded-xl"
                >
                  {googleStatus}
                </div>
              )}

              {/* Student Full Name & Gmail ID (2-column compact layout in New Profile Login) */}
              {authMode === 'new_profile' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="group">
                    <label
                      htmlFor="student-login-name"
                      className="block text-xs font-semibold text-slate-700 group-focus-within:text-[#1e3a8a] transition-colors duration-200 mb-1"
                    >
                      Student Full Name
                    </label>
                    <div className="relative">
                      <User
                        aria-hidden="true"
                        className="w-4 h-4 text-slate-400 group-focus-within:text-[#1e3a8a] transition-all duration-200 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      />
                      <input
                        id="student-login-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Aniket Rai"
                        autoComplete="name"
                        className="w-full pl-9 pr-3 py-2 text-sm text-slate-900 bg-white/80 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-[#1e3a8a] rounded-xl shadow-xs focus:shadow-[0_0_0_4px_rgba(30,58,138,0.12),0_10px_24px_-10px_rgba(30,58,138,0.22)] focus:-translate-y-0.5 focus:outline-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-[1px] left-3 right-3 h-[2px] bg-gradient-to-r from-[#1e3a8a] to-amber-500 rounded-full scale-x-0 opacity-0 group-focus-within:scale-x-100 group-focus-within:opacity-100 group-focus-within:-translate-y-0.5 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="student-login-email"
                      className="block text-xs font-semibold text-slate-700 group-focus-within:text-[#1e3a8a] transition-colors duration-200 mb-1"
                    >
                      Gmail ID (Optional)
                    </label>
                    <div className="relative">
                      <Mail
                        aria-hidden="true"
                        className="w-4 h-4 text-slate-400 group-focus-within:text-[#1e3a8a] transition-all duration-200 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      />
                      <input
                        id="student-login-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@gmail.com"
                        autoComplete="email"
                        className="w-full pl-9 pr-3 py-2 text-sm text-slate-900 bg-white/80 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-[#1e3a8a] rounded-xl shadow-xs focus:shadow-[0_0_0_4px_rgba(30,58,138,0.12),0_10px_24px_-10px_rgba(30,58,138,0.22)] focus:-translate-y-0.5 focus:outline-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-[1px] left-3 right-3 h-[2px] bg-gradient-to-r from-[#1e3a8a] to-amber-500 rounded-full scale-x-0 opacity-0 group-focus-within:scale-x-100 group-focus-within:opacity-100 group-focus-within:-translate-y-0.5 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Roll Number Field with Focus Micro-Lift & Underline Accent */}
              <div className="group">
                <label
                  htmlFor="student-login-roll"
                  className="block text-xs font-semibold text-slate-700 group-focus-within:text-[#1e3a8a] transition-colors duration-200 mb-1"
                >
                  Roll Number / University Registration ID
                </label>
                <div className="relative">
                  <Hash
                    aria-hidden="true"
                    className="w-4 h-4 text-slate-400 group-focus-within:text-[#1e3a8a] group-focus-within:scale-105 transition-all duration-200 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  />
                  <input
                    id="student-login-roll"
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="e.g., LCB-24-BCA-038"
                    autoComplete="username"
                    className="w-full pl-10 pr-3.5 py-2 text-sm font-mono text-slate-900 bg-white/80 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-[#1e3a8a] rounded-xl shadow-xs focus:shadow-[0_0_0_4px_rgba(30,58,138,0.12),0_10px_24px_-10px_rgba(30,58,138,0.22)] focus:-translate-y-0.5 focus:outline-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-[1px] left-4 right-4 h-[2px] bg-gradient-to-r from-[#1e3a8a] to-amber-500 rounded-full scale-x-0 opacity-0 group-focus-within:scale-x-100 group-focus-within:opacity-100 group-focus-within:-translate-y-0.5 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center"
                  />
                </div>
              </div>

              {/* Academic Stream & Semester */}
              <div
                className={
                  authMode === 'new_profile'
                    ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5'
                    : ''
                }
              >
                <div className="group">
                  <label
                    htmlFor="student-login-stream"
                    className="block text-xs font-semibold text-slate-700 group-focus-within:text-[#1e3a8a] transition-colors duration-200 mb-1"
                  >
                    Academic Stream
                  </label>
                  <div className="relative">
                    <GraduationCap
                      aria-hidden="true"
                      className="w-4 h-4 text-slate-400 group-focus-within:text-[#1e3a8a] transition-all duration-200 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                    <select
                      id="student-login-stream"
                      value={program}
                      onChange={(e) =>
                        setProgram(e.target.value as AcademicProgram)
                      }
                      className="w-full appearance-none pl-10 pr-8 py-2 text-sm text-slate-900 bg-white/80 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-[#1e3a8a] rounded-xl shadow-xs focus:shadow-[0_0_0_4px_rgba(30,58,138,0.12),0_10px_24px_-10px_rgba(30,58,138,0.22)] focus:-translate-y-0.5 focus:outline-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    >
                      {STREAMS.map((stream) => (
                        <option key={stream} value={stream}>
                          {stream}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden="true"
                      className="w-4 h-4 text-slate-400 group-focus-within:text-[#1e3a8a] transition-colors duration-200 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>

                {authMode === 'new_profile' && (
                  <div className="group">
                    <label
                      htmlFor="student-login-semester"
                      className="block text-xs font-semibold text-slate-700 group-focus-within:text-[#1e3a8a] transition-colors duration-200 mb-1"
                    >
                      Semester
                    </label>
                    <div className="relative">
                      <select
                        id="student-login-semester"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        className="w-full appearance-none pl-3.5 pr-8 py-2 text-sm text-slate-900 bg-white/80 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-[#1e3a8a] rounded-xl shadow-xs focus:shadow-[0_0_0_4px_rgba(30,58,138,0.12),0_10px_24px_-10px_rgba(30,58,138,0.22)] focus:-translate-y-0.5 focus:outline-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      >
                        {FYUGP_SEMESTERS.map((sem) => (
                          <option key={sem} value={sem}>
                            {sem}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        aria-hidden="true"
                        className="w-4 h-4 text-slate-400 group-focus-within:text-[#1e3a8a] transition-colors duration-200 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Student PIN Field */}
              <div className="group">
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="student-login-pin"
                    className="block text-xs font-semibold text-slate-700 group-focus-within:text-[#1e3a8a] transition-colors duration-200"
                  >
                    Student PIN / Password
                  </label>
                  <span className="text-[11px] text-slate-500">
                    Demo PIN:{' '}
                    <span className="font-mono font-semibold text-slate-700">
                      1971
                    </span>
                  </span>
                </div>
                <div className="relative">
                  <KeyRound
                    aria-hidden="true"
                    className="w-4 h-4 text-slate-400 group-focus-within:text-[#1e3a8a] group-focus-within:scale-105 transition-all duration-200 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  />
                  <input
                    id="student-login-pin"
                    type={showPin ? 'text' : 'password'}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter your PIN or DOB (min 4 chars)"
                    autoComplete={
                      authMode === 'new_profile'
                        ? 'new-password'
                        : 'current-password'
                    }
                    className="w-full pl-10 pr-10 py-2 text-sm text-slate-900 bg-white/80 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-[#1e3a8a] rounded-xl shadow-xs focus:shadow-[0_0_0_4px_rgba(30,58,138,0.12),0_10px_24px_-10px_rgba(30,58,138,0.22)] focus:-translate-y-0.5 focus:outline-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin((prev) => !prev)}
                    aria-label={showPin ? 'Hide password' : 'Show password'}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-[#1e3a8a] rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a8a]"
                  >
                    {showPin ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-[1px] left-4 right-4 h-[2px] bg-gradient-to-r from-[#1e3a8a] to-amber-500 rounded-full scale-x-0 opacity-0 group-focus-within:scale-x-100 group-focus-within:opacity-100 group-focus-within:-translate-y-0.5 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <label className="inline-flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]"
                  />
                  <span>Keep me signed in on this browser</span>
                </label>
              </div>

              <div className="pt-1 space-y-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#1e3a8a] hover:bg-[#0f172a] active:scale-[0.99] rounded-xl shadow-[0_10px_24px_-8px_rgba(30,58,138,0.45)] transition-all duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1e3a8a]"
                >
                  {authMode === 'new_profile' ? (
                    <UserPlus className="w-4 h-4 text-amber-300 shrink-0" />
                  ) : (
                    <Lock className="w-4 h-4 text-amber-300 shrink-0" />
                  )}
                  <span>
                    {authMode === 'new_profile'
                      ? 'Save New Profile & Sign In'
                      : 'Sign In to Student Portal'}
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <div className="relative flex items-center py-0.5">
                  <div className="flex-grow border-t border-slate-200/90" />
                  <span className="mx-3 text-[11px] font-medium text-slate-500 whitespace-nowrap">
                    or use Gmail ID for profile pic
                  </span>
                  <div className="flex-grow border-t border-slate-200/90" />
                </div>

                <GoogleSignInButton
                  label={
                    authMode === 'new_profile'
                      ? 'Sync Name, Gmail ID & Profile Pic'
                      : 'Sign in with Google (Gmail Profile Pic)'
                  }
                  loading={googleLoading}
                  onClick={handleGoogleLogin}
                  className="w-full"
                />

                {authMode === 'signin' && (
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-[#1e3a8a] bg-amber-50/90 hover:bg-amber-100 border border-amber-200/90 rounded-xl transition-all duration-200 whitespace-nowrap overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <UserCheck className="w-4 h-4 text-amber-700 shrink-0" />
                    <span className="truncate">
                      Demo Sign-In ({profile.name})
                    </span>
                  </button>
                )}
              </div>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <BookOpen className="w-3.5 h-3.5 text-[#1e3a8a] shrink-0" />
                <span>Session 2026–27 · GU-FYUGP</span>
              </span>
              <a
                href={OFFICIAL_URLS.home}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e3a8a] font-medium hover:underline inline-flex items-center gap-1 whitespace-nowrap"
              >
                Official College Site
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
