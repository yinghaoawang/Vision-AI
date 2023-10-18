import { Coins } from "lucide-react";
import { useEffect, useState } from "react";

export type UserData = {
  id: string;
  userId: string;
  tokens: number;
  createdAt: Date;
  updatedat: Date;
};

export default function TokensDisplay() {
  const [userData, setUserData] = useState<UserData>();
  useEffect(() => {
    (async () => {
      const data = await fetch("/api/user-data").then((res) => res.json());
      setUserData(data as UserData);
    })();
  }, []);
  if (userData == null) return <></>;
  return (
    <div className="flex select-none gap-1 text-yellow-400">
      {userData.tokens} <Coins size={18} />
    </div>
  );
}
