
import { prisma } from "@/app/utils/db";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

async function getData(id: string) {
  
  const data = await prisma.blogPost.findUnique({
    where: {
        id: id,
    },
    });
    if (!data) {
        return notFound();
    }
    return data;
}

type Params = { id: string };

export default async function IdPage({ params }: { params: Params }) {
    const { id } = params;
    const data = await getData(id); 
    return(
        <div className="mx-auto max-w-3xl py-8 px-4">
            <Link className={buttonVariants({variant:'secondary'})} href={"/"}>
            back to posts
            </Link>
            <div className="mb-8 mt-6">
                <h1 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h1>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="relative size-10 overflow-hidden rounded-full">
                            <Image src={data.authorImage} alt={data.authorName} fill className="object-cover"/>
                        </div>
                        <p className="font-medium">{data.authorName}</p>
                    </div>
                    <p className="text-sm text-gray-500">{new Intl.DateTimeFormat('en-US',{
                        year:"numeric",
                        month:"long",
                        day:"numeric"}).format(data.createdAt)}</p>
                </div>
            </div>
            <div className="relative h-[400] w-full mb-8 overflow-hidden rounded-lg">
                <Image src={data.imageUrl} alt={data.title} fill className="object-cover" priority/>
            </div>
            <Card>
                <CardContent>
                    <p className="text-gray-700">{data.content}</p>
                </CardContent>
            </Card>
        </div>
    );
}