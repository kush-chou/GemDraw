"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Send } from "lucide-react";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { useState } from "react";
import { drawDiagram } from "@/ai/flows/draw-diagram-flow";

const GeminiLogo = () => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full"
  >
    <defs>
      <linearGradient id="gemini-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4185F4" />
        <stop offset="100%" stopColor="#2F66B0" />
      </linearGradient>
    </defs>
    <path
      fill="url(#gemini-gradient)"
      d="M50 0 L61.8 38.2 L100 50 L61.8 61.8 L50 100 L38.2 61.8 L0 50 L38.2 38.2 Z"
    />
    <path
      fill="url(#gemini-gradient)"
      d="M85 15 L89.5 29.5 L104 34 L89.5 38.5 L85 53 L80.5 38.5 L66 34 L80.5 29.5 Z"
    />
  </svg>
);

const avatarYou = PlaceHolderImages.find((img) => img.id === "avatar-you");
const avatarGemini = PlaceHolderImages.find(
  (img) => img.id === "avatar-gemini"
);

const initialMessages = [
  {
    id: 1,
    name: "You",
    avatar: avatarYou?.imageUrl,
    avatarHint: avatarYou?.imageHint,
    text: "Hi Gemini, I'm having trouble understanding trigonometry. Can you help?",
    isCurrentUser: true,
  },
  {
    id: 2,
    name: "Gemini",
    avatar: avatarGemini?.imageUrl,
    avatarHint: avatarGemini?.imageHint,
    text: "Of course! Trigonometry is all about the relationships between the angles and sides of triangles. A great place to start is with SOH CAH TOA. Have you heard of it?",
  },
  {
    id: 3,
    name: "You",
    avatar: avatarYou?.imageUrl,
    avatarHint: avatarYou?.imageHint,
    text: "Vaguely... what does it stand for?",
    isCurrentUser: true,
  },
  {
    id: 4,
    name: "Gemini",
    avatar: avatarGemini?.imageUrl,
    avatarHint: avatarGemini?.imageHint,
    text: "It's a mnemonic to remember the basic trigonometric ratios. Sine = Opposite / Hypotenuse (SOH), Cosine = Adjacent / Hypotenuse (CAH), and Tangent = Opposite / Adjacent (TOA). I can draw a diagram for you on the canvas.",
    action: "draw_soh_cah_toa",
  },
];

type Message = {
  id: number;
  name: string;
  avatar?: string;
  avatarHint?: string;
  text: string;
  isCurrentUser: boolean;
  action?: string;
};

interface ChatPanelProps {
  setSceneElements: (elements: ExcalidrawElement[]) => void;
}

export default function ChatPanel({ setSceneElements }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [drawing, setDrawing] = useState(false);

  const handleDraw = async (prompt: string) => {
    setDrawing(true);
    try {
      const result = await drawDiagram({ prompt });
      if (result.elements) {
        setSceneElements(result.elements as ExcalidrawElement[]);
      }
    } catch (error) {
      console.error("Error drawing diagram:", error);
    } finally {
      setDrawing(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex h-16 flex-shrink-0 items-center border-b border-border bg-primary px-4">
        <h2 className="text-lg font-semibold text-primary-foreground">
          AI Tutor Chat
        </h2>
      </header>
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.isCurrentUser ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="h-8 w-8">
                {message.name === 'Gemini' ? (
                  <GeminiLogo />
                ) : (
                  <>
                    <AvatarImage
                      src={message.avatar}
                      alt={message.name}
                      data-ai-hint={message.avatarHint}
                    />
                    <AvatarFallback>
                      {message.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              <div
                className={`max-w-[75%] rounded-lg p-3 text-sm ${
                  message.isCurrentUser ? "bg-primary/20" : "bg-muted"
                }`}
              >
                {!message.isCurrentUser && (
                  <p className="font-semibold mb-1">{message.name}</p>
                )}
                <p className="break-words">{message.text}</p>
                {message.action && (
                  <Button
                    onClick={() => handleDraw(message.text)}
                    disabled={drawing}
                    className="mt-2"
                    size="sm"
                  >
                    {drawing ? "Drawing..." : "Yes, please draw it!"}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex-shrink-0 border-t border-border p-4">
        <form className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button
            type="submit"
            className="bg-accent hover:bg-accent/90 text-accent-foreground flex-shrink-0"
            size="icon"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
