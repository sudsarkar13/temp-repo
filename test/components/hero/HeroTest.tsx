import React from "react";
import GalleryTest from "./gallery/GalleryTest";
import { Partners } from "@/components/hero/gallery";

const HeroTest = () => {
	return (
		<div>
			<div className='slider-container'>
				<GalleryTest />
				<Partners />
			</div>
		</div>
	);
};

export default HeroTest;
