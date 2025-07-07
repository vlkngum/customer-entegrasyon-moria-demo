'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useReturnRequest } from '@/store/hooks/useReturnRequest';
import { ChevronDown, ChevronUp, Calendar, Hash, Package } from 'lucide-react';
import Image from "next/image";
import { FaTurkishLiraSign } from 'react-icons/fa6';

interface ExtendedSession {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    phone: string;
    avatar: string;
    authority: string;
    two_factor_enabled: boolean;
  };
}

export default function ClaimList() {
  const { data: session } = useSession();
  const {
    returnRequests,
    isLoading,
    error,
    fetchReturnRequests,
  } = useReturnRequest();

  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedClaimIds, setSelectedClaimIds] = useState<string[]>([]);
  
  // Cast session to ExtendedSession type
  const extendedSession = session as ExtendedSession | null;

  useEffect(() => {
    if (extendedSession?.accessToken) {
      fetchReturnRequests(extendedSession.accessToken);
    }
  }, [extendedSession?.accessToken, fetchReturnRequests]);

  // Helper function to safely parse dates
  const parseDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'N/A';
    
    try {
      let date: Date;
      
      if (dateString.includes('T')) {
        date = new Date(dateString);
      } else if (dateString.includes('-')) {
        const [year, month, day] = dateString.split('-').map(Number);
        date = new Date(year, month - 1, day);
      } else {
        date = new Date(dateString);
      }
      
      if (isNaN(date.getTime())) {
        return 'N/A';
      }
      
      return date.toLocaleDateString('tr-TR');
    } catch {
      return 'N/A';
    }
  };

  // Transform return requests to the format expected by the component
  const claims = returnRequests.map(claim => ({
    id: claim.id.toString(),
    marketplace: claim.integration?.name || 'Unknown',
    marketplaceLogo: claim.integration?.logo_url || '/globe.svg',
    returnCode: claim.return_code,
    orderNumber: claim.order_number,
    requestedDate: parseDate(claim.return_data?.requested_at),
    createdAt: parseDate(claim.created_at),
    updatedAt: parseDate(claim.updated_at),
    reason: claim.return_data?.reason || 'N/A',
    status: claim.return_data?.status || 'unknown',
    productName: claim.return_data?.product?.name || 'N/A',
    productId: claim.return_data?.product?.product_id || 'N/A',
    quantity: claim.return_data?.product?.quantity || 0,
    price: claim.return_data?.product?.price || 0,
    customerNote: claim.return_data?.customer_note || 'N/A',
    trackingNumber: claim.return_data?.tracking_number || 'N/A',
    // Status indicators
    isApproved: claim.return_data?.status === 'approved',
    isRejected: claim.return_data?.status === 'rejected',
    isWaitingApproval: claim.return_data?.status === 'waiting_approval',
    isProcessing: claim.return_data?.status === 'processing',
    isCompleted: claim.return_data?.status === 'completed'
  }));

  const toggleRow = (rowId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(rowId)) {
      newExpandedRows.delete(rowId);
    } else {
      newExpandedRows.add(rowId);
    }
    setExpandedRows(newExpandedRows);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'waiting_approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Onaylandı';
      case 'rejected':
        return 'Reddedildi';
      case 'waiting_approval':
        return 'Onay Bekliyor';
      case 'processing':
        return 'İşleniyor';
      case 'completed':
        return 'Tamamlandı';
      default:
        return 'Bilinmiyor';
    }
  };

  const getMarketplaceImage = (marketplace: string, logoUrl?: string) => {
    if (logoUrl && logoUrl !== '/globe.svg') {
      return logoUrl;
    }
    
    const marketplaceImages: { [key: string]: string } = {
      'Hepsiburada': '/hb-ico.png',
      'N11': '/n11-ico.png',
      'GittiGidiyor': '/gg-ico.png',
      'Trendyol': '/trendyol-ico.png',
      'Ciceksepeti': '/cs-ico.png',
      'Akakce': '/akakce-ico.png',
      'Idefix': '/idefix.png',
      'PTT': '/ptt-ico.png',
      'Pazarama': '/pzrm-ico.png',
      'Opencart': '/opencart-ico.svg',
      'Aras': '/aras.svg',
      'ASB': '/asb.png',
      'Ankaeticaret': '/ankaeticaret.png',
      'Ideasoft': '/ideasoft.png',
      'Ideasoft-O': '/ideasoft-o.png',
      'Entekas': '/entekas-logo.png',
      'DP-TR': '/dp-trLogo.svg',
      'E-Arsiv': '/earsiv-beyazlogo.svg',
      'E-Fatura': '/elogo.svg',
      'GIB': '/gib.svg',
      'Ciceksepeti-Single': '/ciceksepetiSinglePrice.png',
      'Paraşüt': '/entekas-logo.png',
    };

    return marketplaceImages[marketplace] || '/globe.svg';
  };

  const handleSelectAll = () => {
    if (selectedClaimIds.length === claims.length) {
      setSelectedClaimIds([]);
    } else {
      setSelectedClaimIds(claims.map((claim) => claim.id.toString()));
    }
  };

  const handleSelectClaim = (id: string) => {
    setSelectedClaimIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <strong>Hata:</strong> {error}
    </div>
  );

  return (
    <>
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">İade talepleri yükleniyor...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedClaimIds.length === claims.length && claims.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    PLATFORM
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    İADE TALEBİ BİLGİLERİ
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    İADE DURUMLARI
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {claims.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    Hiç iade talebi bulunamadı.
                  </td>
                </tr>
              ) : (
                claims.map((claim) => (
                  <React.Fragment key={claim.id}>
                    <tr className="hover:bg-gray-50 py-4">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedClaimIds.includes(claim.id)}
                            onChange={() => handleSelectClaim(claim.id)}
                            className="rounded border-gray-300"
                          />
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-100 flex items-center justify-center overflow-hidden rounded-full">
                              <Image
                                src={getMarketplaceImage(claim.marketplace, claim.marketplaceLogo)}
                                alt={claim.marketplace}
                                width={24}
                                height={24}
                                className="object-contain rounded-full"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/globe.svg';
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{claim.marketplace}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-xs font-medium text-gray-900 flex items-center gap-2">
                            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <Hash className="w-3 h-3 text-blue-700" />
                            </div>
                            {claim.returnCode}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-2">
                            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <Calendar className="w-3 h-3 text-blue-700" />
                            </div>
                            {claim.requestedDate}
                          </div>
                          <div className="text-xs text-gray-500 flex flex-row gap-4">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Package className="w-3 h-3 text-blue-700" />
                              </div>
                              {claim.orderNumber}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <FaTurkishLiraSign className="w-3 h-3 text-blue-700" />
                              </div>
                              {claim.price.toLocaleString('tr-TR')} TL
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-between gap-6 w-full">
                          <div className="flex gap-6">
                            {[
                              {
                                label: "Onay Durumu",
                                value: claim.isApproved,
                                trueText: "Onaylandı",
                                falseText: "Onaylanmadı",
                                bg: 'bg-[#f0f9ff]',
                                expander: 'Onayla'
                              },
                              {
                                label: "Red Durumu",
                                value: claim.isRejected,
                                trueText: "Reddedildi",
                                falseText: "Reddedilmedi",
                                bg: 'bg-[#fef2f2]',
                                expander: 'Reddet'
                              },
                              {
                                label: "İşlem Durumu",
                                value: claim.isProcessing,
                                trueText: "İşleniyor",
                                falseText: "İşlenmedi",
                                bg: 'bg-[#f0fdf4]',
                                expander: 'İşleme Al'
                              },
                              {
                                label: "Tamamlanma Durumu",
                                value: claim.isCompleted,
                                trueText: "Tamamlandı",
                                falseText: "Tamamlanmadı",
                                bg: 'bg-[#f8fafc]',
                                expander: 'Tamamla'
                              }
                            ].map((status, idx) => (
                              <div key={idx} className="flex flex-col items-start">
                                {expandedRows.has(claim.id) && status.expander && (
                                  <>
                                    <span className="text-[10px] mb-1 text-center">{status.label}</span>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                                      <span className="mb-1">{status.expander}</span>
                                    </button>
                                  </>
                                )}
                                {!expandedRows.has(claim.id) && (
                                  <>
                                    <span className="text-[10px] mb-1">{status.label}</span>
                                    <span className={`flex items-center px-3 py-1 rounded-md text-xs font-medium gap-1 min-w-[120px] justify-center ${status.bg}`}>
                                      <span className={`w-2 h-2 rounded-full ${status.value ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                      <span className={status.value ? 'text-gray-700 font-bold' : 'text-gray-600 font-bold'}>
                                        {status.value ? status.trueText : status.falseText}
                                      </span>
                                    </span>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => toggleRow(claim.id)}
                            className="ml-4 p-1 hover:bg-gray-100 rounded"
                          >
                            {expandedRows.has(claim.id) ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded row with additional claim details */}
                    {expandedRows.has(claim.id) && (
                      <tr>
                        <td colSpan={3} className="px-6 py-4 bg-gray-50">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Ürün Adı:</span>
                              <div className="text-gray-900">{claim.productName}</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Ürün ID:</span>
                              <div className="text-gray-900">{claim.productId}</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Miktar:</span>
                              <div className="text-gray-900">{claim.quantity}</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Fiyat:</span>
                              <div className="text-gray-900">{claim.price.toLocaleString('tr-TR')} TL</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">İade Nedeni:</span>
                              <div className="text-gray-900">{claim.reason}</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Müşteri Notu:</span>
                              <div className="text-gray-900">{claim.customerNote}</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Takip Numarası:</span>
                              <div className="text-gray-900">{claim.trackingNumber}</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Durum:</span>
                              <div className="text-gray-900">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(claim.status)}`}>
                                  {getStatusText(claim.status)}
                                </span>
                              </div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Oluşturulma Tarihi:</span>
                              <div className="text-gray-900">{claim.createdAt}</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Güncellenme Tarihi:</span>
                              <div className="text-gray-900">{claim.updatedAt}</div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

