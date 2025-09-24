export default function GalleryPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-6 border-b">
        <h1 className="text-3xl font-bold">Image Gallery</h1>
        <p className="text-muted-foreground">A collection of your generated images.</p>
      </header>
      <main className="flex-grow p-6">
        <div className="text-center text-muted-foreground">
          <p>Generated images will be displayed here.</p>
        </div>
      </main>
    </div>
  );
}
