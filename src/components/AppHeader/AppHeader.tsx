import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
  imageFlagFrance,
  imageFlagUsa,
  imageGithubLogo,
  imageReactLogo
} from '@@/images';
import './app-header.scss';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';

type Locale = {
  key: string;
  title: string;
  imageFlag: any;
}


const AppHeader = () =>
{
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const locales: Locale[] = [
    {
      key: 'fr',
      title: t('APP.HEADER.LANGUAGES.FRENCH'),
      imageFlag: imageFlagFrance,
    },
    {
      key: 'en',
      title: t('APP.HEADER.LANGUAGES.ENGLISH'),
      imageFlag: imageFlagUsa,
    }
  ]

  const currentLocale = locales.find(locale => locale.key === i18n.resolvedLanguage);
  const otherLocales = locales.filter(locale => locale.key !== i18n.resolvedLanguage);

  const localeToJSX = (locale: Locale) => (
    <div className={'app-dropdown-language-item'}>
      <img
        src={locale.imageFlag}
        height={24}
        alt={locale.key}
      />
      {locale.title}
    </div>
  )

  const localeToNavDropdownItemJSX = (locale: Locale) => (
    <NavDropdown.Item
      key={locale.key}
      onClick={() => {
        i18n.changeLanguage(locale.key)
          .then(() => setExpanded(false))
      }}
    >
      {localeToJSX(locale)}
    </NavDropdown.Item>
  )

  return (
    <Navbar
      bg={'dark'}
      variant={'dark'}
      className={'app-header'}
      expand={'sm'}
      expanded={expanded}
    >
      <Container fluid>
        <Navbar.Brand as={'div'} className={'app-header-item'}>
          {t('APP.TITLE')}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls={'responsive-navbar-nav'}
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id={'responsive-navbar-nav'}>
          <Nav className={'ms-auto app-navbar-nav'}>
            <NavDropdown
              className={'app-dropdown-language'}
              title={currentLocale && localeToJSX(currentLocale)}
            >
              {otherLocales.map(localeToNavDropdownItemJSX)}
            </NavDropdown>
            <div className={'app-header-group'}>
              <div>
                {`v${process.env.REACT_APP_VERSION}`}
              </div>
              <a
                href={'https://reactjs.org/'}
                target={'_blank'}
                rel={'noreferrer'}
              >
                <img
                  src={imageReactLogo}
                  className={'App-logo'}
                  height={36}
                  alt={'react-logo'}
                />
              </a>
              <a
                href={'https://github.com/daholou/daholou.github.io'}
                target={'_blank'}
                rel={'noreferrer'}
              >
                <img
                  src={imageGithubLogo}
                  height={36}
                  alt={'github-logo'}
                />
              </a>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
