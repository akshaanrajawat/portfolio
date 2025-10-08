export type BlogPost = {
  id: number
  title: string
  date: string // ISO string
  excerpt: string
  content: string
  tags?: string[]
}

// You can add more posts here. Keep ids unique and dates in ISO format.
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "new notepad",
    date: "2025-10-8",
    excerpt: "ill try filling this up in the near future",
    content:
      "nothing much to see here",
    tags: ["leetcode", "algorithms"],
  },
  {
    id: 2,
    title: "i cannot make a website",
    date: "2024-01-10",
    excerpt: "npm run dev",
    content:
      "i can preview and deploy the website but i cannot make it from scratch, im a fraud,im mike ross",
    tags: ["webdev", "thoughts"],
  },
  
]


