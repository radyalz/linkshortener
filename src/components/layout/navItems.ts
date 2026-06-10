export const navItems = [
  {
    label: "Home",
    href: "/",
    isActive: (pathname: string) => pathname === "/",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    isActive: (pathname: string) => pathname.startsWith("/dashboard"),
  },
];