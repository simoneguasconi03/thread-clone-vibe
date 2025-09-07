import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const CreatePost = () => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      // Handle post creation here
      console.log("Creating post:", content);
      setContent("");
    }
  };

  return (
    <div className="border-b bg-background p-4">
      <div className="flex space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">U</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <Textarea
            placeholder="What's new?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] border-0 bg-transparent p-0 text-lg placeholder:text-threads-gray focus-visible:ring-0 resize-none"
          />
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-threads-gray">
              {content.length}/500
            </div>
            
            <Button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="threads-button bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;