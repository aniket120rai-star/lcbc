import { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { COLLEGE_IMAGES, OFFICIAL_URLS } from '../data/collegeData';
import type { SiteRoute } from '../types/portal';

interface HeroShowcaseProps {
  onNavigate: (route: SiteRoute, sectionId?: string) => void;
}

export function HeroShowcase({ onNavigate }: HeroShowcaseProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      aria-label="Lalit Chandra Bharali College Hero Showcase"
      className="relative overflow-hidden bg-[#0f172a] text-white"
    >
      {!imgError && (
        <img
          src={COLLEGE_IMAGES.frontCampus}
          alt="Lalit Chandra Bharali College front building with Nilachal Hills in Maligaon, Guwahati"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-45"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 via-[#0f172a]/85 to-[#1e3a8a]/55"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="max-w-3xl space-y-6">
          {/* Unboxed Institutional Metadata Kicker */}
          <p className="text-xs sm:text-sm font-medium text-amber-300 tracking-wide">
            Est. 1971 · NAAC B++ Grade · Golden Jubilee · Affiliated to Gauhati University
          </p>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.12] [text-wrap:balance]">
            Lalit Chandra Bharali College, Guwahati
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
            Five decades of inclusive higher education at Maligaon Gate No. 4—bridging provincialised Arts &amp; Science honours with modern Computer Science, IT, and NEP 2020 4-Year FYUGP research pathways.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href={OFFICIAL_URLS.admissionHelpDesk}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap"
            >
              Admissions 2026–27
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => onNavigate('programmes', 'programmes-section')}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-lg transition-colors whitespace-nowrap"
            >
              Explore Programmes
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('portal')}
              className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-amber-200 hover:text-white underline-offset-4 hover:underline transition-colors whitespace-nowrap"
            >
              Open Student Portal →
            </button>
          </div>
        </div>

        {/* Full-Width Quick Institutional Stats Strip */}
        <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
              15+
            </p>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Academic Departments across Arts &amp; Science
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-bold text-amber-300 tabular-nums">
              3 Streams
            </p>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Arts, Science &amp; Self-Financed IT (BCA, B.Sc. IT, PGDCA)
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
              5 Papers
            </p>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              4th Year GU-FYUGP Honours &amp; New B.Sc. Physics Major
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-bold text-amber-300 tabular-nums">
              NCC &amp; NSS
            </p>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Active Cadet Wing, NSS Outreach &amp; LCBCSU Student Union
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
