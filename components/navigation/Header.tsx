import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui";

const Header: React.FC = () => {
	return (
		<main>
			<header className={`py-8 xl:py-12 text-white`}>
				<div className={`container mx-auto`}>
					{/* logo */}
					<Link href={`/`}>
						<h1 className={`text-4xl font-semibold`}>
							Sudeepta <span className={`text-accent`}>.</span>
						</h1>
					</Link>
				</div>
			</header>
		</main>
	);
};

export default Header;
