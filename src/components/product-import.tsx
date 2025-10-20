'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ProductImport() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.floor(Math.random() * 20) + 5;
      });
    }, 200);

    // Simulate network request
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setFile(null);
        toast({
            title: "Upload Complete (Simulated)",
            description: `${file.name} has been successfully imported.`,
        });
      }, 500);
    }, 2500);
  };

  return (
    <div className="space-y-4 max-w-lg">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="product-file">CSV/JSON File</Label>
        <div className="flex gap-2">
            <Input id="product-file" type="file" accept=".csv, .json" onChange={handleFileChange} className="cursor-pointer"/>
            <Button onClick={handleUpload} disabled={!file || isUploading}>
                <Upload className="mr-2 h-4 w-4" />
                Upload
            </Button>
        </div>
      </div>
      {isUploading && (
        <div className="space-y-2 pt-2">
            <div className="flex justify-between text-sm text-muted-foreground">
                <p>Uploading {file?.name}...</p>
                <p>{Math.round(progress)}%</p>
            </div>
            <Progress value={progress} />
        </div>
      )}
    </div>
  );
}
