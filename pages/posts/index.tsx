import { GetStaticProps, NextPage } from "next";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

export type Post = {
  slug: string;
  frontMatter: {
    author: string;
    title: string;
    created: string;
    excerpt: string;
    image: string;
  };
};

interface Props {
  posts: Post[];
}
const Posts: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Posts</h1>
      <div className="grid grid-cols-3 gap-8">
        {posts.map(
          ({
            slug,
            frontMatter: { title, author, created, image, excerpt },
          }) => (
            <Link href={`/posts/${slug}`} key={slug}>
              <a>
                <div className="border border-slate-700">
                  <img src={image} alt={title} />
                  <div className="p-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <h3 className="font-medium">{author}</h3>
                    <span className="mb-6 block text-sm">{created}</span>
                    <p>{excerpt}</p>
                  </div>
                </div>
              </a>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = () => {
  const files = fs.readdirSync("__posts");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const file = fs.readFileSync(`__posts/${fileName}`, { encoding: "utf8" });
    const { data: frontMatter } = matter(file);
    return {
      slug,
      frontMatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
};
