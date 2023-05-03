import React from "react";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "@/components/Layout";

// 1- Connection a contentful
const client = createClient({
	space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
	accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// 2- Generer ou recuperer tous les slugs de mes articles
export async function getStaticPaths() {
	// A- Recupere mes posts dans contentful
	const res = await client.getEntries({
		content_type: "escciBlog",
	});
	// B- Recupere les slugs des posts
	const slugs = res.items.map((item) => {
		return {
			params: { slug: item.fields.slug },
		};
	});
	// C- Renvoie tous les slugs dans paths (chemins || route)
	return {
		paths: slugs,
		fallback: false, // Tous les slugs qui ne sont pas mon paths => page 404
	};
}

// 3- Recuperer data du post en fonction du slug
export async function getStaticProps({ params }) {
	// A- Recupere la data lié au slug
	const res = await client.getEntries({
		content_type: "escciBlog",
		"fields.slug": params.slug,
	});
	// B- Je stock la data du post dans une variable
	const post = res.items;
	return {
		props: {
			post: post[0],
		},
	};
}

export default function Index({ post }) {
	const { title, content, featuredImage } = post.fields;
	return (
		<Layout>
			<img
				src={featuredImage.fields.file.url}
				alt={title}
				className='max-w-xs'
			/>
			<p>{title}</p>
			<div>{documentToReactComponents(content)}</div>
		</Layout>
	);
}
