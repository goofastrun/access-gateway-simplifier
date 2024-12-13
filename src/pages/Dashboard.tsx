import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Post, Department } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const departments: Department[] = [
  "Бухгалтерия",
  "Отдел маркетинга",
  "Отдел кадров",
  "Отдел технического контроля",
  "Отдел сбыта",
  "Отдел IT",
  "Отдел логистики и транспорта",
  "Отдел клиентской поддержки",
  "Отдел разработки и исследований",
  "Отдел закупок",
];

export default function Dashboard() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ content: "", department: "all" });
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch posts",
        variant: "destructive",
      });
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !["Admin", "Manager"].includes(user.role)) return;

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) throw new Error("Failed to create post");

      const post = await response.json();
      setPosts([post, ...posts]);
      setNewPost({ content: "", department: "all" });
      
      toast({
        title: "Success",
        description: "Post created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    }
  };

  const canCreatePost = user && ["Admin", "Manager"].includes(user.role);
  const visiblePosts = posts.filter(post => {
    if (user?.role === "Admin" || user?.role === "Manager") return true;
    return post.department === "all" || post.department === user?.department;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {canCreatePost && (
        <form onSubmit={handleCreatePost} className="space-y-4 glass-card p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Создать новую запись</h3>
          <textarea
            className="w-full p-2 border rounded-md"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            placeholder="Введите текст записи..."
            required
          />
          <Select
            onValueChange={(value) => setNewPost({ ...newPost, department: value })}
            defaultValue="all"
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите отдел" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Для всех</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit">Создать запись</Button>
        </form>
      )}

      <div className="space-y-4">
        {visiblePosts.map((post) => (
          <div key={post.id} className="glass-card p-6 rounded-lg animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-sm text-muted-foreground">
                  {post.department === "all" ? "Для всех" : post.department}
                </span>
                <h4 className="font-medium">{post.author.name}</h4>
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-foreground">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}