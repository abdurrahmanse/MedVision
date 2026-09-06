import { useCallback, useState } from "react";

interface DragAndDropProps {
  onFileDrop: (file: File) => void;
  accept?: string[];
  maxSizeMB?: number;
}

export function useDragAndDrop({ onFileDrop, accept = ["image/jpeg", "image/png"], maxSizeMB = 5 }: DragAndDropProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    const files = Array.from(e.dataTransfer.files);
    
    if (files.length === 0) return;
    
    const file = files[0];
    
    if (accept.length > 0 && !accept.includes(file.type)) {
      setError(`Invalid file type. Accepted types: ${accept.join(", ")}`);
      return;
    }
    
    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }

    onFileDrop(file);
  }, [onFileDrop, accept, maxSizeMB]);

  return {
    isDragging,
    error,
    clearError: () => setError(null),
    dragProps: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    }
  };
}
