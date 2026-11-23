"use client";

import * as React from "react";

import { Button } from "@/registry/designsbyluca/ui/button";
import { Toaster, toast } from "@/registry/designsbyluca/ui/toast";

/** Inline toaster for the preview: two lasting examples, buttons add more. */
export function ToastDemo() {
  React.useEffect(() => {
    toast("Saved", { id: "seed-1", description: "Your changes are live.", duration: Infinity });
    toast.error("Upload failed", { id: "seed-2", description: "The file is larger than 10 MB.", duration: Infinity });
    return () => toast.dismiss();
  }, []);

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" onClick={() => toast("Request sent")}>
          Show toast
        </Button>
        <Button variant="outline" onClick={() => toast.success("Project saved", { description: "Saved a moment ago." })}>
          Success
        </Button>
        <Button variant="outline" onClick={() => toast.error("Could not send", { description: "Check your connection." })}>
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() => toast("Project archived", { action: { label: "Undo", onClick: () => toast("Restored") } })}
        >
          With action
        </Button>
      </div>
      <Toaster inline />
    </div>
  );
}
