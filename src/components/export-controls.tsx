'use client';

import React from 'react';
import { Button } from './ui/button';
import { Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportControlsProps {
    previewRef: React.RefObject<HTMLDivElement>;
}

export function ExportControls({ previewRef }: ExportControlsProps) {
    const { toast } = useToast();

    const handlePrint = () => {
        if (!previewRef.current) return;

        const printWindow = window.open('', '', 'height=800,width=800');

        if (printWindow) {
            const resumeHTML = previewRef.current.innerHTML;
            const styles = Array.from(document.styleSheets)
                .map((styleSheet) => {
                    try {
                        return Array.from(styleSheet.cssRules)
                            .map((rule) => rule.cssText)
                            .join('');
                    } catch (e) {
                        console.warn('Could not read stylesheet rules:', e);
                        return '';
                    }
                })
                .join('');
            
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Resume</title>
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
                        <style>${styles}</style>
                    </head>
                    <body style="margin: 0; padding: 0;">
                        ${resumeHTML}
                    </body>
                </html>
            `);

            printWindow.document.close();
            
            printWindow.onload = () => {
              setTimeout(() => {
                  printWindow.focus();
                  printWindow.print();
                  printWindow.close();
              }, 250);
            };

        } else {
            toast({
                title: "Print Failed",
                description: "Could not open print window. Please check your browser's pop-up settings.",
                variant: "destructive"
            });
        }
    };
    
    const handleDocxExport = () => {
        toast({
            title: "Feature Coming Soon",
            description: "DOCX export is not yet available in this version.",
        });
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 no-print">
            <Button onClick={handlePrint}>
                <Download className="mr-2 h-4 w-4" />
                Export as PDF
            </Button>
            <Button variant="outline" onClick={handleDocxExport}>
                <FileText className="mr-2 h-4 w-4" />
                Export as DOCX
            </Button>
        </div>
    );
}
