"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';
import { FaChevronRight } from "react-icons/fa";
import Link from 'next/link';

// This is temporary, ideally this comes from an API or a shared data source.
const categories = [
    { id: 1, name: "Deneme", source: "Entekas" },
    { id: 2, name: "Deneme 2", source: "Entekas" },
    { id: 3, name: "Deneme Kategorisi", source: "Entekas" },
];

export default function EditCategoryPage() {
    const router = useRouter();
    const params = useParams();
    const categoryId = Number(params.id);

    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const category = categories.find(c => c.id === categoryId);
        if (category) {
            setCategoryName(category.name);
        }
    }, [categoryId]);

    const handleSave = () => {
        console.log("Kaydedildi:", { id: categoryId, name: categoryName });
        // Here you would typically call an API to save the changes
        router.push('/categorys-marks/category'); // a-navigate back to the list
    };

    return (
        <div style={{ background: '#f1f8ff', minHeight: '100vh', padding: '24px' }}>
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', color: '#6c757d' }}>
                <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Yönetim Paneli</Link>
                <FaChevronRight style={{ margin: '0 8px' }} />
                <Link href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Ürünler</Link>
                <FaChevronRight style={{ margin: '0 8px' }} />
                <Link href="/categorys-marks/category" style={{ color: 'inherit', textDecoration: 'none' }}>Kategoriler</Link>
                <div style={{ marginLeft: 'auto' }}>
                    <button onClick={() => router.back()} style={{ background: '#fff', border: '1px solid #dee2e6', padding: '8px 16px', borderRadius: '8px' }}>
                        Vazgeç
                    </button>
                </div>
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Kategoriler</h1>

            <div style={{ background: '#fff', padding: '32px', borderRadius: '8px', maxWidth: '600px' }}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#495057' }}>KATEGORİ ADI *</label>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="input"
                    />
                </div>
                <button
                    onClick={handleSave}
                    style={{ background: '#28a745', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    KAYDET
                </button>
            </div>
        </div>
    );
} 