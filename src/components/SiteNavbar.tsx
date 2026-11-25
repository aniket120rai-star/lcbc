import { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Lock,
  Menu,
  UserCheck,
  X,
} from 'lucide-react';
import { COLLEGE_IMAGES } from '../data/collegeData';
import type { SiteRoute } from '../types/portal';

export type LoginRole = 'Department' | 'Faculty' | 'Cell / Committee / Club';

interface NavDropdownItem {
  label: string;
  route: SiteRoute;
  sectionId?: string;
}

interface NavGroup {
  id: string;
  label: string;
  route: SiteRoute;
  items?: NavDropdownItem[];
}

const NAV_GROUPS: NavGroup[] = [
  { id: 'home', label: 'Home', route: 'home' },
  { id: 'news', label: 'News', route: 'news' },
  {
    id: 'about',
    label: 'About',
    route: 'about',
    items: [
      { label: 'About College', route: 'about', sectionId: 'about-college' },
      { label: 'Vision, Mission & Objectives', route: 'about', sectionId: 'vision-mission' },
      { label: 'College at a Glance', route: 'about', sectionId: 'college-glance' },
      { label: 'Contact Us', route: 'about', sectionId: 'contact-us' },
    ],
  },
  {
    id: 'administration',
    label: 'Administration',
    route: 'administration',
    items: [
      { label: 'Governing Body', route: 'administration', sectionId: 'governing-body' },
      { label: "Principal's Desk", route: 'administration', sectionId: 'principal-desk' },
      { label: 'IQAC & NIRF', route: 'iqac' },
    ],
  },
  {
    id: 'programmes',
    label: 'Programmes',
    route: 'programmes',
    items: [
      { label: 'Course Structure', route: 'programmes', sectionId: 'programmes-section' },
      { label: 'Fee Structure', route: 'programmes', sectionId: 'fee-structure' },
    ],
  },
  {
    id: 'departments',
    label: 'Departments',
    route: 'departments',
    items: [
      { label: 'All Departments', route: 'departments' },
      { label: 'Arts Departments', route: 'departments', sectionId: 'dept-arts' },
      { label: 'Science Departments', route: 'departments', sectionId: 'dept-science' },
      { label: 'Self-Financed / IT (BCA, B.Sc. IT, PGDCA)', route: 'departments', sectionId: 'dept-it' },
    ],
  },
  {
    id: 'staff',
    label: 'Staff',
    route: 'staff',
    items: [
      { label: 'Teaching Staff', route: 'staff', sectionId: 'staff-teaching' },
      { label: 'Library Staff', route: 'staff', sectionId: 'staff-library' },
      { label: 'Non-Teaching Staff', route: 'staff', sectionId: 'staff-nonteaching' },
    ],
  },
  {
    id: 'pride',
    label: 'Our Pride',
    route: 'alumni',
    items: [
      { label: 'Distinguished Alumni (Our Pride)', route: 'alumni', sectionId: 'our-pride' },
      { label: 'Recent Events & Seminars', route: 'alumni', sectionId: 'events-visitors' },
      { label: 'Eminent Visitors', route: 'alumni', sectionId: 'events-visitors' },
    ],
  },
  {
    id: 'cells',
    label: 'Cells & Campus',
    route: 'cells',
    items: [
      { label: 'Cells & Committees', route: 'cells', sectionId: 'cw-1' },
      { label: 'Clubs', route: 'cells', sectionId: 'cw-5' },
      { label: 'NCC', route: 'cells', sectionId: 'cw-8' },
      { label: 'NSS', route: 'cells', sectionId: 'cw-9' },
      { label: 'LCBCSU', route: 'cells', sectionId: 'cw-10' },
      { label: 'Central Library', route: 'library', sectionId: 'central-library' },
      { label: 'Digital Library', route: 'library', sectionId: 'digital-library' },
      { label: 'Library Readers', route: 'library', sectionId: 'library-readers' },
    ],
  },
];

interface SiteNavbarProps {
  activeRoute: SiteRoute;
  onNavigate: (route: SiteRoute, sectionId?: string) => void;
  onOpenLogin: (role: LoginRole) => void;
}

