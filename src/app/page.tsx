"use client";

import ChatPanel from "@/components/cogni-canvas/chat-panel";
import ExcalidrawWrapper from "@/components/cogni-canvas/excalidraw-wrapper";
import { useState } from "react";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";

export default function Home() {
  const [sceneElements, setSceneElements] = useState<ExcalidrawElement[]>([]);

  const handleSceneChange = (elements: readonly ExcalidrawElement[]) => {
    setSceneElements(elements as ExcalidrawElement[]);
  };

  return (
    <main className="flex h-screen w-full bg-background">
      <aside className="w-96 flex flex-col bg-card border-r border-border">
        <ChatPanel setSceneElements={setSceneElements} />
      </aside>
      <div className="flex-grow h-full">
        <ExcalidrawWrapper
          initialElements={sceneElements}
          onChange={handleSceneChange}
        />
      </div>
    </main>
  );
}
