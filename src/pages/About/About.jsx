import React from 'react';
import { useTranslation } from 'react-i18next';
import Placeholder from '../../components/Placeholder/Placeholder';

export default function About() {
  const { t } = useTranslation();

  return (
    <Placeholder
      eyebrow={t('common.brand')}
      title={t('about.title')}
      text={t('common.pagePending')}
    />
  );
}
