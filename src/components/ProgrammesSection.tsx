import { useState } from 'react';
import { ExternalLink, FileText } from 'lucide-react';
import { OFFICIAL_URLS, PROGRAMME_TRACKS } from '../data/collegeData';
import type { ProgrammeTrack } from '../types/portal';

export function ProgrammesSection() {
  const [activeTrack, setActiveTrack] = useState<ProgrammeTrack['id']>('ug');

  const currentTrack =
    PROGRAMME_TRACKS.find((t) => t.id === activeTrack) ?? PROGRAMME_TRACKS[0];

  return (
    <section
      id="programmes-section"
      aria-label="Programmes and Fee Structure"
      className="py-12 sm:py-16 bg-white border-b border-slate-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
              Gauhati University NEP 2020 Curriculum
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight">
              Programmes &amp; Fee Structure (2026–27)
            </h2>
            <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">
              Course duration, admission eligibility, and transparent fee breakdown across Undergraduate, 4th Year FYUGP Honours, and PGDCA tracks.
            </p>
          </div>

          <a
            href={OFFICIAL_URLS.prospectus2026}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1e3a8a] hover:bg-[#0f172a] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <FileText className="w-4 h-4 text-amber-300" />
            Download Prospectus 2026–27
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Interactive Track Tabs */}
        <div
          role="tablist"
          aria-label="Programme categories"
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl"
        >
          {PROGRAMME_TRACKS.map((track) => {
            const isSelected = track.id === activeTrack;
            return (
              <button
                key={track.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTrack(track.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-[#1e3a8a] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {track.label}
              </button>
            );
          })}
        </div>

        <p className="text-sm font-medium text-slate-700">{currentTrack.subtitle}</p>

        {/* Course & Fee Breakdown Table */}
        <div
          id="fee-structure"
          className="border border-slate-200 rounded-xl overflow-hidden bg-white scroll-mt-20"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                  <th className="py-3.5 px-4 w-32">Code</th>
                  <th className="py-3.5 px-4 min-w-[220px]">Programme &amp; Highlights</th>
                  <th className="py-3.5 px-4 w-44">Duration</th>
                  <th className="py-3.5 px-4 min-w-[230px]">Eligibility</th>
                  <th className="py-3.5 px-4 w-36 text-right">Admission Fee</th>
                  <th className="py-3.5 px-4 w-44 text-right">Annual / Total Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {currentTrack.items.map((item) => (
                  <tr key={item.code} className="hover:bg-slate-50/70 align-top">
                    <td className="py-4 px-4 font-mono text-xs font-semibold text-[#1e3a8a] whitespace-nowrap">
                      {item.code}
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                        {item.highlights}
                      </p>
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-700 font-medium">
                      {item.duration}
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-600 leading-relaxed">
                      {item.eligibility}
                    </td>
                    <td className="py-4 px-4 text-right font-mono text-xs font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                      {item.admissionFee}
                    </td>
                    <td className="py-4 px-4 text-right font-mono text-xs text-slate-700 tabular-nums">
                      {item.annualFee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span>
            Note: Eligible students under Govt. of Assam Pragyan Bharati Scheme receive applicable tuition fee waiver upon verification.
          </span>
          <a
            href={OFFICIAL_URLS.admissionHelpDesk}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#1e3a8a] hover:underline"
          >
            Visit Admission Help Desk
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
