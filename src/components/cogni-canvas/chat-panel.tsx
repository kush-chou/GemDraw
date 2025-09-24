"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, Mic, Volume2, Loader2 } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { chat } from "@/ai/flows/chat-flow";
import { textToSpeech } from "@/ai/flows/tts-flow";
import { imageGenerationFlow } from "@/ai/flows/image-generation-flow";
import { tool } from "@genkit-ai/ai";
import { z } from "zod";

const AILogo = () => (
  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
    <Bot className="h-5 w-5" />
  </div>
);

const initialMessages = [
  {
    role: "model" as const,
    content: [
      { text: "Hello! How can I help you bring your ideas to life today?" },
    ],
  },
];

type Message = {
  role: "user" | "model";
  content: { text: string }[];
  isThinking?: boolean;
};

export default function ChatPanel({
  setImageUrl,
}: {
  setImageUrl: (url: string) => void;
}) {
  const createImageTool = tool(
    {
      name: "createImage",
      description:
        "A tool to create an image on the canvas based on a detailed description.",
      inputSchema: z.string(),
      outputSchema: z.string(),
    },
    async (prompt) => {
      const url = await imageGenerationFlow(prompt);
      setImageUrl(url);
      return `An image has been created for the prompt: ${prompt}. It is now visible on the canvas.`;
    },
  );

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
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

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSubmit(new Event("submit") as any, transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleMicClick = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const playAudio = async (text: string) => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    setIsGeneratingAudio(true);
    try {
      const response = await textToSpeech(text);
      const audio = new Audio(response.media);
      audioRef.current = audio;
      audio.play();
      setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
      };
    } catch (error) {
      console.error("Error generating speech:", error);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const handleSubmit = async (e: FormEvent, message?: string) => {
    e.preventDefault();
    const currentInput = message || input;
    if (!currentInput.trim()) return;

    const newUserMessage: Message = {
      role: "user",
      content: [{ text: currentInput }],
    };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setInput("");

    const history = messages.map(({ role, content }) => ({
      role,
      content: content.map(({ text }) => ({ text })),
    }));

    try {
      setMessages((prev) => [
        ...prev,
        { role: "model", content: [{ text: "" }], isThinking: true },
      ]);

      const stream = await chat(history, currentInput, {
        tools: [createImageTool],
      });
      let streamedResponse = "";

      for await (const chunk of stream) {
        if (chunk.content) {
          streamedResponse = chunk.content.map((c) => c.text || "").join("");
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            if (lastMessage && lastMessage.role === "model") {
              lastMessage.content = [{ text: streamedResponse }];
              lastMessage.isThinking = false;
            }
            return updatedMessages;
          });
        }
      }
    } catch (error) {
      console.error("Error during chat:", error);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        if (lastMessage && lastMessage.role === "model") {
          lastMessage.content = [{ text: "Sorry, something went wrong." }];
          lastMessage.isThinking = false;
        }
        return updatedMessages;
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <header className="flex h-16 flex-shrink-0 items-center border-b px-4">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
      </header>
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.role === "user" ? "justify-end" : ""
              }`}
            >
              {message.role === "model" && (
                <div className="h-8 w-8 flex-shrink-0">
                  <AILogo />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 text-sm group relative ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="break-words">
                  {message.content.map((c) => c.text).join("")}
                  {message.isThinking && (
                    <span className="animate-pulse">...</span>
                  )}
                </p>
                {message.role === "model" &&
                  !message.isThinking &&
                  message.content[0].text && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -bottom-2 -right-2 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-background"
                      onClick={() =>
                        playAudio(message.content.map((c) => c.text).join(""))
                      }
                      disabled={isGeneratingAudio || isPlaying}
                    >
                      {isGeneratingAudio ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                      <span className="sr-only">Play audio</span>
                    </Button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex-shrink-0 border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <Button
            type="button"
            size="icon"
            variant={isListening ? "destructive" : "outline"}
            onClick={handleMicClick}
          >
            <Mic className="h-4 w-4" />
            <span className="sr-only">
              {isListening ? "Stop listening" : "Start listening"}
            </span>
          </Button>
          <Input
            type="text"
            placeholder="Ask me to generate something..."
            className="flex-grow"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
