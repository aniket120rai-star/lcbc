import React, { useMemo, useState } from 'react';
import {
  Building2,
  ExternalLink,
  Mail,
  MapPin,
  Pin,
  Search,
  ShieldCheck,
  Trash2,
  Users,
} from 'lucide-react';
import {
  ACADEMIC_DEPARTMENTS,
  COMMITTEE_CONTACTS,
  STUDENT_WINGS_AND_FACILITIES,
} from '../data/seedData';
import type { CampusNotice, NoticeCategory } from '../types/portal';
import { filterNotices } from '../utils/calculations';
import { Modal } from './Modal';

interface CampusHubProps {
  notices: CampusNotice[];
  onPinReminder: (notice: Omit<CampusNotice, 'id'>) => void;
  onDeleteNotice: (id: string) => void;
}

const NOTICE_CATEGORIES: ('All' | NoticeCategory)[] = [
  'All',
  'Administration',
  'Admissions',
  'Tenders & Quotations',
  'Examinations',
  'Scholarships',
  'Campus Life',
  'Personal',
];

type DirectoryFilter = 'All' | 'Arts' | 'Science' | 'Self-Financing IT';

export function CampusHub({
  notices,
  onPinReminder,
  onDeleteNotice,
}: CampusHubProps) {
  const [noticeCategory, setNoticeCategory] = useState<'All' | NoticeCategory>('All');
  const [noticeQuery, setNoticeQuery] = useState('');
  const [directoryFilter, setDirectoryFilter] = useState<DirectoryFilter>('All');

  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [remTitle, setRemTitle] = useState('');
  const [remDate, setRemDate] = useState('2026-11-28');
  const [remSummary, setRemSummary] = useState('');
  const [remError, setRemError] = useState('');

  const filteredNotices = useMemo(
    () => filterNotices(notices, noticeCategory, noticeQuery),
    [notices, noticeCategory, noticeQuery]
  );

  const filteredDepartments = useMemo(() => {
    if (directoryFilter === 'All') return ACADEMIC_DEPARTMENTS;
    return ACADEMIC_DEPARTMENTS.filter((d) => d.stream === directoryFilter);
  }, [directoryFilter]);

  const handleOpenPinModal = () => {
    setRemTitle('');
    setRemDate('2026-11-28');
    setRemSummary('');
    setRemError('');
    setPinModalOpen(true);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remTitle.trim()) {
      setRemError('Please enter a reminder title.');
      return;
    }
    if (!remSummary.trim()) {
      setRemError('Please enter a short reminder note.');
      return;
    }
    onPinReminder({
      title: remTitle.trim(),
      date: remDate || '2026-11-24',
      category: 'Personal',
      summary: remSummary.trim(),
      isPersonal: true,
    });
    setPinModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            LCB College Campus Hub
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            2026 notices, academic departments, student wings, and verified grievance &amp; support contacts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href="https://www.lcbcollege.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-[#1e3a8a] bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap"
          >
            <ExternalLink className="w-4 h-4" />
            lcbcollege.co.in
          </a>
          <button
            type="button"
            onClick={handleOpenPinModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-[#1e3a8a] hover:bg-blue-950 rounded-lg transition-colors whitespace-nowrap"
          >
            <Pin className="w-4 h-4 text-amber-300" />
            Pin Personal Reminder
          </button>
        </div>
      </div>

      {/* Section 1: Filterable Notice Board */}
      <section
        aria-label="Campus Notice Board"
        className="bg-white border border-slate-200 rounded-xl p-6 space-y-5"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              2026 Notice Board &amp; Pinned Reminders
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Official LCB College circulars and personal deadline reminders.
            </p>
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={noticeQuery}
              onChange={(e) => setNoticeQuery(e.target.value)}
              aria-label="Search campus notices"
              placeholder="Search notices..."
              className="w-full pl-9 pr-3.5 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="group"
          aria-label="Filter notices by category"
          className="flex flex-wrap items-center gap-1.5"
        >
          {NOTICE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setNoticeCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                noticeCategory === cat
                  ? 'bg-[#1e3a8a] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredNotices.length === 0 ? (
          <div className="py-10 text-center text-sm text-slate-500">
            No notices match your selected filter.
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {filteredNotices.map((notice) => (
              <li
                key={notice.id}
                className="py-4 first:pt-1 last:pb-1 flex items-start justify-between gap-4"
              >
                <div className="min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono tabular-nums">{notice.date}</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={`font-semibold ${
                        notice.isPersonal ? 'text-amber-700' : 'text-[#1e3a8a]'
                      }`}
                    >
                      {notice.category}
                    </span>
                    {notice.isPersonal && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-500">Pinned by you</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                    {notice.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {notice.summary}
                  </p>

                  {notice.externalUrl && (
                    <a
                      href={notice.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#1e3a8a] hover:underline pt-0.5"
                    >
                      View on LCB College Portal
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {notice.isPersonal && (
                  <button
                    type="button"
                    onClick={() => onDeleteNotice(notice.id)}
                    aria-label={`Remove pinned reminder ${notice.title}`}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Section 2: Academic Directory */}
      <section aria-label="Academic Directory" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Academic Directory &amp; Programmes
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              15 Arts &amp; Science departments plus Self-Financing IT programmes (BCA, B.Sc IT, PGDCA).
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter academic directory by stream"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg w-fit"
          >
            {(['All', 'Arts', 'Science', 'Self-Financing IT'] as DirectoryFilter[]).map(
              (stream) => (
                <button
                  key={stream}
                  type="button"
                  onClick={() => setDirectoryFilter(stream)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    directoryFilter === stream
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {stream}
                </button>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDepartments.map((dept) => (
            <div
              key={dept.name}
              className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5"
            >
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="font-semibold text-[#1e3a8a]">{dept.stream}</span>
                <span aria-hidden="true">·</span>
                <span>{dept.level}</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900">{dept.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{dept.focus}</p>
            </div>
          ))}
        </div>

        {/* Active Student Wings & Campus Facilities */}
        <div className="pt-4 space-y-3">
          <div className="flex items-center gap-2 text-base font-semibold text-slate-900">
            <Users className="w-4 h-4 text-[#1e3a8a]" />
            <span>Student Wings &amp; Campus Facilities</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STUDENT_WINGS_AND_FACILITIES.map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-xl border border-slate-200 bg-white space-y-1"
              >
                <p className="text-xs font-medium text-amber-700">{item.category}</p>
                <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Student Support & Committees */}
      <section aria-label="Student Support and Committees" className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Student Support, Administration &amp; Committees
              </h2>
              <p className="text-sm text-slate-600 mt-0.5">
                Verified institutional cells and campus office contacts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-xs text-slate-700 bg-white border border-slate-200 rounded-lg px-3.5 py-2.5">
            <MapPin className="w-4 h-4 text-[#1e3a8a] shrink-0 mt-0.5" />
            <span>
              <strong>Campus Address:</strong> Maligaon Gate No. 4, East Gota Nagar, Guwahati 781011, Assam
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMMITTEE_CONTACTS.map((contact) => (
            <div
              key={contact.name}
              className="p-5 rounded-xl border border-slate-200 bg-white space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {contact.name}
                  </h3>
                  <p className="text-xs font-medium text-[#1e3a8a] mt-0.5">
                    {contact.role}
                  </p>
                </div>
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {contact.details}
              </p>

              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#1e3a8a] hover:underline break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  {contact.email}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pin Personal Reminder Modal */}
      <Modal
        open={pinModalOpen}
        onClose={() => setPinModalOpen(false)}
        title="Pin Personal Reminder"
        description="Pin a personal notice or deadline to your Campus Hub and Overview dashboard."
      >
        <form onSubmit={handlePinSubmit} className="space-y-4">
          {remError && (
            <div
              role="alert"
              className="px-3.5 py-2.5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg"
            >
              {remError}
            </div>
          )}

          <div>
            <label
              htmlFor="rem-title"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Reminder Title
            </label>
            <input
              id="rem-title"
              type="text"
              value={remTitle}
              onChange={(e) => setRemTitle(e.target.value)}
              placeholder="e.g., Collect Library Clearance Slip"
              className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>

          <div>
            <label
              htmlFor="rem-date"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Target Date
            </label>
            <input
              id="rem-date"
              type="date"
              value={remDate}
              onChange={(e) => setRemDate(e.target.value)}
              className="w-full px-3.5 py-2 text-sm font-mono text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>

          <div>
            <label
              htmlFor="rem-summary"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Details
            </label>
            <textarea
              id="rem-summary"
              rows={3}
              value={remSummary}
              onChange={(e) => setRemSummary(e.target.value)}
              placeholder="Add room counter, document requirements, or timing..."
              className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setPinModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#1e3a8a] hover:bg-blue-950 rounded-lg transition-colors"
            >
              Pin Reminder
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
