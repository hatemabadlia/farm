import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Placeholder from '../../components/Placeholder/Placeholder';
import styles from './NotFound.module.css';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <Placeholder
      eyebrow={<span className={styles.code}>{t('notFound.code')}</span>}
      title={t('notFound.title')}
      text={t('notFound.text')}
    >
      <Link to="/" className={styles.back}>{t('notFound.back')}</Link>
    </Placeholder>
  );
}
