'use client';

import {
  ChevronRight,
  Upload,
  Paperclip,
  Calendar,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, ChangeEvent } from 'react';

const SupportRequestDetailPage = ({ params }: { params: { id: string } }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen text-gray-800">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            #{params.id} Numaralı Destek Talebi Detayı
          </h1>
          <div className="flex items-center text-sm text-gray-500">
            <Link
              href="/"
              className="text-blue-600 hover:underline"
            >
              Yönetim Paneli
            </Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <Link
              href="/requests-for-support/open"
              className="text-blue-600 hover:underline"
            >
              Destek
            </Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span>#{params.id} Numaralı Destek Talebi</span>
          </div>
        </div>
        <a href="/requests-for-support/open" className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-600 px-4 py-2 rounded-lg flex items-center text-sm font-semibold">
         
          Vazgeç
        </a>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200 bg-blue-50/30 rounded-t-lg">
          <div className="flex items-center">
            <div className="mr-4">
              <Image
                src="/cmapps-logo.svg"
                alt="Sopyo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Deneme</p>
              <p className="text-sm text-gray-600">
                #{params.id} Numaralı destek talebiniz 22.06.2025 18:56
                tarihinde oluşturulmuş.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                <User className="text-gray-500" />
              </div>
              <div>
                <p className="font-semibold">deneme</p>
                <p className="text-sm text-gray-500">sevincyahya8@gmail.com</p>
              </div>
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>22.06.2025 18:56</span>
            </div>
          </div>

          <div className="mt-4 text-gray-800">
            <p>Bunlar hep bilgi</p>
          </div>

          <div className="mt-4">
            <Link
              href="#"
              className="text-blue-600 hover:underline text-sm flex items-center"
            >
              <Paperclip className="w-4 h-4 mr-2" />
              Talep Dosya Ekleri | Ek 1
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-4">
            MESAJINIZ :
          </h3>
          <div className="border rounded-lg">
            
            <textarea
              className="w-full h-40 p-4 border-0 focus:ring-0 resize-y"
              placeholder="Mesajınızı buraya yazın..."
            ></textarea>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 bg-gray-50/50 rounded-b-lg">
          <h3 className="text-xs font-semibold text-gray-600 mb-2">
            EK DOSYA:
          </h3>
          <p className="text-xs text-gray-500 mb-2">
            * Dosyalar .jpg, .jpeg, .png, .gif, .doc, .pdf, .txt, .zip
            formatlarında ve en fazla 2 MB olmalıdır.
          </p>
          <p className="text-xs text-gray-500 mb-4">
            * Birden fazla ek dosya gönderebilirsiniz.
          </p>
          <div className="flex">
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-white border border-gray-300 rounded-l-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
            >
              Dosyaları Seç
            </label>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              multiple
              className="sr-only"
              onChange={handleFileChange}
            />
            <div className="border-t border-b border-r border-gray-300 px-4 py-2 text-sm text-gray-500 w-full rounded-r-md flex items-center">
              {selectedFiles.length > 0
                ? selectedFiles.map(file => file.name).join(', ')
                : 'Dosya seçilmedi'}
            </div>
          </div>
          <div className="mt-6">
            <button className="bg-blue-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              CEVAPLA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportRequestDetailPage; 