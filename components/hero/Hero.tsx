import React from "react";
import Gallery from "./gallery/Gallery";
import About from "../webpages/About";

const Hero = () => {
	return (
		<div className='hero'>
			<div className="slider-container">
				<Gallery />
				<About />
			</div>
		</div>
	);
};

export default Hero;