export function SiteNavbar({
  activeRoute,
  onNavigate,
  onOpenLogin,
}: SiteNavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setLoginMenuOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setLoginMenuOpen(false);
        setMobileDrawerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleSelectRoute = (route: SiteRoute, sectionId?: string) => {
    onNavigate(route, sectionId);
    setOpenDropdown(null);
    setLoginMenuOpen(false);
    setMobileDrawerOpen(false);
  };

  return (
    <>
      <header
        ref={navRef}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90"
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
        {/* Zone 1: Single-line Brand Wordmark with Official Seal */}
        <button
          type="button"
          onClick={() => handleSelectRoute('home')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a]"
        >
          {!logoError ? (
            <img
              src={COLLEGE_IMAGES.logo}
              alt="Lalit Chandra Bharali College Seal"
              referrerPolicy="no-referrer"
              onError={() => setLogoError(true)}
              className="w-9 h-9 rounded-full bg-white border border-slate-200 object-contain p-0.5 shrink-0"
            />
          ) : (
            <span className="w-9 h-9 rounded-full bg-[#1e3a8a] text-amber-400 font-serif text-xs font-bold flex items-center justify-center shrink-0">
              LCB
            </span>
          )}
          <span className="font-serif text-lg font-bold tracking-tight text-[#0f172a] whitespace-nowrap shrink-0">
            LCB College
          </span>
        </button>

        {/* Zone 2: Concise Desktop Navigation with Dropdowns */}
        <nav
          aria-label="Official Website Navigation"
          className="hidden xl:flex items-center gap-0.5"
        >
          {NAV_GROUPS.map((group) => {
            const isActive =
              activeRoute === group.route ||
              (group.id === 'administration' && activeRoute === 'iqac') ||
              (group.id === 'cells' && activeRoute === 'library');
            const isOpen = openDropdown === group.id;

            if (!group.items) {
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => handleSelectRoute(group.route)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-2 py-2 text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a] ${
                    isActive
                      ? 'text-[#1e3a8a]'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {group.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-2 -bottom-[11px] h-0.5 bg-[#1e3a8a]"
                    />
                  )}
                </button>
              );
            }

            return (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => setOpenDropdown(group.id)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  onClick={() => handleSelectRoute(group.route)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setOpenDropdown(group.id);
                    }
                  }}
                  className={`relative inline-flex items-center gap-1 px-2 py-2 text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a] ${
                    isActive
                      ? 'text-[#1e3a8a]'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-2 -bottom-[11px] h-0.5 bg-[#1e3a8a]"
                    />
                  )}
                </button>

                {isOpen && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full pt-1.5 w-64 z-50"
                  >
                    <div className="bg-white border border-slate-200 rounded-xl shadow-lg py-1.5">
                      {group.items.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          role="menuitem"
                          onClick={() =>
                            handleSelectRoute(item.route, item.sectionId)
                          }
                          className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#1e3a8a] transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Zone 3: Login Portal + Student Portal + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative hidden sm:block">
            <button
              type="button"
              aria-expanded={loginMenuOpen}
              aria-haspopup="menu"
              onClick={() => setLoginMenuOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Lock className="w-3.5 h-3.5 text-[#1e3a8a]" />
              <span>Login Portal</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {loginMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-1.5 w-60 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => handleSelectRoute('portal')}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-[#1e3a8a] bg-blue-50/60 hover:bg-blue-50 transition-colors border-b border-slate-100"
                >
                  Student Login
                </button>
                {(['Department', 'Faculty', 'Cell / Committee / Club'] as LoginRole[]).map(
                  (role) => (
                    <button
                      key={role}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setLoginMenuOpen(false);
                        onOpenLogin(role);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#1e3a8a] transition-colors"
                    >
                      {role} Login
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleSelectRoute('portal')}
            aria-current={activeRoute === 'portal' ? 'page' : undefined}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeRoute === 'portal'
                ? 'bg-amber-400 text-slate-950'
                : 'bg-[#1e3a8a] text-white hover:bg-[#0f172a]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Student Portal</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileDrawerOpen}
            className="xl:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer (outside sticky backdrop-blur header so fixed spans full viewport) */}
      {mobileDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 xl:hidden bg-slate-950/50 backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileDrawerOpen(false);
          }}
        >
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white border-l border-slate-200 shadow-2xl flex flex-col">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                {!logoError && (
                  <img
                    src={COLLEGE_IMAGES.logo}
                    alt="Lalit Chandra Bharali College Seal"
                    referrerPolicy="no-referrer"
                    onError={() => setLogoError(true)}
                    className="w-8 h-8 rounded-full bg-white border border-slate-200 object-contain p-0.5 shrink-0"
                  />
                )}
                <span className="font-serif text-base font-bold text-[#0f172a]">
                  LCB College Directory
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                aria-label="Close navigation menu"
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav
              aria-label="Mobile Website Navigation"
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            >
              {NAV_GROUPS.map((group) => (
                <div key={group.id} className="border-b border-slate-100 pb-3">
                  <button
                    type="button"
                    onClick={() => handleSelectRoute(group.route)}
                    className={`w-full text-left px-3 py-2 text-sm font-semibold rounded-lg ${
                      activeRoute === group.route
                        ? 'bg-blue-50 text-[#1e3a8a]'
                        : 'text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {group.label}
                  </button>
                  {group.items && (
                    <div className="mt-1 pl-4 space-y-1">
                      {group.items.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() =>
                            handleSelectRoute(item.route, item.sectionId)
                          }
                          className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#1e3a8a] rounded-md"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-2 space-y-2">
                <p className="px-3 text-xs font-semibold text-slate-500">
                  Student &amp; Institutional Login
                </p>
                <button
                  type="button"
                  onClick={() => handleSelectRoute('portal')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-[#1e3a8a] bg-blue-50 hover:bg-blue-100 rounded-lg"
                >
                  Student Login
                </button>
                {(['Department', 'Faculty', 'Cell / Committee / Club'] as LoginRole[]).map(
                  (role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setMobileDrawerOpen(false);
                        onOpenLogin(role);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg"
                    >
                      {role} Login
                    </button>
                  )
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
