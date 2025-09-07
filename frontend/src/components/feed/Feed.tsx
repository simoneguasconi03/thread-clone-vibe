import Post from "@/components/post/Post";
import CreatePost from "@/components/post/CreatePost";

// Mock data for posts
const mockPosts = [
  {
    id: "1",
    author: {
      username: "mark",
      displayName: "Mark Zuckerberg",
      avatar: "",
      verified: true,
    },
    content: "Just shipped a new feature for Threads! 🚀 What do you think about the new design?",
    timestamp: "2h",
    likes: 1284,
    replies: 52,
    reposts: 89,
  },
  {
    id: "2",
    author: {
      username: "sarah_dev",
      displayName: "Sarah Chen",
      avatar: "",
    },
    content: "Working on a new React project and loving the developer experience. The component composition patterns are so clean! \n\nAnyone else excited about the latest React features?",
    timestamp: "4h",
    likes: 234,
    replies: 18,
    reposts: 12,
  },
  {
    id: "3",
    author: {
      username: "design_guru",
      displayName: "Alex Martinez",
      avatar: "",
    },
    content: "Hot take: The best designs are the ones you don't notice. When UX is seamless, users just... flow. ✨",
    timestamp: "6h",
    likes: 567,
    replies: 34,
    reposts: 23,
  },
  {
    id: "4",
    author: {
      username: "tech_journalist",
      displayName: "Emma Wilson",
      avatar: "",
    },
    content: "Just published my latest article on the future of social media. The landscape is changing faster than ever before.",
    timestamp: "8h",
    likes: 892,
    replies: 67,
    reposts: 45,
  },
  {
    id: "5",
    author: {
      username: "startup_life",
      displayName: "David Kim",
      avatar: "",
    },
    content: "Building in public day 47: \n\n✅ Shipped user authentication\n✅ Added real-time notifications\n🔨 Working on mobile app\n\nThe journey continues! 💪",
    timestamp: "12h",
    likes: 445,
    replies: 29,
    reposts: 31,
  },
];

const Feed = () => {
  return (
    <div className="max-w-2xl mx-auto bg-background">
      <CreatePost />
      
      <div className="divide-y">
        {mockPosts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;