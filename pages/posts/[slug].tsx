import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import type { Post } from ".";
import fs from "fs";
import { ParsedUrlQuery } from "querystring";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import md from "markdown-it";

interface IPost extends Post {
  content: string;
}

interface Props {
  post: IPost;
}

const Post: NextPage<Props> = ({ post }) => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div>
      <h2 className="mb-8 text-2xl font-bold">{post.frontMatter.title}</h2>
      <ReactMarkdown className="prose">{post.content}</ReactMarkdown>
    </div>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = () => {
  const files = fs.readdirSync("__posts");
  const paths = files.map((file) => {
    const slug = file.replace(".md", "");
    return {
      params: {
        slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  interface Params extends ParsedUrlQuery {
    slug: string;
  }
  const { slug } = params as Params;
  const file = fs.readFileSync(`__posts/${slug}.md`, { encoding: "utf-8" });
  const { data: frontMatter, content } = matter(file);

  return {
    props: {
      post: {
        slug,
        frontMatter,
        content,
      },
    },
  };
};
