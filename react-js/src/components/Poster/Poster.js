import React from 'react';

function Poster(props) {
  return (
    <img src={props.url} width={props.width} alt="Movie poster" />
  );
}

export default Poster;
