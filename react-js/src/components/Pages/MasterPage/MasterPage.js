import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as SearchSvg } from '../../../assets/images/search.svg';
import ResultPanel from '../../ResultPanel/ResultPanel';
import Logo from '../../Logo/Logo';
import SvgIcon from '../../SvgIcon/SvgIcon';

import indexStyles  from '../../../styles/index.module.scss';
import styles  from './MasterPage.module.scss';

function MasterPage(props) {
  return (
    <div className={styles.masterPage}>
      <div className={styles.pageHeader}>
        <div className={`${styles.upperPanel} ${indexStyles.twoSideItems}`}>
        <Logo />
        {props.hideSearchIcon || 
          <Link to="/search">
            <SvgIcon icon={<SearchSvg />} />
          </Link>
        }
        </div>
        {props.headerContent}
      </div>
      <ResultPanel />
      <div className={styles.pageContent}>
        {props.pageContent}
      </div>
      <div className={styles.pageFooter}>
        {props.footerContent || <Logo />}
      </div>
    </div>
  );
}

export default MasterPage;
