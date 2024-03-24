import React from "react";
import Image from "next/legacy/image";

const About = () => {
	return (
		<div>
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
						{/* <Image src='/websiteImages/Logo.png' layout="fill" alt="..." /> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
