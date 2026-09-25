import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo/logo.png';
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

// Validation simple et lisible : une regle par champ concerne.
// Elle remplace le seul attribut "required" du HTML, qui affichait
// un message du navigateur, non traduit et sans style.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(form) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = 'contact.errors.required';
  if (!form.email.trim()) errors.email = 'contact.errors.required';
  else if (!EMAIL_RE.test(form.email.trim())) errors.email = 'contact.errors.email';
  if (form.message.trim().length < 10) errors.message = 'contact.errors.messageShort';
  if (!form.consent) errors.consent = 'contact.errors.consent';
  return errors;
}

export default function Contact() {
  const { t } = useTranslation();
  // Ces deux cles sont des tableaux dans les fichiers de traduction.
  const needOptions = t('contact.needOptions', { returnObjects: true });
  const contactOptions = t('contact.contactOptions', { returnObjects: true });

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle -> sending -> success

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const next = { ...form, [name]: type === 'checkbox' ? checked : value };
    setForm(next);
    // Une fois le champ touche, l'erreur se met a jour en direct :
    // le message disparait des que la saisie devient valide.
    if (touched[name]) setErrors(validate(next));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(EMPTY_FORM).map((k) => [k, true])));

    if (Object.keys(found).length > 0) {
      // On amene l'utilisateur au premier champ en erreur.
      const first = document.getElementById(Object.keys(found)[0]);
      first?.focus();
      first?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    setStatus('sending');
    // TODO: brancher un vrai envoi (API / service email) ici.
    // Pour l'instant l'envoi est SIMULE : les donnees ne partent nulle part.
    setTimeout(() => {
      setStatus('success');
      setForm(EMPTY_FORM);
      setErrors({});
      setTouched({});
    }, 900);
  };

  // Rend les attributs partages par tous les champs (erreur + description).
  const fieldProps = (name) => ({
    id: name,
    name,
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: errors[name] ? styles.invalid : undefined,
  });

  const errorFor = (name) =>
    errors[name] ? (
      <span className={styles.errorText} id={`${name}-error`} role="alert">
        {t(errors[name])}
      </span>
    ) : null;

  if (status === 'success') {
    return (
      <section className={styles.page}>
        <div className={styles.successBox} role="status" aria-live="polite">
          <div className={styles.successIcon} aria-hidden="true">✓</div>
          <h1>{t('contact.successTitle')}</h1>
          <p>{t('contact.successText')}</p>
          <button className={styles.secondaryBtn} onClick={() => setStatus('idle')}>
            {t('contact.backToForm')}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.layout}>
        <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
          <h1>{t('contact.title')}</h1>
          <p className={styles.intro}>{t('contact.intro')}</p>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="fullName">{t('contact.fullName')} *</label>
              <input {...fieldProps('fullName')} value={form.fullName} autoComplete="name" />
              {errorFor('fullName')}
            </div>
            <div className={styles.field}>
              <label htmlFor="company">{t('contact.company')}</label>
              <input {...fieldProps('company')} value={form.company} autoComplete="organization" />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="email">{t('contact.email')} *</label>
              <input {...fieldProps('email')} type="email" value={form.email} autoComplete="email" />
              {errorFor('email')}
            </div>
            <div className={styles.field}>
              <label htmlFor="phone">{t('contact.phone')}</label>
              <input {...fieldProps('phone')} type="tel" value={form.phone} autoComplete="tel" />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="role">{t('contact.role')}</label>
              <input {...fieldProps('role')} value={form.role} />
            </div>
            <div className={styles.field}>
              <label htmlFor="needType">{t('contact.needType')}</label>
              <select {...fieldProps('needType')} value={form.needType}>
                <option value="">—</option>
                {needOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="preferredContact">{t('contact.preferredContact')}</label>
            <select {...fieldProps('preferredContact')} value={form.preferredContact}>
              <option value="">—</option>
              {contactOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="message">{t('contact.message')} *</label>
            <textarea {...fieldProps('message')} rows={5} value={form.message} />
            {errorFor('message')}
          </div>

          <div className={styles.field}>
            <label className={styles.consent} htmlFor="consent">
              <input
                {...fieldProps('consent')}
                type="checkbox"
                checked={form.consent}
              />
              <span>{t('contact.consent')} *</span>
            </label>
            {errorFor('consent')}
          </div>

          <button className={styles.submitBtn} disabled={status === 'sending'}>
            {status === 'sending' ? t('contact.sending') : t('contact.submit')}
          </button>
        </form>

        <aside className={styles.sidebar}>
          <div className={styles.contactCard}>
            <h2 className={styles.cardHeading}>{t('contact.sidebarTitle')}</h2>
            <a className={styles.contactRow} href={`mailto:${t('contact.contactEmail')}`}>
              <span className={styles.iconDot} aria-hidden="true">✉</span>
              <span>
                <strong>{t('contact.email')}</strong>
                <span className={styles.contactValue}>{t('contact.contactEmail')}</span>
              </span>
            </a>
            <a
              className={styles.contactRow}
              href={`tel:${t('contact.contactPhone').replace(/\s/g, '')}`}
            >
              <span className={styles.iconDot} aria-hidden="true">☎</span>
              <span>
                <strong>{t('contact.phone')}</strong>
                <span className={styles.contactValue}>{t('contact.contactPhone')}</span>
              </span>
            </a>
          </div>

          <div className={styles.brandCard}>
            <img src={logo} alt={t('common.brand')} className={styles.brandLogo} />
            <p>{t('contact.brandTagline')}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
