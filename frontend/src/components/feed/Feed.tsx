import Post from "@/components/post/Post";
import CreatePost from "@/components/post/CreatePost";
import { useEffect, useState } from "react";


const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/posts/")
    .then((res) => res.json())
    .then((data) => setPosts(data))
    .catch((error) => console.error("Error fetching posts:", error));
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
            replies={0}
            reposts={0}
            onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Feed;