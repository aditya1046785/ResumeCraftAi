
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
        if (!previewRef.current) {
            toast({
                title: "Error",
                description: "Could not find the resume preview to print.",
                variant: "destructive"
            });
            return;
        }

        const printWindow = window.open('', '', 'height=800,width=800');

        if (printWindow) {
            const resumeHTML = previewRef.current.innerHTML;
            const originalDocument = window.document;
            const printDocument = printWindow.document;

            printDocument.open();
            printDocument.write(`
                <html>
                    <head>
                        <title>Print Resume</title>
                    </head>
                    <body>
                        ${resumeHTML}
                    </body>
                </html>
            `);

            // Find all stylesheets and style tags in the original document and append them to the new window's head
            const styles = originalDocument.querySelectorAll('link[rel="stylesheet"], style');
            styles.forEach(style => {
                printDocument.head.appendChild(style.cloneNode(true));
            });
            
            printDocument.close();
            
            printWindow.onload = () => {
              setTimeout(() => {
                  printWindow.focus();
                  printWindow.print();
                  printWindow.close();
              }, 250); // A small delay is crucial to ensure all styles are rendered
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
