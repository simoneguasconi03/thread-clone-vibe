import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import api from "@/api";

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
  liked_by_user: boolean; 
  replies: number;
  reposts: number;
  images?: string[];
  onDelete: (id: string) => void;
}

const Post = ({ id, author, content, timestamp, likes, liked_by_user, replies, reposts, onDelete }: PostProps) => {
  const [isLiked, setIsLiked] = useState(liked_by_user); 
  const [likeCount, setLikeCount] = useState(likes);
  const [menuOpen, setMenuOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [replyCount, setReplyCount] = useState(replies);

  const handleLike = async () => {
    try {
      if (!isLiked) {
        const res = await api.post(`posts/${id}/like/`);
        setIsLiked(true);
        setLikeCount(res.data.likes_count);
      } else {
        const res = await api.delete(`posts/${id}/unlike/`);
        setIsLiked(false);
        setLikeCount(res.data.likes_count);
      }
    } catch (error) {
      console.error("Error during like/unlike:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const handleDelete = async () => {
    try {
      await api.delete(`posts/${id}/`);
      onDelete(id);  
    } catch (error) {
      console.error("Error deleting post ", error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await api.get(`posts/${id}/comments/`);
      setComments(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const submitComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await api.post(`posts/${id}/comment/`, {
        content: newComment,
      });

      setComments(prev => [...prev, res.data]);
      setNewComment("");
      setReplyCount(prev => prev + 1);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

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
                    className="w-full px-4 py-2 text-sm text-left hover:bg-gray-200 flex items-center gap-2"
                    onClick={() => {
                      handleDelete();
                      setMenuOpen(false);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-black" />
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
              <Heart
                className={`h-5 w-5 mr-2 transition-colors duration-200 ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-threads-gray'
                }`}
              />
              <span className="text-sm">{likeCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="threads-button text-threads-gray hover:text-foreground"
              onClick={() => {
                setShowComments(!showComments);
                if (!showComments) fetchComments();
              }}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              <span className="text-sm">{replyCount}</span>
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
          {showComments && (
            <div className="mt-4 space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="flex-1 border rounded px-3 py-1 text-sm"
                  placeholder="Scrivi un commento..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button size="sm" onClick={submitComment}>
                  Send
                </Button>
              </div>

              {comments.length > 0 ? (
                <ul className="space-y-2">
                  {comments.map((comment) => (
                    <li key={comment.id} className="border-l pl-3 text-sm text-muted-foreground">
                      <strong>{comment.author}</strong>: {comment.content}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Nessun commento ancora.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default Post;