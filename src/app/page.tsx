import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-headline">
          Build your resume with a conversation
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          No more guessing what to write. Our AI will ask you simple questions, and piece by piece, we'll build a professional resume that highlights your strengths and gets you noticed.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/build" legacyBehavior>
            <Button size="lg" className="w-full sm:w-auto">
              <Bot className="mr-2 h-5 w-5" />
              Start Conversation
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Conversational AI</CardTitle>
            <CardDescription>Just answer a few questions, and our AI will craft your resume for you.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">"Tell me about your last role."</p>
            <p className="text-xl font-semibold text-primary my-2">→</p>
            <p className="text-sm text-foreground">A perfectly formatted experience section, highlighting your achievements.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>See your resume come to life in real-time as you chat with our AI.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Your resume is updated with every answer you provide.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Easy Export</CardTitle>
            <CardDescription>Once you're happy with your resume, export it to PDF with a single click.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="flex items-center justify-center space-x-4">
               <p className="text-sm text-muted-foreground">Get a professional, job-ready resume in minutes.</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
