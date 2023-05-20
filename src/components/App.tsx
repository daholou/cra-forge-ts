import React, { Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './base.scss';
import { AppHeader } from '@@/components/AppHeader';
import { AppContainer } from '@@/components/AppContainer';

const App = () =>
{
  return (
    <Suspense fallback={'loading...'}>
      <div className={'App'}>
        <AppHeader />
        <AppContainer />
      </div>
    </Suspense>
  );
};

export default App;
