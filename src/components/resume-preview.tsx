'use client';

import React, { forwardRef } from 'react';
import { useResumeStore } from '@/lib/store';

const ResumePreview = forwardRef<HTMLDivElement>((props, ref) => {
    const resumeData = useResumeStore((state) => state.resumeData);
    const { name, contact, summary, experience, projects, education, skills } = resumeData;

    const renderSection = (title: string, content: string) => {
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
                <div className="text-xs text-gray-800 whitespace-pre-wrap">{content}</div>
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
                <h1 style={{ color: '#1e3a8a' }} className="text-2xl font-bold">{name}</h1>
                <p className="text-xs text-gray-600">{contact}</p>
            </div>

            {renderSection('Summary', summary)}
            {renderSection('Experience', experience)}
            {renderSection('Projects', projects)}
            {renderSection('Education', education)}
            {renderSection('Skills', skills)}
        </div>
    );
});

ResumePreview.displayName = 'ResumePreview';

export { ResumePreview };
