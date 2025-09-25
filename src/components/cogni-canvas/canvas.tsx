"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import {
  ExcalidrawImperativeAPIExtended,
  BinaryFileData,
  ExcalidrawElement,
} from "@excalidraw/excalidraw/types/types";
import { getMimeType } from "@excalidraw/excalidraw";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  },
);

const Canvas = ({
  imageUrl,
  aiElements,
}: {
  imageUrl: string;
  aiElements: ExcalidrawElement[];
}) => {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPIExtended | null>(null);
  const [elements, setElements] = useState<ExcalidrawElement[]>([]);

  useEffect(() => {
    if (aiElements && aiElements.length > 0) {
      setElements((prevElements) => [...prevElements, ...aiElements]);
    }
  }, [aiElements]);

  useEffect(() => {
    if (!imageUrl || !excalidrawAPI) {
      return;
    }

    const addImageToCanvas = async () => {
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;

          const fileData: BinaryFileData = {
            mimeType: getMimeType(blob),
            id: `image-${Date.now()}` as any,
            dataURL: dataUrl as any,
            created: Date.now(),
          };

          excalidrawAPI.addFiles([fileData]);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error adding image to canvas:", error);
      }
    };

    addImageToCanvas();
  }, [imageUrl, excalidrawAPI]);

  return (
    <div className="h-full w-full">
      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        initialData={{
          elements,
        }}
        onChange={(newElements) => setElements(newElements)}
      />
    </div>
  );
};

export default Canvas;
