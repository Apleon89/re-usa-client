import React, { useEffect, useState } from 'react';

function Carousel(props) {
  const { adImages } = props;

  const [counter, setCounter] = useState(0);
  const [actualImage, setActualImage] = useState(adImages[counter]);

  useEffect(() => {
    setActualImage(adImages[counter]);
  }, [counter]);

  const rightImg = () => {
    if (counter < 3) {
      setCounter(counter + 1);
    }
  };

  const leftImg = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <div>
      <img src={actualImage} alt="anuncio img" width='300px'/>
      <button onClick={leftImg}>Ant.</button>
      <button onClick={rightImg}>Sig.</button>
    </div>
  );
}

export default Carousel;