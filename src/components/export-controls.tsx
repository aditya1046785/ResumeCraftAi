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
            const resumeHTML = previewRef.current.outerHTML;
            const originalDocument = document;

            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Resume</title>
                    </head>
                    <body>
                        ${resumeHTML}
                    </body>
                </html>
            `);

            // Copy all stylesheets from the original document to the print window
            Array.from(originalDocument.styleSheets).forEach(styleSheet => {
                if (styleSheet.href) {
                    const link = printWindow.document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = styleSheet.href;
                    printWindow.document.head.appendChild(link);
                } else if (styleSheet.cssRules) {
                    const style = printWindow.document.createElement('style');
                    style.textContent = Array.from(styleSheet.cssRules)
                        .map(rule => rule.cssText)
                        .join('');
                    printWindow.document.head.appendChild(style);
                }
            });

            // Ensure fonts are loaded (important for custom fonts)
            const fontLink = originalDocument.querySelector('link[href*="fonts.googleapis.com"]');
            if (fontLink) {
                printWindow.document.head.appendChild(fontLink.cloneNode());
            }

            printWindow.document.close();
            
            printWindow.onload = () => {
              // A small delay ensures all styles and fonts are applied before printing
              setTimeout(() => {
                  printWindow.focus();
                  printWindow.print();
                  printWindow.close();
              }, 500);
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
