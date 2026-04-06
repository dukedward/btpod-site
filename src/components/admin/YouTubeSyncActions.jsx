import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw, Download } from "lucide-react";
import { toast } from "sonner";
import { fullYouTubeSync, latestYouTubeSync } from "@/api/youtubeAdminSync";
import { useQueryClient } from "@tanstack/react-query";

export default function YouTubeSyncActions() {
  const [syncingFull, setSyncingFull] = useState(false);
  const [syncingLatest, setSyncingLatest] = useState(false);
  const queryClient = useQueryClient();

  const handleFullSync = async () => {
    setSyncingFull(true);
    try {
      const result = await fullYouTubeSync();
      toast.success(
        `Full sync complete. Created: ${result.created}, Updated: ${result.updated}`,
      );
      queryClient.invalidateQueries({ queryKey: ["episodes"] });
      queryClient.invalidateQueries({ queryKey: ["episodes-latest"] });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Full sync failed");
    } finally {
      setSyncingFull(false);
    }
  };

  const handleLatestSync = async () => {
    setSyncingLatest(true);
    try {
      const result = await latestYouTubeSync();
      toast.success(
        result.total === 0
          ? "No new videos found"
          : `Latest sync complete. Created: ${result.created}, Updated: ${result.updated}`,
      );
      queryClient.invalidateQueries({ queryKey: ["episodes"] });
      queryClient.invalidateQueries({ queryKey: ["episodes-latest"] });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Latest sync failed");
    } finally {
      setSyncingLatest(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={handleFullSync}
        disabled={syncingFull || syncingLatest}
        variant="secondary"
        className="gap-2"
      >
        {syncingFull ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {syncingFull ? "Full Syncing..." : "Full Sync"}
      </Button>

      <Button
        onClick={handleLatestSync}
        disabled={syncingFull || syncingLatest}
        className="gap-2"
      >
        {syncingLatest ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <RefreshCcw className="w-4 h-4" />
        )}
        {syncingLatest ? "Syncing Latest..." : "Sync Latest"}
      </Button>
    </div>
  );
}
