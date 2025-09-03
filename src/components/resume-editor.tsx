'use client';

import { useResumeStore } from '@/lib/store';
import type { ResumeSection } from '@/lib/types';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { EnhancerButton } from './enhancer-button';

function EditorSection({ id, label, isTextarea = false }: { id: ResumeSection, label: string, isTextarea?: boolean }) {
    const value = useResumeStore((state) => state.resumeData[id]);
    const updateSection = useResumeStore((state) => state.updateSection);

    const Component = isTextarea ? Textarea : Input;

    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-base font-semibold">{label}</Label>
            <div className="relative">
                <Component
                    id={id}
                    value={value}
                    onChange={(e) => updateSection(id, e.target.value)}
                    className="pr-10"
                    rows={isTextarea ? 8 : undefined}
                />
                <EnhancerButton section={id} />
            </div>
        </div>
    )
}


export function ResumeEditor() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Resume Editor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <EditorSection id="name" label="Full Name" />
                <EditorSection id="contact" label="Contact Info" />
                <EditorSection id="summary" label="Summary" isTextarea />
                <EditorSection id="experience" label="Experience / Internships" isTextarea />
                <EditorSection id="projects" label="Projects" isTextarea />
                <EditorSection id="education" label="Education" isTextarea />
                <EditorSection id="skills" label="Skills" isTextarea />
            </CardContent>
        </Card>
    )
}
