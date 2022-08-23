import type { AppProps } from "next/app";
import { CustomLink } from "../components/CustomLink";
import "../styles/globals.css";
import { HomeIcon, HeartIcon } from "@heroicons/react/outline";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <header className="flex justify-between bg-slate-700 p-4 text-white">
        <h1>NextJS Blog</h1>
        <nav className="flex gap-4">
          <CustomLink href="/">Home</CustomLink>
          <CustomLink href="/about">About</CustomLink>
          <CustomLink href="/posts">Posts</CustomLink>
        </nav>
      </header>
      <div className="bg-slate-50 p-4 text-slate-800">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
