"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { chat } from "@/ai/flows/chat-flow";

const GeminiLogo = () => (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-primary-foreground font-bold text-xs">
        AI
    </div>
);

const initialMessages = [
  {
    role: "model" as const,
    content: [{ text: "Hello! How can I help you bring your ideas to life today?" }],
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
        streamedResponse += value;

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
    <div className="flex flex-col h-full bg-card">
      <header className="flex h-16 flex-shrink-0 items-center border-b px-4">
        <h2 className="text-lg font-semibold">
          AI Assistant
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
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.role === "model" && (
                  <p className="font-semibold mb-1">CogniCanvas AI</p>
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
      <div className="flex-shrink-0 border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <Input
            type="text"
            placeholder="Ask me to generate something..."
            className="flex-grow"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            type="submit"
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
