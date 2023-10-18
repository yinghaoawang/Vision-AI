import useAuthUser from "@/app/_hooks/useAuthUser";
import Image from "next/image";
import Link from "next/link";

export const NavbarLogo = () => {
  const { authUser } = useAuthUser();
  return (
    <Link
      href={authUser ? "/dashboard" : "/login"}
      className="flex w-full items-center gap-3 py-3 font-semibold"
    >
      <Image width={40} height={40} src="/logo.svg" alt="Logo" />
      <span>Vision AI</span>
    </Link>
  );
};
