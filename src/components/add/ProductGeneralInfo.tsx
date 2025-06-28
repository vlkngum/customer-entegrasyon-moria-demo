import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsNewspaper } from "react-icons/bs";
import DesiCalculatorModal from './DesiCalculatorModal';

export default function ProductGeneralInfo() {
  const [showOtherProps, setShowOtherProps] = useState(false);

  const [value, setValue] = useState(false);
  const [buttonValue,setButtonValue] = useState(true);

  const [brands, setBrands] = useState<{ id: number; name: string }[]>([
    { id: 1, name: "dd" },
    { id: 2, name: "Arçelik" },
    { id: 3, name: "Vestel" },
    // ... diğer markalar eklenebilir
  ]);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<{ id: number; name: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([
    { id: 1, name: "Elektronik" },
    { id: 2, name: "Ev Eşyası" },
    { id: 3, name: "Giyim" },
    // ... diğer kategoriler eklenebilir
  ]);
  const [categorySearch, setCategorySearch] = useState("");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ id: number; name: string } | null>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  const [barcode, setBarcode] = useState("");

  const [showDesiModal, setShowDesiModal] = useState(false);
  const [desiInputs, setDesiInputs] = useState({ en: '', boy: '', yukseklik: '', agirlik: '' });

  const handleDesiInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDesiInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  // Dışarı tıklanınca dropdown'ı kapat
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setCategoryDropdownOpen(false);
      }
    }
    if (categoryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [categoryDropdownOpen]);

  return (
    <div className="panel">
      <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-4">
        <div>
          <Image src="/genelBilgi.svg" alt="genelBilgi" width={50} height={70} />
        </div>
        <div className="flex flex-col ">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg text-[#37474f]">Ürün Bilgileri</span>
            <div className="flex gap-1 ml-2">
              <Link href="/" className="flex items-center gap-1 px-2 py-0.5 text-xs border border-gray-300 rounded text-gray-700 hover:underline">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16 10,8"/></svg>
                Video
              </Link>
              <Link href="/" className="flex items-center gap-1 px-2 py-0.5 text-xs border border-gray-300 rounded text-gray-700 hover:underline">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><circle cx="12" cy="16" r="1"/></svg>
                Yardım
              </Link>
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-1">Ürünün genel bilgilerini aşağıdaki formlar yardımıyla girebilirsiniz.</div>
        </div>
      </div>
      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs text-[#5d6e76] mb-1">ÜRÜN MARKASI</label>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className={`input w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-200 ${!selectedBrand ? "text-gray-400" : "text-black"}`}
              style={{ minHeight: 42, background: '#fff' }}
              onClick={() => setDropdownOpen((v) => !v)}
            >
              <span className={`block w-full text-left ${!selectedBrand ? "text-gray-400 mx-auto text-center" : "text-black"}`}
                style={!selectedBrand ? { width: '100%' } : {}}>
                {selectedBrand ? selectedBrand.name : "--------------"}
              </span>
              <svg className="w-4 h-4 ml-2 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
            </button>
            {dropdownOpen && (
              <div className="absolute z-20 bg-white border border-blue-300 w-full mt-1 rounded shadow animate-fade-in">
                <input
                  className="w-full p-2 border-b outline-none text-sm"
                  placeholder="Aranıyor..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
                <div className="max-h-40 overflow-y-auto bg-gray-50">
                  {brands.filter((b) => b.name.toLowerCase().includes(search.toLowerCase())).length === 0 && (
                    <div className="p-2 text-gray-400 text-sm">Marka bulunamadı</div>
                  )}
                  {brands
                    .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
                    .map((brand) => (
                      <div
                        key={brand.id}
                        className={`p-2 cursor-pointer hover:bg-blue-100 text-sm ${selectedBrand && selectedBrand.id === brand.id ? "bg-blue-100" : ""}`}
                        onClick={() => {
                          setSelectedBrand(brand);
                          setDropdownOpen(false);
                        }}
                      >
                        {brand.name}
                      </div>
                    ))}
                </div>
                <button
                  className="w-full text-white p-2 flex items-center justify-center gap-2 mt-2 rounded-b transition-colors"
                  style={{ background: '#11c26d' }}
                  type="button"
                  
                  onMouseOver={e => (e.currentTarget.style.background = '#19e07b')}
                  onMouseOut={e => (e.currentTarget.style.background = '#11c26d')}
                >
                  <span className="text-lg font-bold">+</span> Yeni Marka Ekle
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          <label className="block text-xs text-[#5d6e76] mb-1">ÜRÜN KATEGORİSİ</label>
          <div className="relative" ref={categoryDropdownRef}>
            <button
              type="button"
              className={`input w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-200 ${!selectedCategory ? "text-gray-400" : "text-black"}`}
              style={{ minHeight: 42, background: '#fff' }}
              onClick={() => setCategoryDropdownOpen((v) => !v)}
            >
              <span className={`block w-full text-left ${!selectedCategory ? "text-gray-400 mx-auto text-center" : "text-black"}`}
                style={!selectedCategory ? { width: '100%' } : {}}>
                {selectedCategory ? selectedCategory.name : "--------------"}
              </span>
              <svg className="w-4 h-4 ml-2 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
            </button>
            {categoryDropdownOpen && (
              <div className="absolute z-20 bg-white border border-blue-300 w-full mt-1 rounded shadow animate-fade-in">
                <input
                  className="w-full p-2 border-b outline-none text-sm"
                  placeholder="Aranıyor..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  autoFocus
                />
                <div className="max-h-40 overflow-y-auto bg-gray-50">
                  {categories.filter((c) => c.name.toLowerCase().includes(categorySearch.toLowerCase())).length === 0 && (
                    <div className="p-2 text-gray-400 text-sm">Kategori bulunamadı</div>
                  )}
                  {categories
                    .filter((c) => c.name.toLowerCase().includes(categorySearch.toLowerCase()))
                    .map((category) => (
                      <div
                        key={category.id}
                        className={`p-2 cursor-pointer hover:bg-blue-100 text-sm ${selectedCategory && selectedCategory.id === category.id ? "bg-blue-100" : ""}`}
                        onClick={() => {
                          setSelectedCategory(category);
                          setCategoryDropdownOpen(false);
                        }}
                      >
                        {category.name}
                      </div>
                    ))}
                </div>
                <button
                  className="w-full text-white p-2 flex items-center justify-center gap-2 mt-2 rounded-b transition-colors"
                  style={{ background: '#11c26d' }}
                  type="button"
                  onMouseOver={e => (e.currentTarget.style.background = '#19e07b')}
                  onMouseOut={e => (e.currentTarget.style.background = '#11c26d')}
                >
                  <span className="text-lg font-bold">+</span> Yeni Kategori Ekle
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-2 flex gap-2">
          <div className='w-3/4'>
            <label className="block text-xs text-gray-500 mb-1">ÜRÜN BAŞLIĞI (MAKSİMUM 150 KARAKTER) *</label>
            <input className="input text-[#76838f]" placeholder="" />
          </div> 
          <div className='w-1/4'>
            <label className="block text-xs text-gray-500 mb-1">ÜRÜN SATIŞ DURUMU</label>
            {buttonValue ? (
              <div
                className="flex items-center justify-center w-full px-2 py-2.5 rounded-md font-semibold transition-colors duration-200"
                style={{ background: "#23db8b", color: "#fff", height: 42, cursor: "pointer" }}
                onClick={() => setButtonValue((prev) => !prev)}
                onMouseOver={e => (e.currentTarget.style.background = '#589ffc')}
                onMouseOut={e => (e.currentTarget.style.background = '#23db8b')}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="mr-2"
                  style={{ display: "inline-block" }}
                >
                  <path
                    d="M5 10.5L9 14.5L15 7.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-semibold">SATIŞA AÇIK</span>
              </div>
            ) : (
              <div
                className="flex items-center justify-center w-full rounded-md transition-colors duration-200"
                style={{ background: "#f3f7f9", color: "#76838f", height: 42, cursor: "pointer" }}
                onClick={() => setButtonValue((prev) => !prev)}
                onMouseOver={e => (e.currentTarget.style.background = '#f3f7f9')}
                onMouseOut={e => (e.currentTarget.style.background = '#f3f7f9')}
              >
                <span
                  className="inline-block mr-2"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#bfc9d9",
                  }}
                ></span>
                <span className="font-semibold">SATIŞA KAPALI</span>
              </div>
            )}
          </div> 
        </div>


        <div className="col-span-2 flex gap-2">
          <div className='w-1/4'>
            <div className="flex gap-2">
              <label className="block text-xs text-gray-500 mb-1 px-2">BARKOD/GTIN</label>
              <button className="bg-gray-200 px-2 mb-1 rounded cursor-pointer" style={{fontSize:10}}
                onClick={() => setBarcode('45417685fdb2b5d032')}
                type="button"
              >BARKOD ÜRET</button>
            </div>
            <input className="input text-[#76838f]" placeholder="" value={barcode} onChange={e => setBarcode(e.target.value)} />
          </div>
          <div className='w-1/4'>
            <div className="flex gap-2">
              <label className="block text-xs text-gray-500 mb-1 px-2">DESİ</label>
              <button className="bg-gray-200 px-2 mb-1 rounded cursor-pointer" style={{fontSize:10}} type="button" onClick={() => setShowDesiModal(true)}>DESİ HESAPLA</button>
            </div>
            <input className="input text-[#76838f]" placeholder="" />
          </div>
          <div className='w-1/4'>
            <div className="flex gap-2">
              <label className="block text-xs text-gray-500 mb-1 px-2">STOK</label> 
            </div>
            <input className="input text-[#76838f]" placeholder="" />
          </div>
          <div className='w-1/4'>
            <div className="flex gap-2">
              <label className="block text-xs text-gray-500 mb-1 px-2">STOK KODU</label> 
            </div>
            <input className="input text-[#76838f]" placeholder="" />
          </div>
        </div>


        
        
      </div>
      <div className="flex justify-center">
      {!showOtherProps && (
        <div className="flex items-center w-full">
          <div className="flex-1 border-t border-[#e8f2ff]"></div>
          <button
            className="bg-[#e8f2ff] text-[#0f82ff] rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-opacity hover:opacity-80 mx-4"
            onClick={() => setShowOtherProps(true)}
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
            DİĞER ÜRÜN ÖZELLİKLERİNİ GÖR
          </button>
          <div className="flex-1 border-t border-[#e8f2ff]"></div>
        </div>
      )}
      </div>
      <div className={`mt-6 border-t border-gray-200 pt-6 transition-all duration-700 ease-in-out overflow-hidden ${showOtherProps ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-4 mb-4">


          <div className='flex gap-4 py-6'>
            <div className="w-1/5 h-10">
              <label className="block text-xs text-gray-500 mb-1">T. STOK KODU</label>
              <input className="input text-[#76838f]" placeholder="" />
            </div>
            <div className="w-1/5 h-10">
              <label className="block text-xs text-gray-500 mb-1">GARANTİ SÜRESİ</label>
              <div className="flex h-full gap-2">
                <button className="bg-gray-200 px-2 py-1 rounded text-xs h-full aspect-square">GÜN</button>
                <input className="input text-[#76838f]" placeholder="" />
              </div>
            </div>
            <div className="w-1/5 h-10">
              <label className="block text-xs text-gray-500 mb-1">GARANTİ SÜRESİ</label>
              <div className="flex h-full gap-2">
                <button className="bg-gray-200 px-2 py-1 rounded text-xs h-full aspect-square">AY</button>
                <input className="input text-[#76838f]" placeholder="" />
              </div>
            </div>
            <div className="w-1/5 h-10">
              <label className="block text-xs text-gray-500 mb-1">N11 KATALOG NO</label>
              <input className="input text-[#76838f]" placeholder="" />
            </div>
            <div className="w-1/5 h-10">
              <label className="block text-xs text-gray-500 mb-1">GTIN</label>
              <input className="input text-[#76838f]" placeholder="" />
            </div>




          </div>

          <div className='flex gap-4 py-6'> 
           <div className="w-1/3 h-10">
              <label className="block text-xs text-gray-500 mb-1">RAF</label>
              <input className="input text-[#76838f]" placeholder="" />
            </div>
            <div className="w-1/3 h-10">
              <label className="block text-xs text-gray-500 mb-1">ÜRÜNÜN E-TİCARET LİNKİ</label>
              <input className="input text-[#76838f]" placeholder="" />
            </div>
            <div className="w-1/3 h-10">
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
                  <span className=" font-semibold text-sm">AÇIK</span>
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
                  <span className=" font-semibold text-sm">KAPALI</span>
                </label>
              </div>
            </div> 
          </div>

          

          <div className='flex gap-4 py-6'>

            <div className="w-1/3 h-10">
              <label className="block text-xs text-gray-500 mb-1">N11 GRUP KODU</label>
              <input className="input text-[#76838f]" placeholder="" />
            </div>
            <div className="w-1/3 h-10">
              <label className="block text-xs text-gray-500 mb-1">N11 ÜRÜN ÖZELLİK ADI</label>
              <input className="input text-[#76838f]" placeholder="" />
            </div>
            <div className="w-1/3 h-10">
              <label className="block text-xs text-gray-500 mb-1">N11 ÜRÜN ÖZELLİK DEĞERİ</label>
              <input className="input text-[#76838f]" placeholder="" />
            </div>
          </div> 
          


        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">ÜRÜN ALT BAŞLIĞI (MAKSİMUM 65 KARAKTER) *</label>
            <input className="input text-[#76838f]" placeholder="" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">ÜRÜN SATILDIĞINDA STOKTAN NE KADAR DÜŞÜLECEK ?</label>
            <input className="input text-[#76838f]" defaultValue="1" placeholder="" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">ÜRÜN FATURA BAŞLIĞI</label>
            <input className="input text-[#76838f]" placeholder="" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">ÜRÜN MAKSİMUM SATIN ALIM ADEDİ (SINIRSIZ İÇİN 0 BIRAKINIZ.)</label>
            <input className="input text-[#76838f]" defaultValue="0" placeholder="" />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex items-center w-full">
            <div className="flex-1 border-t border-[#e8f2ff]"></div>
            <button
              className="bg-[#e8f2ff] text-[#0f82ff] rounded-full my-4 px-8 py-2 text-sm font-semibold flex items-center gap-2 transition-opacity hover:opacity-80 mx-4"
              type="button"
              onClick={() => setShowOtherProps(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7"/></svg>
              GİZLE
            </button>
            <div className="flex-1 border-t border-[#e8f2ff]"></div>
          </div>
        </div>
      </div>
      {/* Desi Hesaplama Modal */}
      {showDesiModal && (
        <DesiCalculatorModal
          open={showDesiModal}
          onClose={() => setShowDesiModal(false)}
          values={desiInputs}
          onChange={handleDesiInput}
        />
      )}
      <div className="panel">
      <label className="block text-xs text-gray-500 mb-2">ÜRÜN AÇIKLAMASI</label>
      <textarea 
        className="input min-h-[180px]  " 
        placeholder="Ürün açıklamasını buraya giriniz..."
      />
    </div>
    
    </div>
    
  );
} 