import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store'

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import SearchPage from '../Pages/SearchPage/SearchPage';
import MovieDetailsPage from '../Pages/MovieDetailsPage/MovieDetailsPage';
import NotFoundPage from '../Pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Provider store={store}>
      <div>
        <ErrorBoundary>
          <Router>
            <Switch>
              <Route exact path={["/", "/search/:text?"]} component={SearchPage} />
              <Route exact path="/film/:id" component={MovieDetailsPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </ErrorBoundary>
      </div>
    </Provider>
  );
}

export default App;
