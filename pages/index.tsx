import Head from "next/head";
import React, { useState } from "react";
import { Nav, MobileNav } from "@/components/navigation";
import Hero from "@/components/hero/Hero";
import About from "@/components/webpages/About";

const HomePage = () => {
	const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);

	return (
		<div className='overflow-x-hidde'>
			<Head>
				<title>Maa Tarini Electrical</title>
				<meta
					name='description'
					content='Maa Tarini Electrical is an electrical shop based in Cuttack, Odisha. We offer complete range of electrical services.'
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

export default HomePage;
