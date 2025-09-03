'use client';

import React, { forwardRef } from 'react';
import { useResumeStore } from '@/lib/store';

const ResumePreview = forwardRef<HTMLDivElement>((props, ref) => {
    const resumeData = useResumeStore((state) => state.resumeData);
    const { name, contact, summary, experience, projects, education, skills } = resumeData;

    const renderSection = (title: string, content: string) => {
        if (!content.trim()) return null;
        return (
            <div className="mb-4">
                <h2 className="text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-2 text-gray-700">{title}</h2>
                <div className="text-xs text-gray-800 whitespace-pre-wrap">{content}</div>
            </div>
        );
    }

    return (
        <div ref={ref} className="bg-white p-6 shadow-lg text-black font-sans print:shadow-none" id="resume-preview">
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
    );
});

ResumePreview.displayName = 'ResumePreview';

export { ResumePreview };
