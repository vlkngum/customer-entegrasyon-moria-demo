import React, { useState } from 'react';
import { BsNewspaper } from "react-icons/bs";

export default function ProductGeneralInfo() {
  const [showOtherProps, setShowOtherProps] = useState(false);

  const [value, setValue] = useState(false);
  const [buttonValue,setButtonValue] = useState(true);


  return (
    <div className="panel">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-100 p-2 rounded">
          <BsNewspaper className="text-3xl" />
        </div>
        <div>
          <div className="font-semibold">Ürün Bilgileri</div>
          <div className="text-xs text-gray-500 flex gap-2 items-center">
            <span>Video</span>
            <span>Yardım</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">Ürünün genel bilgilerini aşağıdaki formlar yardımıyla girebilirsiniz.</div>
        </div>
      </div>
      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">ÜRÜN MARKASI</label>
          <select className="input">
            <option>--------------</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">ÜRÜN KATEGORİSİ</label>
          <select className="input">
            <option>--------------</option>
          </select>
        </div>
        <div className="col-span-2 flex gap-2">
          <div className='w-3/4'>
            <label className="block text-xs text-gray-500 mb-1">ÜRÜN BAŞLIĞI (MAKSİMUM 150 KARAKTER) *</label>
            <input className="input" placeholder="" />
          </div> 
          <div className='w-1/4'>
            <label className="block text-xs text-gray-500 mb-1">ÜRÜN SATIŞ DURUMU</label>
            <button
              className={`block w-full px-2 py-2.5 font-semibold rounded-md transition-colors duration-200 cursor-pointer ${
                buttonValue ? "bg-green-500 text-white" : "bg-red-800 text-white"
              }`}
              onClick={() => setButtonValue((prev) => !prev)}
            >
              {buttonValue ? "SATIŞA AÇIK" : "SATIŞA KAPALI"}
            </button>
          </div> 
        </div>


        <div className="col-span-2 flex gap-2">
          <div className='w-1/4'>
            <div className="flex gap-2">
              <label className="block text-xs text-gray-500 mb-1 px-2">BARKOD/GTIN</label>
              <button className="bg-gray-200 px-2 mb-1 rounded cursor-pointer" style={{fontSize:10}}>BARKOD ÜRET</button>
            </div>
            <input className="input" placeholder="" />
          </div>
          <div className='w-1/4'>
            <div className="flex gap-2">
              <label className="block text-xs text-gray-500 mb-1 px-2">DESİ</label>
              <button className="bg-gray-200 px-2 mb-1 rounded cursor-pointer" style={{fontSize:10}}>DESİ HESAPLA</button>
            </div>
            <input className="input" placeholder="" />
          </div>
          <div className='w-1/4'>
            <div className="flex gap-2">
              <label className="block text-xs text-gray-500 mb-1 px-2">STOK</label> 
            </div>
            <input className="input" placeholder="" />
          </div>
          <div className='w-1/4'>
            <div className="flex gap-2">
              <label className="block text-xs text-gray-500 mb-1 px-2">STOK KODU</label> 
            </div>
            <input className="input" placeholder="" />
          </div>
        </div>


        
        
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-100 text-blue-700 rounded px-4 py-2 text-sm font-semibold"
          onClick={() => setShowOtherProps((v) => !v)}
          type="button"
        >
          {showOtherProps ? 'DİĞER ÜRÜN ÖZELLİKLERİNİ GİZLE' : 'DİĞER ÜRÜN ÖZELLİKLERİNİ GÖR'}
        </button>
      </div>
      {showOtherProps && (
        <div className="mt-6 border-t pt-6 animate-fade-in">
          <div className="flex flex-col gap-4 mb-4">


            <div className='flex gap-4 py-6'>
              <div className="w-1/5 h-10">
                <label className="block text-xs text-gray-500 mb-1">T. STOK KODU</label>
                <input className="input" placeholder="" />
              </div>
              <div className="w-1/5 h-10">
                <label className="block text-xs text-gray-500 mb-1">GARANTİ SÜRESİ</label>
                <div className="flex h-full gap-2">
                  <button className="bg-gray-200 px-2 py-1 rounded text-xs h-full aspect-square">GÜN</button>
                  <input className="input" placeholder="" />
                </div>
              </div>
              <div className="w-1/5 h-10">
                <label className="block text-xs text-gray-500 mb-1">GARANTİ SÜRESİ</label>
                <div className="flex h-full gap-2">
                  <button className="bg-gray-200 px-2 py-1 rounded text-xs h-full aspect-square">AY</button>
                  <input className="input" placeholder="" />
                </div>
              </div>
              <div className="w-1/5 h-10">
                <label className="block text-xs text-gray-500 mb-1">N11 KATALOG NO</label>
                <input className="input" placeholder="" />
              </div>
              <div className="w-1/5 h-10">
                <label className="block text-xs text-gray-500 mb-1">GTIN</label>
                <input className="input" placeholder="" />
              </div>




            </div>

            <div className='flex gap-4 py-6'> 
             <div className="w-2/5 h-10">
                <label className="block text-xs text-gray-500 mb-1">RAF</label>
                <input className="input" placeholder="" />
              </div>
              <div className="w-2/5 h-10">
                <label className="block text-xs text-gray-500 mb-1">ÜRÜNÜN E-TİCARET LİNKİ</label>
                <input className="input" placeholder="" />
              </div>
              <div className="w-1/5 h-10">
                <label className="block text-xs text-gray-500 mb-1">XML FİYAT KİLİDİ</label>
                <div className="flex gap-2"> 
                  <label
                    className={`flex items-center gap-2 px-6 py-3 rounded-md border transition-all cursor-pointer w-1/2 h-full ${
                      value === true
                         ? "bg-blue-200 border-blue-700 text-black"
                        : "border-gray-500 text-black bg-transparent"
                    }`}
                  >
                    <input
                      type="radio"
                      name="xmlFiyatKilidi"
                      value="true"
                      checked={value === true}
                      onChange={() => setValue(true)}
                      className="accent-blue-500 w-4 h-4"
                    />
                    <span className="text-base font-semibold">AÇIK</span>
                  </label> 
                  <label
                    className={`flex items-center gap-2 px-6 py-3 rounded-md border transition-all cursor-pointer w-1/2 h-full ${
                      value === false
                        ? "bg-blue-200 border-blue-700 text-black"
                        : "border-gray-500 text-black bg-transparent"
                    }`}
                  >
                    <input
                      type="radio"
                      name="xmlFiyatKilidi"
                      value= 'false'
                      checked={value === false}
                      onChange={() => setValue(false)}
                      className="accent-blue-500 w-4 h-4"
                    />
                    <span className="text-base font-semibold">KAPALI</span>
                  </label>
                </div>
              </div> 
            </div>

            

            <div className='flex gap-4 py-6'>

              <div className="w-1/3 h-10">
                <label className="block text-xs text-gray-500 mb-1">N11 GRUP KODU</label>
                <input className="input" placeholder="" />
              </div>
              <div className="w-1/3 h-10">
                <label className="block text-xs text-gray-500 mb-1">N11 ÜRÜN ÖZELLİK ADI</label>
                <input className="input" placeholder="" />
              </div>
              <div className="w-1/3 h-10">
                <label className="block text-xs text-gray-500 mb-1">N11 ÜRÜN ÖZELLİK DEĞERİ</label>
                <input className="input" placeholder="" />
              </div>
            </div> 
            


          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">ÜRÜN ALT BAŞLIĞI (MAKSİMUM 65 KARAKTER) *</label>
              <input className="input" placeholder="" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">ÜRÜN SATILDIĞINDA STOKTAN NE KADAR DÜŞÜLECEK ?</label>
              <input className="input" defaultValue="1" placeholder="" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">ÜRÜN FATURA BAŞLIĞI</label>
              <input className="input" placeholder="" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">ÜRÜN MAKSİMUM SATIN ALIM ADEDİ (SINIRSIZ İÇİN 0 BIRAKINIZ.)</label>
              <input className="input" defaultValue="0" placeholder="" />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-100 text-blue-700 rounded px-8 py-2 text-sm font-semibold flex items-center gap-2"
              type="button"
              onClick={() => setShowOtherProps(false)}
            >
              <span className="text-lg">↑</span> GİZLE
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 