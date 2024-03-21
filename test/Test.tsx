import React, { useState } from "react";
import Head from "next/head";
import { Nav, MobileNav } from "@/components/navigation";
import Hero from "@/components/hero/Hero";
import About from "@/components/webpages/About";

const Test = () => {
	const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);

	return (
		<div className='overflow-x-hidden'>
			<Head>
				<title>TestPage</title>
				<meta
					name='description'
					content='Test page for Maa Tarini Electrical. All new components are tested here.'
				/>
			</Head>
			<div>
				<MobileNav nav={nav} closeNav={closeNav} />
				<Nav openNav={openNav} />
				<Hero />
				<About />
			</div>
		</div>
	);
};

export default Test;
