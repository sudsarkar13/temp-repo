import React from "react";
import { Gallery, Partners } from "./gallery";

const Hero = () => {
	return (
		<div className='hero'>
			<div className='slider-container'>
				<Gallery />
				<Partners />
			</div>
		</div>
	);
};

export default Hero;
