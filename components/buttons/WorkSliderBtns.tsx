"use client";

import React from "react";
import { useSwiper } from "swiper/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

interface WorkSliderBtnsProps {
  containerStyles?: string;
  btnStyles?: string;
  iconStyles?: string;
}

const WorkSliderButtons: React.FC<WorkSliderBtnsProps> = ({
  containerStyles = "",
  btnStyles = "",
  iconStyles = "",
}) => {
  const swiper = useSwiper();

  if (!swiper) {
    console.warn('Swiper instance not found');
    return null;
  }

  return (
    <div className={containerStyles}>
      <button 
        className={btnStyles} 
        onClick={() => swiper.slidePrev()}
        aria-label="Previous slide"
      >
        <PiCaretLeftBold className={iconStyles} />
      </button>
      <button 
        className={btnStyles} 
        onClick={() => swiper.slideNext()}
        aria-label="Next slide"
      >
        <PiCaretRightBold className={iconStyles} />
      </button>
    </div>
  );
};

const WorkSliderBtns: React.FC<WorkSliderBtnsProps> = (props) => {
  try {
    return (
      <div className="swiper-buttons">
        <WorkSliderButtons {...props} />
      </div>
    );
  } catch (error) {
    console.error('Error rendering slider buttons:', error);
    return null;
  }
};

export default WorkSliderBtns;
