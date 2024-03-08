import Head from "next/head";
import React, { useState } from "react";
import { Nav, MobileNav } from "@/components/navigation";
import Hero from "@/components/hero/Hero";

const HomePage = () => {
	const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);

	return (
		<div className='overflow-x-hidden bg-red-900 bg-cover'>
			<Head>
				<title>Maa Tarini Electrical</title>
			</Head>
			<div>
				<MobileNav nav={nav} closeNav={closeNav} />
				<Nav openNav={openNav} />
				<Hero />
			</div>
		</div>
	);
};

export default HomePage;
