'use client';
import { useSite, useContent } from '../global/SiteProvider';
import { Arrow } from './Icons';

// Opens the Get a Quote modal — usable from server-rendered pages.
export default function QuoteButton({ children, className = 'btn btn_solid btn_glow' }) {
  const { setModalOpen } = useSite();
  const { ui } = useContent();
  return <button className={className} onClick={() => setModalOpen(true)}>{children || ui.bookConsult} <Arrow size={18} /></button>;
}
