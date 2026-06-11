"use client";

import { usePathname } from "next/navigation";

type HeaderVisibilityProps = {
  children: React.ReactNode;
};

export function HeaderVisibility({ children }: HeaderVisibilityProps) {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith("/authentication") || pathname.startsWith("/login");

  if (isAuthPage) {
    return null;
  }

  return <>{children}</>;
}
