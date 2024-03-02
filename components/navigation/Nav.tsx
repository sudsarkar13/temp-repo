import React from "react";
import Image from "next/legacy/image";
import { Bars3Icon } from "@heroicons/react/20/solid";

interface Props {
	openNav: () => void;
}

const Nav = ({ openNav }: Props) => {
	return (
		<div className='w-[100%] fixed z-[10000] top-0 h-[10.5vh] bg-[#F1B61F] shadow-md'>
			<div className='flex items-center justify-between w-[92%] mx-auto h-[100%]'>
				{/* <Image src='/websiteImages/Logo.png' width={80} height={80} className='nav-logo' alt={"logo"} /> */}
				<Image src='/favicon.ico' width={70} height={70} className='nav-logo' alt={"logo"} />
				<h1 className='nav-logo-txt'>
					Maa Tarini Electrical
				</h1>
				<div className='nav-link uppercase'>Home</div>
				<div className='nav-link uppercase'>About</div>
				<div className='nav-link uppercase'>Services</div>
				<div className='nav-link uppercase'>Projects</div>
				<div className='nav-link uppercase'>Blog</div>
				<div className='nav-link uppercase'>Contact</div>
				<div onClick={openNav}>
					<Bars3Icon className='w-[2rem] md:hidden h-[2rem]w cursor-pointer text-white font-extrabold' />
				</div>
			</div>
		</div>
	);
};

export default Nav;
