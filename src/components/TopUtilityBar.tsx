import { useState } from 'react';
import { ExternalLink, Pause, Play, ShieldAlert } from 'lucide-react';
import { OFFICIAL_URLS, TICKER_ANNOUNCEMENTS } from '../data/collegeData';
import type { StatutoryCommittee } from '../types/portal';

interface TopUtilityBarProps {
  onOpenCommittee: (id: StatutoryCommittee['id']) => void;
}

export function TopUtilityBar({ onOpenCommittee }: TopUtilityBarProps) {
  const [tickerPaused, setTickerPaused] = useState(false);

  return (
    <div className="bg-[#0f172a] text-slate-200 border-b border-slate-800">
      {/* Utility Links Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[11px] sm:text-xs">
        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1">
          <a
            href={OFFICIAL_URLS.prospectus2026}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap"
          >
            Prospectus 2026–27
            <ExternalLink className="w-3 h-3" />
          </a>
          <span aria-hidden="true" className="text-slate-600 hidden sm:inline">
            ·
          </span>
          <a
            href={OFFICIAL_URLS.onlineServices}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors whitespace-nowrap"
          >
            Online Services
            <ExternalLink className="w-3 h-3" />
          </a>
          <span aria-hidden="true" className="text-slate-600 hidden sm:inline">
            ·
          </span>
          <a
            href={OFFICIAL_URLS.admissionHelpDesk}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors whitespace-nowrap"
          >
            Admission Help Desk
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-1 text-slate-400 whitespace-nowrap">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            Statutory Cells:
          </span>
          <button
            type="button"
            onClick={() => onOpenCommittee('antiragging')}
            className="text-slate-200 hover:text-amber-300 underline-offset-4 hover:underline transition-colors whitespace-nowrap"
          >
            Anti-Ragging Committee
          </button>
          <span aria-hidden="true" className="text-slate-600 hidden sm:inline">
            ·
          </span>
          <button
            type="button"
            onClick={() => onOpenCommittee('grievance')}
            className="text-slate-200 hover:text-amber-300 underline-offset-4 hover:underline transition-colors whitespace-nowrap"
          >
            Student Grievance Cell
          </button>
          <span aria-hidden="true" className="text-slate-600 hidden sm:inline">
            ·
          </span>
          <button
            type="button"
            onClick={() => onOpenCommittee('icc')}
            className="text-slate-200 hover:text-amber-300 underline-offset-4 hover:underline transition-colors whitespace-nowrap"
          >
            ICC
          </button>
        </div>
      </div>

      {/* Live Pausable Announcement Ticker */}
      <div className="bg-[#1e3a8a]/90 border-t border-blue-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center gap-3 overflow-hidden">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-300 whitespace-nowrap shrink-0">
            Notifications
          </span>
          <span aria-hidden="true" className="text-blue-400 shrink-0">
            |
          </span>

          <div
            className="flex-1 overflow-hidden relative"
            onMouseEnter={() => setTickerPaused(true)}
            onMouseLeave={() => setTickerPaused(false)}
          >
            <div
              className={`animate-ticker gap-12 text-xs text-slate-100 whitespace-nowrap ${
                tickerPaused ? 'animate-ticker-paused' : ''
              }`}
            >
              {[...TICKER_ANNOUNCEMENTS, ...TICKER_ANNOUNCEMENTS].map((item, idx) => (
                <a
                  key={`${item.id}-${idx}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-amber-300 transition-colors"
                >
                  <span>{item.text}</span>
                  <span aria-hidden="true" className="text-amber-400">
                    ·
                  </span>
                </a>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setTickerPaused((prev) => !prev)}
            aria-pressed={tickerPaused}
            aria-label={tickerPaused ? 'Resume announcement ticker' : 'Pause announcement ticker'}
            className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-100 hover:text-amber-300 bg-blue-950/60 border border-blue-800 rounded transition-colors whitespace-nowrap shrink-0"
          >
            {tickerPaused ? (
              <>
                <Play className="w-3 h-3" />
                Resume
              </>
            ) : (
              <>
                <Pause className="w-3 h-3" />
                Pause
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
