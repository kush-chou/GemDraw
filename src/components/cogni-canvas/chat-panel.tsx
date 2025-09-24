"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { chat } from "@/ai/flows/chat-flow";

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

const initialMessages = [
  {
    role: "model" as const,
    content: [{ text: "Hello! How can I help you today?" }],
  },
];

type Message = {
  role: "user" | "model";
  content: { text: string }[];
  isThinking?: boolean;
};

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector("div");
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMessage: Message = {
      role: "user",
      content: [{ text: input }],
    };
    const thinkingMessage: Message = {
      role: "model",
      content: [{ text: "Thinking..." }],
      isThinking: true,
    };
    const newMessages = [...messages, newUserMessage, thinkingMessage];
    setMessages(newMessages);
    setInput("");

    const history = messages.map(({ role, content }) => ({
      role,
      content: content.map(({ text }) => ({ text })),
    }));

    try {
      const stream = await chat(history, input);
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let streamedResponse = "";
      
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1
            ? { ...msg, content: [{ text: "" }], isThinking: false }
            : msg
        )
      );

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        streamedResponse += chunk;

        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          if (lastMessage && lastMessage.role === "model") {
            lastMessage.content = [{ text: streamedResponse }];
          }
          return updatedMessages;
        });
      }
    } catch (error) {
      console.error("Error during chat:", error);
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1
            ? { ...msg, content: [{ text: "Sorry, something went wrong." }], isThinking: false }
            : msg
        )
      );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex h-16 flex-shrink-0 items-center border-b border-border bg-primary px-4 rounded-tl-lg">
        <h2 className="text-lg font-semibold text-primary-foreground">
          AI Tutor Chat
        </h2>
      </header>
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {message.role === "model" && (
                <div className="h-8 w-8 flex-shrink-0">
                  <GeminiLogo />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-lg p-3 text-sm ${
                  message.role === "user" ? "bg-primary/20" : "bg-muted"
                }`}
              >
                {message.role === "model" && (
                  <p className="font-semibold mb-1">Gemini</p>
                )}
                <p className="break-words">
                  {message.content.map((c) => c.text).join("")}
                  {message.isThinking && (
                     <span className="animate-pulse">...</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex-shrink-0 border-t border-border p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            className="flex-grow"
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
