import { useEffect, useState } from 'react';
import { getStudentInitials } from '../utils/calculations';

interface StudentAvatarProps {
  name: string;
  avatarUrl?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<StudentAvatarProps['size']>, string> = {
  xs: 'w-5 h-5 text-[10px]',
  sm: 'w-7 h-7 text-[11px]',
  md: 'w-9 h-9 text-xs',
  lg: 'w-12 h-12 text-sm',
  xl: 'w-16 h-16 text-lg',
};

export function StudentAvatar({
  name,
  avatarUrl,
  size = 'md',
  className = '',
}: StudentAvatarProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [avatarUrl]);

  const sizeClass = SIZE_CLASSES[size];
  const initials = getStudentInitials(name);

  if (avatarUrl && !imgError) {
    return (
      <img
        src={avatarUrl}
        alt={`${name} profile picture`}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`${sizeClass} rounded-full object-cover border border-amber-300/70 bg-slate-100 shrink-0 ${className}`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${sizeClass} rounded-full bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-amber-300 font-serif font-bold inline-flex items-center justify-center border border-amber-400/40 shrink-0 ${className}`}
    >
      {initials}
    </span>
  );
}
