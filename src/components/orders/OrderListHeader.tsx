import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, Calendar, Hash } from 'lucide-react';
import Image from 'next/image';
import { Order } from '@/types/Order';
import { 
  getPlatformName, 
  getCustomerFullName, 
  getOrderTotal, 
  getOrderStatus 
} from '@/utils/orderUtils';
import { FaTurkishLiraSign } from 'react-icons/fa6';

interface OrderListHeaderProps {
  orders: Order[];
  isLoading?: boolean;
}

export default function OrderListHeader({ orders, isLoading }: OrderListHeaderProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

  // Transform the orders to match the expected structure
  const transformedOrders = orders.map(order => ({
    id: order.id,
    marketplace: getPlatformName(order),
    marketplaceLogo: order.integration?.logo_url || '/globe.svg',
    customerName: getCustomerFullName(order),
    invoiceDate: new Date(order.ordered_at).toLocaleDateString('tr-TR'),
    orderNumber: order.order_number,
    amount: getOrderTotal(order),
    status: getOrderStatus(order),
    originalOrder: order, // Keep reference to original order for additional data
    // Additional fields for expanded view
    customerEmail: order.order_data?.customerEmail || 'N/A',
    shippingAddress: order.shipping_address || 'N/A',
    invoiceAddress: order.invoice_address || 'N/A',
    cargoTracking: order.order_data?.cargoTrackingNumber?.toString() || 'N/A',
    cargoProvider: order.order_data?.cargoProviderName || 'N/A',
    itemCount: order.order_data?.lines?.length || 0,
    fastDelivery: order.order_data?.fastDelivery || false,
    estimatedDelivery: order.order_data?.estimatedDeliveryStartDate ? 
      new Date(order.order_data.estimatedDeliveryStartDate).toLocaleDateString('tr-TR') : 'N/A'
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
      case 'Created':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-purple-100 text-purple-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMarketplaceImage = (marketplace: string, logoUrl?: string) => {
    // If we have a logo URL from the API, use it
    if (logoUrl && logoUrl !== '/globe.svg') {
      return logoUrl;
    }
    
    // Fallback to local images for known marketplaces
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
    if (selectedOrderIds.length === transformedOrders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(transformedOrders.map((order) => order.id));
    }
  };

  const handleSelectOrder = (id: string) => {
    setSelectedOrderIds((prev) =>
      prev.includes(id) ? prev.filter((oid) => oid !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Siparişler yükleniyor...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        <strong>Bilgi:</strong> Henüz sipariş bulunmuyor.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedOrderIds.length === transformedOrders.length && transformedOrders.length > 0}
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                PLATFORM
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                MÜŞTERİ VE SİPARİŞ BİLGİLERİ
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                SİPARİŞ İŞLEM DURUMLARI
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transformedOrders.map((order) => (
            <React.Fragment key={order.id}>
              <tr className="hover:bg-gray-50 py-4">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedOrderIds.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      className="rounded border-gray-300"
                    />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 flex items-center justify-center overflow-hidden rounded-full">
                        <Image
                          src={getMarketplaceImage(order.marketplace, order.marketplaceLogo)}
                          alt={order.marketplace}
                          width={24}
                          height={24}
                          className="object-contain rounded-full"
                          onError={(e) => {
                            // Fallback to globe icon if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.src = '/globe.svg';
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{order.marketplace}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-xs font-medium text-gray-900 flex items-center gap-2">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <User className="w-3 h-3 text-blue-700" />
                      </div>
                      {order.customerName}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Calendar className="w-3 h-3 text-blue-700" />
                      </div>
                      {order.invoiceDate}
                    </div>
                    <div className="text-xs text-gray-500 flex flex-row gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Hash className="w-3 h-3 text-blue-700" />
                        </div>
                        {order.orderNumber}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <FaTurkishLiraSign className="w-3 h-3 text-blue-700" />
                        </div>
                        {order.amount}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-between gap-4 w-full">
                    <div className="flex gap-3 flex-wrap">
                      {[
                        {
                          label: "Sipariş Durumu",
                          value: order.originalOrder.status,
                          trueText: order.originalOrder.status === 'Created' ? 'Oluşturuldu' :
                                   order.originalOrder.status === 'Shipped' ? 'Kargoya Verildi' :
                                   order.originalOrder.status === 'Cancelled' ? 'İptal Edildi' :
                                   order.originalOrder.status === 'Completed' ? 'Tamamlandı' :
                                   order.originalOrder.status === 'Pending' ? 'Beklemede' :
                                   order.originalOrder.status === 'Processing' ? 'İşleniyor' :
                                   order.originalOrder.status === 'Refunded' ? 'İade Edildi' :
                                   order.originalOrder.status === 'Partially Refunded' ? 'Kısmen İade Edildi' :
                                   order.originalOrder.status === 'Partially Shipped' ? 'Kısmen Kargoya Verildi' :
                                   order.originalOrder.status === 'Partially Delivered' ? 'Kısmen Teslim Edildi' :
                                   'Bilinmiyor',
                          falseText: "Bilinmiyor",
                          bg: getStatusColor(order.originalOrder.status),
                          expander: ''
                        },
                        {
                          label: "Hızlı Teslimat",
                          value: order.fastDelivery,
                          trueText: "Hızlı Teslimat",
                          falseText: "Normal Teslimat",
                          bg: 'bg-[#f3faff]',
                          expander: ''
                        },
                        {
                          label: "Fatura Durumu",
                          value: order.cargoTracking !== 'N/A',
                          trueText: "Fatura Mevcut",
                          falseText: "Fatura Yok",
                          bg: 'bg-[#fdf3f2]',
                          expander: 'Fatura Yazdır'
                        },
                        {
                          label: "Kargo Fişi Durumu",
                          value: order.cargoTracking !== 'N/A',
                          trueText: "Kargo Fişi Mevcut",
                          falseText: "Kargo Fişi Yok",
                          bg: 'bg-[#eafdfb]',
                          expander: 'Kargo Fişi Yazdır'
                        },
                        {
                          label: "Kargo Entegrasyonu",
                          value: order.cargoTracking !== 'N/A',
                          trueText: "Entegre Edildi",
                          falseText: "Entegre Edilmedi",
                          bg: 'bg-[#f1f1f8]',
                          expander: 'Kargo İlet'
                        },
                        {
                          label: "Kargo Takip",
                          value: order.cargoTracking !== 'N/A',
                          trueText: "Takip Numarası Mevcut",
                          falseText: "Takip Numarası Yok",
                          bg: 'bg-[#eafdfb]',
                          expander: 'Kargo Takip'
                        },
                        {
                          label: "Ürün Detayları",
                          value: order.itemCount > 0,
                          trueText: `${order.itemCount} Ürün`,
                          falseText: "Ürün Yok",
                          bg: 'bg-[#f1f1f8]',
                          expander: 'Ürün Detayları'
                        }
                      ].map((status, idx) => (
                        <div key={idx} className="flex flex-col items-start min-w-[100px]">
                          
                          {expandedRows.has(order.id) && status.expander && (
                            <>
                              <span className="text-[9px] mb-1 text-center w-full">{status.label}</span> 
                                <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-blue-700 w-full">
                                  <span>{status.expander}</span>
                                </button> 
                            </>
                          )}
                          {!expandedRows.has(order.id) && (
                            <>
                            <span className="text-[9px] mb-1 text-center w-full">{status.label}</span>
                            <span className={`flex items-center px-2 py-1 rounded text-xs font-medium gap-1 min-w-[90px] justify-center ${status.bg} h-6`}> 
                              
                              <span className={`w-1.5 h-1.5 rounded-full ${status.value ? 'bg-green-500' : 'bg-red-500'}`}></span>
                              <span className={`${status.value ? 'text-gray-700 font-bold' : 'text-gray-600 font-bold'} text-[10px] leading-tight`}>
                                {status.value ? status.trueText : status.falseText}
                              </span>
                            </span>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => toggleRow(order.id)}
                      className="ml-2 p-1 hover:bg-gray-100 rounded flex-shrink-0" 
                    >
                      {expandedRows.has(order.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              
              {/* Expanded row with additional order details */}
              {expandedRows.has(order.id) && (
                <tr>
                  <td colSpan={3} className="px-6 py-4 bg-gray-50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Müşteri E-posta:</span>
                        <div className="text-gray-900">{order.customerEmail}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Kargo Firması:</span>
                        <div className="text-gray-900">{order.cargoProvider}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Kargo Takip No:</span>
                        <div className="text-gray-900">{order.cargoTracking}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Tahmini Teslimat:</span>
                        <div className="text-gray-900">{order.estimatedDelivery}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Teslimat Adresi:</span>
                        <div className="text-gray-900 text-xs">{order.shippingAddress}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Fatura Adresi:</span>
                        <div className="text-gray-900 text-xs">{order.invoiceAddress}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Ürün Sayısı:</span>
                        <div className="text-gray-900">{order.itemCount} adet</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Hızlı Teslimat:</span>
                        <div className="text-gray-900">{order.fastDelivery ? 'Evet' : 'Hayır'}</div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
             
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
} 