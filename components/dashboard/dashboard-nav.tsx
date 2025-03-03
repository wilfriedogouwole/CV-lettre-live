"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { FileText, PenLine, LayoutDashboard, Lightbulb } from "lucide-react";

export function DashboardNav() {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Tableau de bord",
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Mes CV",
      href: "/dashboard/cv",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Mes lettres",
      href: "/dashboard/letters",
      icon: <PenLine className="mr-2 h-4 w-4" />,
    },
    {
      title: "Conseils",
      href: "/conseils",
      icon: <Lightbulb className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/dashboard" className="flex items-center">
          <FileText className="h-6 w-6 mr-2" />
          <span className="font-bold">CV Master</span>
        </Link>
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}