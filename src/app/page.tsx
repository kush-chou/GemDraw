import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Image, Bot, GraduationCap, PenSquare } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <header className="p-6 md:p-8 border-b">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to CogniCanvas.</p>
      </header>
      <main className="flex-grow p-6 md:p-8 space-y-8">
        <section>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/workspace">
                <Card className="h-full hover:bg-muted transition-colors">
                    <CardContent className="p-6 flex flex-col items-start justify-between h-full">
                        <div>
                            <PenSquare className="h-8 w-8 text-primary mb-4" />
                            <h2 className="text-xl font-semibold">Workspace</h2>
                            <p className="text-muted-foreground mt-1">
                                Start a new chat and canvas session.
                            </p>
                        </div>
                        <Button variant="link" className="p-0 mt-4">
                            Start Creating <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            </Link>
             <Link href="/courses">
                <Card className="h-full hover:bg-muted transition-colors">
                    <CardContent className="p-6 flex flex-col items-start justify-between h-full">
                        <div>
                            <GraduationCap className="h-8 w-8 text-primary mb-4" />
                            <h2 className="text-xl font-semibold">Courses</h2>
                            <p className="text-muted-foreground mt-1">
                                Explore our catalog of AI-powered courses.
                            </p>
                        </div>
                         <Button variant="link" className="p-0 mt-4">
                            Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            </Link>
             <Link href="/gallery">
                 <Card className="h-full hover:bg-muted transition-colors">
                    <CardContent className="p-6 flex flex-col items-start justify-between h-full">
                       <div>
                            <Image className="h-8 w-8 text-primary mb-4" />
                            <h2 className="text-xl font-semibold">Canvas Gallery</h2>
                            <p className="text-muted-foreground mt-1">
                                View your generated images.
                            </p>
                       </div>
                        <Button variant="link" className="p-0 mt-4">
                            View Gallery <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
