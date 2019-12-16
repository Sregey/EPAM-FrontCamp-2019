import React from 'react';
import styles from './Poster.module.scss';

function Poster(props) {
  return (
    <img src={props.url} width={props.width} />
  );
}

export default Poster;
