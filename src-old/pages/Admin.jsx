import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UploadEpisodeForm from "@/components/admin/UploadEpisodeForm";
import UploadMediaForm from "@/components/admin/UploadMediaForm";

export default function Admin() {
  const { user, isAdmin } = useAuth();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight">Admin</h1>
        <p className="mt-2 text-muted-foreground">
          Google-authenticated users can access this page. The starter also
          checks `VITE_ADMIN_EMAIL` before allowing uploads.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Signed in user
          </CardTitle>
          <CardDescription>
            Use this block to confirm Google auth is working before you upload
            content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Email:</span>{" "}
            {user?.email || "Unknown"}
          </p>
          <p>
            <span className="font-medium">Admin match:</span>{" "}
            {isAdmin ? "Yes" : "No"}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-8 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload clip</CardTitle>
            <CardDescription>
              Add a clip to the `mediaClips` collection and Firebase Storage.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UploadMediaForm />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create episode</CardTitle>
            <CardDescription>
              Add an episode record and optional thumbnail, video, and audio
              files.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UploadEpisodeForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
