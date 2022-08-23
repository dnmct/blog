import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useReducer, useState } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (email) {
      router.push("/about");
    } else {
      alert("Put something in email");
    }
  }
  return (
    <div>
      <h1>My Blog</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae a rerum
        obcaecati voluptatum eum, eius sequi quam nisi animi et.
      </p>
      <form onSubmit={onSubmit}>
        <input
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          type="text"
          placeholder="E-Mail"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Home;
