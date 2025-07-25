"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

export async function handleSubmission(formData: FormData) {
    // Handle form submission logic here
    const{ getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/register");
    }

    const title = formData.get("title") ;
    const content = formData.get("content");
    const url = formData.get("url") ;

    const data = await prisma.blogPost.create({
        data: {
            title: title as string,
            content: content as string,
            imageUrl: url as string,
            autorId: user.id,
            authorImage: user.picture as string,
            authorName: user.given_name as string,
        },
    });

    return redirect ("/dashboard");
}