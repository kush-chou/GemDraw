"use client";

import ChatPanel from "@/components/cogni-canvas/chat-panel";
import DummyCanvas from "@/components/cogni-canvas/dummy-canvas";

export default function Home() {
  return (
    <main className="flex h-screen w-full justify-center items-center bg-background">
      <div className="w-full max-w-6xl h-full md:h-[90vh] md:max-h-[800px] flex flex-row bg-card border border-border rounded-lg shadow-lg">
        <div className="w-1/2 flex flex-col">
          <ChatPanel />
        </div>
        <div className="w-1/2 flex flex-col">
          <DummyCanvas />
        </div>
      </div>
    </main>
  );
}
