import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Feed from "@/components/feed/Feed";

interface IndexProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Index = ({ setIsAuthenticated }: IndexProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header setIsAuthenticated={setIsAuthenticated} />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 min-w-0">
          <div className="container max-w-6xl mx-auto">
            <Feed />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
