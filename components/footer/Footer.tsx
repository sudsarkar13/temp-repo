import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import GoogleMap from "./DIR/GoogleMap";

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
						<h1>Our Pages</h1>
						<p>About Owner</p>
						<p>Services</p>
						<p>Shop</p>
						<p>Staff</p>
					</div>
				</div>
				<div className='tfooter-content'>
					<div className='tfooter-data'>
						<h1>Quick Links</h1>
						<a
							href='/websiteImages/Logo.png'
							download='Maa Tarini Electrical Logo.png'
						>
							<p>Download Logo</p>
						</a>
						<Link href={"/sitemap.xml"}>
							<p>Sitemap</p>
						</Link>
						<p>Privacy Policy</p>
						<p>Terms & Conditions</p>
					</div>
				</div>
				<div className='tfooter-content'>
					<div className='tfooter-data'>
						<h1>Contact Us</h1>
						<p>+91 9937884307</p>
						<p>+91 7008836851</p>
					</div>
				</div>
			</div>
			<div className='tfooter-map-container'>
				<div className='tfooter-map'>
					<h1>Location</h1>
					<div className='tfooter-map-iframe'>
						<GoogleMap />
					</div>
				</div>
			</div>
			<div className='tfooter-copyright'>
				<p>© {curryear} Maa Tarini Electrical, All rights reserved.</p>
			</div>
		</div>
	);
};

export default Footer;
