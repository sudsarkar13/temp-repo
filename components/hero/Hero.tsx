import React from "react";
import Gallery from "./gallery/Gallery";
import Partners from "./gallery/Partners";

const Hero = () => {
	return (
		<div className='hero'>
			<div className="slider-container">
				<Gallery />
				<Partners />
			</div>
		</div>
	);
};

export default Hero;
