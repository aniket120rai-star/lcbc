import { useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  Briefcase,
  Cpu,
  FlaskConical,
  Search,
} from 'lucide-react';
import { ALL_DEPARTMENTS, STAFF_DIRECTORY } from '../data/collegeData';
import type { AcademicDepartment, StaffCategory } from '../types/portal';
import { filterDepartments, filterStaff } from '../utils/calculations';

type StreamFilter = 'All' | 'Arts' | 'Science' | 'Self-Financing IT';

interface DepartmentsAndStaffSectionProps {
  initialStream?: StreamFilter;
  initialStaffTab?: StaffCategory;
  focusMode?: 'both' | 'departments' | 'staff';
}

function getInitials(name: string): string {
  const parts = name
    .replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s+/i, '')
    .trim()
    .split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function getStreamTheme(stream: AcademicDepartment['stream']) {
  if (stream === 'Science') {
    return {
      topBar: 'bg-gradient-to-r from-[#1e3a8a] to-blue-500',
      iconWrap: 'bg-blue-50 text-[#1e3a8a] border-blue-100',
      labelColor: 'text-[#1e3a8a]',
      Icon: FlaskConical,
    };
  }
  if (stream === 'Self-Financing IT') {
    return {
      topBar: 'bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-amber-500',
      iconWrap: 'bg-[#0f172a] text-amber-300 border-[#0f172a]',
      labelColor: 'text-[#0f172a]',
      Icon: Cpu,
    };
  }
  return {
    topBar: 'bg-gradient-to-r from-amber-500 via-amber-400 to-[#1e3a8a]',
    iconWrap: 'bg-amber-50 text-amber-700 border-amber-200/70',
    labelColor: 'text-amber-700',
    Icon: BookOpen,
  };
}

