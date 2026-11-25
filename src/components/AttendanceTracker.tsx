import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Minus,
  Plus,
  Trash2,
  XCircle,
} from 'lucide-react';
import type { SubjectAttendance } from '../types/portal';
import {
  calculateAttendancePercentage,
  calculateOverallAttendance,
  get75EligibilityGuidance,
  getAttendanceStatus,
} from '../utils/calculations';
import { Modal } from './Modal';

interface AttendanceTrackerProps {
  subjects: SubjectAttendance[];
  onMarkPresent: (id: string) => void;
  onMarkAbsent: (id: string) => void;
  onAddSubject: (subject: Omit<SubjectAttendance, 'id'>) => void;
  onDeleteSubject: (id: string) => void;
}

const CATEGORIES = ['Major Core', 'Minor', 'IDC', 'AEC', 'SEC', 'VAC'];

export function AttendanceTracker({
  subjects,
  onMarkPresent,
  onMarkAbsent,
  onAddSubject,
  onDeleteSubject,
}: AttendanceTrackerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Major Core');
  const [attended, setAttended] = useState('0');
  const [total, setTotal] = useState('0');
  const [formError, setFormError] = useState('');

  const overall = calculateOverallAttendance(subjects);
  const overallStatus = getAttendanceStatus(overall.percentage);
  const safeCount = subjects.filter(
    (s) => calculateAttendancePercentage(s.attended, s.total) >= 75
  ).length;

  const handleOpenModal = () => {
    setCode('');
    setName('');
    setCategory('Major Core');
    setAttended('0');
    setTotal('0');
    setFormError('');
    setModalOpen(true);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedCode = code.trim() || 'SUB-101';
    const attNum = Number(attended);
    const totNum = Number(total);

    if (!trimmedName) {
      setFormError('Subject name is required.');
      return;
    }
    if (
      Number.isNaN(attNum) ||
      Number.isNaN(totNum) ||
      attNum < 0 ||
      totNum < 0 ||
      !Number.isInteger(attNum) ||
      !Number.isInteger(totNum)
    ) {
      setFormError('Attended and total classes must be non-negative whole numbers.');
      return;
    }
    if (attNum > totNum) {
      setFormError('Attended classes cannot exceed total classes.');
      return;
    }

    onAddSubject({
      code: trimmedCode,
      name: trimmedName,
      category,
      attended: attNum,
      total: totNum,
    });
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Attendance Tracker &amp; 75% Calculator
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Track subject-wise attendance and Gauhati University 75% examination eligibility.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#1e3a8a] hover:bg-blue-950 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Subject
        </button>
      </div>

      {/* Overall Summary Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-medium text-slate-500">
            Cumulative Semester Attendance
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-slate-900 tabular-nums">
              {overall.percentage.toFixed(1)}%
            </span>
            <span className="text-sm text-slate-600 tabular-nums">
              {overall.attended} attended of {overall.total} total classes
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="text-slate-600 tabular-nums">
            <span className="font-semibold text-slate-900">{safeCount}</span> of{' '}
            <span className="font-semibold text-slate-900">{subjects.length}</span>{' '}
            subjects ≥ 75%
          </div>
          {overallStatus === 'Safe' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Safe · Eligible
            </span>
          )}
          {overallStatus === 'Warning' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <AlertTriangle className="w-3.5 h-3.5" />
              Warning · 65–74%
            </span>
          )}
          {overallStatus === 'Low' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-red-50 text-red-800 border border-red-200">
              <XCircle className="w-3.5 h-3.5" />
              Low · Below 65%
            </span>
          )}
        </div>
      </div>

      {/* Subject-wise Bar Chart vs 75% Benchmark */}
      {subjects.length > 0 && (
        <section
          aria-label="Subject-wise Attendance Comparison Chart"
          className="bg-white border border-slate-200 rounded-xl p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Subject-wise Attendance vs. 75% Benchmark
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Dashed vertical guide marks the mandatory 75% Gauhati University threshold.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
                Safe (≥75%)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
                Warning (65–74%)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-red-600" />
                Low (&lt;65%)
              </span>
            </div>
          </div>

          <div className="relative space-y-3.5" data-testid="attendance-bar-chart">
            <div className="hidden sm:grid sm:grid-cols-12 items-center gap-4 text-[11px] font-mono text-slate-500">
              <div className="sm:col-span-4" />
              <div className="sm:col-span-7 relative h-4">
                <span className="absolute left-[75%] -translate-x-1/2 font-semibold text-slate-700">
                  75% min
                </span>
              </div>
              <div className="sm:col-span-1" />
            </div>
            {subjects.map((subject) => {
              const pct = calculateAttendancePercentage(subject.attended, subject.total);
              const status = getAttendanceStatus(pct);
              const barColor =
                status === 'Safe'
                  ? 'bg-emerald-600'
                  : status === 'Warning'
                  ? 'bg-amber-500'
                  : 'bg-red-600';

              return (
                <div key={subject.id} className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
                  <div className="sm:col-span-4 text-xs sm:text-sm font-medium text-slate-700 truncate">
                    {subject.name}
                  </div>
                  <div className="sm:col-span-7 relative h-6 bg-slate-100 rounded-md overflow-hidden">
                    <div
                      className={`h-full ${barColor} transition-all duration-200 rounded-md`}
                      style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                    />
                    <div
                      aria-hidden="true"
                      title="75% GU Minimum"
                      className="absolute inset-y-0 left-[75%] border-l-2 border-dashed border-slate-900/70"
                    />
                  </div>
                  <div className="sm:col-span-1 text-right text-xs font-semibold font-mono text-slate-800 tabular-nums">
                    {pct.toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Subject Cards Grid */}
      {subjects.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-3">
          <p className="text-base font-semibold text-slate-900">
            No subjects added yet
          </p>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Add your Major, Minor, IDC, AEC, or SEC papers to start tracking daily attendance and 75% eligibility.
          </p>
          <button
            type="button"
            onClick={handleOpenModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#1e3a8a] hover:bg-blue-950 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add First Subject
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {subjects.map((subject) => {
            const pct = calculateAttendancePercentage(subject.attended, subject.total);
            const status = getAttendanceStatus(pct);
            const guidance = get75EligibilityGuidance(subject.attended, subject.total);

            const barFill =
              status === 'Safe'
                ? 'bg-emerald-600'
                : status === 'Warning'
                ? 'bg-amber-500'
                : 'bg-red-600';

            return (
              <article
                key={subject.id}
                className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-slate-900 leading-snug">
                        {subject.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        <span className="font-mono">{subject.code}</span>
                        <span className="mx-1.5" aria-hidden="true">·</span>
                        <span>{subject.category}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {status === 'Safe' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Safe
                        </span>
                      )}
                      {status === 'Warning' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Warning
                        </span>
                      )}
                      {status === 'Low' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-red-50 text-red-800 border border-red-200">
                          <XCircle className="w-3.5 h-3.5" />
                          Low
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => onDeleteSubject(subject.id)}
                        aria-label={`Delete ${subject.name}`}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Percentage & Progress */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-slate-900 tabular-nums">
                        {pct.toFixed(1)}%
                      </span>
                      <span className="text-xs font-medium text-slate-600 tabular-nums">
                        {subject.attended} / {subject.total} classes attended
                      </span>
                    </div>

                    <div className="relative h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${barFill} transition-all duration-200 rounded-full`}
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-y-0 left-[75%] w-0.5 bg-slate-900/50"
                      />
                    </div>
                  </div>

                  {/* 75% Calculator Guidance */}
                  <p
                    className={`mt-3 text-xs font-medium ${
                      guidance.mode === 'need'
                        ? 'text-red-700'
                        : guidance.mode === 'exact'
                        ? 'text-amber-700'
                        : 'text-slate-600'
                    }`}
                  >
                    {guidance.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => onMarkPresent(subject.id)}
                    aria-label={`Mark present for ${subject.name}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-white bg-[#1e3a8a] hover:bg-blue-950 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Present
                  </button>
                  <button
                    type="button"
                    onClick={() => onMarkAbsent(subject.id)}
                    aria-label={`Mark absent for ${subject.name}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Minus className="w-3.5 h-3.5" />
                    Absent
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Add Subject Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Subject"
        description="Add a paper to track its attendance and 75% GU eligibility."
      >
        <form onSubmit={handleCreate} className="space-y-4">
          {formError && (
            <div
              role="alert"
              className="px-3.5 py-2.5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg"
            >
              {formError}
            </div>
          )}

          <div>
            <label
              htmlFor="subj-name"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Subject Name
            </label>
            <input
              id="subj-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Computer Networks"
              className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="subj-code"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Paper Code
              </label>
              <input
                id="subj-code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g., BCA-MAJ-303"
                className="w-full px-3.5 py-2 text-sm font-mono text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              />
            </div>

            <div>
              <label
                htmlFor="subj-category"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Paper Category
              </label>
              <select
                id="subj-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="subj-attended"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Classes Attended
              </label>
              <input
                id="subj-attended"
                type="number"
                min={0}
                value={attended}
                onChange={(e) => setAttended(e.target.value)}
                className="w-full px-3.5 py-2 text-sm font-mono text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              />
            </div>

            <div>
              <label
                htmlFor="subj-total"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Total Classes Held
              </label>
              <input
                id="subj-total"
                type="number"
                min={0}
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="w-full px-3.5 py-2 text-sm font-mono text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#1e3a8a] hover:bg-blue-950 rounded-lg transition-colors"
            >
              Save Subject
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
