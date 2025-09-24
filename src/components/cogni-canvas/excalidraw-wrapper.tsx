"use client";

import dynamic from "next/dynamic";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import type { AppState } from "@excalidraw/excalidraw/types/types";

// Use next/dynamic to load the Excalidraw component only on the client side.
// The .Excalidraw at the end is crucial because the library exports the component as a named export.
const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  {
    ssr: false, // This is crucial to prevent server-side rendering
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <p>Loading Canvas...</p>
      </div>
    ),
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
