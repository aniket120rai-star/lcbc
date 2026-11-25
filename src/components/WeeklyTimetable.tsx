import React, { useState } from 'react';
import { Clock, MapPin, Plus, Trash2 } from 'lucide-react';
import type { DayOfWeek, SubjectAttendance, TimetableSlot } from '../types/portal';
import { DAYS_OF_WEEK, formatTime12h, getClassesForDay } from '../utils/calculations';
import { Modal } from './Modal';

interface WeeklyTimetableProps {
  timetable: TimetableSlot[];
  subjects: SubjectAttendance[];
  onAddSlot: (slot: Omit<TimetableSlot, 'id'>) => void;
  onDeleteSlot: (id: string) => void;
}

const SHORT_DAYS: Record<DayOfWeek, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
};

export function WeeklyTimetable({
  timetable,
  subjects,
  onAddSlot,
  onDeleteSlot,
}: WeeklyTimetableProps) {
  const [selectedDay, setSelectedDay] = useState<'All' | DayOfWeek>('All');
  const [modalOpen, setModalOpen] = useState(false);

  const [day, setDay] = useState<DayOfWeek>('Monday');
  const [subject, setSubject] = useState('');
  const [startTime, setStartTime] = useState('09:15');
  const [endTime, setEndTime] = useState('10:15');
  const [room, setRoom] = useState('');
  const [instructor, setInstructor] = useState('');
  const [formError, setFormError] = useState('');

  const visibleDays = selectedDay === 'All' ? DAYS_OF_WEEK : [selectedDay];

  const handleOpenModal = (defaultDay?: DayOfWeek) => {
    setDay(defaultDay ?? (selectedDay === 'All' ? 'Monday' : selectedDay));
    setSubject(subjects[0]?.name ?? '');
    setStartTime('09:15');
    setEndTime('10:15');
    setRoom('');
    setInstructor('');
    setFormError('');
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) {
      setFormError('Please enter a subject name.');
      return;
    }
    if (!room.trim()) {
      setFormError('Please enter a classroom or lab name.');
      return;
    }
    if (!startTime || !endTime || endTime <= startTime) {
      setFormError('End time must be later than start time.');
      return;
    }

    onAddSlot({
      day,
      subject: subject.trim(),
      startTime,
      endTime,
      room: room.trim(),
      instructor: instructor.trim() || undefined,
    });
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Weekly Timetable
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            LCB College Schedule · Monday–Saturday, 9:00 AM – 4:30 PM · Sunday Closed
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#1e3a8a] hover:bg-blue-950 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Class Slot
        </button>
      </div>

      {/* Day Filter Controls */}
      <div
        role="group"
        aria-label="Filter timetable by day"
        className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl w-fit"
      >
        <button
          type="button"
          onClick={() => setSelectedDay('All')}
          className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            selectedDay === 'All'
              ? 'bg-[#1e3a8a] text-white shadow-xs'
              : 'text-slate-700 hover:bg-white/70'
          }`}
        >
          All Days
        </button>
        {DAYS_OF_WEEK.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setSelectedDay(d)}
            className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedDay === d
                ? 'bg-[#1e3a8a] text-white shadow-xs'
                : 'text-slate-700 hover:bg-white/70'
            }`}
          >
            {SHORT_DAYS[d]}
          </button>
        ))}
      </div>

      {/* Schedule Columns / List */}
      <div
        className={
          selectedDay === 'All'
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'
            : 'max-w-3xl'
        }
      >
        {visibleDays.map((dayName) => {
          const slots = getClassesForDay(timetable, dayName);
          return (
            <section
              key={dayName}
              aria-label={`${dayName} Timetable`}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col"
            >
              <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    {dayName}
                  </h2>
                  <p className="text-xs text-slate-500 tabular-nums">
                    {slots.length} {slots.length === 1 ? 'class' : 'classes'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenModal(dayName)}
                  aria-label={`Add class on ${dayName}`}
                  className="p-1.5 text-slate-500 hover:text-[#1e3a8a] hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 flex-1">
                {slots.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-sm text-slate-500">
                      No classes scheduled for {dayName}.
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-100">
                    {slots.map((slot) => (
                      <li
                        key={slot.id}
                        className="py-3.5 first:pt-1 last:pb-1 flex items-start justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#1e3a8a] tabular-nums">
                            <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span>
                              {formatTime12h(slot.startTime)} – {formatTime12h(slot.endTime)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm font-semibold text-slate-900">
                            {slot.subject}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{slot.room}</span>
                            {slot.instructor && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{slot.instructor}</span>
                              </>
                            )}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => onDeleteSlot(slot.id)}
                          aria-label={`Delete ${slot.subject} on ${dayName}`}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* Add Class Slot Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Class Slot"
        description="Schedule a class or laboratory session within LCB College hours (9:00 AM – 4:30 PM)."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
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
              htmlFor="slot-day"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Day of Week
            </label>
            <select
              id="slot-day"
              value={day}
              onChange={(e) => setDay(e.target.value as DayOfWeek)}
              className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            >
              {DAYS_OF_WEEK.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="slot-subject"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Subject / Paper
            </label>
            <input
              id="slot-subject"
              type="text"
              list="portal-subject-suggestions"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Operating Systems"
              className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
            <datalist id="portal-subject-suggestions">
              {subjects.map((s) => (
                <option key={s.id} value={s.name} />
              ))}
            </datalist>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="slot-start"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Start Time
              </label>
              <input
                id="slot-start"
                type="time"
                min="09:00"
                max="16:30"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3.5 py-2 text-sm font-mono text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              />
            </div>

            <div>
              <label
                htmlFor="slot-end"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                End Time
              </label>
              <input
                id="slot-end"
                type="time"
                min="09:00"
                max="16:30"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3.5 py-2 text-sm font-mono text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="slot-room"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Room / Lab
              </label>
              <input
                id="slot-room"
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="e.g., Central Computer Lab 1"
                className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              />
            </div>

            <div>
              <label
                htmlFor="slot-instructor"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Department / Faculty (Optional)
              </label>
              <input
                id="slot-instructor"
                type="text"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                placeholder="e.g., Dept. of CS"
                className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
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
              Save Class Slot
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
