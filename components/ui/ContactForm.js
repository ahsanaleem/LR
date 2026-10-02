'use client';

import { useState } from 'react';
import { useSite } from '@/components/global/SiteProvider';
import Button from './Button';
import { contactSection as c } from '@/content/site';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please tell us your name.';
  if (!values.email.trim()) errors.email = 'We need an email to reply to.';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'That email looks incomplete.';
  if (values.phone && !/^[+\d][\d\s().-]{5,}$/.test(values.phone.trim())) errors.phone = 'Use digits, spaces and + only.';
  if (values.message.trim().length < 10) errors.message = 'A sentence or two helps us prepare (10+ characters).';
  return errors;
}

function Field({ id, name, label, type = 'text', value, error, onChange, onBlur, textarea, autoComplete }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div className={`field${error ? ' has-error' : ''}${textarea ? ' field--area' : ''}`} data-field>
      <Tag
        id={id}
        name={name}
        type={textarea ? undefined : type}
        rows={textarea ? 4 : undefined}
        className="field__input"
        placeholder=" "
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={`${id}-error`}
        data-lenis-prevent={textarea ? '' : undefined}
      />
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      <span className="field__line" aria-hidden="true" />
      <p id={`${id}-error`} className="field__error" role={error ? 'alert' : undefined}>
        {error || ''}
      </p>
    </div>
  );
}

/** Shared by the Contact section and the quote modal. */
export default function ContactForm({ idPrefix = 'cf', onSuccess }) {
  const { toast } = useSite();
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '' });
  const [needs, setNeeds] = useState([]);
  const [budget, setBudget] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sending, setSending] = useState(false);

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (touched[e.target.name]) setErrors(validate(next));
  };
  const onBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validate(values));
  };

  const toggleNeed = (n) => setNeeds((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n]));

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, message: true });
    if (Object.keys(errs).length) {
      e.currentTarget.querySelector('[aria-invalid="true"]')?.focus();
      toast('Please check the highlighted fields.', 'error');
      return;
    }
    setSending(true);
    const payload = { ...values, needs, budget };
    try {
      // TODO: POST to real API, e.g.
      // const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      // if (!res.ok) throw new Error('Request failed');
      await new Promise((r) => setTimeout(r, 1200));
      void payload;
      toast(c.success, 'success');
      setValues({ name: '', email: '', phone: '', message: '' });
      setNeeds([]);
      setBudget('');
      setTouched({});
      setErrors({});
      onSuccess?.();
    } catch {
      toast(c.error, 'error');
    } finally {
      setSending(false);
    }
  };

  const show = (k) => (touched[k] ? errors[k] : '');

  return (
    <form className="cform" onSubmit={onSubmit} noValidate>
      <fieldset className="cform__group" data-field>
        <legend className="cform__legend">{c.needsLabel}</legend>
        <div className="chips">
          {c.needs.map((n) => (
            <button key={n} type="button" className={`chip${needs.includes(n) ? ' is-on' : ''}`} aria-pressed={needs.includes(n)} onClick={() => toggleNeed(n)}>
              {n}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="cform__group" data-field>
        <legend className="cform__legend">{c.budgetLabel}</legend>
        <div className="chips" role="radiogroup" aria-label={c.budgetLabel}>
          {c.budgets.map((b) => (
            <button key={b} type="button" role="radio" className={`chip${budget === b ? ' is-on' : ''}`} aria-checked={budget === b} onClick={() => setBudget(budget === b ? '' : b)}>
              {b}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="cform__row">
        <Field id={`${idPrefix}-name`} name="name" label={c.fields.name} value={values.name} error={show('name')} onChange={onChange} onBlur={onBlur} autoComplete="name" />
        <Field id={`${idPrefix}-email`} name="email" type="email" label={c.fields.email} value={values.email} error={show('email')} onChange={onChange} onBlur={onBlur} autoComplete="email" />
      </div>
      <Field id={`${idPrefix}-phone`} name="phone" type="tel" label={c.fields.phone} value={values.phone} error={show('phone')} onChange={onChange} onBlur={onBlur} autoComplete="tel" />
      <Field id={`${idPrefix}-message`} name="message" label={c.fields.message} value={values.message} error={show('message')} onChange={onChange} onBlur={onBlur} textarea />
      <div className="cform__submit" data-field>
        <Button type="submit" disabled={sending} aria-busy={sending} className={sending ? 'is-loading' : ''} icon={!sending}>
          {sending ? (
            <>
              <span className="spinner" aria-hidden="true" /> Sending…
            </>
          ) : (
            c.submit
          )}
        </Button>
      </div>
    </form>
  );
}
