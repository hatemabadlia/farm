import React from 'react';
import { useTranslation } from 'react-i18next';
import Placeholder from '../../components/Placeholder/Placeholder';

export default function Demos() {
  const { t } = useTranslation();

  return (
    <Placeholder
      eyebrow={t('common.brand')}
      title={t('demos.title')}
      text={t('common.pagePending')}
    />
  );
}
