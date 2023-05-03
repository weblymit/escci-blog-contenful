import Link from "next/link";
import React from "react";

export default function Card({ post }) {
	console.log("post:", post);
	const { title, excerpt, featuredImage, slug } = post.fields;
	return (
		<div>
			<Link href={`post/${slug}`}>
				<img
					src={featuredImage.fields.file.url}
					alt={title}
					className='max-w-xs'
				/>
				<p className='font-bold'>{title}</p>
				<p>{excerpt}</p>
			</Link>
		</div>
	);
}
