import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  ExternalLink,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import type { StudyNote, StudyTask, SubjectAttendance } from '../types/portal';
import { filterNotes } from '../utils/calculations';
import { Modal } from './Modal';

interface TasksAndNotesProps {
  tasks: StudyTask[];
  notes: StudyNote[];
  subjects: SubjectAttendance[];
  onAddTask: (task: Omit<StudyTask, 'id'>) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddNote: (note: Omit<StudyNote, 'id' | 'updatedAt'>) => void;
  onDeleteNote: (id: string) => void;
}

type TaskFilter = 'All' | 'Pending' | 'Completed';

export function TasksAndNotes({
  tasks,
  notes,
  subjects,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onAddNote,
  onDeleteNote,
}: TasksAndNotesProps) {
  const [taskFilter, setTaskFilter] = useState<TaskFilter>('All');
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskSubject, setTaskSubject] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('2026-12-01');
  const [taskType, setTaskType] = useState<StudyTask['type']>('Assignment');
  const [taskError, setTaskError] = useState('');

  const [noteQuery, setNoteQuery] = useState('');
  const [noteSubjectFilter, setNoteSubjectFilter] = useState('All');
  const [noteModalOpen, setNoteModalOpen] = useState(false);

  const [noteTitle, setNoteTitle] = useState('');
  const [noteSubject, setNoteSubject] = useState('');
  const [noteType, setNoteType] = useState<StudyNote['resourceType']>('Study Note');
  const [noteContent, setNoteContent] = useState('');
  const [noteUrl, setNoteUrl] = useState('');
  const [noteError, setNoteError] = useState('');

  const filteredTasks = useMemo(() => {
    const sorted = [...tasks].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return a.dueDate.localeCompare(b.dueDate);
    });
    if (taskFilter === 'Pending') return sorted.filter((t) => !t.completed);
    if (taskFilter === 'Completed') return sorted.filter((t) => t.completed);
    return sorted;
  }, [tasks, taskFilter]);

  const noteSubjects = useMemo(() => {
    const set = new Set<string>();
    subjects.forEach((s) => set.add(s.name));
    notes.forEach((n) => set.add(n.subject));
    return Array.from(set).sort();
  }, [subjects, notes]);

  const filteredNotes = useMemo(
    () => filterNotes(notes, noteSubjectFilter, noteQuery),
    [notes, noteSubjectFilter, noteQuery]
  );

  const handleOpenTaskModal = () => {
    setTaskTitle('');
    setTaskSubject(subjects[0]?.name ?? 'General');
    setTaskDueDate('2026-12-01');
    setTaskType('Assignment');
    setTaskError('');
    setTaskModalOpen(true);
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) {
      setTaskError('Task title is required.');
      return;
    }
    if (!taskSubject.trim()) {
      setTaskError('Please specify a subject.');
      return;
    }
    if (!taskDueDate) {
      setTaskError('Please select a due date.');
      return;
    }
    onAddTask({
      title: taskTitle.trim(),
      subject: taskSubject.trim(),
      dueDate: taskDueDate,
      completed: false,
      type: taskType,
    });
    setTaskModalOpen(false);
  };

  const handleOpenNoteModal = () => {
    setNoteTitle('');
    setNoteSubject(subjects[0]?.name ?? 'General');
    setNoteType('Study Note');
    setNoteContent('');
    setNoteUrl('');
    setNoteError('');
    setNoteModalOpen(true);
  };

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim()) {
      setNoteError('Title is required.');
      return;
    }
    if (!noteSubject.trim()) {
      setNoteError('Subject tag is required.');
      return;
    }
    if (!noteContent.trim() && !noteUrl.trim()) {
      setNoteError('Provide either study notes or a resource link.');
      return;
    }
    const trimmedUrl = noteUrl.trim();
    if (trimmedUrl && !/^https?:\/\//i.test(trimmedUrl)) {
      setNoteError('Resource URL must start with http:// or https://');
      return;
    }

    onAddNote({
      title: noteTitle.trim(),
      subject: noteSubject.trim(),
      resourceType: noteType,
      content: noteContent.trim() || 'Saved syllabus / question-paper link.',
      url: trimmedUrl || undefined,
    });
    setNoteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Tasks &amp; Study Notes / PYQ Vault
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Manage assignments, sessional exams, revision notes, and Gauhati University PYQ links.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Assignments & Exam To-Do Tracker */}
        <section
          aria-label="Assignments and Exam To-Do Tracker"
          className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 space-y-4"
        >
          <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Assignments &amp; Exams
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
                {tasks.filter((t) => !t.completed).length} pending · {tasks.length} total
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenTaskModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-white bg-[#1e3a8a] hover:bg-blue-950 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>

          {/* Status Filter */}
          <div
            role="group"
            aria-label="Filter tasks by status"
            className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg"
          >
            {(['All', 'Pending', 'Completed'] as TaskFilter[]).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setTaskFilter(filter)}
                className={`flex-1 py-1.5 px-2.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  taskFilter === filter
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {filteredTasks.length === 0 ? (
            <div className="py-10 text-center space-y-2">
              <p className="text-sm font-medium text-slate-700">
                No {taskFilter === 'All' ? '' : taskFilter.toLowerCase()} tasks
              </p>
              <p className="text-xs text-slate-500">
                Add an assignment, lab record, or exam date to stay on schedule.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className="py-3.5 first:pt-1 last:pb-1 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <input
                      id={`task-check-${task.id}`}
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => onToggleTask(task.id)}
                      aria-label={`Mark "${task.title}" as ${
                        task.completed ? 'pending' : 'completed'
                      }`}
                      className="mt-1 w-4 h-4 rounded border-slate-300 text-[#1e3a8a] focus:ring-[#1e3a8a] cursor-pointer"
                    />
                    <label
                      htmlFor={`task-check-${task.id}`}
                      className="min-w-0 cursor-pointer"
                    >
                      <span
                        className={`block text-sm font-medium leading-snug ${
                          task.completed
                            ? 'line-through text-slate-400'
                            : 'text-slate-900'
                        }`}
                      >
                        {task.title}
                      </span>
                      <span className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                        <span>{task.subject}</span>
                        <span aria-hidden="true">·</span>
                        <span>{task.type}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">
                          Due {task.dueDate}
                        </span>
                      </span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeleteTask(task.id)}
                    aria-label={`Delete task ${task.title}`}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Right: Searchable Study Notes & PYQ Vault */}
        <section
          aria-label="Study Notes and PYQ Vault"
          className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Study Notes &amp; PYQ Vault
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
                {notes.length} saved study resources
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenNoteModal}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add Note / Link
            </button>
          </div>

          {/* Search & Subject Filter */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-7 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={noteQuery}
                onChange={(e) => setNoteQuery(e.target.value)}
                aria-label="Search study notes and PYQs"
                placeholder="Search notes, topics, or PYQ papers..."
                className="w-full pl-9 pr-3.5 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1e3a8a]"
              />
            </div>

            <div className="sm:col-span-5">
              <select
                value={noteSubjectFilter}
                onChange={(e) => setNoteSubjectFilter(e.target.value)}
                aria-label="Filter notes by subject"
                className="w-full px-3 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1e3a8a]"
              >
                <option value="All">All Subjects</option>
                {noteSubjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes List */}
          {filteredNotes.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <BookOpen className="w-6 h-6 text-slate-300 mx-auto" />
              <p className="text-sm font-medium text-slate-700">
                No matching study notes or PYQ links
              </p>
              <p className="text-xs text-slate-500">
                Try clearing your search filter or save a new study resource.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredNotes.map((note) => (
                <article
                  key={note.id}
                  className="py-4 first:pt-1 last:pb-1 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-medium text-[#1e3a8a]">
                        {note.subject}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{note.resourceType}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">
                        {note.updatedAt}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                      {note.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {note.content}
                    </p>

                    {note.url && (
                      <div className="pt-1">
                        <a
                          href={note.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1e3a8a] hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Open Syllabus / PYQ Link
                        </a>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeleteNote(note.id)}
                    aria-label={`Delete note ${note.title}`}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Add Task Modal */}
      <Modal
        open={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        title="Add Assignment or Exam Task"
        description="Track upcoming submissions, practical records, or sessional exams."
      >
        <form onSubmit={handleTaskSubmit} className="space-y-4">
          {taskError && (
            <div
              role="alert"
              className="px-3.5 py-2.5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg"
            >
              {taskError}
            </div>
          )}

          <div>
            <label
              htmlFor="task-title"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Task Description
            </label>
            <input
              id="task-title"
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g., Submit SQL Lab Assignment 4"
              className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>

          <div>
            <label
              htmlFor="task-subject"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Subject
            </label>
            <input
              id="task-subject"
              type="text"
              list="task-subject-options"
              value={taskSubject}
              onChange={(e) => setTaskSubject(e.target.value)}
              className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
            <datalist id="task-subject-options">
              {subjects.map((s) => (
                <option key={s.id} value={s.name} />
              ))}
              <option value="Administration" />
            </datalist>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="task-due"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Due Date
              </label>
              <input
                id="task-due"
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                className="w-full px-3.5 py-2 text-sm font-mono text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              />
            </div>

            <div>
              <label
                htmlFor="task-type"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Category
              </label>
              <select
                id="task-type"
                value={taskType}
                onChange={(e) => setTaskType(e.target.value as StudyTask['type'])}
                className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              >
                <option value="Assignment">Assignment</option>
                <option value="Practical">Practical</option>
                <option value="Exam">Exam</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setTaskModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#1e3a8a] hover:bg-blue-950 rounded-lg transition-colors"
            >
              Save Task
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Note / PYQ Link Modal */}
      <Modal
        open={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
        title="Add Study Note or PYQ Link"
        description="Save revision notes, Gauhati University syllabus PDFs, or previous year question paper links."
      >
        <form onSubmit={handleNoteSubmit} className="space-y-4">
          {noteError && (
            <div
              role="alert"
              className="px-3.5 py-2.5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg"
            >
              {noteError}
            </div>
          )}

          <div>
            <label
              htmlFor="note-title"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Resource Title
            </label>
            <input
              id="note-title"
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="e.g., Operating Systems PYQ 2025"
              className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="note-subject"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Subject Tag
              </label>
              <input
                id="note-subject"
                type="text"
                list="note-subject-options"
                value={noteSubject}
                onChange={(e) => setNoteSubject(e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              />
              <datalist id="note-subject-options">
                {noteSubjects.map((sub) => (
                  <option key={sub} value={sub} />
                ))}
              </datalist>
            </div>

            <div>
              <label
                htmlFor="note-type"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Resource Type
              </label>
              <select
                id="note-type"
                value={noteType}
                onChange={(e) =>
                  setNoteType(e.target.value as StudyNote['resourceType'])
                }
                className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              >
                <option value="Study Note">Study Note</option>
                <option value="PYQ Paper">PYQ Paper</option>
                <option value="Syllabus">Syllabus</option>
                <option value="Reference Link">Reference Link</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="note-content"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Notes / Key Topics
            </label>
            <textarea
              id="note-content"
              rows={3}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Summarize formulas, repeated questions, or unit notes..."
              className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>

          <div>
            <label
              htmlFor="note-url"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              External Syllabus / PYQ URL (Optional)
            </label>
            <input
              id="note-url"
              type="url"
              value={noteUrl}
              onChange={(e) => setNoteUrl(e.target.value)}
              placeholder="https://www.gauhati.ac.in/..."
              className="w-full px-3.5 py-2 text-sm font-mono text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setNoteModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#1e3a8a] hover:bg-blue-950 rounded-lg transition-colors"
            >
              Save Resource
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
