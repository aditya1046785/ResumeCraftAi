'use client';

import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FileUp } from 'lucide-react';

interface FileUploaderProps {
  onFileProcess: (file: File) => void;
}

export function FileUploader({ onFileProcess }: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileProcess(acceptedFiles[0]);
      }
    },
    [onFileProcess]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <CardTitle>Upload Your Resume</CardTitle>
          <CardDescription>Drag & drop a PDF or DOCX file here, or click to select a file.</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              isDragActive ? 'border-primary bg-accent' : 'border-border hover:border-primary'
            }`}
          >
            <input {...getInputProps()} />
            <FileUp className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">
              {isDragActive ? 'Drop the file here...' : 'Drag & drop or click to upload'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
