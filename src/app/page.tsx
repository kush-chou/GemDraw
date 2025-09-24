import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MessageSquare, Image, Bot, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <header className="p-6 border-b">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to CogniCanvas!</p>
      </header>
      <main className="flex-grow p-6 space-y-8">
        <section className="text-center">
            <Bot className="mx-auto h-16 w-16 text-primary" />
            <h2 className="mt-4 text-2xl font-semibold">Your AI-Powered Creative Suite</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                CogniCanvas integrates a powerful AI chat assistant with a dynamic visual workspace. Start a new session to chat, create, and bring your ideas to life.
            </p>
        </section>
        
        <section>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5 text-primary"/>
                    New Session
                </CardTitle>
                <CardDescription>Start a new chat and canvas session.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Button asChild className="w-full">
                  <Link href="/workspace">
                    Start Creating
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="flex flex-col hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary"/>
                    Browse Courses
                </CardTitle>
                <CardDescription>Explore our catalog of AI-powered courses.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Button asChild className="w-full">
                  <Link href="/courses">
                    Explore Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
             <Card className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
                <CardDescription>Navigate to key areas of the app.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col space-y-2">
                 <Button variant="outline" className="justify-start" asChild>
                  <Link href="/chats">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    All Chats
                  </Link>
                 </Button>
                 <Button variant="outline" className="justify-start" asChild>
                  <Link href="/gallery">
                    <Image className="mr-2 h-4 w-4" />
                    Image Gallery
                  </Link>
                 </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
