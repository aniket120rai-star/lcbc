import { useState } from 'react';
import { GraduationCap, Menu, User, X } from 'lucide-react';
import type { PortalTab, StudentProfile } from '../types/portal';

interface HeaderProps {
  activeTab: PortalTab;
  onSelectTab: (tab: PortalTab) => void;
  profile: StudentProfile;
  onOpenProfile: () => void;
}

const NAV_ITEMS: { id: PortalTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'timetable', label: 'Timetable' },
  { id: 'tasks', label: 'Tasks & Notes' },
  { id: 'sgpa', label: 'SGPA' },
  { id: 'campus', label: 'Campus Hub' },
];

export function Header({
  activeTab,
  onSelectTab,
  profile,
  onOpenProfile,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: PortalTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  const firstName = profile.name.trim().split(/\s+/)[0] || 'Profile';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('overview')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 rounded-md"
        >
          <span className="w-8 h-8 rounded-lg bg-[#1e3a8a] text-amber-400 flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4" />
          </span>
          <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
            LCB College Portal
          </span>
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-4 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 ${
                  isActive
                    ? 'text-[#1e3a8a]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-[#1e3a8a]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single primary profile action + mobile toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenProfile}
            aria-label="Edit Student Profile"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-[#1e3a8a] hover:bg-blue-950 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            <User className="w-4 h-4 text-amber-300" />
            <span className="max-w-[120px] truncate">{firstName}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Collapsible mobile navigation menu */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center justify-between px-3.5 min-h-[44px] text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-[#1e3a8a]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="text-xs font-semibold text-amber-600">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
