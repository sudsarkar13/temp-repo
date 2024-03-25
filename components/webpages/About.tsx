import React from "react";
import Image from "next/legacy/image";

const About = () => {
	return (
		<div id="about">
			<div className='about'>
				<div className='about-container'>
					<div>
						<h1>About</h1>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
							sit mollitia, aperiam minima voluptate totam sed harum soluta
							aliquam qui quam! Placeat reiciendis voluptatibus tempore
							doloremque, doloribus deserunt iure et!
						</p>
					</div>
					<div className='lg:w-[500px] mx-auto md:mx-0 mt-[2rem] lg:mt-0 lg:h-[500px] w-[300px] h-[300px] relative'>
						<Image
							src='/websiteImages/Logo.png'
							layout='fill'
							objectFit='contain'
							alt='...'
							className='relative z-[11] w-[100%] h-[100%] object-contain'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
