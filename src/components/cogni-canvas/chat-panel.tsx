"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Send } from "lucide-react";

const avatarAlice = PlaceHolderImages.find(img => img.id === 'avatar-alice');
const avatarBob = PlaceHolderImages.find(img => img.id === 'avatar-bob');
const avatarYou = PlaceHolderImages.find(img => img.id === 'avatar-you');
const avatarCharlie = PlaceHolderImages.find(img => img.id === 'avatar-charlie');


const messages = [
  {
    id: 1,
    name: "Alice",
    avatar: avatarAlice?.imageUrl,
    avatarHint: avatarAlice?.imageHint,
    text: "Hey everyone! Let's start brainstorming on the new logo design.",
  },
  {
    id: 2,
    name: "Bob",
    avatar: avatarBob?.imageUrl,
    avatarHint: avatarBob?.imageHint,
    text: "Sure! I'm thinking something minimalist. I'll sketch out an idea.",
  },
  {
    id: 3,
    name: "You",
    avatar: avatarYou?.imageUrl,
    avatarHint: avatarYou?.imageHint,
    text: "Great idea. Maybe we can use a soft color palette?",
    isCurrentUser: true,
  },
   {
    id: 4,
    name: "Charlie",
    avatar: avatarCharlie?.imageUrl,
    avatarHint: avatarCharlie?.imageHint,
    text: "I like that. I've added a color swatch to the canvas.",
  },
];

export default function ChatPanel() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex h-16 flex-shrink-0 items-center border-b border-border bg-primary px-4">
        <h2 className="text-lg font-semibold text-primary-foreground">
          Chat & Tools
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
                <AvatarImage src={message.avatar} alt={message.name} data-ai-hint={message.avatarHint} />
                <AvatarFallback>
                  {message.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div
                className={`max-w-[75%] rounded-lg p-3 text-sm ${
                  message.isCurrentUser
                    ? "bg-primary/20"
                    : "bg-muted"
                }`}
              >
                {!message.isCurrentUser && (
                  <p className="font-semibold mb-1">{message.name}</p>
                )}
                <p className="break-words">{message.text}</p>
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
          <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground flex-shrink-0" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
