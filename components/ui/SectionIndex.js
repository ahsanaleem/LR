import { SlashMark } from './Icons';

export default function SectionIndex({ index, label, className = '' }) {
  return (
    <p className={`sindex ${className}`}>
      <SlashMark className="sindex__mark" />
      <span>
        {index} — {label}
      </span>
    </p>
  );
}
