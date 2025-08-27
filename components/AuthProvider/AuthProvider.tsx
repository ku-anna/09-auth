"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { checkSession, getMe, logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { User } from "@/types/user";

type Props = {
  children: ReactNode;
};

const privateRoutes = ["/profile"];
const publicRoutes = ["/sign-in", "/sign-up"];

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchUser = async () => {
      const active = await checkSession();

      if (active) {
        try {
          const user: User = await getMe();
          if (user) setUser(user);

          if (publicRoutes.some((route) => pathname.startsWith(route))) {
            router.push("/profile");
          }
        } catch (err) {
          console.error("Failed to fetch user", err);
          clearIsAuthenticated();
          await logout();
          router.push("/sign-in");
        }
      } else {
        clearIsAuthenticated();

        if (privateRoutes.some((route) => pathname.startsWith(route))) {
          router.push("/sign-in");
        }
      }
    };

    fetchUser();
  }, [pathname, router, setUser, clearIsAuthenticated]);

  return <>{children}</>;
};

export default AuthProvider;
