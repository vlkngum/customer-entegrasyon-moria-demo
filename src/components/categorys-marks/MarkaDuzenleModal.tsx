import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import Image from "next/image";

interface MarkaDuzenleModalProps {
  open: boolean;
  onClose: () => void;
  mark: { id: number; name: string } | null;
}

const MarkaDuzenleModal: React.FC<MarkaDuzenleModalProps> = ({ open, onClose, mark }) => {
  const [markaAdi, setMarkaAdi] = useState('');

  useEffect(() => {
    if (mark) {
      setMarkaAdi(mark.name);
    }
  }, [mark]);

  if (!open) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        width: '550px',
        maxWidth: '90%',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}>
        
        <div style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8f9fa', borderBottom: '1px solid #eee' }}>
          <Image src="/markaDuzenle.svg" alt="Markayı Düzenle" style={{ height: '180px' }} />
          <button onClick={onClose} style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#888'
          }}>
            &times;
          </button>
        </div>
        
        <div style={{padding: '32px'}}>
          <label htmlFor="markaAdi" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>MARKA ADI</label>
          <input
            id="markaAdi"
            type="text"
            value={markaAdi}
            onChange={(e) => setMarkaAdi(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
            <button 
              disabled={!markaAdi.trim()}
              style={{
              background: markaAdi.trim() ? '#22c55e' : '#84e2b5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '12px 28px',
              fontWeight: 'bold',
              cursor: markaAdi.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              opacity: markaAdi.trim() ? 1 : 0.7,
              transition: 'all 0.2s'
            }}>
              <FaCheck />
              KAYDET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkaDuzenleModal; 