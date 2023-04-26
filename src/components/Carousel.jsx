import React, { useEffect, useState } from "react";
import "./Carousel.css";

function Carousel(props) {
  const { adImages } = props;

  const [counter, setCounter] = useState(0);
  const [totalImg, setTotalImg] = useState(1);
  const [actualImage, setActualImage] = useState(adImages[counter]);

  useEffect(() => {
    setActualImage(adImages[counter]);
    adImages.map((each, i) => {
      if (
        each !==
        "https://res.cloudinary.com/dacltsvln/image/upload/v1678707296/re-Usa/eca7lptfqlqstm28zorb.png"
      ) {
        setTotalImg(i + 1);
      }
    });
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
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <div className="carousel-body">
      <div className="carousel-img-container">
        <img src={actualImage} alt="anuncio img" />
      </div>
      <div className="carousel-btn">
        <button onClick={leftImg}> ← </button>
        <p>{`${counter + 1}/${totalImg}`}</p>
        <button onClick={rightImg}> → </button>
      </div>
    </div>
  );
}

export default Carousel;
