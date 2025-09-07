import { Button } from "@/components/ui/button";
import { Home, Search, Heart, User, MessageCircle, Edit } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Search, label: "Search" },
    { icon: Edit, label: "New thread" },
    { icon: Heart, label: "Activity" },
    { icon: User, label: "Profile" },
  ];

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-background h-screen sticky top-16">
      <div className="flex-1 p-6">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "secondary" : "ghost"}
              className="w-full justify-start h-12 text-left px-4"
            >
              <item.icon className="h-6 w-6 mr-4" />
              <span className="text-base">{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>
      
      <div className="p-6 border-t">
        <Button variant="ghost" className="w-full justify-start h-12 text-left px-4">
          <MessageCircle className="h-6 w-6 mr-4" />
          <span className="text-base">Settings</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;