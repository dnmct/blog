import { GetStaticProps, NextPage } from "next";
import fs from "fs";
import path from "path";

interface Props {
  posts: any[];
}
const Posts: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post}>{post}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = () => {
  const posts: any[] = fs.readdirSync("__posts");
  console.log(posts);
  return {
    props: {
      posts,
    },
  };
};
