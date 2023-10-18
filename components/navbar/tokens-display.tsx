import useAuthUser from "@/app/_hooks/useAuthUser";
import { Coins } from "lucide-react";

export default function TokensDisplay() {
  const { authUserData } = useAuthUser();
  if (authUserData == null) return <></>;
  return (
    <div className="flex select-none gap-1 text-yellow-400">
      {authUserData.tokens} <Coins size={18} />
    </div>
  );
}
