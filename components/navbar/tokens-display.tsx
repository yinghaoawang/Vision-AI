import { Coins } from "lucide-react";
export default function TokensDisplay() {
  return (
    <div className="flex select-none gap-1 text-yellow-400">
      100 <Coins size={18} />
    </div>
  );
}
