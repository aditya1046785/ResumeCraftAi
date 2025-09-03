'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useResumeStore } from '@/lib/store';
import { askResumeQuestion } from '@/ai/flows/conversational-resume';
import type { Message } from '@/lib/types';
import type { ResumeData } from '@/lib/types';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResumePreview } from '@/components/resume-preview';
import { ExportControls } from '@/components/export-controls';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2Icon } from '@/components/icons';
import { Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


function BuildPageContent() {
  const searchParams = useSearchParams();
  const { resumeData, setResumeData, history, setHistory, addMessage } = useResumeStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  
  const previewRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);


  const startConversation = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await askResumeQuestion({ resumeData, history: [] });
      setHistory([{ role: 'model', text: result.question }]);
    } catch (e) {
      setError('Failed to start the conversation. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Start conversation on component mount only if history is empty
  useEffect(() => {
    // Zustand's persistence is asynchronous, so we need to wait for rehydration
    // A simple check on mount is usually sufficient if we assume rehydration is fast
    const unsubscribe = useResumeStore.persist.onRehydrateStorage(() => {
      if (useResumeStore.getState().history.length === 0) {
        startConversation();
      }
    });

    // Handle case where rehydration already happened
    if (useResumeStore.getState().history.length === 0) {
        startConversation();
    }
    
    return () => {
        unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [history]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: Message = { role: 'user', text: userInput };
    addMessage(newUserMessage);
    const currentHistory = [...history, newUserMessage];

    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      const result = await askResumeQuestion({ resumeData, history: currentHistory });
      setResumeData(result.updatedResumeData);
      addMessage({ role: 'model', text: result.question });
      if (result.isComplete) {
        setIsComplete(true);
      }
    } catch (e) {
      setError('Sorry, something went wrong. Please try sending your message again.');
      console.error(e);
      // Revert optimistic update on error
      setHistory(history);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message: Message, index: number) => (
    <div key={index} className={`flex items-start gap-3 my-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
      {message.role === 'model' && (
        <Avatar className="w-8 h-8">
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div className={`rounded-lg px-4 py-2 max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Chat Panel */}
      <Card className="flex flex-col h-full max-h-full overflow-hidden">
        <CardHeader>
          <CardTitle>Resume Conversation</CardTitle>
          <CardDescription>Let&apos;s build your resume together. Answer the questions below.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
          <ScrollArea className="flex-1 pr-4 -mr-4" ref={scrollAreaRef}>
            {history.map(renderMessage)}
             {isLoading && history.length > 0 && (
                <div className="flex items-start gap-3 my-4">
                    <Avatar className="w-8 h-8">
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-2 bg-muted flex items-center">
                        <Loader2Icon className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                </div>
            )}
            {error && <p className="text-destructive text-sm text-center">{error}</p>}
          </ScrollArea>
           <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-4 border-t">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={isComplete ? "The conversation has ended." : "Type your answer..."}
                disabled={isLoading || isComplete}
              />
              <Button type="submit" disabled={isLoading || isComplete} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
        </CardContent>
      </Card>

      {/* Preview Panel */}
      <div className="h-full flex flex-col overflow-hidden">
        <ScrollArea className="flex-1">
          <Card>
            <CardHeader>
                 <h2 className="text-2xl font-bold">Live Preview</h2>
                <ExportControls previewRef={previewRef} />
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-gray-100 p-8">
                <ResumePreview ref={previewRef} />
              </div>
            </CardContent>
          </Card>
        </ScrollArea>
      </div>
    </div>
  );
}

export default function BuildPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto px-4 py-8 h-[calc(100vh-4rem)]">
        <BuildPageContent />
      </div>
    </Suspense>
  );
}
