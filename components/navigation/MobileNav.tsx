import React from "react";
import Image from "next/legacy/image";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface Props {
	nav: boolean;
	closeNav: () => void;
}

const MobileNav = ({ nav, closeNav }: Props) => {
	const navAnimation = nav ? "translate-x-0" : "translate-x-[-100%]";

	return (
		<div
			className={`fixed ${navAnimation} transform transition-all duration-300 top-0 left-0 right-0 bottom-0 z-[1000000] bg-[#141C27]`}
		>
			<div className='w-[100vw] h-[100vh] flex flex-col items-center justify-center'>
				<div className='mnav-link mnav'>Home</div>
				<div className='mnav-link mnav'>About</div>
				<div className='mnav-link mnav'>Services</div>
				<div className='mnav-link mnav'>Shop</div>
				<div className='mnav-link mnav'>Contact</div>
				<Link href={'/test'}>
					<div className='mnav-link mnav'>Test</div>
				</Link>
			</div>
			<div
				onClick={closeNav}
				className='absolute z-[100000000] cursor-pointer top-[2rem] right-[2rem] w-[2rem] h-[2rem] text-white'
			>
				<XMarkIcon className='font-[1700] text-white' />
			</div>
		</div>
	);
};

export default MobileNav;
