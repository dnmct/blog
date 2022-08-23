import { NextPage } from "next";
import { useRouter } from "next/router";

const Post: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div>
      <span>{slug}</span>
    </div>
  );
};

export default Post;
