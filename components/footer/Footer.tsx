import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import GoogleMap from './DIR/GoogleMap';

const curryear = new Date().getFullYear();

const Footer = () => {
	return (
		<div className='tfooter'>
			<div className='tfooter-main'>
				<div className='tfooter-content'>
					<div className='tfooter-logo'>
						<Link href={"/"}>
							<Image
								src='/websiteImages/Logo.png'
								width={100}
								height={100}
								alt='logo'
							/>
						</Link>
					</div>
					<div className='tfooter-address'>
						<h1>Address</h1>
						<p>
							Shop No. -4,
							<br />
							P.C. Sarkar Lane, Arunodaya Nagar,
							<br />
							Cuttack, Odisha 753012
							<br />
							Landmark: Near Nanda Gopal Sweet Stall
						</p>
					</div>
				</div>
				<div className='tfooter-content'>
					<div className='tfooter-data'>
						<h1>Pages</h1>
						<p>Home</p>
						<p>About</p>
						<p>Services</p>
						<p>Shop</p>
						<p>Contact</p>
					</div>
				</div>
				<div className='tfooter-content'>
					<div className='tfooter-data'>
						<h1>Other Links</h1>
						<Link href={"/sitemap.xml"}>
							<p>Sitemap</p>
						</Link>
						<p>Privacy Policy</p>
						<p>Terms & Conditions</p>
						<br />
						<h1>Contact Us</h1>
						<p>+91 9937884307</p><br />
						<p>+91 70088 36851</p>
					</div>
				</div>
				<div className='tfooter-content'>
					<div className='tfooter-data'>
						<h1>Map</h1>
						<div className="tfooter-map">
							<GoogleMap />
						</div>
					</div>
				</div>
			</div>
			<div className='tfooter-copyright'>
				<p>
					Copyright © {curryear} Maa Tarini Electrical, All rights reserved.
				</p>
			</div>
		</div>
	);
};

export default Footer;
