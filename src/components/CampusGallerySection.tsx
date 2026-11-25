import { useState } from 'react';
import { ExternalLink, Music, Pause, Play, Volume2 } from 'lucide-react';
import { COLLEGE_IMAGES, OFFICIAL_URLS } from '../data/collegeData';

interface GallerySlot {
  id: string;
  title: string;
  caption: string;
  image: string;
  spanClass: string;
}

const GALLERY_SLOTS: GallerySlot[] = [
  {
    id: 'gal-front',
    title: 'Front Campus & Office of the Principal',
    caption: 'Block C, Office of the Principal & Golden Jubilee Wing at Maligaon',
    image: COLLEGE_IMAGES.frontCampus,
    spanClass: 'md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[260px] lg:min-h-[380px]',
  },
  {
    id: 'gal-lib',
    title: 'Central Library Reading Corner',
    caption: 'Quiet Study Cubicles, Reference Archives & N-LIST Digital Access',
    image: COLLEGE_IMAGES.centralLibrary,
    spanClass: 'min-h-[200px]',
  },
  {
    id: 'gal-lab',
    title: 'Computer Science & IT Laboratory',
    caption: 'Workstations for BCA, B.Sc. IT, PGDCA & CS Honours Practicums',
    image: COLLEGE_IMAGES.computerLab,
    spanClass: 'min-h-[200px]',
  },
  {
    id: 'gal-class',
    title: 'Academic Lecture Hall (Room 206)',
    caption: 'Well-Lit Undergraduate & FYUGP Honours Classrooms',
    image: COLLEGE_IMAGES.classroom,
    spanClass: 'min-h-[200px]',
  },
  {
    id: 'gal-seminar',
    title: 'Auditorium & Youth Red Cross Hall',
    caption: 'Seminars, Orientation Workshops & Student Welfare Programmes',
    image: COLLEGE_IMAGES.seminarHall,
    spanClass: 'min-h-[200px]',
  },
];

function GalleryCard({ slot }: { slot: GallerySlot }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className={`group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-900 ${slot.spanClass}`}
    >
      {!failed ? (
        <img
          src={slot.image}
          alt={slot.title}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white text-center">
          <span className="font-serif text-base font-bold">{slot.title}</span>
        </div>
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"
      />
      <figcaption className="absolute bottom-0 inset-x-0 p-4 text-white">
        <p className="text-sm font-semibold leading-snug">{slot.title}</p>
        <p className="mt-0.5 text-xs text-slate-200">{slot.caption}</p>
      </figcaption>
    </figure>
  );
}

export function CampusGallerySection() {
  const [chorusPlaying, setChorusPlaying] = useState(false);

  return (
    <section
      id="campus-gallery"
      aria-label="Infrastructure, Library and Photo Gallery"
      className="py-12 sm:py-16 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
              Campus Infrastructure
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight">
              Infrastructure, Library &amp; Visual Gallery
            </h2>
            <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">
              Explore the academic blocks, Central &amp; Digital Library, science laboratories, and student courtyard at Maligaon.
            </p>
          </div>
          <a
            href={OFFICIAL_URLS.home}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1e3a8a] hover:underline whitespace-nowrap shrink-0"
          >
            Official Photo Archive
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Bento Visual Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_SLOTS.map((slot) => (
            <GalleryCard key={slot.id} slot={slot} />
          ))}
        </div>

        {/* Golden Jubilee & College Chorus Showcase Card */}
        <div className="rounded-2xl border border-slate-200 bg-[#0f172a] text-white overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-5 relative min-h-[240px] bg-slate-900">
            <img
              src={COLLEGE_IMAGES.goldenJubilee}
              alt="Lalit Chandra Bharali College Golden Jubilee Celebration with Hon'ble Chief Minister Dr. Himanta Biswa Sarma and Principal Dr. Amarendra Kalita"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top opacity-80"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/35 to-transparent"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setChorusPlaying((prev) => !prev)}
                aria-label={chorusPlaying ? 'Pause College Chorus preview' : 'Play College Chorus preview'}
                className="w-14 h-14 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
              >
                {chorusPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-0.5" />
                )}
              </button>
            </div>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                {chorusPlaying ? 'Playing College Chorus Tribute' : 'LCB College Chorus'}
              </span>
              <span className="font-mono text-amber-200">03:42</span>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-4">
            <div className="space-y-2.5">
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
                <Music className="w-3.5 h-3.5" />
                Institutional Anthem &amp; Video Showcase
              </p>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Lalit Chandra Bharali College Chorus
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Sung at every Foundation Day, Freshers’ Social, and College Week ceremony since the Golden Jubilee—honouring knowledge, brotherhood, and Assam’s cultural heritage beneath the Nilachal hills.
              </p>
              {chorusPlaying && (
                <div className="mt-3 p-3.5 rounded-xl bg-white/10 border border-white/15 text-xs text-amber-100 leading-relaxed">
                  &ldquo;Gyanar jyoti jwalai, Maligaon’r bakhori...&rdquo; — Performed by the LCB College Cultural Choir &amp; Student Union Ensemble.
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
              <span className="text-slate-400">
                Foundation Day &amp; Golden Jubilee Archive · LCBCSU Cultural Wing
              </span>
              <a
                href={OFFICIAL_URLS.home}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-amber-300 hover:underline"
              >
                Watch on Official Portal
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
