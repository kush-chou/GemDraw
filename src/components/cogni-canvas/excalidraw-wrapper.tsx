"use client";

import { useEffect, useState } from "react";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import type { AppState, ExcalidrawProps } from "@excalidraw/excalidraw/types/types";

// Dynamically import Excalidraw with SSR disabled
const Excalidraw =
  typeof window !== "undefined"
    ? require("@excalidraw/excalidraw").Excalidraw
    : () => null;

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
