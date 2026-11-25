import React, { useState } from 'react';
import {
  Clock,
  ExternalLink,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import {
  COLLEGE_IMAGES,
  OFFICIAL_URLS,
  STATUTORY_COMMITTEES,
} from '../data/collegeData';
import type { SiteRoute, StatutoryCommittee } from '../types/portal';
import { Modal } from './Modal';
import type { LoginRole } from './SiteNavbar';

interface StatutoryCommitteesFooterProps {
  activeCommitteeId: StatutoryCommittee['id'] | null;
  onOpenCommittee: (id: StatutoryCommittee['id']) => void;
  onCloseCommittee: () => void;
  loginRole: LoginRole | null;
  onCloseLogin: () => void;
  onNavigate: (route: SiteRoute, sectionId?: string) => void;
  onRequestReset: () => void;
}

export function StatutoryCommitteesFooter({
  activeCommitteeId,
  onOpenCommittee,
  onCloseCommittee,
  loginRole,
  onCloseLogin,
  onNavigate,
  onRequestReset,
}: StatutoryCommitteesFooterProps) {
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginNotice, setLoginNotice] = useState('');
  const [logoError, setLogoError] = useState(false);

  const selectedCommittee =
    STATUTORY_COMMITTEES.find((c) => c.id === activeCommitteeId) ?? null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUser.trim() || !loginPass.trim()) {
      setLoginNotice('Please enter your institutional ID and password.');
      return;
    }
    setLoginNotice(
      `Institutional ${loginRole} credentials must be verified on the official portal (lcbcollege.co.in). Redirecting reference link below.`
    );
  };

  return (
    <>
      {/* Statutory Committees Section */}
      <section
        id="statutory-committees"
        aria-label="Statutory Committees and Student Safety Cells"
        className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                UGC Mandated Welfare &amp; Safety Cells
              </p>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight">
                Statutory Committees &amp; Helplines
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">
                Direct verified contacts for Grievance Redressal, Internal Complaint Committee (ICC), and Anti-Ragging vigilance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STATUTORY_COMMITTEES.map((committee) => (
              <article
                key={committee.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_20px_-12px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 hover:border-[#1e3a8a]/35 hover:shadow-[0_20px_42px_-18px_rgba(15,23,42,0.16)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between"
              >
                <div
                  aria-hidden="true"
                  className="h-[3px] w-full bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-amber-400"
                />
                <div className="p-6 space-y-3.5 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-base font-bold text-[#0f172a] group-hover:text-[#1e3a8a] transition-colors leading-snug">
                      {committee.title}
                    </h3>
                    <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#1e3a8a] border border-blue-100 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-700 pt-1">
                    {committee.members.map((m) => (
                      <div key={m.name}>
                        <span className="font-semibold text-slate-900">{m.role}:</span>{' '}
                        <span>{m.name}</span>
                        {m.phone && (
                          <span className="block font-mono text-[#1e3a8a] mt-0.5">
                            Tel: {m.phone}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <a
                    href={`mailto:${committee.email}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#1e3a8a] hover:underline break-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    {committee.email}
                  </a>
                </div>

                <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onOpenCommittee(committee.id)}
                    className="w-full py-2 px-3 text-xs font-semibold text-[#1e3a8a] bg-white hover:bg-[#1e3a8a] hover:text-white border border-slate-200 hover:border-[#1e3a8a] rounded-xl transition-colors"
                  >
                    View Mandate &amp; Contact Card
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Full Institutional Footer */}
      <footer className="bg-[#0f172a] text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3 lg:col-span-2">
            <div className="flex items-center gap-3.5">
              {!logoError && (
                <img
                  src={COLLEGE_IMAGES.logo}
                  alt="Lalit Chandra Bharali College Seal"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                  className="w-12 h-12 rounded-full bg-white p-0.5 object-contain border border-white/20 shrink-0"
                />
              )}
              <div>
                <p className="font-serif text-xl font-bold text-white">
                  Lalit Chandra Bharali College
                </p>
                <p className="text-xs text-amber-300 font-medium mt-0.5">
                  Est. 1971 · Affiliated to Gauhati University · NAAC B++ Accredited
                </p>
              </div>
            </div>
            <div className="pt-2 space-y-2 text-xs sm:text-sm text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Maligaon Gate No. 4, East Gota Nagar, Assam Trunk Road, Guwahati, Assam 781011
                </span>
              </p>
              <p className="flex items-center gap-2 font-mono">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 95772 37877</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Monday – Saturday · 9:00 AM – 4:30 PM</span>
              </p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <p className="font-semibold text-white uppercase tracking-wider">
              Quick Navigation
            </p>
            <ul className="space-y-1.5">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('news')}
                  className="hover:text-amber-300 transition-colors"
                >
                  News &amp; Notices (2026)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('departments')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Academic Departments
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('staff')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Teaching &amp; Staff Directory
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('alumni')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Our Pride (Alumni &amp; Events)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('library')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Central &amp; Digital Library
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('portal')}
                  className="text-amber-300 font-semibold hover:underline"
                >
                  Student Academic Portal
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5 text-xs">
            <p className="font-semibold text-white uppercase tracking-wider">
              Official Links
            </p>
            <ul className="space-y-1.5">
              <li>
                <a
                  href={OFFICIAL_URLS.home}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-amber-300 transition-colors"
                >
                  lcbcollege.co.in
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={OFFICIAL_URLS.prospectus2026}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-amber-300 transition-colors"
                >
                  Prospectus 2026–27 (PDF)
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={OFFICIAL_URLS.admissionHelpDesk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-amber-300 transition-colors"
                >
                  Admission Help Desk 2026–27
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={OFFICIAL_URLS.gauhatiUniversity}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-amber-300 transition-colors"
                >
                  Gauhati University
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
            <p>
              © 2026 Lalit Chandra Bharali College, Maligaon, Guwahati. All institutional rights reserved.
            </p>
            <button
              type="button"
              onClick={onRequestReset}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-300 transition-colors whitespace-nowrap w-fit"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Student Portal Demo Data
            </button>
          </div>
        </div>
      </footer>

      {/* Statutory Committee Detail Modal */}
      <Modal
        open={Boolean(selectedCommittee)}
        onClose={onCloseCommittee}
        title={selectedCommittee?.title ?? ''}
        description="Official Statutory Committee · Lalit Chandra Bharali College"
      >
        {selectedCommittee && (
          <div className="space-y-4 text-sm text-slate-700">
            <p className="leading-relaxed">{selectedCommittee.mandate}</p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              {selectedCommittee.members.map((m) => (
                <div key={m.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span>
                    <strong className="text-slate-900">{m.role}:</strong> {m.name}
                  </span>
                  {m.phone && (
                    <span className="font-mono font-semibold text-[#1e3a8a]">
                      {m.phone}
                    </span>
                  )}
                </div>
              ))}
              <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-xs">
                <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <a
                  href={`mailto:${selectedCommittee.email}`}
                  className="font-mono font-semibold text-[#1e3a8a] hover:underline"
                >
                  {selectedCommittee.email}
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-500">{selectedCommittee.helplineNote}</p>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={onCloseCommittee}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1e3a8a] hover:bg-[#0f172a] rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Institutional Login Portal Modal */}
      <Modal
        open={Boolean(loginRole)}
        onClose={() => {
          setLoginNotice('');
          onCloseLogin();
        }}
        title={`${loginRole ?? 'Institutional'} Login Portal`}
        description="Sign in to LCB College administrative modules via official college authentication."
      >
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
            {!logoError && (
              <img
                src={COLLEGE_IMAGES.logo}
                alt="Lalit Chandra Bharali College Seal"
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 object-contain p-0.5 shrink-0"
              />
            )}
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900">
                Lalit Chandra Bharali College
              </p>
              <p className="text-[11px] text-slate-600">
                {loginRole} Administrative Access · Maligaon, Guwahati
              </p>
            </div>
          </div>

          {loginNotice && (
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-[#1e3a8a] space-y-2">
              <p>{loginNotice}</p>
              <a
                href={OFFICIAL_URLS.home}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold underline"
              >
                Open Official Portal Login (lcbcollege.co.in)
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          <div>
            <label
              htmlFor="login-id"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              {loginRole} ID / Official Email
            </label>
            <input
              id="login-id"
              type="text"
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
              placeholder="e.g., dept.cs@lcbcollege.co.in"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>

          <div>
            <label
              htmlFor="login-pass"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="login-pass"
                type={showPass ? 'text' : 'password'}
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="Enter institutional password"
                className="w-full pl-3.5 pr-10 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              />
              <button
                type="button"
                onClick={() => setShowPass((prev) => !prev)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded"
              >
                {showPass ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                setLoginNotice('');
                onCloseLogin();
                onNavigate('portal');
              }}
              className="text-xs font-semibold text-[#1e3a8a] hover:underline"
            >
              Switch to Student Login →
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setLoginNotice('');
                  onCloseLogin();
                }}
                className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1e3a8a] hover:bg-[#0f172a] rounded-lg"
              >
                <Lock className="w-3.5 h-3.5" />
                Sign In
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
