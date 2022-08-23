import { GetServerSideProps, GetStaticProps } from "next";

const TestPage = ({ number }: { number: number }) => {
  return <span>{number}</span>;
};

export default TestPage;

export const getStaticProps: GetStaticProps = async () => {
  const number = Math.random() * 1000;
  // const json = await fetch("http://localhost:3000/api/hello").then((res) =>
  //   res.json()
  // );
  // const name = json.name;
  return {
    props: {
      number,
    },
  };
};
