import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navigation/Navbar";
import React from "react";

export default function Layout({ children }) {
	return (
		<div>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</div>
	);
}
