import React, { useState } from "react";

interface AssignTagModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (tags: string[]) => void;
}

const AssignTagModal: React.FC<AssignTagModalProps> = ({ open, onClose, onSave }) => {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  if (!open) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSave = () => {
    onSave(tags);
    setTags([]);
    setInput("");
    onClose();
  };

  const handleClose = () => {
    setTags([]);
    setInput("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative animate-fadeIn">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl"
          onClick={handleClose}
          aria-label="Kapat"
        >
          ×
        </button>
        {/* Header */}
        <h2 className="text-2xl font-semibold mb-2 border-b border-gray-200 pb-4">Ürüne Etiket Ata</h2>
        {/* Info Box */}
        <div className="bg-green-100 text-green-800 rounded px-4 py-2 mb-4 text-sm">
          Seçmiş olduğunuz ürünlere toplu olarak <b>etiket</b> eklemek için aşağıdaki seçenek menüsünü kullanabilirsiniz. Dilerseniz birden fazla etiket tanımlaması yapabilirsiniz.
        </div>
        {/* Label */}
        <label className="block font-semibold mb-1">ETİKET LİSTESİ</label>
        {/* Input */}
        <div className="mb-4">
          <input
            type="text"
            className="input"
            placeholder="Etiket Giriniz"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          {/* Tag List */}
          <div className="flex flex-wrap mt-2 gap-2">
            {tags.map(tag => (
              <span key={tag} className="bg-green-100 text-green-800 px-2 py-1 rounded flex items-center text-sm">
                {tag}
                <button
                  className="ml-1 text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveTag(tag)}
                  aria-label="Etiketi kaldır"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="flex items-center px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            onClick={handleClose}
          >
            <span className="mr-2">←</span>GERİ
          </button>
          <button
            className="flex items-center px-8 py-2 bg-[#11c26d] text-white rounded hover:bg-[#1ed57d] font-semibold"
            onClick={handleSave}
          >
            KAYDET <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTagModal; 