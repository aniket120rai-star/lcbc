import { useState } from 'react';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { COLLEGE_IMAGES, PRINCIPAL_INFO } from '../data/collegeData';
import { Modal } from './Modal';

export function PrincipalDeskSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="principal-desk"
      aria-label="From The Principal's Desk"
      className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Editorial Portrait Column */}
          <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-[440px] bg-slate-100">
            {!imgError ? (
              <img
                src={COLLEGE_IMAGES.principalPortrait}
                alt="Dr. Amarendra Kalita, Principal of Lalit Chandra Bharali College, at his desk"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full lg:h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full min-h-[340px] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white text-center">
                <BookOpen className="w-10 h-10 text-amber-300 mb-3" />
                <p className="font-serif text-lg font-bold">{PRINCIPAL_INFO.name}</p>
                <p className="text-xs text-slate-300 mt-1">{PRINCIPAL_INFO.designation}</p>
              </div>
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/85 via-[#0f172a]/10 to-transparent"
            />
            <div className="absolute bottom-4 left-5 right-5 text-white">
              <p className="font-serif text-lg font-bold leading-snug">
                {PRINCIPAL_INFO.name}
              </p>
              <p className="text-xs text-amber-200 mt-0.5">
                {PRINCIPAL_INFO.credentials} · {PRINCIPAL_INFO.designation}
              </p>
            </div>
          </div>

          {/* Editorial Prose Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                Leadership &amp; Heritage
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight">
                From the Principal&apos;s Desk
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl">
                {PRINCIPAL_INFO.summary}
              </p>

              <ul className="pt-2 space-y-2.5">
                {PRINCIPAL_INFO.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#1e3a8a] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Maligaon Gate No. 4, Guwahati · Golden Jubilee Milestone (1971–2021)
              </span>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#1e3a8a] hover:bg-[#0f172a] rounded-lg transition-colors whitespace-nowrap"
              >
                Read Full Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Principal's Message Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Principal's Message"
        description={`${PRINCIPAL_INFO.name} (${PRINCIPAL_INFO.credentials}) · ${PRINCIPAL_INFO.designation}`}
        maxWidthClass="max-w-2xl"
      >
        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          {PRINCIPAL_INFO.fullMessage.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div>
              <p className="font-semibold text-slate-900">{PRINCIPAL_INFO.name}</p>
              <p>{PRINCIPAL_INFO.designation}</p>
            </div>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1e3a8a] hover:bg-[#0f172a] rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
