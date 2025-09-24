import Post from "@/components/post/Post";
import CreatePost from "@/components/post/CreatePost";
import { useEffect, useState } from "react";
import api from "@/api";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("posts/")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleNewPost = (newPost: any) => {
    setPosts([newPost, ...posts]);
  }

  const handleDelete = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className="max-w-2xl mx-auto bg-background">
      <CreatePost onPostCreated={handleNewPost}/>
      
      <div className="divide-y">
        {posts.map((post) => (
          <Post 
            key={post.id} 
            {...post}
            author={{
              username: post.author,
              displayName: post.author,
              avatar: "",
              verified: false,
            }}
            timestamp={new Date(post.created_at).toLocaleTimeString()}
            likes={post.likes_count}
            liked_by_user={post.liked_by_user}
            replies={post.replies_count}
            reposts={0}
            onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Feed;