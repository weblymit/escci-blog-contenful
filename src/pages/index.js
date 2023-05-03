import Layout from "@/components/Layout";
import Card from "@/components/cards/Card";
import { createClient } from "contentful";

export default function Home({ posts }) {
	return (
		<Layout>
			<h1 className=''>Home page</h1>
			{posts.map((post) => (
				<Card
					key={post.sys.id}
					post={post}
					img={post.fields.featuredImage.fields.file.url}
				/>
			))}
		</Layout>
	);
}

export async function getStaticProps() {
	// 1- Connect to contentful
	const client = createClient({
		space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
		accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
	});

	// 2- Recuperer data en cas de succes pour le content_type => escciBlog
	// Je limite a 8 posts
	const data = await client.getEntries({
		content_type: "escciBlog",
		order: "sys.createdAt",
		limit: 8,
	});

	// 3- On envoie la data dans le props de ma page
	return {
		props: {
			posts: data.items,
		},
	};
}
