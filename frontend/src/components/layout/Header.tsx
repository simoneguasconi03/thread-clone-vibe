import { Button } from "@/components/ui/button";
import { Search, Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setIsAuthenticated }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    navigate("/auth", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">@</h1>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-ring focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            aria-label="Logout"
            title="Logout"
          >
            <LogOut className="h-6 w-6 text-black" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;