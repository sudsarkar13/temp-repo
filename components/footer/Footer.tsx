import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";

const curryear = new Date().getFullYear();

const Footer = () => {
	return (
		<div className='tfooter'>
			<div className='flex p-[1.5rem] gap-[2rem]'>
				<Link href={"/"}>
					<Image
						src='/websiteImages/Logo.png'
						width={100}
						height={100}
						alt='logo'
					/>
				</Link>
				<div className='mt-[0.5rem] font-bold'>
					<h1>Maa Tarini Electrical</h1>
					<p>
						Shop No. -4,
						<br />
						P.C. Sarkar Lane, Arunodaya Nagar,
						<br />
						Cuttack, Odisha 753012
					</p>
				</div>
			</div>
			{/* <div>
				<p>
					Copyright © {curryear} Maa Tarini Electrical. All rights reserved.
				</p>
			</div> */}
		</div>
	);
};

export default Footer;
