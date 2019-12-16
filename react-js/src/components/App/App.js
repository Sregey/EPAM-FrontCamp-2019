import React from 'react';
import styles  from './App.module.scss';
import PageHeader from '../PageHeader/PageHeader';
import ResultPanel from '../ResultPanel/ResultPanel';
import PageContent from '../PageContent/PageContent';
import PageFooter from '../PageFooter/PageFooter';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <div>
      <ErrorBoundary>
        <PageHeader />
        <ResultPanel text="7 movies found"/>
        <PageContent />
        <PageFooter />
      </ErrorBoundary>
    </div>
  );
}

export default App;
