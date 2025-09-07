import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Feed from "@/components/feed/Feed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
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
