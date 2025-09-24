"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import type { AppState } from "@excalidraw/excalidraw/types/types";

// Use next/dynamic to load the Excalidraw component only on the client side.
// The .Excalidraw at the end is crucial because the library exports the component as a named export.
const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  {
    ssr: false, // This is crucial to prevent server-side rendering
  }
);

interface ExcalidrawWrapperProps {
  initialElements: readonly ExcalidrawElement[];
  onChange: (
    elements: readonly ExcalidrawElement[],
    appState: AppState,
    files: any
  ) => void;
}

const ExcalidrawWrapper = ({
  initialElements,
  onChange,
}: ExcalidrawWrapperProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    setIsClient(true);
  }, []);

  return (
    <div className="h-full w-full">
      {isClient ? (
        <Excalidraw
          key={JSON.stringify(initialElements)}
          initialData={{
            elements: initialElements,
            appState: {
              viewBackgroundColor: "#141414",
              currentItemStrokeColor: "#aca7f2",
            },
          }}
          onChange={onChange}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p>Loading Canvas...</p>
        </div>
      )}
    </div>
  );
};

export default ExcalidrawWrapper;
