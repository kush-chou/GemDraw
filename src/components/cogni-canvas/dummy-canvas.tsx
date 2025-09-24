'use client';

import { Image } from "lucide-react";

export default function DummyCanvas() {
  return (
    <div className="h-full w-full bg-card flex flex-col">
       <header className="flex h-16 flex-shrink-0 items-center border-b px-4">
        <h2 className="text-lg font-semibold">
          Canvas
        </h2>
      </header>
      <div className="flex-grow flex flex-col items-center justify-center bg-muted/20">
        <div className="text-center text-muted-foreground p-4 space-y-2">
            <Image className="mx-auto h-12 w-12" />
          <h3 className="text-lg font-semibold text-foreground">Visual Workspace</h3>
          <p>Your generated images will appear here.</p>
        </div>
      </div>
    </div>
  );
}
