"use client";

import React, { useState } from "react";
import { FaSearch, FaTrash, FaPencilAlt, FaSync } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import MarkaFilterSidebar from "../../../components/categorys-marks/MarkaFilterSidebar";
import BatchTransactions from "@/components/products/list/batch-transactions";
import { useRouter } from "next/navigation";
import MarkaDuzenleModal from "@/components/categorys-marks/MarkaDuzenleModal";

const marks = [
  {
    id: 1,
    name: "dwdw",
    platforms: [{ name: 'trendyol', synced: false, logo: '/trendyolLogo.svg' }]
  },
  {
    id: 2,
    name: "Another Mark",
    platforms: [
        { name: 'trendyol', synced: true, logo: '/trendyolLogo.svg' }
    ]
  },
];

export default function MarksPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedMarks, setSelectedMarks] = useState<number[]>([]);
  const [isBulkProcessModalOpen, setIsBulkProcessModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMark, setEditingMark] = useState<{ id: number; name: string } | null>(null);
  const router = useRouter();

  const handleEditClick = (mark: { id: number; name: string }) => {
    setEditingMark(mark);
    setIsEditModalOpen(true);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedMarks(marks.map((m) => m.id));
    } else {
      setSelectedMarks([]);
    }
  };

  const handleSelectMark = (markId: number) => {
    setSelectedMarks((prevSelected) => {
      if (prevSelected.includes(markId)) {
        return prevSelected.filter((id) => id !== markId);
      } else {
        return [...prevSelected, markId];
      }
    });
  };

  const allSelected = selectedMarks.length === marks.length && marks.length > 0;

  return (
    <div style={{ background: '#f5f9ff', minHeight: '100vh', padding: 20 }}>
      {/* Search and filter area */}
      <div style={{ background: '#fff', borderRadius: 10, padding: 34, marginBottom: 24 }}>
        <div style={{ marginBottom: 8, fontWeight: 700, fontSize: 15, color: '#5a6a85', letterSpacing: 0.5 }}>
          MARKA ARAMA
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <input
            type="text"
            placeholder="Marka adı ile ara..."
            style={{ width: 350, maxWidth: '100%', padding: 12, borderRadius: 8, border: '1px solid #e3eafc' }}
          />
          <button style={{ background: '#168cff', color: '#fff', padding: '12px 32px', borderRadius: 8, border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
            <FaSearch /> FİLTRELE
          </button>
          <div style={{ marginLeft: 'auto' }}>
            <button onClick={() => setFilterOpen(true)} style={{ background: 'none', border: 'none', color: '#5a6a85', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                <MdKeyboardArrowRight style={{ color: '#168cff' }} />
                Detaylı Filtrele
            </button>
          </div>
        </div>
      </div>

      {selectedMarks.length > 0 ? (
        <div style={{ background: '#168cff', color: '#fff', borderRadius: 10, padding: '12px 20px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 24 }}>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleSelectAll}
            style={{
                width: 18,
                height: 18,
                accentColor: '#168cff'
            }}
        />
        <span style={{ fontWeight: 600 }}>{selectedMarks.length} adet kayıt seçildi.</span>
        <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.3)', height: 24, marginLeft: 8 }}></div>
        <button
            onClick={() => setIsBulkProcessModalOpen(true)}
            style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <MdKeyboardArrowRight /> TOPLU İŞLEMLER
        </button>
        <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.3)', height: 24 }}></div>
        <button style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
            <FaTrash /> SİLME İŞLEMLERİ
        </button>
        <div style={{ marginLeft: 'auto' }}>
            {selectedMarks.length < marks.length && (
                <button
                    onClick={() => setSelectedMarks(marks.map(m => m.id))}
                    style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 500, textDecoration: 'underline', cursor: 'pointer' }}
                >
                    {marks.length} kaydın tümünü seç
                </button>
            )}
        </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', background: '#f5f9ff', padding: '12px 16px', fontWeight: 600, color: '#5a6a85' }}>
          <input type="checkbox" style={{ marginRight: 16, width: 18, height: 18, accentColor: '#168cff' }} onChange={handleSelectAll} checked={allSelected} />
          <div style={{ flex: 1 }}>MARKA ADI</div>
          <div style={{ flex: 1 }}>EŞİTLEME DURUMLARI</div>
          <div style={{ flex: 2, textAlign: 'right' }}>İŞLEMLER</div>
        </div>
      )}

      {/* Mark list */}
      {marks.map((mark) => (
        <div key={mark.id} style={{ display: 'flex', alignItems: 'center', background: selectedMarks.includes(mark.id) ? '#eaf4ff' : '#fff', borderRadius: 10, margin: '8px 0', padding: '16px', boxShadow: '0 1px 4px #e3eafc33' }}>
          <input type="checkbox" style={{ marginRight: 16, width: 18, height: 18, accentColor: '#168cff' }} checked={selectedMarks.includes(mark.id)} onChange={() => handleSelectMark(mark.id)} />
          
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: '#eaf4ff', color: '#168cff', borderRadius: 4, padding: 4, display: 'inline-flex' }}>
                <MdKeyboardArrowRight />
            </span>
            <span style={{ fontWeight: 'bold', fontSize: 16 }}>{mark.name}</span>
          </div>

          <div style={{ flex: 1, display: 'flex', gap: 8, alignItems: 'center' }}>
            {mark.platforms.map(platform => (
                <div key={platform.name} style={{ position: 'relative' }}>
                    <img src={platform.logo} alt={platform.name} style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #eee', filter: platform.synced ? 'grayscale(0)' : 'grayscale(1)' }}/>
                    {!platform.synced && (
                        <div style={{ position: 'absolute', top: -2, right: -2, background: '#ff3b3b', color: 'white', width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold', border: '1px solid white' }}>
                            &times;
                        </div>
                    )}
                </div>
            ))}
          </div>

          <div style={{ flex: 2, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button style={{ background: '#fff4f0', color: '#ff6a3a', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                <FaSync size={14} />
                <span>MARKA EŞİTLE</span>
            </button>
            <button 
                onClick={() => handleEditClick(mark)}
                style={{ background: '#eaf4ff', color: '#168cff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                <FaPencilAlt size={14} />
                <span>DÜZENLE</span>
            </button>
            <button style={{ background: '#ffeaea', color: '#ff3b3b', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                <FaTrash size={14} />
                <span>SİL</span>
            </button>
          </div>
        </div>
      ))}

      {/* Modals */}
      {filterOpen && (
        <MarkaFilterSidebar
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
        />
      )}

      {isBulkProcessModalOpen && (
        <BatchTransactions
          showModal={isBulkProcessModalOpen}
          onClose={() => setIsBulkProcessModalOpen(false)}
        />
      )}

      <MarkaDuzenleModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        mark={editingMark}
      />
    </div>
  );
}