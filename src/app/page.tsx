import ChatPanel from "@/components/cogni-canvas/chat-panel";
import ExcalidrawWrapper from "@/components/cogni-canvas/excalidraw-wrapper";

export default function Home() {
  return (
    <main className="flex h-screen w-full bg-background">
      <div className="flex-grow h-full">
        <ExcalidrawWrapper />
      </div>
      <aside className="w-96 flex flex-col bg-card border-l border-border">
        <ChatPanel />
      </aside>
    </main>
  );
}
