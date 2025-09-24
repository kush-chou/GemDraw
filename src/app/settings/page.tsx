export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-6 border-b">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings.</p>
      </header>
      <main className="flex-grow p-6">
        <div className="text-center text-muted-foreground">
          <p>Settings controls will be displayed here.</p>
        </div>
      </main>
    </div>
  );
}
