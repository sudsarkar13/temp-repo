import React, { useState } from "react";
import Head from "next/head";
import { NavTest, MobileNavTest } from "@/test/components/navigation";
import HeroTest from "@/test/components/hero/HeroTest";
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
				<MobileNavTest nav={nav} closeNav={closeNav} />
				<NavTest openNav={openNav} />
				<HeroTest />
				<About />
			</div>
		</div>
	);
};

export default Test;
