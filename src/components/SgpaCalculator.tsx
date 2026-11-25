import { AlertTriangle, Plus, Trash2 } from 'lucide-react';
import type { GradeLetter, SgpaPaper } from '../types/portal';
import {
  GRADE_DESCRIPTIONS,
  GRADE_POINTS,
  calculateSgpa,
} from '../utils/calculations';

interface SgpaCalculatorProps {
  papers: SgpaPaper[];
  onAddPaper: () => void;
  onUpdatePaper: (id: string, patch: Partial<SgpaPaper>) => void;
  onRemovePaper: (id: string) => void;
}

const GRADE_OPTIONS: GradeLetter[] = ['O', 'A+', 'A', 'B+', 'B', 'C', 'P', 'F'];

export function SgpaCalculator({
  papers,
  onAddPaper,
  onUpdatePaper,
  onRemovePaper,
}: SgpaCalculatorProps) {
  const stats = calculateSgpa(papers);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            SGPA Calculator (GU-FYUGP 10-Point Scale)
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Gauhati University NEP 2020 grading scale: O=10, A+=9, A=8, B+=7, B=6, C=5, P=4, F=0.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddPaper}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#1e3a8a] hover:bg-blue-950 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Paper
        </button>
      </div>

      {/* Live Readout Strip */}
      <section
        aria-label="Live SGPA Summary"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div className="bg-[#1e3a8a] text-white rounded-xl p-5">
          <p className="text-xs font-medium text-amber-300">
            Calculated SGPA
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              data-testid="sgpa-value"
              className="text-4xl font-bold tabular-nums"
            >
              {stats.sgpa.toFixed(2)}
            </span>
            <span className="text-sm text-blue-200 font-mono">/ 10.00</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500">
            Approximate Percentage
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              data-testid="sgpa-percentage"
              className="text-3xl font-bold text-slate-900 tabular-nums"
            >
              {stats.approxPercentage.toFixed(1)}%
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Standard 10-point conversion (SGPA × 10)
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500">Total Credits</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              data-testid="sgpa-credits"
              className="text-3xl font-bold text-slate-900 tabular-nums"
            >
              {stats.totalCredits}
            </span>
            <span className="text-xs text-slate-500">
              across {papers.length} {papers.length === 1 ? 'paper' : 'papers'}
            </span>
          </div>
        </div>
      </section>

      {stats.hasFail && (
        <div
          role="alert"
          className="flex items-start gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm"
        >
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            One or more papers have grade <strong>F (0)</strong>. Under Gauhati University rules, backlog clearance is required before promotion to 4th Year Honours.
          </span>
        </div>
      )}

      {/* Dynamic Papers Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {papers.length === 0 ? (
          <div className="p-10 text-center space-y-3">
            <p className="text-base font-semibold text-slate-900">
              No papers in SGPA sheet
            </p>
            <p className="text-sm text-slate-500">
              Add your semester courses and expected letter grades to compute your SGPA.
            </p>
            <button
              type="button"
              onClick={onAddPaper}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#1e3a8a] hover:bg-blue-950 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add First Paper
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                  <th className="py-3 px-4 w-36">Paper Code</th>
                  <th className="py-3 px-4 min-w-[200px]">Paper Title</th>
                  <th className="py-3 px-4 w-28 text-right">Credits</th>
                  <th className="py-3 px-4 w-52">Letter Grade</th>
                  <th className="py-3 px-4 w-24 text-right">Points</th>
                  <th className="py-3 px-4 w-16 text-right">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {papers.map((paper, idx) => {
                  const gp = GRADE_POINTS[paper.grade] ?? 0;
                  const creditPoints = paper.credits * gp;
                  return (
                    <tr key={paper.id} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-4">
                        <input
                          type="text"
                          value={paper.code}
                          aria-label={`Paper ${idx + 1} code`}
                          onChange={(e) =>
                            onUpdatePaper(paper.id, { code: e.target.value })
                          }
                          className="w-full px-2.5 py-1.5 text-xs font-mono text-slate-800 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                        />
                      </td>
                      <td className="py-2.5 px-4">
                        <input
                          type="text"
                          value={paper.title}
                          aria-label={`Paper ${idx + 1} title`}
                          onChange={(e) =>
                            onUpdatePaper(paper.id, { title: e.target.value })
                          }
                          className="w-full px-2.5 py-1.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                        />
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <input
                          type="number"
                          min={1}
                          max={10}
                          value={paper.credits}
                          aria-label={`Paper ${idx + 1} credits`}
                          onChange={(e) => {
                            const val = Math.max(0, Math.min(10, Number(e.target.value) || 0));
                            onUpdatePaper(paper.id, { credits: val });
                          }}
                          className="w-20 px-2.5 py-1.5 text-sm font-mono text-right text-slate-900 bg-white border border-slate-200 rounded-md tabular-nums focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                        />
                      </td>
                      <td className="py-2.5 px-4">
                        <select
                          value={paper.grade}
                          aria-label={`Paper ${idx + 1} letter grade`}
                          onChange={(e) =>
                            onUpdatePaper(paper.id, {
                              grade: e.target.value as GradeLetter,
                            })
                          }
                          className="w-full px-2.5 py-1.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                        >
                          {GRADE_OPTIONS.map((g) => (
                            <option key={g} value={g}>
                              {GRADE_DESCRIPTIONS[g]}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-slate-800 tabular-nums">
                        {creditPoints}
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => onRemovePaper(paper.id)}
                          aria-label={`Remove ${paper.title || `Paper ${idx + 1}`}`}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Grade Scale Legend */}
      <div className="bg-slate-100/80 border border-slate-200 rounded-xl px-5 py-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600">
        <span className="font-semibold text-slate-800">GU-FYUGP Grade Points:</span>
        {GRADE_OPTIONS.map((g) => (
          <span key={g} className="font-mono tabular-nums">
            <strong className="text-slate-900">{g}</strong> = {GRADE_POINTS[g]}
          </span>
        ))}
      </div>
    </div>
  );
}
