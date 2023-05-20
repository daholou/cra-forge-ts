import React from 'react';
import Container from 'react-bootstrap/Container';
import './app-container.scss';

const AppContainer = () =>
{
  return (
    <Container
      fluid={true}
      className={'app-container'}
    >
      <div>TODO - main content goes here!</div>
    </Container>
  );
};

export default AppContainer;
