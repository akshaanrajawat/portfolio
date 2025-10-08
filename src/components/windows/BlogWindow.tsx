import { FileText, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { blogPosts } from "@/data/blog-posts";
import { useState } from "react";

const StickyNote = ({ children }: { children: React.ReactNode }) => (
  <div
    className="relative bg-[#fff8b0] border border-yellow-300 shadow-[0_2px_0_#d4b000,0_6px_12px_rgba(0,0,0,0.15)] rounded-sm p-4 rotate-[-1.5deg]"
    style={{
      backgroundImage: "linear-gradient(transparent 38px, rgba(0,0,0,0.05) 38px)",
      backgroundSize: "100% 40px",
    }}
  >
    <div className="absolute -top-2 left-1.5 w-4 h-4 bg-yellow-300 rounded-full shadow" />
    {children}
  </div>
);

const BlogWindow = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const active = blogPosts.find((p) => p.id === openId) || null;

  return (
    <div className="min-h-full p-6 font-mono bg-[#f5f5dc]">
      <div className="max-w-3xl">
        {/* Notepad Header */}
        <div className="mb-6 pb-4 border-b border-gray-400">
          <h1 className="text-xl font-bold">Notepad</h1>
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <StickyNote key={post.id}>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <h2 className="font-bold text-lg">{post.title}</h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</span>
                </div>
                <p className="text-sm leading-relaxed">{post.excerpt}</p>
                <button
                  className="text-xs text-blue-700 hover:underline"
                  onClick={() => setOpenId(post.id)}
                >
                  Read more →
                </button>
              </div>
            </StickyNote>
          ))}
        </div>

        
      </div>

      <Dialog open={openId !== null} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent className="max-w-2xl bg-[#fffffb] text-black border border-gray-300">
          {active && (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle className="font-mono text-xl">{active.title}</DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-3 h-3" />
                <span>{new Date(active.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</span>
              </div>
              <div className="prose prose-sm max-w-none font-mono text-[13px] leading-relaxed">
                {active.content}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogWindow;
