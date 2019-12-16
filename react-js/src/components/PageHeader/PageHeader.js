import React from 'react';
import { ReactComponent as SearchSvg } from '../../assets/images/search.svg';
import Logo from '../Logo/Logo';
import SvgIcon from '../SvgIcon/SvgIcon';
import SearchPanel from '../SearchPanel/SearchPanel';
import MovieDetails from '../MovieDetails/MovieDetails';

import indexStyles  from '../../styles/index.module.scss';
import styles  from './PageHeader.module.scss';

function PageHeader() {
    let details = {
      title: 'Blade Runner 2049',
      genre: 'Action',
      year: 2018,
      mins: 120,
      imageUrl: "https://www.movieartarena.com/imgs/bladerunner2049ff.jpg",
      description: 'Him rendered may attended concerns jennings reserved now. Sympathize did now preference unpleasing mrs few. Mrs for hour game room want are fond dare. For detract charmed add talking age. Shy resolution instrument unreserved man few. She did open find pain some out. If we landlord stanhill mr whatever pleasure supplied concerns so. Exquisite by it admitting cordially september newspaper an. Acceptance middletons am it favourable. It it oh happen lovers afraid. '
    };
    return (
        <div className={styles.pageHeader}>
          <div className={`${styles.upperPanel} ${indexStyles.twoSideItems}`}>
            <Logo />
            <SvgIcon>
              <SearchSvg />
            </SvgIcon>
          </div>
          {/* <MovieDetails details={details} /> */}
          <SearchPanel />
        </div>
    );
  }

export default PageHeader;