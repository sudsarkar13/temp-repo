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

const info = [
	{
		icon: <FaPhoneAlt />,
		title: "Phone",
		description: "+91 7504614781, +91 7809518625",
	},
	{
		icon: <FaEnvelope />,
		title: "Email",
		description: "admin@sudeeptasarkar.in, sudsarkar13@gmail.com",
	},
	{
		icon: <FaMapMarkerAlt />,
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
				<div className={`flex flex-col xl:flex-row gap-[30px]`}>
					{/* form */}
					<div className={`xl:w-[54%] order-2 xl:order-none`}>
						<form
							className={`flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl`}>
							<h3 className={`text-4xl text-accent`}>Let's Talk</h3>
							<p className={`text-white/60`}>
								Great things are never done by one person. They're done by a
								team of people working together. Let's collaborate and bring
								your vision to life. Whether you have a specific project in mind
								or just want to explore possibilities, I'm here to help turn
								your ideas into reality. Together, we can create something
								extraordinary.
							</p>
							{/* input */}
							<div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
								<Input type="firstname" placeholder="First Name" />
								<Input type="lastname" placeholder="Last Name" />
								<Input type="email" placeholder="Email Address" />
								<Input type="phone" placeholder="Phone Number" />
							</div>
							{/* select */}
							<Select>
								<SelectTrigger className={`w-full `}>
									<SelectValue placeholder={`Select a service`} />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Select a service</SelectLabel>
										<SelectItem value="web-development">
											Web Development
										</SelectItem>
										<SelectItem value="uiux-design">UI/UX Design</SelectItem>
										<SelectItem value="android-app-development">
											Android App Development
										</SelectItem>
										<SelectItem value="seo">SEO</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
							{/* textarea */}
							<Textarea
								placeholder="Type your message here."
								className={`h-[200px]`}
							/>
							{/* button */}
							<div className={`flex justify-center`}>
								<Button size={`md`} type="submit" className={`max-w-40`}>
									Send message
								</Button>
							</div>
						</form>
					</div>
					{/* info */}
					<div
						className={`flex flex-1 items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0`}>
						<ul className={`flex flex-col gap-10`}>
							{info.map((item, index) => {
								return (
									<li key={index} className={`flex items-center gap-6`}>
										<div
											className={`w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center`}>
											<div className={`text-[28px]`}>{item.icon}</div>
										</div>
										<div className={`flex-1`}>
											<p className={`text-white/60`}>{item.title}</p>
											<h3 className={`text-lg xl:text-xl flex flex-wrap`}>
												{item.description}
											</h3>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</motion.section>
	);
};

export default ContactPage;
