"use client";
import AuthLayout from "./auth.layout";
import RootLayout from "./home.layout";
import { usePathname } from "next/navigation";
import { activeLink } from "@/common/utils";
import { useUserType } from "@/common/hooks/useUserType";
import { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/common/routes";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const storedUser = useUserType();
  const router = useRouter();

  return activeLink("/auth", pathname) ? (
    <AuthLayout> {children}</AuthLayout>
  ) : (
    <RootLayout>{children}</RootLayout>
  );
}
