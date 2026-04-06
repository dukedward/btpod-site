import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Film, Disc } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import UploadMediaForm from "@/components/admin/UploadMediaForm";
import UploadEpisodeForm from "@/components/admin/UploadEpisodeForm";
import YouTubeSyncActions from "@/components/admin/YouTubeSyncActions";

export default function Admin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAdmin } = useAuth();

  // useEffect(() => {
  //   if (!isAdmin) {
  //     navigate("/Home");
  //   }
  // }, [isAdmin]);

  // if (!isAdmin) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[60vh]">
  //       <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  //     </div>
  //   );
  // }

  const handleSuccess = () => {
    queryClient.invalidateQueries();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Admin Panel
          </h1>
          <p className="text-sm text-muted-foreground">
            Upload and manage podcast content.
          </p>
        </div>
        <YouTubeSyncActions />
      </div>

      <Tabs defaultValue="media" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger
            value="media"
            className="gap-1.5 rounded-md px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Film className="w-3.5 h-3.5" />
            Upload Clip
          </TabsTrigger>
          <TabsTrigger
            value="episode"
            className="gap-1.5 rounded-md px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Disc className="w-3.5 h-3.5" />
            New Episode
          </TabsTrigger>
        </TabsList>

        <TabsContent value="media">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg">
                Upload Media Clip
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Upload video clips, pictures, or audio clips from the podcast.
              </p>
            </CardHeader>
            <CardContent>
              <UploadMediaForm onSuccess={handleSuccess} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="episode">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg">
                Create New Episode
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Add a new episode with video, audio, and thumbnail.
              </p>
            </CardHeader>
            <CardContent>
              <UploadEpisodeForm onSuccess={handleSuccess} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
