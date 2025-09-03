'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { parseUploadedResume } from '@/ai/flows/parse-uploaded-resume';
import { useResumeStore } from '@/lib/store';
import type { ResumeData } from '@/lib/types';

import { Card, CardContent } from '@/components/ui/card';
import { ResumeEditor } from '@/components/resume-editor';
import { ResumePreview } from '@/components/resume-preview';
import { JobMatcher } from '@/components/job-matcher';
import { ExportControls } from '@/components/export-controls';
import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from '@/components/icons';

function BuildPageContent() {
  const searchParams = useSearchParams();
  const setResumeData = useResumeStore((state) => state.setResumeData);
  const [flow, setFlow] = useState<'select' | 'upload' | 'scratch' | 'editing'>('select');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialFlow = searchParams.get('flow');
    if (initialFlow === 'upload') {
      setFlow('upload');
    } else if (initialFlow === 'scratch') {
      // For scratch, we can go directly to editing with a blank slate
      setFlow('editing');
    }
  }, [searchParams]);

  const handleFileProcess = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const dataUri = reader.result as string;
        const parsedData = await parseUploadedResume({ resumeDataUri: dataUri });

        const newResumeData: ResumeData = {
          name: '',
          contact: '',
          summary: '',
          experience: parsedData.internships || '',
          education: parsedData.education || '',
          projects: parsedData.projects || '',
          skills: parsedData.skills || '',
        };

        setResumeData(newResumeData);
        setFlow('editing');
      };
      reader.onerror = () => {
        setError('Failed to read file.');
        setIsLoading(false);
      };
    } catch (e) {
      setError('Failed to parse resume. Please try again.');
      setIsLoading(false);
    } finally {
      // setIsLoading(false) is handled in onload/onerror
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
        <Loader2Icon className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-xl font-semibold">Analyzing your resume...</h2>
        <p className="text-muted-foreground">We're extracting your details and preparing the editor.</p>
      </div>
    );
  }

  if (error) {
     return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
        <h2 className="text-xl font-semibold text-destructive">Oops! Something went wrong.</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => { setError(null); setFlow('upload'); }}>Try Again</Button>
      </div>
    );
  }
  
  if (flow === 'upload') {
    return <FileUploader onFileProcess={handleFileProcess} />;
  }

  if (flow === 'editing') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <div className="lg:overflow-y-auto h-full pr-4">
          <ResumeEditor />
        </div>
        <div className="lg:overflow-y-auto h-full pr-4">
          <Card>
            <CardContent className="p-0">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Preview & Refine</h2>
                  <ExportControls previewRef={previewRef} />
                  <JobMatcher />
                </div>
                <div className="bg-gray-100 p-8">
                    <ResumePreview ref={previewRef} />
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Default flow selection
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Choose your path</h2>
      <div className="flex justify-center gap-4">
        <Button onClick={() => setFlow('upload')}>Upload Resume</Button>
        <Button onClick={() => setFlow('editing')} variant="secondary">Start from Scratch</Button>
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
