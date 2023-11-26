import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

export default function useUser({
  redirectTo = "https://deployed-lsoccer.vercel.app/login",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR("https://deployed-lsoccer.vercel.app/api/user");

  useEffect(() => {
    if (!redirectTo || !user) return;

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}