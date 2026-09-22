import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import dict from './Contact.dict';
import styles from './Contact.module.css';

const EMPTY_FORM = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  role: '',
  needType: '',
  preferredContact: '',
  message: '',
  consent: false,
};

export default function Contact() {
  const { lang } = useLanguage();
  const t = dict[lang];

  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle -> sending -> success

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // TODO: brancher un vrai envoi (API / email) ici. Simulation pour l'instant.
    setTimeout(() => {
      setStatus('success');
      setForm(EMPTY_FORM);
    }, 900);
  };

  if (status === 'success') {
    return (
      <section className={styles.page}>
        <div className={styles.successBox}>
          <div className={styles.successIcon}>✓</div>
          <h2>{t.successTitle}</h2>
          <p>{t.successText}</p>
          <button className={styles.secondaryBtn} onClick={() => setStatus('idle')}>
            {t.submit}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.layout}>
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <h1>{t.title}</h1>
          <p className={styles.intro}>{t.intro}</p>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>{t.fullName} *</label>
              <input name="fullName" value={form.fullName} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
              <label>{t.company}</label>
              <input name="company" value={form.company} onChange={handleChange} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>{t.email} *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
              <label>{t.phone}</label>
              <input name="phone" value={form.phone} onChange={handleChange} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>{t.role}</label>
              <input name="role" value={form.role} onChange={handleChange} />
            </div>
            <div className={styles.field}>
              <label>{t.needType}</label>
              <select name="needType" value={form.needType} onChange={handleChange}>
                <option value="">—</option>
                {t.needOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label>{t.preferredContact}</label>
            <select name="preferredContact" value={form.preferredContact} onChange={handleChange}>
              <option value="">—</option>
              {t.contactOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label>{t.message} *</label>
            <textarea name="message" rows={5} value={form.message} onChange={handleChange} required />
          </div>

          <label className={styles.consent}>
            <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required />
            <span>{t.consent}</span>
          </label>

          <button className={styles.submitBtn} disabled={status === 'sending'}>
            {status === 'sending' ? t.sending : t.submit}
          </button>
        </form>

        <aside className={styles.sidebar}>
          <div className={styles.contactCard}>
            <h3>{t.sidebarTitle}</h3>
            <div className={styles.contactRow}>
              <span className={styles.iconDot}>✉</span>
              <div>
                <strong>{t.email}</strong>
                <p>{t.contactEmail}</p>
              </div>
            </div>
            <div className={styles.contactRow}>
              <span className={styles.iconDot}>☎</span>
              <div>
                <strong>{t.phone}</strong>
                <p>{t.contactPhone}</p>
              </div>
            </div>
          </div>

          <div className={styles.brandCard}>
            <img
              src="/src/assets/logo/fcs-primary.svg"
              alt="Farm Control System"
              className={styles.brandLogo}
            />
            <p>{t.brandTagline}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
