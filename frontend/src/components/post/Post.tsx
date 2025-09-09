import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

interface PostProps {
  id: string;
  author: {
    username: string;
    displayName: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  reposts: number;
  images?: string[];
}

const Post = ({ author, content, timestamp, likes, replies, reposts }: PostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <article className="threads-card border-b px-4 py-6 hover:bg-accent/50 transition-colors">
      <div className="flex space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {author.username.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-sm">{author.username}</h3>
              <span className="text-threads-gray text-sm">{timestamp}</span>
            </div>
            <div className="relative">
              <Button 
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-threads-gray hover:text-foreground"
                onClick={toggleMenu}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
               {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-popover border border-border rounded-md shadow-lg z-10">
                  <button
                    className="w-full px-4 py-2 text-sm text-left text-destructive hover:bg-destructive/10 flex items-center gap-2"
                    onClick={() => {
                      // TODO: implementa handleDelete()
                      setMenuOpen(false);
                      console.log("Delete clicked"); // temporaneo
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Post content */}
          <div className="mt-2">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">{content}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-4 max-w-md">
            <Button
              variant="ghost"
              size="sm"
              className="threads-button text-threads-gray hover:text-foreground -ml-2"
              onClick={handleLike}
            >
              <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="text-sm">{likeCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="threads-button text-threads-gray hover:text-foreground"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              <span className="text-sm">{replies}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="threads-button text-threads-gray hover:text-foreground"
            >
              <Repeat2 className="h-5 w-5 mr-2" />
              <span className="text-sm">{reposts}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="threads-button text-threads-gray hover:text-foreground"
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;