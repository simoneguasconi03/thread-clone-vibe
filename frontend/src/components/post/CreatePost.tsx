import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import api from "@/api";

type CreatePostProps = {
  onPostCreated: (newPost: any) => void;
};

const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) {
      return;
    }

    try {
      const response = await api.post('posts/', { content });

      const newPost = await response.data;
      onPostCreated(newPost);
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="bg-card text-card-foreground dark:bg-[#1a1a1a] dark:text-white rounded-xl p-4 mb-4 shadow-sm">
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
            className="min-h-[100px] border-0 bg-transparent p-0 text-lg placeholder:text-threads-gray focus-visible:ring-3 resize-none"
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