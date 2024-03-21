import React from "react";
import Link from "next/link";

const curryear = new Date().getFullYear();

const Footer = () => {
	return (
		<div className='footer'>
			<Link href={"/Test"}>
				<p className='underline'>Test (not for production use)</p>
			</Link>
			<br />
			<p>Copyright © {curryear} Maa Tarini Electrical. All rights reserved.</p>
		</div>
	);
};

export default Footer;
