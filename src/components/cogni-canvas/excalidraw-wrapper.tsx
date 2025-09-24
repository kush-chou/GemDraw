"use client";

import { useEffect, useState } from "react";

const ExcalidrawWrapper = () => {
  const [Excalidraw, setExcalidraw] = useState<any>(null);

  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) => setExcalidraw(comp.Excalidraw));
  }, []);

  return (
    <div className="h-full w-full">
      {Excalidraw ? (
        <Excalidraw />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p>Loading Canvas...</p>
        </div>
      )}
    </div>
  );
};

export default ExcalidrawWrapper;
