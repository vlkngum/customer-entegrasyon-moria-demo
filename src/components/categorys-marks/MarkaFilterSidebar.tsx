import React, { useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';

interface MarkaFilterSidebarProps {
  open: boolean;
  onClose: () => void;
}

const MarkaFilterSidebar: React.FC<MarkaFilterSidebarProps> = ({ open, onClose }) => {
  const [view, setView] = useState('main');

  if (!open) return null;

  const MainView = (
    <>
      <div style={{
          padding: '20px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>FİLTRELER</h2>
          <button onClick={onClose} style={{
            background: 'none',
            border: '1px solid #ccc',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#555'
          }}>
            &times;
          </button>
        </div>
        <div style={{ flex: 1, padding: '20px' }}>
            <button 
                onClick={() => setView('sync-status')}
                style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '12px 0',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '16px'
            }}>
                <span style={{ background: '#eaf4ff', borderRadius: '50%', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' }}>
                  <MdKeyboardArrowRight style={{ color: '#168cff', width: '20px', height: '20px' }} />
                </span>
                <span style={{ fontWeight: 600, color: '#333' }}>Marka Eşitleme Durumu</span>
            </button>
        </div>
        <div style={{ padding: '20px', borderTop: '1px solid #eee' }}>
            <button 
                onClick={onClose}
                style={{
                    width: '100%',
                    padding: '12px',
                    background: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
            }}>
                VAZGEÇ
            </button>
        </div>
    </>
  );

  const SyncStatusView = (
    <>
        <div style={{
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
            <button onClick={() => setView('main')} style={{
                background: '#eaf4ff',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <FaArrowLeft color="#168cff" />
            </button>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>FİLTRELER</h2>
          <button onClick={onClose} style={{
            background: 'none',
            border: '1px solid #ccc',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#555'
          }}>
            &times;
          </button>
        </div>
        <div style={{ flex: 1, background: '#f8f9fa' }}>
            <div style={{ background: '#eaf4ff', padding: '12px 20px', color: '#168cff', fontWeight: '600', fontSize: '14px' }}>
                MARKA EŞİTLENME DURUMU
            </div>
            <div style={{ padding: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#555', fontWeight: 500, marginBottom: '8px' }}>PLATFORM SEÇİMİ</label>
                    <select className='input'>
                        <option>Platform Seçiniz</option>
                    </select>
                </div>
                <div>
                    <label style={{ display: 'block', color: '#555', fontWeight: 500, marginBottom: '8px' }}>YAPILACAK OLAN İŞLEM</label>
                    <select className='input'>
                        <option>Markası Eşitlenmeyenleri Listele</option>
                    </select>
                </div>
            </div>
        </div>
        <div style={{ padding: '20px', borderTop: '1px solid #eee', display: 'flex', gap: '12px' }}>
            <button 
                onClick={() => setView('main')}
                style={{
                    flex: 1,
                    padding: '12px',
                    background: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
            }}>
                VAZGEÇ
            </button>
            <button 
                onClick={onClose}
                style={{
                    flex: 1,
                    padding: '12px',
                    background: '#168cff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
            }}>
                <FaSearch /> FİLTRELE
            </button>
        </div>
    </>
  );

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        }}
        onClick={onClose}
      />
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '400px',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.1)'
      }}>
        {view === 'main' ? MainView : SyncStatusView}
      </div>
    </>
  );
};

export default MarkaFilterSidebar; 