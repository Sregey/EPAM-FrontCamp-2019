import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { ReactComponent as SearchSvg } from '../../assets/images/search.svg';
import Logo from '../../Logo/Logo';
import SvgIcon from '../../SvgIcon/SvgIcon';
import SearchPanel from '../../SearchPanel/SearchPanel';
import MovieDetails from '../../MovieDetails/MovieDetails';

import indexStyles  from '../../styles/index.module.scss';
import styles  from './PageHeader.module.scss';

function PageHeader() {
    return (
        <div className={styles.pageHeader}>
          <div className={`${styles.upperPanel} ${indexStyles.twoSideItems}`}>
            <Logo />
            <SvgIcon><SearchSvg /></SvgIcon>
          </div>
          <Router>
            <Route exact path="/" component={SearchPanel} />
            <Route exact path="/movie" component={MovieDetails} />
          </Router>
        </div>
    );
  }

export default PageHeader;