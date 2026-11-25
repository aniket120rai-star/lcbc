import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';

interface ResetConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export function ResetConfirmModal({
  open,
  onClose,
  onConfirmReset,
}: ResetConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Reset Demo Data"
      description="Restore the LCB College Student Portal back to its initial sample data."
      maxWidthClass="max-w-md"
    >
      <div className="space-y-5">
        <div className="flex items-start gap-3 p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed">
            This will overwrite your saved student profile, attendance counts, custom timetable slots, tasks, study notes, SGPA papers, and pinned personal reminders in local storage.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirmReset();
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Confirm Reset
          </button>
        </div>
      </div>
    </Modal>
  );
}
