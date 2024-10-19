import { Mountain } from "lucide-react";
// shad-cn ui componenets
import { Button } from "@/components/ui/button";
// React router om
import { Link, useNavigate } from "react-router-dom";
// auth context
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { company, logout } = useAuth();
  const router = useNavigate();

  const handleLogout = () => {
    logout();
    router("/login");
  };
  return (
    <header className="flex h-16 items-center justify-between px-4 lg:px-6 z-50 absolute w-full bg-white">
      <Link className="flex items-center gap-2" to="/">
        <img src="/cuvette.png" className="h-[1.5rem]" />
      </Link>
      <nav className="flex gap-4 sm:gap-6">
        <Button variant="ghost" asChild>
          <Link to="/">Contact</Link>
        </Button>
        {company && (
          <div className="flex space-x-3 justify-center items-center">
            <span className="text-sm font-medium">{company.name}</span>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
