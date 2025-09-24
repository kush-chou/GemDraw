export default function ChatsPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-6 border-b">
        <h1 className="text-3xl font-bold">All Chats</h1>
        <p className="text-muted-foreground">A list of all your conversations.</p>
      </header>
      <main className="flex-grow p-6">
        <div className="text-center text-muted-foreground">
          <p>Chat history will be displayed here.</p>
        </div>
      </main>
    </div>
  );
}
