import React, { useState } from "react";
import Image from "next/legacy/image";

const Gallery = () => {
	return (
		<div className='max-w-[100%] h-[100%] mx-auto py-16 px-4 relative md:items-center md:justify-center'>
			<div className='w-full h-full rounded-2xl duration-500 '>
				<div className="pt-[4rem] pb-[4rem] mx-auto items-center justify-center ">
					<Image src='/images/img-1.png' alt='img' width={800} height={800} className="justify-center" />
				</div>
			</div>
		</div>
	);
};

export default Gallery;
