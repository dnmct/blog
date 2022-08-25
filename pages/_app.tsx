import type { AppProps } from "next/app";
import { CustomLink } from "../components/CustomLink";
import "../styles/globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
