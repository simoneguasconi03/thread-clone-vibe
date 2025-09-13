import { Button } from "@/components/ui/button";
import { Search, Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import api from "@/api";

interface HeaderProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setIsAuthenticated }: HeaderProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setShowResults(false);
      return;
    }

    const delayDebounce = setTimeout(() => {
      const fetchData = async () => {
        try {
          const res = await api.get('users/search', { params: { q: query } });
          console.log("API response:", res.data);
          setResults(res.data.data);
          setShowResults(true);
        } catch (error) {
          console.error("Errore nella ricerca utenti:", error);
        }
      };
      fetchData();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <div className="flex-1 max-w-md mx-4 relative" ref={containerRef}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowResults(true)} // mostra sempre quando c’è focus
            placeholder="Search"
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-ring focus:outline-none transition-all"
          />

          {/* Dropdown risultati */}
          {showResults && results.length > 0 && (
            <ul className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md z-50 max-h-60 overflow-y-auto">
              {results.map((user) => (
                <li
                  key={user.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-col"
                  onClick={() => {
                    navigate(`/profile/${user.username}`);
                    setShowResults(false);
                    setQuery("");
                  }}
                >
                  <span className="font-medium">@{user.username}</span>
                  <span className="text-sm text-gray-500">
                    {user.first_name} {user.last_name}
                  </span>
                </li>
              ))}
            </ul>
          )}
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