"use client";

import { useEffect, useState } from "react";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import type { AppState, ExcalidrawProps } from "@excalidraw/excalidraw/types/types";

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
  const [Excalidraw, setExcalidraw] = useState<React.ComponentType<ExcalidrawProps> | null>(null);

  useEffect(() => {
    import("@excalidraw/excalidraw").then((mod) => setExcalidraw(() => mod.Excalidraw));
  }, []);

  return (
    <div className="h-full w-full">
      {Excalidraw ? (
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
