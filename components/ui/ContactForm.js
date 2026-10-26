'use client';
import { useState } from 'react';
import { useSite, useContent } from '../global/SiteProvider';
import { Arrow } from './Icons';

// Front-end only. Wire `submit()` to your API route / CRM endpoint.
export default function ContactForm({ onDone, compact = false }) {
  const { contact, ui } = useContent();
  const { toast } = useSite();
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const err = {};
    if (!f.name?.trim()) err.name = ui.form.errName;
    if (!/^\S+@\S+\.\S+$/.test(f.email || '')) err.email = ui.form.errEmail;
    if (f.phone && !/^[+\d\s()-]{7,}$/.test(f.phone)) err.phone = ui.form.errPhone;
    setErrors(err);
    if (Object.keys(err).length) { toast(ui.form.errCheck, 'error'); return; }
    setBusy(true);
    // TODO: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(f) })
    await new Promise((r) => setTimeout(r, 900));
    setBusy(false);
    e.target.reset();
    toast(ui.form.thanks);
    onDone?.();
  };

  return (
    <form className={`contact_form ${compact ? 'compact' : ''}`} onSubmit={submit} noValidate>
      {[
        ['name', ui.form.name, 'text'],
        ['email', ui.form.email, 'email'],
        ['phone', ui.form.phone, 'tel'],
      ].map(([n, l, t]) => (
        <label key={n} className={`field ${errors[n] ? 'has_err' : ''}`}>
          <input name={n} type={t} placeholder=" " autoComplete={n === 'phone' ? 'tel' : n} />
          <span>{l}</span>
          {errors[n] && <em>{errors[n]}</em>}
        </label>
      ))}
      <label className="field">
        <textarea name="comment" rows={3} placeholder=" " />
        <span>{ui.form.comment}</span>
      </label>
      <button className="btn btn_solid btn_glow submit_btn" disabled={busy}>
        {busy ? ui.form.sending : contact.submit} <Arrow size={18} />
      </button>
    </form>
  );
}
