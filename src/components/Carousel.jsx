import React, { useEffect, useState } from "react";

function Carousel(props) {
  const { adImages } = props;

  const [counter, setCounter] = useState(0);
  const [actualImage, setActualImage] = useState(adImages[counter]);

  useEffect(() => {
    setActualImage(adImages[counter]);
  }, [counter]);

  const rightImg = () => {
    if (
      counter < 3 &&
      adImages[counter + 1] !==
        "https://res.cloudinary.com/dacltsvln/image/upload/v1678707296/re-Usa/eca7lptfqlqstm28zorb.png"
    ) {
      setCounter(counter + 1);
    }
  };

  const leftImg = () => {
    if (counter > 0 ) {
      setCounter(counter - 1);
    }
  };

  return (
    <div>
      <img src={actualImage} alt="anuncio img" width="300px" />
      <button onClick={leftImg}>Ant.</button>
      <button onClick={rightImg}>Sig.</button>
    </div>
  );
}

export default Carousel;
