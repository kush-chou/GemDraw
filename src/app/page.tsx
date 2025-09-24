import ChatPanel from "@/components/cogni-canvas/chat-panel";
import ExcalidrawWrapper from "@/components/cogni-canvas/excalidraw-wrapper";

export default function Home() {
  return (
    <main className="flex h-screen w-full bg-background">
      <aside className="w-96 flex flex-col bg-card border-r border-border">
        <ChatPanel />
      </aside>
      <div className="flex-grow h-full">
        <ExcalidrawWrapper />
      </div>
    </main>
  );
}
