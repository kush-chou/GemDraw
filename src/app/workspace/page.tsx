"use client";

import ChatPanel from "@/components/cogni-canvas/chat-panel";
import DummyCanvas from "@/components/cogni-canvas/dummy-canvas";

export default function WorkspacePage() {
  return (
    <main className="h-full w-full flex flex-row">
      <div className="w-1/2 h-full flex flex-col border-r">
        <ChatPanel />
      </div>
      <div className="w-1/2 h-full flex flex-col">
        <DummyCanvas />
      </div>
    </main>
  );
}
