/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Carousel } from 'flowbite-react';

const GCarousel = () => {
	return <div className="">
    <div className="gcarousel">
      <Carousel className="carousel">
        <img src="/images/img-1.png"  alt="..." />
        <img src="/images/img-2.png" alt="..." />
        <img src="/images/C & S electric Certificate.jpeg" alt="..." />
      </Carousel>
    </div>
  </div>;
};

export default GCarousel;
