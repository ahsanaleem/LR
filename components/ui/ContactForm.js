'use client';
import { useState } from 'react';
import { useSite } from '../global/SiteProvider';
import { Arrow } from './Icons';
import { contact } from '@/content/site';

// Front-end only. Wire `submit()` to your API route / CRM endpoint.
export default function ContactForm({ onDone, compact = false }) {
  const { toast } = useSite();
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const err = {};
    if (!f.name?.trim()) err.name = 'Please enter your name';
    if (!/^\S+@\S+\.\S+$/.test(f.email || '')) err.email = 'Enter a valid email';
    if (f.phone && !/^[+\d\s()-]{7,}$/.test(f.phone)) err.phone = 'Enter a valid phone number';
    setErrors(err);
    if (Object.keys(err).length) { toast('Please check the highlighted fields', 'error'); return; }
    setBusy(true);
    // TODO: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(f) })
    await new Promise((r) => setTimeout(r, 900));
    setBusy(false);
    e.target.reset();
    toast('Thanks! We will be in touch within 24 hours.');
    onDone?.();
  };

  return (
    <form className={`contact_form ${compact ? 'compact' : ''}`} onSubmit={submit} noValidate>
      {[
        ['name', 'Name', 'text'],
        ['email', 'Email', 'email'],
        ['phone', 'Phone Number', 'tel'],
      ].map(([n, l, t]) => (
        <label key={n} className={`field ${errors[n] ? 'has_err' : ''}`}>
          <input name={n} type={t} placeholder=" " autoComplete={n === 'phone' ? 'tel' : n} />
          <span>{l}</span>
          {errors[n] && <em>{errors[n]}</em>}
        </label>
      ))}
      <label className="field">
        <textarea name="comment" rows={3} placeholder=" " />
        <span>Comment</span>
      </label>
      <button className="btn btn_solid btn_glow submit_btn" disabled={busy}>
        {busy ? 'Sending…' : contact.submit} <Arrow size={18} />
      </button>
    </form>
  );
}
