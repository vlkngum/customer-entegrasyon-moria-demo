'use client';

import { useState } from 'react';
import { ChevronDown, UploadCloud, X } from 'lucide-react';
import { GiShop } from 'react-icons/gi';
import Link from 'next/link';

const CreateSupportRequestPage = () => {
  const [message, setMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFiles(prevFiles =>
      prevFiles.filter(file => file !== fileToRemove)
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center text-gray-800 mb-4 sm:mb-0">
            <span className="text-2xl text-blue-600 mr-2">
              <GiShop />
            </span>
            Destek Taleplerim
          </h1>
          <Link href="/requests-for-support/open">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center text-sm font-semibold hover:bg-gray-300 transition">
              <UploadCloud className="mr-2 h-4 w-4 transform -rotate-180" />
              Vazgeç
            </button>
          </Link>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="support-type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  DESTEK TİPİ *
                </label>
                <div className="relative">
                  <select
                    id="support-type"
                    className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Seç</option>
                    <option>Teknik Destek</option>
                    <option>Fatura Sorunu</option>
                    <option>Ürün İadesi</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="platform"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  PLATFORM *
                </label>
                <div className="relative">
                  <select
                    id="platform"
                    className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Seç</option>
                    <option>Trendyol</option>
                    <option>Hepsiburada</option>
                    <option>N11</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                KONU *
              </label>
              <input
                type="text"
                id="subject"
                className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                MESAJINIZI DETAYLI OLARAK YAZINIZ *
              </label>
              <textarea
                id="message"
                rows={10}
                className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Buraya mesajınızı yazın..."
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                EK DOSYALARI
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Dosyaları Seç</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">veya sürükleyip bırakın</p>
                  </div>
                  {selectedFiles.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">
                        Seçilen Dosyalar:
                      </h4>
                      <ul className="space-y-2">
                        {selectedFiles.map((file, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between bg-gray-100 p-2 rounded-md text-sm"
                          >
                            <span className="text-gray-800">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(file)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X size={16} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    JPG, PNG, GIF, PDF, DOC, ZIP (MAX. 2MB)
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * Birden fazla ek dosya gönderebilirsiniz.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Gönder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSupportRequestPage; 