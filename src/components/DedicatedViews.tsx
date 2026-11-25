import {
  ArrowLeft,
  Award,
  BookOpen,
  Building2,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from 'lucide-react';
import {
  CELLS_AND_WINGS,
  COLLEGE_IMAGES,
  GOVERNING_BODY,
  OFFICIAL_URLS,
} from '../data/collegeData';
import type { SiteRoute } from '../types/portal';
import { PrincipalDeskSection } from './PrincipalDeskSection';

interface DedicatedViewProps {
  route: Exclude<SiteRoute, 'home' | 'programmes' | 'departments' | 'staff' | 'alumni' | 'portal'>;
  onBackHome: () => void;
}

export function DedicatedViews({ route, onBackHome }: DedicatedViewProps) {
  return (
    <div className="bg-slate-50 min-h-[70vh] py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1e3a8a] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to College Home
        </button>

        {route === 'about' && (
          <div className="space-y-10">
            <section id="about-college" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-5 scroll-mt-20">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                Est. 1971 · Maligaon, Guwahati
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0f172a]">
                About Lalit Chandra Bharali College
              </h1>
              <p className="text-base text-slate-700 leading-relaxed max-w-3xl">
                Founded in 1971 through the dedicated efforts of educationists and railway employees of Maligaon and Pandu, Lalit Chandra Bharali College (LCB College) is a premier provincialised undergraduate institution affiliated to Gauhati University and accredited with NAAC B++ Grade. Over five decades—celebrated during its Golden Jubilee—the college has expanded across Arts, Science, and Self-Financed IT streams to serve diverse learners across Kamrup Metro and Northeast India.
              </p>
            </section>

            <section id="vision-mission" className="grid grid-cols-1 md:grid-cols-3 gap-5 scroll-mt-20">
              <article className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5">
                <h2 className="font-serif text-xl font-bold text-[#0f172a]">Our Vision</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To cultivate an inclusive, intellectually rigorous academic sanctuary that empowers first-generation and merit learners with scientific inquiry, ethical values, and lifelong adaptability.
                </p>
              </article>
              <article className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5">
                <h2 className="font-serif text-xl font-bold text-[#0f172a]">Our Mission</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Deliver Gauhati University FYUGP (NEP 2020) Honours and professional IT education through dedicated faculty mentoring, ICT-enabled classrooms, and community service via NCC &amp; NSS.
                </p>
              </article>
              <article className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5">
                <h2 className="font-serif text-xl font-bold text-[#0f172a]">Core Objectives</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Expand 4th Year Honours research tracks, foster skill-based employability in computing and electronics, and maintain transparent governance via IQAC, ICC, and Grievance Cells.
                </p>
              </article>
            </section>

            <section id="college-glance" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 scroll-mt-20">
              <h2 className="font-serif text-2xl font-bold text-[#0f172a]">College at a Glance</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
                <div>
                  <p className="font-mono text-2xl font-bold text-[#1e3a8a] tabular-nums">1971</p>
                  <p className="text-xs text-slate-600 mt-1">Year of Establishment</p>
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-[#1e3a8a]">NAAC B++</p>
                  <p className="text-xs text-slate-600 mt-1">Accreditation Grade</p>
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-[#1e3a8a] tabular-nums">18</p>
                  <p className="text-xs text-slate-600 mt-1">Academic &amp; IT Units</p>
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-[#1e3a8a]">NEP 2020</p>
                  <p className="text-xs text-slate-600 mt-1">4-Year GU-FYUGP Curriculum</p>
                </div>
              </div>
            </section>

            <section id="contact-us" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 scroll-mt-20">
              <div className="space-y-3">
                <h2 className="font-serif text-2xl font-bold text-[#0f172a]">Contact Us</h2>
                <p className="flex items-start gap-2.5 text-sm text-slate-700">
                  <MapPin className="w-4 h-4 text-[#1e3a8a] shrink-0 mt-1" />
                  <span>Maligaon Gate No. 4, East Gota Nagar, Assam Trunk Road, Guwahati, Assam 781011</span>
                </p>
                <p className="flex items-center gap-2.5 text-sm text-slate-700 font-mono">
                  <Phone className="w-4 h-4 text-[#1e3a8a] shrink-0" />
                  <span>+91 95772 37877</span>
                </p>
                <p className="flex items-center gap-2.5 text-sm text-slate-700">
                  <Clock className="w-4 h-4 text-[#1e3a8a] shrink-0" />
                  <span>Monday – Saturday · 9:00 AM – 4:30 PM</span>
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-900">Official Digital Channels</h3>
                <p className="flex items-center gap-2 text-sm text-[#1e3a8a]">
                  <Mail className="w-4 h-4 shrink-0" />
                  <a href="mailto:lcbcollege.grievance.cell@gmail.com" className="hover:underline">
                    lcbcollege.grievance.cell@gmail.com
                  </a>
                </p>
                <a
                  href={OFFICIAL_URLS.home}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1e3a8a] hover:bg-[#0f172a] rounded-lg"
                >
                  Visit Official Website
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </section>
          </div>
        )}

        {route === 'administration' && (
          <div className="space-y-10">
            <section id="governing-body" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 scroll-mt-20">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                  Institutional Governance
                </p>
                <h1 className="mt-1 font-serif text-3xl font-bold text-[#0f172a]">
                  Governing Body
                </h1>
                <p className="mt-1.5 text-sm text-slate-600">
                  Constituted as per Govt. of Assam Higher Education &amp; Gauhati University statutes.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GOVERNING_BODY.map((member) => (
                  <div key={member.role} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                    <p className="text-xs font-semibold text-[#1e3a8a]">{member.role}</p>
                    <p className="text-sm font-bold text-slate-900">{member.name}</p>
                    <p className="text-xs text-slate-600">{member.affiliation}</p>
                  </div>
                ))}
              </div>
            </section>

            <PrincipalDeskSection />
          </div>
        )}

        {route === 'cells' && (
          <div className="space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                Student Engagement &amp; Governance
              </p>
              <h1 className="mt-1 font-serif text-3xl font-bold text-[#0f172a]">
                Cells, Committees, Clubs, NCC, NSS &amp; LCBCSU
              </h1>
              <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">
                Co-curricular units, quality cells, and student leadership bodies shaping campus life at LCB College.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CELLS_AND_WINGS.map((item) => (
                <article
                  key={item.id}
                  id={item.id}
                  className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 scroll-mt-20"
                >
                  <p className="text-xs font-semibold text-amber-700">
                    {item.group} · {item.coordinator}
                  </p>
                  <h2 className="text-base font-bold text-slate-900">{item.name}</h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.focus}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}

        {route === 'library' && (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-5 min-h-[260px]">
                <img
                  src={COLLEGE_IMAGES.centralLibrary}
                  alt="Central and Digital Library of Lalit Chandra Bharali College"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                  Knowledge Resource Centre
                </p>
                <h1 className="font-serif text-3xl font-bold text-[#0f172a]">
                  Central Library, Digital Library &amp; Readers&apos; Forum
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Serving all 18 academic units with automated SOUL cataloguing, Gauhati University reference collections, INFLIBNET N-LIST e-journals, and quiet reading rooms open Monday to Saturday.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-200">
                  <div id="central-library" className="scroll-mt-20">
                    <BookOpen className="w-4 h-4 text-[#1e3a8a] mb-1" />
                    <p className="text-sm font-bold text-slate-900">Central Library</p>
                    <p className="text-xs text-slate-600 mt-0.5">28,000+ textbooks, periodicals &amp; GU PYQ archives.</p>
                  </div>
                  <div id="digital-library" className="scroll-mt-20">
                    <Building2 className="w-4 h-4 text-[#1e3a8a] mb-1" />
                    <p className="text-sm font-bold text-slate-900">Digital Library</p>
                    <p className="text-xs text-slate-600 mt-0.5">N-LIST e-books, e-ShodhSindhu journals &amp; computer terminals.</p>
                  </div>
                  <div id="library-readers" className="scroll-mt-20">
                    <Users className="w-4 h-4 text-[#1e3a8a] mb-1" />
                    <p className="text-sm font-bold text-slate-900">Library Readers</p>
                    <p className="text-xs text-slate-600 mt-0.5">Student &amp; faculty borrower cards, Book Bank &amp; Best Reader award.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {route === 'iqac' && (
          <div className="space-y-8">
            <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                Quality Assurance &amp; Rankings
              </p>
              <h1 className="font-serif text-3xl font-bold text-[#0f172a]">
                IQAC &amp; NIRF Institutional Cell
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                The Internal Quality Assurance Cell (IQAC) drives continuous improvement in curriculum delivery, AQAR submissions, NAAC B++ sustenance, MOOCs/ICT adoption, and NIRF institutional data reporting.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <Award className="w-5 h-5 text-[#1e3a8a]" />
                  <h2 className="text-sm font-bold text-slate-900">NAAC B++ Accreditation</h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sustaining quality benchmarks across teaching-learning, student support, and governance.
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <ShieldCheck className="w-5 h-5 text-[#1e3a8a]" />
                  <h2 className="text-sm font-bold text-slate-900">NIRF &amp; AQAR Reporting</h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Annual Quality Assurance Reports, Gender/Green/Academic Audits, and NIRF submissions.
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <BookOpen className="w-5 h-5 text-[#1e3a8a]" />
                  <h2 className="text-sm font-bold text-slate-900">NEP 2020 &amp; MOOCs Initiatives</h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Faculty Development Programmes, MOOCs workshops, and 4th Year Honours rollout.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={OFFICIAL_URLS.home}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#1e3a8a] hover:bg-[#0f172a] rounded-lg"
                >
                  Access IQAC &amp; NIRF Documents on lcbcollege.co.in
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
