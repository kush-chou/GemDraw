"use client";

import { useEffect, useState, memo } from "react";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import type { AppState } from "@excalidraw/excalidraw/types/types";

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
  const [Excalidraw, setExcalidraw] = useState<any>(null);

  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) =>
      setExcalidraw(comp.Excalidraw)
    );
  }, []);

  return (
    <div className="h-full w-full">
      {Excalidraw ? (
        (() => {
          // We need to wrap the Excalidraw component in a memo to prevent
          // re-rendering on every prop change, which would be expensive.
          const MemoizedExcalidraw = memo(Excalidraw);
          return (
            <MemoizedExcalidraw
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
          );
        })()
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p>Loading Canvas...</p>
        </div>
      )}
    </div>
  );
};

export default ExcalidrawWrapper;
