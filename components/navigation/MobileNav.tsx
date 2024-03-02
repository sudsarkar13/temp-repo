import React from "react";
import Image from "next/legacy/image";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface Props {
	nav: boolean;
	closeNav: () => void;
}

const MobileNav = ({ nav, closeNav }: Props) => {
	const navAnimation = nav ? "translate-x-0" : "translate-x-[-100%]";

	return (
		<div
			className={`fixed ${navAnimation} transform transition-all duration-300 top-0 left-0 right-0 bottom-0 z-[1000000] bg-[#F1B61F]`}
		>
			<div className='w-[100vw] h-[100vh] flex flex-col items-center justify-center'>
				<div className='mnav-link uppercase'>Home</div>
				<div className='mnav-link uppercase'>About</div>
				<div className='mnav-link uppercase'>Services</div>
				<div className='mnav-link uppercase'>Projects</div>
				<div className='mnav-link uppercase'>Blog</div>
				<div className='mnav-link uppercase'>Contact</div>
			</div>
			<div
				onClick={closeNav}
				className='absolute z-[100000000] cursor-pointer top-[2rem] right-[2rem] w-[2rem] h-[2rem] text-white'
			>
				<XMarkIcon />
			</div>
		</div>
	);
};

export default MobileNav;
