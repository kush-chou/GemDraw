import Link from "next/link";
import Image from "next/image";
import { courses } from "@/lib/placeholder-courses";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-6 border-b">
        <h1 className="text-3xl font-bold">Courses</h1>
        <p className="text-muted-foreground">
          Browse our catalog of available courses.
        </p>
      </header>
      <main className="flex-grow p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col overflow-hidden hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="relative aspect-video rounded-md overflow-hidden mb-4">
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                    data-ai-hint={course.imageHint}
                  />
                </div>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Button asChild className="w-full">
                  <Link href={`/courses/${course.id}`}>
                    View Course <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
