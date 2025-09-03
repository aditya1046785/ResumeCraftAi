import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-headline">
          Build a job-ready tech resume in minutes
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          No stress, no templates, just your story made strong. Upload your draft resume for quick fixes OR start fresh by answering a few simple questions. We’ll do the heavy lifting to make it professional, clear, and tailored to your dream job.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/build?flow=upload" legacyBehavior>
            <Button size="lg" className="w-full sm:w-auto">
              <FileUp className="mr-2 h-5 w-5" />
              Upload My Resume
            </Button>
          </Link>
          <Link href="/build?flow=scratch" legacyBehavior>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              <Sparkles className="mr-2 h-5 w-5" />
              Start From Scratch
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>AI Coaching</CardTitle>
            <CardDescription>Transform raw input into professional achievements that stand out.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">"Built a website"</p>
            <p className="text-xl font-semibold text-primary my-2">→</p>
            <p className="text-sm text-foreground">"Developed a responsive React application, increasing user engagement by 25%."</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Content-Aware Layouts</CardTitle>
            <CardDescription>Layouts adapt to your career level, emphasizing what matters most.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-sm">For Students:</p>
            <p className="text-sm text-muted-foreground mb-2">Projects & Skills are front and center.</p>
             <p className="font-medium text-sm">For Junior Devs:</p>
            <p className="text-sm text-muted-foreground">Experience & achievements take the lead.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Job Description Matcher</CardTitle>
            <CardDescription>Get a "Fit Score" and tailored suggestions to beat the ATS.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="flex items-center justify-center space-x-4">
               <div className="text-4xl font-bold text-primary">75%</div>
               <p className="text-sm text-muted-foreground">match. Add more about your React.js skills to improve.</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
