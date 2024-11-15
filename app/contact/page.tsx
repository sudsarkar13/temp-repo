"use client";

import React from "react";
import { Button, Input, Textarea } from "@/components/ui";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const iconStyles = `text-[20px] text-accent`;

const info = [
	{
		icon: <FaPhoneAlt className={`${iconStyles}`} />,
		title: "Phone",
		description: "+91 7504614781, +91 7809518625",
	},
	{
		icon: <FaEnvelope className={`${iconStyles}`} />,
		title: "Email",
		description: "admin@sudeeptasarkar.in, sudsarkar13@gmail.com",
	},
	{
		icon: <FaMapMarkerAlt className={`${iconStyles}`} />,
		title: "Address",
		description:
			"Plot No.178, DDN - 061, P.C. Sarkar Lane, Arunodaya Nagar, Cuttack, Odisha, Pincode - 753012",
	},
];

const ContactPage: React.FC = () => {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
			}}
			className={`py-6`}>
			<div className={`container mx-auto`}>
				<div>
					{/* form */}
					<div>
						<form>form</form>
					</div>
					{/* info */}
					<div>info</div>
				</div>
			</div>
		</motion.section>
	);
};

export default ContactPage;
