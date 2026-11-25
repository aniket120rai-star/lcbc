import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Mail,
  RotateCcw,
  Trash2,
  UserPlus,
  X,
} from 'lucide-react';
import { FYUGP_SEMESTERS } from '../data/seedData';
import type {
  AcademicProgram,
  SavedStudentProfile,
  StudentProfile,
} from '../types/portal';
import { isValidEmailAddress } from '../utils/calculations';
import { googleSignInWithGmail } from '../utils/googleAuth';
import { GoogleSignInButton } from './GoogleSignInButton';
import { Modal } from './Modal';
import { StudentAvatar } from './StudentAvatar';

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  profile: StudentProfile;
  savedProfiles: SavedStudentProfile[];
  onSave: (updated: StudentProfile) => void;
  onSaveNewProfile: (created: StudentProfile) => void;
  onSelectSavedProfile: (saved: SavedStudentProfile) => void;
  onDeleteSavedProfile: (id: string) => void;
  onRequestReset: () => void;
}

const PROGRAMS: AcademicProgram[] = ['BA', 'B.Sc', 'BCA', 'B.Sc IT', 'PGDCA'];

export function ProfileModal({
  open,
  onClose,
  profile,
  savedProfiles,
  onSave,
  onSaveNewProfile,
  onSelectSavedProfile,
  onDeleteSavedProfile,
  onRequestReset,
}: ProfileModalProps) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email ?? '');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    profile.avatarUrl
  );
  const [authProvider, setAuthProvider] = useState<'local' | 'google'>(
    profile.authProvider ?? 'local'
  );
  const [program, setProgram] = useState<AcademicProgram>(profile.program);
  const [semester, setSemester] = useState(profile.semester);
  const [rollNumber, setRollNumber] = useState(profile.rollNumber);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setName(profile.name);
      setEmail(profile.email ?? '');
      setAvatarUrl(profile.avatarUrl);
      setAuthProvider(profile.authProvider ?? 'local');
      setProgram(profile.program);
      setSemester(profile.semester);
      setRollNumber(profile.rollNumber);
      setError('');
      setStatusMessage('');
    }
  }, [open, profile]);

  const validateFields = (): StudentProfile | null => {
    if (!name.trim()) {
      setError('Please enter your full name.');
      return null;
    }
    if (!rollNumber.trim()) {
      setError('Please enter your LCB College roll number.');
      return null;
    }
    if (email.trim() && !isValidEmailAddress(email)) {
      setError('Please enter a valid Gmail ID / email address.');
      return null;
    }
    setError('');
    return {
      name: name.trim(),
      program,
      semester,
      rollNumber: rollNumber.trim(),
      email: email.trim() || undefined,
      avatarUrl,
      authProvider,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = validateFields();
    if (!payload) return;
    onSave(payload);
    onClose();
  };

  const handleSaveAsNewProfile = () => {
    const payload = validateFields();
    if (!payload) return;
    onSaveNewProfile(payload);
    setStatusMessage(`Saved new profile login for ${payload.name}.`);
  };

  const handleGoogleSync = async () => {
    setError('');
    setStatusMessage('');
    setGoogleLoading(true);
    try {
      const googleUser = await googleSignInWithGmail();
      const nextName = googleUser.name || name.trim() || 'LCB Student';
      setName(nextName);
      setEmail(googleUser.email);
      setAvatarUrl(googleUser.avatarUrl);
      setAuthProvider('google');
      setStatusMessage(
        `Linked ${googleUser.email}${googleUser.avatarUrl ? ' and synced Google profile picture.' : '.'}`
      );
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Could not link Google account.';
      setError(msg);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSelectSaved = (saved: SavedStudentProfile) => {
    setName(saved.name);
    setEmail(saved.email ?? '');
    setAvatarUrl(saved.avatarUrl);
    setAuthProvider(saved.authProvider ?? 'local');
    setProgram(saved.program);
    setSemester(saved.semester);
    setRollNumber(saved.rollNumber);
    setError('');
    onSelectSavedProfile(saved);
    setStatusMessage(`Switched active login to ${saved.name}.`);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Student Profile"
      description="Manage your name, Gmail profile photo, saved login profiles, and GU-FYUGP details."
      maxWidthClass="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div
            role="alert"
            className="px-3.5 py-2.5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl"
          >
            {error}
          </div>
        )}

        {statusMessage && (
          <div
            role="status"
            className="px-3.5 py-2.5 text-xs sm:text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Profile Picture + Gmail ID Sync Card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <StudentAvatar
              name={name || 'Student'}
              avatarUrl={avatarUrl}
              size="xl"
              className="shadow-xs"
            />
            <div className="min-w-0 space-y-0.5">
              <p className="font-serif text-base font-bold text-[#0f172a] truncate">
                {name.trim() || 'New Student Profile'}
              </p>
              <p className="text-xs font-mono text-slate-600 truncate">
                {rollNumber.trim() || 'Roll No pending'} · {program}
              </p>
              <p className="text-xs text-[#1e3a8a] flex items-center gap-1 truncate">
                <Mail className="w-3 h-3 shrink-0" />
                <span className="truncate">
                  {email.trim() || 'No Gmail ID linked yet'}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 shrink-0">
            <GoogleSignInButton
              variant="compact"
              label={avatarUrl ? 'Sync Gmail Pic' : 'Gmail Login for Pic'}
              loading={googleLoading}
              onClick={handleGoogleSync}
            />
            {avatarUrl && (
              <button
                type="button"
                onClick={() => {
                  setAvatarUrl(undefined);
                  setAuthProvider('local');
                }}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
                Remove picture
              </button>
            )}
          </div>
        </div>

        {/* Name & Gmail ID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="profile-name"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Student Full Name
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Rishabh Choudhury"
              className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="profile-email"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Gmail ID
            </label>
            <input
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., student@gmail.com"
              className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="profile-program"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Stream / Program
            </label>
            <select
              id="profile-program"
              value={program}
              onChange={(e) => setProgram(e.target.value as AcademicProgram)}
              className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
            >
              {PROGRAMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="profile-roll"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Roll Number
            </label>
            <input
              id="profile-roll"
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="e.g., LCB-24-BCA-038"
              className="w-full px-3.5 py-2 text-sm font-mono text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="profile-semester"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Semester (GU-FYUGP / NEP 2020)
          </label>
          <select
            id="profile-semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
          >
            {FYUGP_SEMESTERS.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        {/* Saved Profile Logins Switcher */}
        {savedProfiles.length > 0 && (
          <div className="pt-2 space-y-2">
            <p className="text-xs font-semibold text-slate-600">
              Saved Profile Logins ({savedProfiles.length})
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
              {savedProfiles.map((saved) => {
                const isCurrent =
                  saved.name === profile.name &&
                  saved.rollNumber === profile.rollNumber;
                return (
                  <div
                    key={saved.id}
                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl border transition-colors ${
                      isCurrent
                        ? 'bg-blue-50/80 border-[#1e3a8a]/40'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectSaved(saved)}
                      className="flex items-center gap-2.5 min-w-0 flex-1 text-left"
                    >
                      <StudentAvatar
                        name={saved.name}
                        avatarUrl={saved.avatarUrl}
                        size="sm"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-900 truncate">
                          {saved.name}
                        </p>
                        <p className="text-[11px] font-mono text-slate-500 truncate">
                          {saved.rollNumber}
                        </p>
                      </div>
                    </button>
                    {savedProfiles.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onDeleteSavedProfile(saved.id)}
                        aria-label={`Delete saved profile ${saved.name}`}
                        className="p-1 text-slate-400 hover:text-red-600 rounded-md shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              onRequestReset();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Demo Data
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSaveAsNewProfile}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#1e3a8a] bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              <UserPlus className="w-3.5 h-3.5 text-amber-700" />
              Save as New Profile
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#1e3a8a] hover:bg-[#0f172a] rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              Save Profile
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
