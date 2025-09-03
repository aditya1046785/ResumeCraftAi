'use client';

import { useState } from 'react';
import { useResumeStore } from '@/lib/store';
import { jobDescriptionMatch } from '@/ai/flows/job-description-matching';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Loader2Icon } from './icons';
import { Target } from 'lucide-react';

export function JobMatcher() {
    const resumeData = useResumeStore((state) => state.resumeData);
    const [jobDescription, setJobDescription] = useState('');
    const [result, setResult] = useState<{ fitScore: number; suggestions: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleMatch = async () => {
        setIsLoading(true);
        setResult(null);
        const resumeContent = Object.values(resumeData).join('\n\n');
        try {
            const matchResult = await jobDescriptionMatch({ jobDescription, resumeContent });
            setResult(matchResult);
        } catch (error) {
            console.error('Failed to match job description:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Target /> Job Description Matcher
                </CardTitle>
                <CardDescription>
                    Paste a job description to get a "Fit Score" and tailored suggestions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Textarea
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={6}
                    />
                    <Button onClick={handleMatch} disabled={isLoading || !jobDescription.trim()}>
                        {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                        Analyze Fit
                    </Button>
                    {result && (
                        <div className="space-y-4 pt-4">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-semibold">Fit Score</p>
                                    <p className="font-bold text-primary">{result.fitScore}%</p>
                                </div>
                                <Progress value={result.fitScore} />
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Suggestions</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.suggestions}</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
