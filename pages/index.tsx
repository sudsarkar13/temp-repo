import Head from "next/head";
import React from "react";

const HomePage = () => {
	return (
		<div>
			<Head>
				<title>Maa Tarini Electrical</title>
				<meta
					name='description'
					content='Electrical Shop & Repairing Services'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<h1 className='text-3xl font-bold underline'>Hello world!</h1>
		</div>
	);
};

export default HomePage;