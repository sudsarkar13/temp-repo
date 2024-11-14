"use client";

import React, { use } from "react";
import { useSwiper } from "swiper/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

const WorkSliderBtns: React.FC<{
	containerStyles: string;
	btnStyles: string;
	iconStyles: string;
}> = ({ containerStyles, btnStyles, iconStyles }) => {
	const swiper = useSwiper();
	return (
		<main className={containerStyles}>
			<button className={btnStyles} onClick={()=> swiper.slidePrev()}>
				<PiCaretLeftBold className={iconStyles} />
			</button>
			<button className={btnStyles} onClick={()=> swiper.slideNext()}>
				<PiCaretRightBold className={iconStyles} />
			</button>
		</main>
	);
};

export default WorkSliderBtns;
