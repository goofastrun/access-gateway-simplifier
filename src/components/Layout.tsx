import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  href: string;
  roles: string[];
}

const navItems: NavItem[] = [
  { label: "Главная", href: "/", roles: ["Admin", "Manager", "User"] },
  { label: "Личный кабинет", href: "/profile", roles: ["Admin", "Manager", "User"] },
  { label: "Пользователи", href: "/users", roles: ["Admin", "Manager"] },
  { label: "Роли", href: "/roles", roles: ["Admin"] },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  const filteredNavItems = navItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-card border-r animate-slide-in">
        <nav className="p-4 space-y-2">
          {filteredNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "nav-link block",
                location.pathname === item.href && "active"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}