import React from 'react';
import ImageUpload from '@/tools/ImageUpload';

interface ProductImageUploadProps {
  onImageChange: (base64Image: string) => void;
  initialImageUrl?: string;
}

export default function ProductImageUpload({ onImageChange, initialImageUrl }: ProductImageUploadProps) {
  return (
    <div className="panel">
      <div className='w-96 aspect-square'>
      <ImageUpload 
        onImageChange={onImageChange} 
        id="whatWeProduceImage" 
        initialImageUrl={initialImageUrl} 
      />
        </div>
    </div>
  );
} 