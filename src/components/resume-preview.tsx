'use client';

import React, { forwardRef } from 'react';
import { useResumeStore } from '@/lib/store';
import type { ResumeSection } from '@/lib/types';

const ResumePreview = forwardRef<HTMLDivElement>((props, ref) => {
    const resumeData = useResumeStore((state) => state.resumeData);
    const updateSection = useResumeStore((state) => state.updateSection);
    const { name, contact, summary, experience, projects, education, skills } = resumeData;

    const handleContentChange = (section: ResumeSection, e: React.FormEvent<HTMLDivElement>) => {
        updateSection(section, e.currentTarget.innerText);
    };

    const renderSection = (title: string, content: string, sectionKey: ResumeSection) => {
        if (!content.trim()) return null;
        return (
            <div className="mb-6">
                <h2 
                    style={{ 
                        textTransform: 'uppercase', 
                        borderBottom: '1px solid #dbeafe', 
                        paddingBottom: '0.25rem', 
                        marginBottom: '0.5rem',
                        color: '#1e3a8a'
                    }} 
                    className="text-sm font-bold"
                >
                    {title}
                </h2>
                <div 
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleContentChange(sectionKey, e)}
                    className="text-xs text-gray-800 whitespace-pre-wrap"
                    style={{ outline: 'none' }}
                >
                    {content}
                </div>
            </div>
        );
    }

    return (
        <div 
            ref={ref} 
            id="resume-preview" 
            style={{
                '--tw-shadow': '0 10px 15px -3px rgb(59 130 246 / 0.1), 0 4px 6px -4px rgb(59 130 246 / 0.1)',
                '--tw-shadow-colored': '0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)',
                boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
                padding: '0.5in',
                border: '1px solid #e5e7eb',
            }}
            className="bg-white text-black font-sans"
        >
            <div style={{ textAlign: 'center' }} className="mb-8">
                <h1 
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleContentChange('name', e)}
                    style={{ color: '#1e3a8a', outline: 'none' }} 
                    className="text-2xl font-bold"
                >
                    {name}
                </h1>
                <p 
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleContentChange('contact', e)}
                    className="text-xs text-gray-600"
                    style={{ outline: 'none' }}
                >
                    {contact}
                </p>
            </div>

            {renderSection('Summary', summary, 'summary')}
            {renderSection('Experience', experience, 'experience')}
            {renderSection('Projects', projects, 'projects')}
            {renderSection('Education', education, 'education')}
            {renderSection('Skills', skills, 'skills')}
        </div>
    );
});

ResumePreview.displayName = 'ResumePreview';

export { ResumePreview };
