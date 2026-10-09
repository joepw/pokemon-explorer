import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function ButtonLink({ href, children }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className="cursor-pointer rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
    >
      {children}
    </Link>
  );
}