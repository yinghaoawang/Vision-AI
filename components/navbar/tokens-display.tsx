import { useAuthUser } from "@/app/_contexts/AuthUserContext";
import { Coins } from "lucide-react";
import { useEffect } from "react";

export default function TokensDisplay() {
  const { authUserData } = useAuthUser();
  useEffect(() => {
    console.log(authUserData);
  }, [authUserData])
  if (authUserData == null) return <></>;
  return (
    <div className="flex select-none gap-1 text-yellow-400">
      {authUserData.tokens} <Coins size={18} />
    </div>
  );
}
