"use client";

import ChatPanel from "@/components/cogni-canvas/chat-panel";

export default function Home() {
  return (
    <main className="flex h-screen w-full justify-center items-center bg-background">
      <div className="w-full max-w-2xl h-full md:h-[90vh] md:max-h-[800px] flex flex-col bg-card border border-border rounded-lg shadow-lg">
        <ChatPanel />
      </div>
    </main>
  );
}
