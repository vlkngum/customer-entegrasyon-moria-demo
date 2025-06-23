import React from 'react';
import Select, { StylesConfig } from 'react-select';
import { FaSearch } from 'react-icons/fa';

const categoryOptions = [
  { value: 'elektronik', label: 'Elektronik' },
  { value: 'giyim', label: 'Giyim' },
  { value: 'ev', label: 'Ev' },
];

const brandOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'samsung', label: 'Samsung' },
  { value: 'nike', label: 'Nike' },
];

const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    paddingLeft: '2.5rem', 
  }),
};

interface IconInputProps {
  placeholder: string;
}

const IconInput: React.FC<IconInputProps> = ({ placeholder }) => (
  <div className="relative">
    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder={placeholder}
      className="block w-full pl-10 px-2 py-3 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
    />
  </div>
);

const ErpInvoiceFiltersContent: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Ürün Kategorisi */}
      <div>
        <label className="block text-sm font-medium text-gray-700">ÜRÜN KATEGORİSİ</label>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Select
            options={categoryOptions}
            placeholder="Ürün Kategorisi"
            isClearable
            styles={customStyles}
          />
        </div>
      </div>
      {/* Ürün Markası */}
      <div>
        <label className="block text-sm font-medium text-gray-700">ÜRÜN MARKASI</label>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Select
            options={brandOptions}
            placeholder="Ürün markasını seçmek arayınız..."
            isClearable
            styles={customStyles}
          />
        </div>
      </div>
      {/* Etiket */}
      <div>
        <label className="block text-sm font-medium text-gray-700">ETİKET</label>
        <IconInput placeholder="Birden fazla filtre seçebilirsiniz." />
      </div>
    </div>
  );
};

export default ErpInvoiceFiltersContent;