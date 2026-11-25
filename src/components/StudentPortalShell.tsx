import { ArrowLeft, LogOut } from 'lucide-react';
import type { PortalTab, StudentProfile } from '../types/portal';
import { StudentAvatar } from './StudentAvatar';

interface StudentPortalShellProps {
  activeTab: PortalTab;
  onSelectTab: (tab: PortalTab) => void;
  profile: StudentProfile;
  onOpenProfile: () => void;
  onBackHome: () => void;
  onSignOut: () => void;
}

const PORTAL_TABS: { id: PortalTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'attendance', label: 'Attendance & 75%' },
  { id: 'timetable', label: 'Weekly Timetable' },
  { id: 'tasks', label: 'Tasks & Notes' },
  { id: 'sgpa', label: 'SGPA Calculator' },
  { id: 'campus', label: 'Campus Hub' },
];

export function StudentPortalShell({
  activeTab,
  onSelectTab,
  profile,
  onOpenProfile,
  onBackHome,
  onSignOut,
}: StudentPortalShellProps) {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1e3a8a] hover:underline whitespace-nowrap"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            College Home
          </button>
          <span aria-hidden="true" className="text-slate-300">
            |
          </span>
          <div
            role="tablist"
            aria-label="Student Portal Workspace Sections"
            className="flex flex-wrap items-center gap-1"
          >
            {PORTAL_TABS.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectTab(tab.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#1e3a8a] text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenProfile}
            className="inline-flex items-center gap-2 pl-1.5 pr-3 py-1 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap"
          >
            <StudentAvatar
              name={profile.name}
              avatarUrl={profile.avatarUrl}
              size="sm"
            />
            <span>{profile.name}</span>
            <span aria-hidden="true" className="text-slate-400">
              ·
            </span>
            <span className="font-mono text-[#1e3a8a]">{profile.program}</span>
          </button>

          <button
            type="button"
            onClick={onSignOut}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-red-700 bg-white border border-slate-200 hover:border-red-200 hover:bg-red-50 rounded-lg transition-colors whitespace-nowrap"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
