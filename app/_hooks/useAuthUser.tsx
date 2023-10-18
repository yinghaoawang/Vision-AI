import { UserResource } from "@clerk/types";
import { useState, useEffect, useMemo } from "react";

export type UserData = {
  id: string;
  userId: string;
  tokens: number;
  createdAt: Date;
  updatedat: Date;
};

export type UserWithData = {
  user: UserResource;
  userData: UserData;
};

let cachedUser: UserResource | null | undefined = null;
let cachedUserData: UserData | null | undefined = null;

export default function useAuthUser() {
  const [authUser, setAuthUser] = useState<UserResource | null | undefined>(
    cachedUser,
  );
  const [authUserData, setAuthUserData] = useState<UserData | null | undefined>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = (await fetch("/api/me").then((res) =>
          res.json(),
        )) as UserWithData | null;

        if (data == null) return;

        cachedUser = data.user;
        cachedUserData = data.userData;

        setAuthUser(data.user);
        setAuthUserData(data.userData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    if (cachedUser != null) {
      setAuthUser(cachedUser);
    }
    if (cachedUserData != null) {
      setAuthUserData(cachedUserData);
    }
    if (!cachedUser && !cachedUserData) {
      fetchData();
    }
  }, []);

  const memoizedUser = useMemo(() => authUser, [authUser]);
  const memoizedUserData = useMemo(() => authUserData, [authUserData]);

  return { authUser: memoizedUser, authUserData: memoizedUserData, isLoading };
}
