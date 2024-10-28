import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import Nav from "./Nav";

const Header: React.FC = () => {
	return (
		<main>
			<header className={`py-8 xl:py-12 text-white`}>
				<div className={`container mx-auto flex justify-between`}>
					{/* logo */}
					<Link href={`/`}>
						<h1 className={`text-4xl font-semibold`}>
							Sudeepta <span className={`text-accent`}>.</span>
						</h1>
					</Link>
					{/* desktop nav & hire me button */}
					<div className={`hidden xl:flex items-center gap-8`}>
						<Nav />
						<Link href={`/contact`}>
							<Button className={`bg-[#151518]`}>Hire me</Button>
						</Link>
					</div>

          {/* mobile nav */}
          <div className={`xl:hidden`}>mobile nav</div>
				</div>
			</header>
		</main>
	);
};

export default Header;
