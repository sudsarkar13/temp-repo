/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  cssEase: 'linear'
};

const sliderImageSrc = [
  {
    src: "/images/img-1.png",
  },
  {
    src: "/images/img-2.png",
  },
  {
    src: "./images/C & S electric Certificate.jpeg",
  },
];

const GalleryTest = () => {
  return (
    <div>
      <Slider {...sliderSettings}>
        {sliderImageSrc.map((imageSrc, index) => (
          <div key={index}>
            <img src={imageSrc.src} alt='Gallery Images' />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GalleryTest;