import React from "react";
import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import { BsWhatsapp as Whatsapp } from "react-icons/bs";

const socials = [
	{
		icon: <Facebook />,
		link: "https://www.facebook.com/sudeepta.sarkar.589",
		target: "_blank",
	},
	{
		icon: <Github />,
		link: "https://github.com/sudsarkar13",
		target: "_blank",
	},
	{
		icon: <Instagram />,
		link: "https://www.instagram.com/sudee.ptasofficial/",
		target: "_blank",
	},
	{
		icon: <Linkedin />,
		link: "https://www.linkedin.com/in/sudeepta-sarkar",
		target: "_blank",
	},
	{
		icon: <Whatsapp className={`text-2xl`} />,
		link: "https://api.whatsapp.com/send/?phone=%2B917504614781",
		target: "_blank",
	},
];

export interface styles {
	containerStyles: string;
	iconStyles: string;
}

const Socials: React.FC<styles> = ({ containerStyles, iconStyles }) => {
	return (
		<main className={containerStyles}>
			{socials.map((social, index) => {
				return (
					<div key={index}>
						<Link
							href={social.link}
							target={social.target}
							className={iconStyles}>
							{social.icon}
						</Link>
					</div>
				);
			})}
		</main>
	);
};

export default Socials;
