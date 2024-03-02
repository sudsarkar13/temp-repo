import Head from "next/head";
import React, { useState } from "react";
import { Nav, MobileNav } from "@/components/navigation";

const HomePage = () => {
  const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);

	return (
		<div className='overflow-x-hidden'>
			<Head>
				<title>Maa Tarini Electrical</title>
			</Head>
			<div>
        <MobileNav nav={nav} closeNav={closeNav} />
        <Nav openNav={openNav} />
				<h1 className='text-3xl font-bold underline'>Hello Babe do you notice any changes.</h1>
			</div>
		</div>
	);
};

export default HomePage;
