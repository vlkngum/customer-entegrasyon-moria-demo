'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
interface ImageUploadMultiProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export default function ImageUploadMulti({ images, onImagesChange }: ImageUploadMultiProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const fileArr = Array.from(files);
    fileArr.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target?.result as string;
          onImagesChange([...images, base64Image]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = (idx: number) => {
    const newImages = images.filter((_, i) => i !== idx);
    onImagesChange(newImages);
  };

  return (
    <div className='panel'>
      <label className="block text-sm font-medium text-gray-700 mb-2">Görseller</label>
      <div
         className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-200 h-full w-full flex flex-col items-center justify-center relative overflow-hidden`}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        <div className="flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="text-sm text-gray-600">
          <label
            htmlFor="image-upload-multi"
            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
          >
            <span>Görsel yüklemek için tıklayın</span>
            <input
              id="image-upload-multi"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </label>
          <p className="pl-1">veya sürükleyip bırakın</p>
        </div>
        <p className="text-xs text-gray-500">PNG, JPG, GIF (max. 10MB)</p>
      </div>
      {/* Thumbnail listesi */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {images.map((img, idx) => (
            <div key={idx} className="relative group">
              <Image src={img} width={0} height={0} alt={`Yüklenen ${idx + 1}`} className="w-24 h-24 object-cover rounded shadow" />
              <button
                type="button"
                className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 text-red-500 hover:bg-red-100"
                onClick={() => handleDelete(idx)}
                title="Sil"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 