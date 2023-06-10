import React from 'react';
import Container from 'react-bootstrap/Container';
import './app-container.scss';
import { useTranslation } from 'react-i18next';

const AppContainer = () =>
{
  const { t } = useTranslation('translation');
  return (
    <Container
      fluid={true}
      className={'app-container'}
    >
      <div>{t('APP.TITLE')}</div>
      <div>{'TODO - main content goes here!'}</div>
    </Container>
  );
};

export default AppContainer;
