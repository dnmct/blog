import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  href: string;
  children: React.ReactNode;
}

export function CustomLink({ href, children }: Props) {
  const router = useRouter();
  function isActive(href: string) {
    return href === router.asPath;
  }
  return (
    <Link href={href}>
      <a
        className={clsx(
          "hover:underline",
          isActive(href) ? "text-teal-600 underline" : "text-slate-50"
        )}
      >
        {children}
      </a>
    </Link>
  );
}
