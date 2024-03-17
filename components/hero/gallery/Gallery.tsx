/* eslint-disable @next/next/no-img-element */
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 1,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 1,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
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

const Gallery = ({ }) => {
	return (
		<div className='slider'>
			<Carousel
				swipeable={true}
				draggable={true}
				showDots={true}
				responsive={responsive}
				ssr={true} // means to render carousel on server-side.
				infinite={true}
				autoPlay={true}
				autoPlaySpeed={2000}
				keyBoardControl={true}
				customTransition='all .5'
				transitionDuration={500}
				containerClass='carousel-container'
				removeArrowOnDeviceType={["tablet", "mobile"]}
				dotListClass='custom-dot-list-style'
				itemClass='carousel-item-padding-40-px'
			>
				{sliderImageSrc.map((imageSrc, index) => {
					return (
						<div className='slider' key={index}>
							<img src={imageSrc.src} alt='Gallery Images' />
						</div>
					);
				})}
			</Carousel>
		</div>
	);
};

export default Gallery;
