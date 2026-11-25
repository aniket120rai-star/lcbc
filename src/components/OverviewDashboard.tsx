import { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  MapPin,
  XCircle,
} from 'lucide-react';
import { CAMPUS_HERO_IMAGE } from '../data/seedData';
import type { PortalState, PortalTab } from '../types/portal';
import {
  calculateOverallAttendance,
  calculateSgpa,
  formatTime12h,
  getAttendanceStatus,
  getClassesForDay,
  getDayName,
} from '../utils/calculations';
import { StudentAvatar } from './StudentAvatar';

interface OverviewDashboardProps {
  state: PortalState;
  onNavigate: (tab: PortalTab) => void;
  onOpenProfile: () => void;
}

export function OverviewDashboard({
  state,
  onNavigate,
  onOpenProfile,
}: OverviewDashboardProps) {
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  const overallAttendance = calculateOverallAttendance(state.subjects);
  const attendanceStatus = getAttendanceStatus(overallAttendance.percentage);

  const todayName = getDayName();
  const todaysClasses = getClassesForDay(state.timetable, todayName);

  const pendingTasks = state.tasks.filter((t) => !t.completed);
  const sgpaStats = calculateSgpa(state.sgpaPapers);
  const recentNotices = state.notices.slice(0, 4);

  const firstName = state.profile.name.trim().split(/\s+/)[0] || 'Student';

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <section
        aria-label="Campus Welcome"
        className="relative overflow-hidden rounded-2xl bg-[#1e3a8a] text-white border border-blue-950/20"
      >
        {!heroImgFailed && (
          <img
            src={CAMPUS_HERO_IMAGE}
            alt="Lalit Chandra Bharali College campus courtyard"
            referrerPolicy="no-referrer"
            onError={() => setHeroImgFailed(true)}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/92 via-[#1e3a8a]/88 to-[#1e3a8a]/75"
        />

        <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5 max-w-2xl">
            <StudentAvatar
              name={state.profile.name}
              avatarUrl={state.profile.avatarUrl}
              size="xl"
              className="ring-2 ring-amber-300/60 shadow-lg hidden sm:inline-flex"
            />
            <div className="space-y-2.5 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-amber-300 tracking-wide">
                Lalit Chandra Bharali College · Est. 1971 · NAAC B++ · Gauhati University
              </p>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
                Welcome back, {firstName}
              </h1>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {state.profile.name} · {state.profile.program} · {state.profile.semester} · Roll{' '}
                <span className="font-mono text-amber-200">{state.profile.rollNumber}</span>
                {state.profile.email && (
                  <>
                    {' '}
                    · <span className="text-amber-100">{state.profile.email}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenProfile}
              className="px-4 py-2.5 text-sm font-medium text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Edit Student Profile
            </button>
          </div>
        </div>
      </section>

      {/* 4 KPI Cards */}
      <section aria-label="Academic Summary Metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={() => onNavigate('attendance')}
          className="group text-left bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-500">
            <span>Overall Attendance</span>
            {attendanceStatus === 'Safe' && (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Safe
              </span>
            )}
            {attendanceStatus === 'Warning' && (
              <span className="inline-flex items-center gap-1 text-amber-700 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                Warning
              </span>
            )}
            {attendanceStatus === 'Low' && (
              <span className="inline-flex items-center gap-1 text-red-700 font-semibold">
                <XCircle className="w-3.5 h-3.5" />
                Low
              </span>
            )}
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900 tabular-nums">
            {overallAttendance.percentage.toFixed(1)}%
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span className="tabular-nums">
              {overallAttendance.attended} / {overallAttendance.total} classes
            </span>
            <span className="text-[#1e3a8a] font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Tracker <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('timetable')}
          className="group text-left bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-500">
            <span>Today&apos;s Classes</span>
            <Calendar className="w-4 h-4 text-[#1e3a8a]" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900 tabular-nums">
            {todaysClasses.length}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>
              {todayName === 'Sunday' ? 'Sunday · Campus Closed' : `${todayName} schedule`}
            </span>
            <span className="text-[#1e3a8a] font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Schedule <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('tasks')}
          className="group text-left bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-500">
            <span>Pending Tasks</span>
            <ClipboardList className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900 tabular-nums">
            {pendingTasks.length}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span className="tabular-nums">
              {state.tasks.length - pendingTasks.length} of {state.tasks.length} completed
            </span>
            <span className="text-[#1e3a8a] font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Tasks <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('sgpa')}
          className="group text-left bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-500">
            <span>Estimated SGPA</span>
            <Award className="w-4 h-4 text-[#1e3a8a]" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900 tabular-nums">
            {sgpaStats.sgpa.toFixed(2)}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span className="tabular-nums">
              {sgpaStats.totalCredits} credits · {sgpaStats.approxPercentage}%
            </span>
            <span className="text-[#1e3a8a] font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Calculator <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </button>
      </section>

      {/* Side-by-Side Widgets: Today's Timetable & Recent Campus Notices */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Today's Timetable Widget */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Today&apos;s Timetable
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {todayName} · LCB College Hours (9:00 AM – 4:30 PM)
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('timetable')}
              className="text-xs font-medium text-[#1e3a8a] hover:underline whitespace-nowrap shrink-0"
            >
              Full Week →
            </button>
          </div>

          <div className="mt-4">
            {todayName === 'Sunday' ? (
              <div className="py-8 text-center space-y-2">
                <p className="text-sm font-medium text-slate-800">
                  Campus Closed on Sunday
                </p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No regular classes scheduled today. Classes resume Monday at 9:00 AM.
                </p>
              </div>
            ) : todaysClasses.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <p className="text-sm font-medium text-slate-800">
                  No classes scheduled for {todayName}
                </p>
                <p className="text-xs text-slate-500">
                  Add class slots in the Weekly Timetable tab to track your day.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {todaysClasses.map((slot) => (
                  <li
                    key={slot.id}
                    className="py-3.5 first:pt-1 last:pb-1 flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {slot.subject}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{slot.room}</span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center gap-1 text-xs font-medium font-mono text-[#1e3a8a] tabular-nums">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {formatTime12h(slot.startTime)} – {formatTime12h(slot.endTime)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Recent Campus Notices Widget */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Campus Notices
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Official announcements &amp; pinned reminders
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('campus')}
              className="text-xs font-medium text-[#1e3a8a] hover:underline whitespace-nowrap shrink-0"
            >
              Campus Hub →
            </button>
          </div>

          <div className="mt-4">
            {recentNotices.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">
                No notices available.
              </p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {recentNotices.map((notice) => (
                  <li key={notice.id} className="py-3.5 first:pt-1 last:pb-1">
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span className="font-mono tabular-nums">{notice.date}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-[#1e3a8a]">
                        {notice.category}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-slate-900 leading-snug">
                      {notice.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {notice.summary}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
