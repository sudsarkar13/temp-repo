import React from "react";
import { Gallery, GalleryTest, Partners } from "./gallery";

const Hero = () => {
	return (
		<div className='hero'>
			<div className='slider-container'>
				<Gallery />
			</div>
			{/* <GalleryTest /> */}
			<Partners />
		</div>
	);
};

export default Hero;
