import React from 'react';
import ImageUpload from '@/tools/ImageUpload';

interface ProductImageUploadProps {
  onImageChange: (base64Image: string) => void;
  initialImageUrl?: string;
}

export default function ProductImageUpload({ onImageChange, initialImageUrl }: ProductImageUploadProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <ImageUpload 
        onImageChange={onImageChange} 
        id="whatWeProduceImage" 
        initialImageUrl={initialImageUrl} 
      />
    </div>
  );
} 