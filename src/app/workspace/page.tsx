"use client";

import { useState } from "react";
import ChatPanel from "@/components/cogni-canvas/chat-panel";
import Canvas from "@/components/cogni-canvas/canvas";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/types";

export default function WorkspacePage() {
  const [imageUrl, setImageUrl] = useState("");
  const [aiElements, setAiElements] = useState<ExcalidrawElement[]>([]);

  return (
    <main className="h-full w-full flex flex-row">
      <div className="w-[384px] h-full flex flex-col border-r flex-shrink-0">
        <ChatPanel setImageUrl={setImageUrl} />
      </div>
      <div className="flex-grow h-full flex flex-col">
        <Canvas imageUrl={imageUrl} aiElements={aiElements} />
      </div>
    </main>
  );
}
