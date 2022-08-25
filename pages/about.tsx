import type { NextPage } from "next";
import Image from "next/future/image";
import Head from "next/head";
import nessImg from "../public/images/ness.jpeg";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <div>
        <h1>About</h1>
        <Image src={nessImg} alt="" />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae a
          rerum obcaecati voluptatum eum, eius sequi quam nisi animi et.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae a
          rerum obcaecati voluptatum eum, eius sequi quam nisi animi et.
        </p>
      </div>
    </>
  );
};

export default About;
