import { useClerk } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
export default function SignOutButton({ children }: { children?: string }) {
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className="font-bold text-red-500/80 hover:text-red-500"
      onClick={() => signOut(() => router.push("/"))}
    >
      {children || "Sign Out"}
    </Button>
  );
}
