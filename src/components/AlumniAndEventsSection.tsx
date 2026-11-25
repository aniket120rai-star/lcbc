import { useRef } from 'react';
import {
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
} from 'lucide-react';
import {
  ALUMNI_PRIDE,
  COLLEGE_EVENTS,
  EMINENT_VISITORS,
} from '../data/collegeData';

function getInitials(name: string): string {
  const parts = name
    .replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s+/i, '')
    .trim()
    .split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function AlumniAndEventsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    const offset = direction === 'next' ? 360 : -360;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      {/* Section A: Our Pride (Alumni Showcase) */}
      <section
        id="our-pride"
        aria-label="Our Pride Alumni Showcase"
        className="py-12 sm:py-16 border-b border-slate-200 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                Alumni Legacy
              </p>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight [text-wrap:balance]">
                Our Pride — Distinguished Alumni
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">
                Graduates of Lalit Chandra Bharali College excelling across music, journalism, civil services, engineering, and academia.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleScroll('prev')}
                aria-label="Scroll alumni showcase left"
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-[#1e3a8a]/40 hover:bg-slate-50 text-slate-700 shadow-xs transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('next')}
                aria-label="Scroll alumni showcase right"
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-[#1e3a8a]/40 hover:bg-slate-50 text-slate-700 shadow-xs transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
          >
            {ALUMNI_PRIDE.map((alum) => (
              <article
                key={alum.id}
                className="group relative overflow-hidden snap-start shrink-0 w-80 sm:w-[350px] rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/75 shadow-[0_6px_24px_-14px_rgba(15,23,42,0.1)] hover:-translate-y-0.5 hover:border-amber-400/70 hover:shadow-[0_20px_44px_-18px_rgba(15,23,42,0.16)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between"
              >
                <div
                  aria-hidden="true"
                  className="h-[3px] w-full bg-gradient-to-r from-amber-400 via-amber-500 to-[#1e3a8a]"
                />
                <div className="p-5 sm:p-6 space-y-4 flex-1">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-amber-300 font-serif font-bold text-sm flex items-center justify-center shrink-0 ring-2 ring-amber-400/35 shadow-xs">
                      {getInitials(alum.name)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif text-base font-bold text-[#0f172a] group-hover:text-[#1e3a8a] transition-colors leading-snug">
                        {alum.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-snug mt-0.5">
                        {alum.batch} · {alum.stream}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-[#1e3a8a] leading-snug">
                    {alum.distinction}
                  </p>

                  <div className="pt-3 border-t border-slate-200/75 flex items-start gap-2">
                    <Quote
                      aria-hidden="true"
                      className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5"
                    />
                    <p className="text-xs text-slate-600 italic leading-relaxed">
                      &ldquo;{alum.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section B: Events & Eminent Visitors */}
      <section
        id="events-visitors"
        aria-label="College Events and Eminent Visitors"
        className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Events Timeline */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                Campus Life &amp; Workshops
              </p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#0f172a] [text-wrap:balance]">
                Recent Events &amp; Seminars
              </h2>
            </div>

            <div className="space-y-4">
              {COLLEGE_EVENTS.map((ev) => (
                <article
                  key={ev.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_20px_-12px_rgba(15,23,42,0.07)] hover:-translate-y-0.5 hover:border-[#1e3a8a]/35 hover:shadow-[0_18px_40px_-18px_rgba(15,23,42,0.14)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <div
                    aria-hidden="true"
                    className="h-[3px] w-full bg-gradient-to-r from-[#1e3a8a] to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="p-5 sm:p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50/90 text-[#1e3a8a] border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-[#1e3a8a]">
                          {ev.dateLabel}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{ev.organizer}</span>
                      </div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#0f172a] group-hover:text-[#1e3a8a] transition-colors leading-snug">
                        {ev.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {ev.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Eminent Visitors */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                Guest Dignitaries
              </p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#0f172a] [text-wrap:balance]">
                Eminent Visitors
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-[0_12px_32px_-18px_rgba(15,23,42,0.12)]">
              <div className="bg-[#0f172a] px-5 py-3.5 flex items-center justify-between text-white">
                <span className="font-serif text-sm font-bold">
                  Distinguished Campus Guests
                </span>
                <span className="text-[11px] font-medium text-amber-300">
                  Archive Record
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {EMINENT_VISITORS.map((visitor) => (
                  <div
                    key={visitor.id}
                    className="p-4 sm:px-5 flex items-start gap-3.5 hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                      {visitor.id === 'vis-1' ? (
                        <Award className="w-4 h-4" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#0f172a]">
                        {visitor.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#1e3a8a] mt-0.5">
                        {visitor.designation}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {visitor.occasion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
