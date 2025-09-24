'use client';

export default function DummyCanvas() {
  return (
    <div className="h-full w-full bg-muted/30 border-l border-border flex flex-col rounded-r-lg">
       <header className="flex h-16 flex-shrink-0 items-center border-b border-border px-4 rounded-tr-lg">
        <h2 className="text-lg font-semibold text-foreground">
          Canvas
        </h2>
      </header>
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center text-muted-foreground p-4">
          <p>This is a placeholder for the drawing canvas.</p>
        </div>
      </div>
    </div>
  );
}
