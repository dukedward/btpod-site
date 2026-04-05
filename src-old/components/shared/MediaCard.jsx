import { useState } from "react";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import MediaViewer from "@/components/shared/MediaViewer";

export default function MediaCard({ clip }) {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{clip.title}</h3>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{clip.description}</p>
          </div>
          <Badge className="capitalize">{clip.type}</Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {(clip.tags || []).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{clip.title}</DialogTitle>
              <DialogDescription>{clip.description}</DialogDescription>
            </DialogHeader>
            <MediaViewer item={clip} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
