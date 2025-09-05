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
import { Send, RotateCcw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


function ChatPanel() {
  const { history, addMessage, setHistory, clearChat, setResumeData } = useResumeStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  const startConversation = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await askResumeQuestion({ history: [] });
      addMessage({ role: 'model', text: result.question });
    } catch (e: any) {
        if (e.message && (e.message.includes('503') || e.message.includes('overloaded'))) {
            setError('The AI model is currently overloaded. Please wait a moment and try again.');
        } else {
            setError('Failed to start the conversation. Please try refreshing the page.');
        }
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isInitialized) {
        setIsInitialized(true);
        setTimeout(() => {
            const currentHistory = useResumeStore.getState().history;
            if (currentHistory.length === 0) {
                startConversation();
            } else {
                const lastMessage = currentHistory[currentHistory.length - 1];
                if(lastMessage?.text.includes("I've drafted your resume")) {
                    setIsComplete(true);
                }
            }
        }, 100);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (scrollViewportRef.current) {
        scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
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
      const result = await askResumeQuestion({ history: currentHistory });
      addMessage({ role: 'model', text: result.question });
      
      if (result.isComplete) {
        setResumeData(result.updatedResumeData);
        setIsComplete(true);
      }
    } catch (e: any) {
      setHistory(history);
      if (e.message && (e.message.includes('503') || e.message.includes('overloaded'))) {
        setError('The AI model is currently overloaded. Please wait a moment and send your message again.');
      } else {
        setError('Sorry, something went wrong. Please try sending your message again.');
      }
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    clearChat();
    setIsComplete(false);
    startConversation();
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
    <Card className="flex flex-col h-full max-h-full overflow-hidden no-print lg:border-0 lg:shadow-none">
      <CardHeader className="flex-row items-center justify-between p-4 lg:p-0 lg:pb-6">
          <div>
            <CardTitle>Resume Conversation</CardTitle>
            <CardDescription className="hidden sm:block">Let&apos;s build your resume together.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleStartOver}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Start Over
          </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden p-0 sm:p-4 lg:p-0">
        <ScrollArea className="flex-1 pr-4 -mr-4" viewportRef={scrollViewportRef}>
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
          {error && <p className="text-destructive text-sm text-center py-2">{error}</p>}
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
  );
}

function PreviewPanel() {
  const previewRef = useRef<HTMLDivElement>(null);
  return (
    <div id="resume-container" className="h-full flex flex-col overflow-hidden">
      <Card className="flex flex-col h-full lg:border-0 lg:shadow-none">
          <CardHeader className='flex-row justify-between items-center no-print lg:p-0 lg:pb-6'>
               <div>
                  <h2 className="text-2xl font-bold">Live Preview</h2>
               </div>
              <ExportControls previewRef={previewRef} />
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="bg-gray-100 p-2 sm:p-8">
                  <ResumePreview ref={previewRef} />
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
    </div>
  );
}


function BuildPageContent() {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <Card className="flex flex-col h-full max-h-full overflow-hidden no-print">
          <CardContent className="p-6 h-full">
            <ChatPanel />
          </CardContent>
        </Card>
        <Card className="flex flex-col h-full max-h-full overflow-hidden no-print">
          <CardContent className="p-6 h-full">
             <PreviewPanel />
          </CardContent>
        </Card>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden h-full">
        <Tabs defaultValue="chat" className="w-full h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="flex-1 overflow-hidden">
            <Card className="h-full border-0 shadow-none">
                <CardContent className="p-0 h-full">
                    <ChatPanel />
                </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preview" className="flex-1 overflow-hidden">
             <Card className="h-full border-0 shadow-none">
                <CardContent className="p-0 sm:p-4 h-full">
                    <PreviewPanel />
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default function BuildPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto px-4 py-8 h-[calc(100vh-4rem-1px)]">
        <BuildPageContent />
      </div>
    </Suspense>
  );
}
