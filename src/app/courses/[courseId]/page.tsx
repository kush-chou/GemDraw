import { courses } from "@/lib/placeholder-courses";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen } from "lucide-react";

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const course = courses.find((c) => c.id === params.courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex flex-col h-full">
      <header className="p-6 border-b">
        <div className="flex items-start gap-4">
            <div className="relative w-24 h-24 aspect-square rounded-lg overflow-hidden flex-shrink-0">
                <Image
                    src={course.imageUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                    data-ai-hint={course.imageHint}
                />
            </div>
            <div>
                <h1 className="text-3xl font-bold">{course.title}</h1>
                <p className="text-muted-foreground mt-1">{course.description}</p>
            </div>
        </div>
      </header>
      <main className="flex-grow p-6">
        <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
        <Accordion type="single" collapsible className="w-full">
          {course.subjects.map((subject) => (
            <AccordionItem value={subject.id} key={subject.id}>
              <AccordionTrigger className="text-lg">{subject.title}</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-4">
                  {subject.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                      <BookOpen className="h-4 w-4" />
                      <span>{lesson.title}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  );
}
