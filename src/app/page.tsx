import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MessageSquare, Image } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-6 border-b">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to CogniCanvas!</p>
      </header>
      <main className="flex-grow p-6 space-y-6">
        <section>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>New Session</CardTitle>
                <CardDescription>Start a new chat and canvas session.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Button asChild className="w-full">
                  <Link href="/workspace">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Start Creating
                  </Link>
                </Button>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent sessions will appear here.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground text-center py-8">
                  No recent activity
                </div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
                <CardDescription>Navigate to key areas of the app.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col space-y-2">
                 <Button variant="outline" className="justify-start">
                   <MessageSquare className="mr-2 h-4 w-4" />
                   All Chats
                 </Button>
                 <Button variant="outline" className="justify-start">
                   <Image className="mr-2 h-4 w-4" />
                   Image Gallery
                 </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
