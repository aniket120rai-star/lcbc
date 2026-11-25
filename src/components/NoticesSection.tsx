import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  ExternalLink,
  FileText,
  Pin,
  Search,
  Trash2,
} from 'lucide-react';
import { OFFICIAL_URLS } from '../data/collegeData';
import type { CampusNotice, NoticeCategory } from '../types/portal';
import { filterNotices } from '../utils/calculations';
import { Modal } from './Modal';

interface NoticesSectionProps {
  notices: CampusNotice[];
  onPinReminder: (notice: Omit<CampusNotice, 'id'>) => void;
  onDeleteNotice: (id: string) => void;
}

const CATEGORIES: ('All' | NoticeCategory)[] = [
  'All',
  'Admissions',
  'Administration',
  'Tenders & Quotations',
  'Scholarships',
  'Personal',
];

export function NoticesSection({
  notices,
  onPinReminder,
  onDeleteNotice,
}: NoticesSectionProps) {
  const [category, setCategory] = useState<'All' | NoticeCategory>('All');
  const [query, setQuery] = useState('');
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [remTitle, setRemTitle] = useState('');
  const [remDate, setRemDate] = useState('2026-11-28');
  const [remSummary, setRemSummary] = useState('');
  const [remError, setRemError] = useState('');

  const filtered = useMemo(
    () => filterNotices(notices, category, query),
    [notices, category, query]
  );

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
      setRemError('Please enter short details.');
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
    <section
      id="notices-section"
      aria-label="Official News and Notices Board"
      className="py-12 sm:py-16 border-b border-slate-200 bg-white scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
              Official Circulars &amp; Announcements
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight [text-wrap:balance]">
              News &amp; Notices Board (2026)
            </h2>
            <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">
              Search and filter verified 2026 admission circulars, election notifications, ICC orders, and scholarship schedules.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={OFFICIAL_URLS.home}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#1e3a8a] bg-slate-50 border border-slate-300 hover:bg-slate-100 rounded-xl transition-colors whitespace-nowrap"
            >
              All Circulars on lcbcollege.co.in
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={handleOpenPinModal}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#1e3a8a] hover:bg-[#0f172a] rounded-xl shadow-xs transition-colors whitespace-nowrap"
            >
              <Pin className="w-3.5 h-3.5 text-amber-300" />
              Pin Reminder
            </button>
          </div>
        </div>

        {/* Search + Filter Controls Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50/90 border border-slate-200/90">
          <div
            role="group"
            aria-label="Filter notices by category"
            className="flex flex-wrap items-center gap-1.5"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap ${
                  category === cat
                    ? 'bg-[#1e3a8a] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200/80 hover:border-slate-300 hover:text-[#0f172a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search 2026 notices"
              placeholder="Search notices (e.g. ICC, FYUGP)..."
              className="w-full pl-9 pr-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/15 transition-all"
            />
          </div>
        </div>

        {/* Redesigned Institutional Notice Boxes */}
        {filtered.length === 0 ? (
          <div className="py-14 text-center border border-slate-200 rounded-2xl bg-slate-50/70">
            <p className="text-sm font-medium text-slate-700">
              No notices matched your search or category filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((notice) => (
              <article
                key={notice.id}
                className="group relative overflow-hidden flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_20px_-12px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 hover:border-[#1e3a8a]/35 hover:shadow-[0_20px_42px_-18px_rgba(15,23,42,0.16)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <div
                  aria-hidden="true"
                  className={`h-[3px] w-full transition-opacity duration-200 ${
                    notice.isPersonal
                      ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-[#1e3a8a] opacity-100'
                      : 'bg-gradient-to-r from-[#1e3a8a] via-[#1e3a8a]/75 to-amber-400 opacity-70 group-hover:opacity-100'
                  }`}
                />

                <div className="p-5 sm:p-6 flex-1 space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                          notice.isPersonal
                            ? 'bg-amber-50 text-amber-700 border-amber-200/80'
                            : 'bg-blue-50/90 text-[#1e3a8a] border-blue-100'
                        }`}
                      >
                        {notice.isPersonal ? (
                          <Pin className="w-3.5 h-3.5" />
                        ) : (
                          <FileText className="w-3.5 h-3.5" />
                        )}
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                        <span className="font-mono tabular-nums font-medium text-slate-700">
                          {notice.date}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span
                          className={`font-semibold ${
                            notice.isPersonal ? 'text-amber-700' : 'text-[#1e3a8a]'
                          }`}
                        >
                          {notice.category}
                        </span>
                      </div>
                    </div>

                    {notice.isPersonal && (
                      <button
                        type="button"
                        onClick={() => onDeleteNotice(notice.id)}
                        aria-label={`Remove pinned reminder ${notice.title}`}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#0f172a] group-hover:text-[#1e3a8a] transition-colors leading-snug">
                    {notice.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    {notice.summary}
                  </p>
                </div>

                <div className="px-5 sm:px-6 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  {notice.externalUrl ? (
                    <a
                      href={notice.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-between font-semibold text-[#1e3a8a] hover:text-[#0f172a] transition-colors"
                    >
                      <span>View Official Notice</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <span className="text-slate-500 font-medium">
                      Saved Personal Reminder · LCB Portal
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Pin Reminder Modal */}
      <Modal
        open={pinModalOpen}
        onClose={() => setPinModalOpen(false)}
        title="Pin Personal Reminder"
        description="Save a custom academic or admission deadline to your notices board."
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
              htmlFor="home-rem-title"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Reminder Title
            </label>
            <input
              id="home-rem-title"
              type="text"
              value={remTitle}
              onChange={(e) => setRemTitle(e.target.value)}
              placeholder="e.g., Submit 4th Year Honours Verification Form"
              className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>

          <div>
            <label
              htmlFor="home-rem-date"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Target Date
            </label>
            <input
              id="home-rem-date"
              type="date"
              value={remDate}
              onChange={(e) => setRemDate(e.target.value)}
              className="w-full px-3.5 py-2 text-sm font-mono text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>

          <div>
            <label
              htmlFor="home-rem-summary"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Notes
            </label>
            <textarea
              id="home-rem-summary"
              rows={3}
              value={remSummary}
              onChange={(e) => setRemSummary(e.target.value)}
              placeholder="Room number, office counter, or document checklist..."
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
              className="px-4 py-2 text-sm font-medium text-white bg-[#1e3a8a] hover:bg-[#0f172a] rounded-lg transition-colors"
            >
              Pin Reminder
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
