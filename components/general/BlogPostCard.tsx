import Link from "next/link";
import Image from "next/image";

interface BlogPostCardProps {
    data: {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    autorId: string;
    authorName: string;
    authorImage: string;
    createdAt: Date;
    updatedAt: Date;
    }
}

export function BlogPostCard({data}: BlogPostCardProps) {
    return(
        <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
            <Link href={`/post/${data.id}`} className="block w-full h-full">
                <div className="relative w-full h-48 overflow-hidden">
                    <Image src={data.imageUrl} alt="Image for Blog" fill 
                    className="object-cover transition-transform duration-300 group-hover:scale-105"/>
                </div>
                <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{data.title}</h3>
                    <p className="mb-4 text-sm text-gray-600 line-clamp-2">{data.content}</p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 px-4 py-2">
                        <div className="relative size-8 overflow-hidden rounded-full">
                            <Image src={data.authorImage} alt={data.authorName} fill className="object-cover"/>
                        </div>
                        <p className="text-sm font-medium text-gray-700">{data.authorName}</p>
                    </div>
                    <time className="text-xs text-gray-500 px-4 py-2">
                        {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',  month: 'short', day: 'numeric',}).format(data.createdAt)}
                    </time>
                </div>
            </Link>
        </div>
    );
}