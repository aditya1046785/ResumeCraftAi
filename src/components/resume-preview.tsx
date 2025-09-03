'use client';

import React, { forwardRef } from 'react';
import { useResumeStore } from '@/lib/store';

const ResumePreview = forwardRef<HTMLDivElement>((props, ref) => {
    const resumeData = useResumeStore((state) => state.resumeData);
    const { name, contact, summary, experience, projects, education, skills } = resumeData;

    const renderSection = (title: string, content: string) => {
        if (!content.trim()) return null;
        return (
            <div className="mb-8">
                <h2 
                    style={{ 
                        textTransform: 'uppercase', 
                        borderBottom: '1px solid #9ca3af', 
                        paddingBottom: '0.25rem', 
                        marginBottom: '0.5rem' 
                    }} 
                    className="text-sm font-bold text-gray-700"
                >
                    {title}
                </h2>
                <div className="text-xs text-gray-800 whitespace-pre-wrap">{content}</div>
            </div>
        );
    }

    return (
        <div ref={ref} id="resume-preview">
            <div style={{ padding: '0.5in', border: '1px solid #e5e7eb', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }} className="bg-white shadow-lg text-black font-sans">
                <div style={{ textAlign: 'center' }} className="mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
                    <p className="text-xs text-gray-600">{contact}</p>
                </div>

                {renderSection('Summary', summary)}
                {renderSection('Experience', experience)}
                {renderSection('Projects', projects)}
                {renderSection('Education', education)}
                {renderSection('Skills', skills)}
            </div>
        </div>
    );
});

ResumePreview.displayName = 'ResumePreview';

export { ResumePreview };