export function DepartmentsAndStaffSection({
  initialStream = 'All',
  initialStaffTab = 'Teaching',
  focusMode = 'both',
}: DepartmentsAndStaffSectionProps) {
  const [streamFilter, setStreamFilter] = useState<StreamFilter>(initialStream);
  const [deptQuery, setDeptQuery] = useState('');

  const [staffTab, setStaffTab] = useState<StaffCategory>(initialStaffTab);
  const [staffQuery, setStaffQuery] = useState('');

  const filteredDepartments = useMemo(
    () => filterDepartments(ALL_DEPARTMENTS, streamFilter, deptQuery),
    [streamFilter, deptQuery]
  );

  const filteredStaff = useMemo(
    () => filterStaff(STAFF_DIRECTORY, staffTab, staffQuery),
    [staffTab, staffQuery]
  );

  return (
    <section
      id="departments-staff-section"
      aria-label="Departments and Staff Directory"
      className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Departments Grid */}
        {focusMode !== 'staff' && (
          <div id="departments-grid" className="space-y-6 scroll-mt-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                Academic Units
              </p>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight [text-wrap:balance]">
                Departments (Arts, Science &amp; Self-Financed IT)
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">
                Explore 15 Arts and Science departments along with professional IT programmes (BCA, B.Sc. IT, PGDCA).
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-[0_2px_12px_-6px_rgba(15,23,42,0.06)]">
              <div
                role="group"
                aria-label="Filter departments by stream"
                className="inline-flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 bg-slate-100 rounded-xl w-fit border border-slate-200/70"
              >
                {(['All', 'Arts', 'Science', 'Self-Financing IT'] as StreamFilter[]).map(
                  (stream) => (
                    <button
                      key={stream}
                      type="button"
                      onClick={() => setStreamFilter(stream)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                        streamFilter === stream
                          ? 'bg-[#1e3a8a] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                      }`}
                    >
                      {stream === 'Self-Financing IT' ? 'Self-Financed / IT' : stream}
                    </button>
                  )
                )}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={deptQuery}
                  onChange={(e) => setDeptQuery(e.target.value)}
                  aria-label="Search departments"
                  placeholder="Filter department..."
                  className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/15 transition-all"
                />
              </div>
            </div>

            {filteredDepartments.length === 0 ? (
              <div className="py-12 text-center bg-white border border-slate-200 rounded-2xl text-sm text-slate-500">
                No departments match your filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredDepartments.map((dept) => {
                  const theme = getStreamTheme(dept.stream);
                  const StreamIcon = theme.Icon;
                  return (
                    <article
                      key={dept.name}
                      className="group relative overflow-hidden flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_20px_-12px_rgba(15,23,42,0.07)] hover:-translate-y-0.5 hover:border-[#1e3a8a]/35 hover:shadow-[0_20px_42px_-18px_rgba(15,23,42,0.16)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    >
                      <div
                        aria-hidden="true"
                        className={`h-[3px] w-full ${theme.topBar} opacity-85 group-hover:opacity-100 transition-opacity`}
                      />
                      <div className="p-5 sm:p-6 space-y-3.5 flex-1">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${theme.iconWrap}`}
                          >
                            <StreamIcon className="w-4 h-4" />
                          </span>
                          <div className="min-w-0">
                            <p className={`text-xs font-semibold ${theme.labelColor}`}>
                              {dept.stream}
                            </p>
                            <p className="text-[11px] text-slate-500 truncate">
                              {dept.level}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-serif text-lg font-bold text-[#0f172a] group-hover:text-[#1e3a8a] transition-colors leading-snug">
                            {dept.name}
                          </h3>
                          <p className="mt-1.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                            {dept.focus}
                          </p>
                        </div>
                      </div>

                      {dept.honours4thYear && (
                        <div className="px-5 sm:px-6 py-2.5 bg-slate-50/85 border-t border-slate-100 flex items-center gap-2 text-[11px] font-semibold text-[#1e3a8a]">
                          <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>4th Year GU-FYUGP Honours Approved</span>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Staff Directory */}
        {focusMode !== 'departments' && (
          <div id="staff-directory" className="space-y-6 scroll-mt-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                Faculty &amp; Administration
              </p>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight [text-wrap:balance]">
                Staff Directory
              </h2>
              <p className="mt-1.5 text-sm text-slate-600">
                Browse Teaching Faculty, Library Staff, and Non-Teaching Administrative Staff.
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-[0_2px_12px_-6px_rgba(15,23,42,0.06)]">
              <div
                role="tablist"
                aria-label="Staff directory category"
                className="inline-flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 bg-slate-100 rounded-xl w-fit border border-slate-200/70"
              >
                {(['Teaching', 'Library', 'Non-Teaching'] as StaffCategory[]).map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={staffTab === cat}
                      onClick={() => setStaffTab(cat)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                        staffTab === cat
                          ? 'bg-[#1e3a8a] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                      }`}
                    >
                      {cat} Staff
                    </button>
                  )
                )}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={staffQuery}
                  onChange={(e) => setStaffQuery(e.target.value)}
                  aria-label="Search staff members"
                  placeholder="Search name or dept..."
                  className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/15 transition-all"
                />
              </div>
            </div>

            {filteredStaff.length === 0 ? (
              <div className="py-12 text-center bg-white border border-slate-200 rounded-2xl text-sm text-slate-500">
                No staff members matched your search.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredStaff.map((member) => (
                  <article
                    key={member.id}
                    className="group relative overflow-hidden flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_20px_-12px_rgba(15,23,42,0.07)] hover:-translate-y-0.5 hover:border-[#1e3a8a]/35 hover:shadow-[0_18px_40px_-18px_rgba(15,23,42,0.15)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    <div
                      aria-hidden="true"
                      className="h-[3px] w-full bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-amber-400 opacity-75 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="p-5 flex items-start gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-amber-300 font-serif font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                        {getInitials(member.name)}
                      </div>
                      <div className="min-w-0 space-y-1">
                        <h3 className="text-sm sm:text-base font-bold text-[#0f172a] group-hover:text-[#1e3a8a] transition-colors leading-snug">
                          {member.name}
                        </h3>
                        <p className="text-xs font-medium text-slate-600 leading-snug">
                          {member.designation}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 py-2.5 bg-slate-50/85 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-[#1e3a8a] truncate">
                        <Briefcase className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{member.department}</span>
                      </span>
                      {member.qualification && (
                        <span className="font-mono text-[11px] text-slate-600 shrink-0">
                          {member.qualification}
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
