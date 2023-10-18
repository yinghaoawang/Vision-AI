"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { UserResource } from "@clerk/types";

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

type AuthUserContextType = {
  authUser: UserResource | null;
  authUserData: UserData | null;
  isLoading: boolean;
  reloadAuthUser: () => void;
};

const AuthUserContext = createContext<AuthUserContextType>({
  authUser: null,
  authUserData: null,
  isLoading: false,
  reloadAuthUser: function (): void {},
});

let cachedUser: UserResource | null = null;
let cachedUserData: UserData | null = null;

export function useAuthUser() {
  return useContext(AuthUserContext);
}

export function AuthUserProvider({ children }: { children: ReactNode }) {
  const [authUser, setAuthUser] = useState<UserResource | null>(cachedUser);
  const [authUserData, setAuthUserData] = useState<UserData | null>(
    cachedUserData,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidated, setIsInvalidated] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = (await fetch("/api/me").then((res) =>
          res.json(),
        )) as UserWithData | null;

        if (data == null) return;

        cachedUser = data.user;
        cachedUserData = data.userData;

        setAuthUser({ ...data.user });
        setAuthUserData({ ...data.userData });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    if (isInvalidated) {
      fetchData();
      setIsInvalidated(false);
      return;
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
  }, [isInvalidated]);

  const reloadAuthUser = () => {
    setIsInvalidated(true);
  };

  const memoizedUser = useMemo(() => authUser, [authUser]);
  const memoizedUserData = useMemo(() => authUserData, [authUserData]);
  const value = {
    authUser: memoizedUser,
    authUserData: memoizedUserData,
    isLoading,
    reloadAuthUser,
  };

  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  );
}
