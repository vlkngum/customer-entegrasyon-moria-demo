import React from 'react';
import ImageUpload from '@/tools/ImageUpload';

interface ProductImageUploadProps {
  onImageChange: (base64Image: string) => void;
  initialImageUrl?: string;
}

export default function ProductImageUpload({ onImageChange, initialImageUrl }: ProductImageUploadProps) {
  return (
    <div className="panel">
      <div className="h-min">
        <ImageUpload 
          onImageChange={onImageChange} 
          id="whatWeProduceImage" 
          initialImageUrl={initialImageUrl} 
        />
      </div>
    </div>
  );
} 