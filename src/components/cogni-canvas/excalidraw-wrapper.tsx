"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
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
  const Excalidraw = useMemo(
    () =>
      dynamic(() => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw), {
        ssr: false,
        loading: () => (
          <div className="flex h-full w-full items-center justify-center">
            <p>Loading Canvas...</p>
          </div>
        ),
      }),
    []
  );

  return (
    <div className="h-full w-full">
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
    </div>
  );
};

export default ExcalidrawWrapper;
