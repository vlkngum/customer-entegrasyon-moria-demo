'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AssignTagModal from '@/components/products/AssignTagModal';

// Define the menu items with an href for each action
const menuItems = [
  { label: 'Ürünü Satışa Çıkar', href: '/products/sync' },
  { label: 'Ürüne Seçenek Ekle', href: '/products/variants' },
  { label: 'Sanal Ürün Oluştur', href: '#' },
  { label: 'Set (Bundle) Ekle', href: '#' },
  { label: 'Ürüne Etiket Ata', href: '#' },
  { label: 'Ürünü Kopyala', href: '#' },
  { label: 'Ürünü Sil', href: '#', danger: true },
  { label: 'Barkod Yazdır', href: '#', highlight: true },
];

interface ProductActionsMenuProps {
  // We don't need isOpen since we will conditionally render this component
  onClose: () => void;
}

export default function ProductActionsMenu({ onClose }: ProductActionsMenuProps) {
  const router = useRouter();
  const [isTagModalOpen, setTagModalOpen] = useState(false);

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    if (label === 'Ürüne Etiket Ata') {
      setTagModalOpen(true);
      return;
    }
    if (href && href !== '#') {
      router.push(href);
      onClose();
    } else {
      // Placeholder for future actions
      console.log(`Action for: ${label}`);
      onClose();
    }
  };

  const handleTagModalClose = () => {
    setTagModalOpen(false);
    onClose();
  };

  return (
    <>
      <div 
        className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-gray-300 ring-opacity-5 z-20 origin-top-right transition-transform transform-gpu scale-95 opacity-0 animate-scale-in"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={(e) => handleMenuClick(e, item.href, item.label)}
              className={`
                block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150
                ${item.highlight ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : ''}
                ${item.danger ? 'text-red-600 hover:bg-red-50' : ''}
              `}
              role="menuitem"
              tabIndex={-1}
              id={`menu-item-${index}`}
            >
              {item.label}
            </a>
          ))}
        </div>
         {/* Re-using the animation style from previous components for consistency */}
         <style jsx>{`
          @keyframes scale-in {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-scale-in {
            animation: scale-in 0.3s ease-out forwards;
          }
        `}</style>
      </div>
      <AssignTagModal
        open={isTagModalOpen}
        onClose={handleTagModalClose}
        onSave={(tags) => {
          // Etiketler burada işlenebilir
          console.log('Kaydedilen etiketler:', tags);
        }}
      />
    </>
  );
} 