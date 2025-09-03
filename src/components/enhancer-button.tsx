'use client';

import { useState } from 'react';
import { enhanceResumeContent } from '@/ai/flows/resume-content-enhancement';
import { useResumeStore } from '@/lib/store';
import type { ResumeSection } from '@/lib/types';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';
import { Loader2Icon } from './icons';
import { useToast } from '@/hooks/use-toast';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"


export function EnhancerButton({ section }: { section: ResumeSection }) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [suggestion, setSuggestion] = useState<string | null>(null);
    const content = useResumeStore((state) => state.resumeData[section]);
    const updateSection = useResumeStore((state) => state.updateSection);

    const handleEnhance = async () => {
        setIsLoading(true);
        try {
            const result = await enhanceResumeContent({ rawContent: content });
            setSuggestion(result.enhancedContent);
        } catch (error) {
            console.error('Failed to enhance content:', error);
            toast({
                title: "Enhancement Failed",
                description: "There was an error enhancing your content. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleAccept = () => {
        if(suggestion) {
            updateSection(section, suggestion);
        }
        setSuggestion(null);
    }

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleEnhance}
                disabled={isLoading || !content.trim()}
                className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-primary"
                aria-label="Enhance content with AI"
            >
                {isLoading ? (
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                    <Sparkles className="h-4 w-4" />
                )}
            </Button>

            <AlertDialog open={!!suggestion} onOpenChange={(open) => !open && setSuggestion(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>AI Suggestion</AlertDialogTitle>
                        <AlertDialogDescription>
                            Here's a stronger way to phrase that. Would you like to use this version?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="my-4 p-4 bg-secondary rounded-md max-h-60 overflow-y-auto">
                        <p className="text-sm font-semibold mb-2">Current:</p>
                        <p className="text-sm text-muted-foreground mb-4">{content}</p>
                        <p className="text-sm font-semibold mb-2">Suggestion:</p>
                        <p className="text-sm">{suggestion}</p>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAccept}>Accept Suggestion</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
