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

            // Find the main stylesheet URL
            const styleSheet = Array.from(document.styleSheets).find(ss => ss.href && ss.href.includes('app/globals.css'));
            const cssLink = styleSheet ? `<link rel="stylesheet" href="${styleSheet.href}">` : '';
            
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Resume</title>
                        ${cssLink}
                        <style>
                            @media print {
                                body { 
                                    margin: 0; 
                                    padding: 0;
                                    -webkit-print-color-adjust: exact !important;
                                    print-color-adjust: exact !important;
                                }
                                #resume-preview { 
                                    box-shadow: none !important; 
                                    margin: 0 !important;
                                    border: none !important;
                                }
                            }
                        </style>
                    </head>
                    <body>
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
              }, 250); // A small delay to ensure styles are applied
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
