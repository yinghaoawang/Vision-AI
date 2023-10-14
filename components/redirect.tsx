import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Redirect = ({ to }: { to: string }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Redirect;
