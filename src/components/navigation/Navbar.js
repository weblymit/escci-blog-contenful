import Link from "next/link";
import React from "react";

export default function Navbar() {
	return (
		<div>
			<ul>
				<Link href='/'>
					<li>Home</li>
				</Link>
				<Link href='/about'>
					<li>About</li>
				</Link>
				<Link href='/contact'>
					<li>Contact</li>
				</Link>
				<Link href='/post/23'>
					<li>Voir Post</li>
				</Link>
			</ul>
		</div>
	);
}
