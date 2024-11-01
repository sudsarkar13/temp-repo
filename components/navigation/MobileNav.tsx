"use client";

import React from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";

const links = [
	{
		name: "Home",
		path: "/",
	},
	{
		name: "Services",
		path: "/services",
	},
	{
		name: "Resume",
		path: "/resume",
	},
	{
		name: "Work",
		path: "/work",
	},
	{
		name: "Contact",
		path: "/contact",
	},
];

const MobileNav: React.FC = () => {
	const pathname = usePathname();
	return (
		<Sheet>
			<SheetTrigger className={`flex justify-center items-center`}>
				<MenuIcon className={`text-[32px] text-accent`} />
			</SheetTrigger>
			<SheetContent className={`flex flex-col`}>
				<SheetTitle className={`text-2xl`}></SheetTitle>
				<SheetDescription className={`text-sm`}></SheetDescription>
				{/* logo */}
				<div className={`mt-10 mb-16 text-center`}>
					<Link href={`/`}>
						<h1 className={`text-2xl font-semibold`}>
							Sudeepta<span className={`text-accent`}>.</span>
						</h1>
					</Link>
				</div>
				<nav className={`flex flex-col justify-center items-center gap-8`}>
					{links.map((link, index) => {
						return (
							<Link
								href={link.path}
								key={index}
								className={`${
									link.path === pathname &&
									"text-accent border-b-2 border-accent"
								} text-xl hover:text-accent transition-all`}>
								{link.name}
							</Link>
						);
					})}
				</nav>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNav;
