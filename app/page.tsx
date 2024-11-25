"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import Socials from "@/components/socials/Socials";
import Photo from "@/components/photo/Photo";
import { motion } from "framer-motion";
import Stats from "@/components/stats/Stats";

const Home: React.FC = () => {
	return (
		<section className={`h-full`}>
			<div className={`container mx-auto`}>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { delay: 2, duration: 0.4, ease: "easeIn" },
					}}
					className={`flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24`}>
					{/* text */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: { delay: 2.4, duration: 0.4, ease: "easeInOut" },
						}}
						className={`text-center xl:text-left order-2 xl:order-none`}>
						<span className={`text-base xl:text-xl`}>
							Frontend Web Developer
						</span>
						<h1 className={`h1 mb-6`}>
							Hello I'm <br />{" "}
							<span className={`text-accent`}>Sudeepta Sarkar</span>
						</h1>
						<p className={`max-w-[500px] mb-9 text-white/80`}>
							I'm a Frontend Web Developer as well as CTO at Dr. Reach -
							Healthunity Solutions Pvt Ltd. I have experience in building web
							applications using React, Next.js, and Tailwind CSS.{" "}
							<span className={`hidden md:inline`}>
								I have a strong understanding of the latest web technologies and
								can contribute to the development of cutting-edge web
								applications.
							</span>
						</p>
						{/* button and socials */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{
								opacity: 1,
								transition: { delay: 2, duration: 0.4, ease: "easeIn" },
							}}
							className={`flex flex-col xl:flex-row gap-8 items-center`}>
							<Link href={`/files/Resume.pdf`} target="_blank">
								<Button
									variant={`outline`}
									size={`lg`}
									className={`flex items-center justify-center gap-2`}>
									<span>Download Resume</span>
									<span className={`animate-bounce`}>
										<Download className={`text-xl`} />
									</span>
								</Button>
							</Link>
							<div className={`mb-8 xl:mb-0`}>
								<Socials
									containerStyles={`flex gap-6`}
									iconStyles={`w-10 h-10 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover: transition-all duration-500`}
								/>
							</div>
						</motion.div>
					</motion.div>
					{/* photo */}
					<div className={`order-1 xl:order-none mb-8 xl:mb-0`}>
						<Photo />
					</div>
				</motion.div>
				{/* stats */}
				<div>
					<Stats />
				</div>
			</div>
		</section>
	);
};

export default Home;
