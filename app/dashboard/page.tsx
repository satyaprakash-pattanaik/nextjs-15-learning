import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogPostCard } from "@/components/general/BlogPostCard";

async function getData(userId: string){
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay for demonstration purposes
  const data = await prisma.blogPost.findMany({
    where: {
      autorId: userId, 
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function Dashboard() {

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return (
      <div className="py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Dashboard</h1>
        <p className="text-red-500">You must be logged in to view your dashboard.</p>
      </div>
    );
  }

  const data = await getData(user.id);

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Dashboard</h1>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Posts</h2>
        <Link href="/dashboard/create" className={buttonVariants()}>
          Create New Post
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <BlogPostCard key={item.id} data={item} /> 
        ))}
      </div>
      
    </div>
  );
}