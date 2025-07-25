
import { handleSubmission } from "@/app/actions";
import { SubmitButton } from "@/components/general/SubmitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";

export default function CreateRoute() {
  return (
    <div className="py-6">
        <Card className="max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Create Post</CardTitle>
                <CardDescription>Create a new post to share with the world</CardDescription>
                <CardContent>
                    <form className="flex flex-col gap-4" action={handleSubmission}>
                        <div className="flrex flex-col gap-2">
                            <Label>Title</Label>
                            <Input name="title" required type="text" placeholder="title"/>
                        </div>
                        <div className="flrex flex-col gap-2">
                            <Label>Content</Label>
                            <Textarea name="content" required placeholder="Content" />
                        </div>
                        <div className="flrex flex-col gap-2">
                            <Label>Image URL</Label>
                            <Input name="url" required type="url" placeholder="Image Url"/>
                        </div>
                        <SubmitButton />
                    </form>
                </CardContent>
            </CardHeader>
        </Card>
    </div>
  );
}