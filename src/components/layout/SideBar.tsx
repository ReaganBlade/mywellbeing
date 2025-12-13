import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { House, CalendarDays, AppWindow, type LucideIcon } from "lucide-react";

interface NavLinkItem {
  to: string;
  label: string;
  Icon: LucideIcon;
}

const navLinks: NavLinkItem[] = [
  { to: "/home", label: "Home", Icon: House },
  { to: "/daily", label: "Daily", Icon: CalendarDays },
  { to: "/apps", label: "Apps", Icon: AppWindow },
];

const SideBar = () => {
  const getNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      "rounded-md px-3 py-2 text-sm transition-colors flex gap-2 align-center",
      isActive ? "bg-muted font-medium" : "text-muted-foreground hover:bg-muted"
    );

  return (
    <aside className="w-56 border-r bg-background p-4">
      <p className="mb-6 text-lg font-semibold">My Wellbeing</p>
      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className={getNavLinkClasses}>
            <link.Icon className="h-4 w-4" strokeWidth={1.75} />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
