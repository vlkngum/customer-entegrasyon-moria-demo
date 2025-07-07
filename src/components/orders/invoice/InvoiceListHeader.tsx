import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, Calendar, Hash, DollarSign } from 'lucide-react';
import Image from 'next/image';
import { ProductTableColumn } from '../../ProductTable';
import { SalesInvoice } from '@/types/Invoice';

interface InvoiceListHeaderProps {
  invoices?: SalesInvoice[];
  isLoading?: boolean;
}

export default function InvoiceListHeader({ invoices = [], isLoading = false }: InvoiceListHeaderProps) {

  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

  // Helper function to safely parse dates
  const parseDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'N/A';
    
    try {
      // Handle different date formats
      let date: Date;
      
      if (dateString.includes('T')) {
        // ISO format with time
        date = new Date(dateString);
      } else if (dateString.includes('-')) {
        // YYYY-MM-DD format
        const [year, month, day] = dateString.split('-').map(Number);
        date = new Date(year, month - 1, day); // month is 0-indexed
      } else {
        // Try default parsing
        date = new Date(dateString);
      }
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'N/A';
      }
      
      return date.toLocaleDateString('tr-TR');
    } catch {
      return 'N/A';
    }
  };

  // Transform SalesInvoice to the format expected by the component
  const orders = invoices.map(invoice => ({
    id: invoice.id,
    marketplace: invoice.service?.name || 'Unknown',
    marketplaceLogo: invoice.service?.logo_url || '/globe.svg',
    customerName: invoice.raw_payload?.data?.attributes?.description || 'N/A',
    invoiceDate: parseDate(invoice.issue_date),
    orderNumber: invoice.invoice_no,
    amount: `${invoice.gross_total?.toLocaleString('tr-TR') || 0} ${invoice.currency || 'TRY'}`,
    netAmount: `${invoice.net_total?.toLocaleString('tr-TR') || 0} ${invoice.currency || 'TRY'}`,
    vatAmount: `${invoice.vat_total?.toLocaleString('tr-TR') || 0} ${invoice.currency || 'TRY'}`,
    status: invoice.payment_status === 'paid' ? 'Ödendi' : 'Beklemede',
    isShipped: true,
    isInvoicePrinted: true,
    isCargoReceiptPrinted: false,
    isCargoIntegrated: false,
    // Additional fields from your data structure
    externalId: invoice.external_id,
    dueDate: parseDate(invoice.due_date),
    orderDate: parseDate(invoice.raw_payload?.data?.attributes?.order_date),
    isAbroad: invoice.is_abroad,
    invoiceType: invoice.invoice_type
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Onaylandı':
        return 'bg-green-100 text-green-800';
      case 'Kargolandı':
        return 'bg-blue-100 text-blue-800';
      case 'Onay Bekliyor':
        return 'bg-yellow-100 text-yellow-800';
      case 'İptal Edildi':
        return 'bg-red-100 text-red-800';
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
      'Paraşüt': '/entekas-logo.png', // Add Paraşüt as it appears in your data
    };

    return marketplaceImages[marketplace] || '/globe.svg'; // fallback to globe icon
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const columns: ProductTableColumn[] = [
    {
      key: 'marketplace',
      title: (
        <span className="flex items-center gap-2">
          <input type="checkbox" className="form-checkbox" />
          PLATFORM
        </span>
      ),
      render: (value) => (
        <span className="flex items-center gap-2">
          <input type="checkbox" className="form-checkbox" />
          {value}
        </span>
      ),
    },
    {
      key: 'customerName',
      title: 'MÜŞTERİ VE SİPARİŞ BİLGİLERİ',
      render: (value, row) => (
        <div>
          <div className="text-gray-900">{row.customerName}</div>
          <div className="text-gray-500 text-xs">{row.invoiceDate}</div>
        </div>
      ),
    },
    {
      key: 'orderNumber',
      title: 'SİPARİŞ İŞLEM DURUMLARI',
      render: (value, row) => (
        <div>
          <div className="text-gray-900">{row.orderNumber}</div>
          <div className="text-gray-500 text-xs">{row.amount}</div>
        </div>
      ),
    },
  ];

  const handleSelectAll = () => {
    if (selectedOrderIds.length === orders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(orders.map((order) => order.id));
    }
  };

  const handleSelectOrder = (id: string) => {
    setSelectedOrderIds((prev) =>
      prev.includes(id) ? prev.filter((oid) => oid !== id) : [...prev, id]
    );
  };

  return(

   <>
  {isLoading ? (
    <div className="text-center py-8">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p className="mt-2 text-gray-600">Faturalar yükleniyor...</p>
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
                  checked={selectedOrderIds.length === orders.length && orders.length > 0}
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
            {orders.map((order) => (
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
                            <DollarSign className="w-3 h-3 text-blue-700" />
                          </div>
                          {order.amount}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-between gap-6 w-full">
                      <div className="flex gap-6">
                        {[
                          {
                            label: "Kargolama Durumu",
                            value: order.isShipped,
                            trueText: "Kargolandı",
                            falseText: "Kargolanmadı",
                            bg: 'bg-[#fdf3f2]',
                            expander: ''
                          },
                          {
                            label: "Fatura Durumu",
                            value: order.isInvoicePrinted,
                            trueText: "Fatura Yazdırıldı",
                            falseText: "Fatura Yazdırılmadı",
                            bg: 'bg-[#f3faff]',
                            expander: 'Fatura Yazdır'
                          },
                          {
                            label: "Kargo Fişi Durumu",
                            value: order.isCargoReceiptPrinted,
                            trueText: "Kargo Fişi Yazdırıldı",
                            falseText: "Kargo Fişi Yazdırılmadı",
                            bg: 'bg-[#eafdfb]',
                            expander: 'Kargo Fişi Yazdır'
                          },
                          {
                            label: "Kargo Entegrasyon Durumu",
                            value: order.isCargoIntegrated,
                            trueText: "Kargoya İletildi",
                            falseText: "Kargoya İletilmedi",
                            bg: 'bg-[#f1f1f8]',
                            expander: 'Kargo İlet'

                          }
                        ].map((status, idx) => (
                          <div key={idx} className="flex flex-col items-start">
                            
                            {expandedRows.has(order.id) && status.expander && (
                              <>
                                <span className="text-[10px] mb-1 text-center">{status.label}</span> 
                                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                                    <span className="mb-1">{status.expander}</span>
                                  </button> 
                              </>
                            )}
                            {!expandedRows.has(order.id) && (

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
                        onClick={() => toggleRow(order.id)}
                        className="ml-4 p-1 hover:bg-gray-100 rounded" 
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
                
                {/* Expanded row with additional invoice details */}
                {expandedRows.has(order.id) && (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 bg-gray-50">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Net Tutar:</span>
                          <div className="text-gray-900">{order.netAmount}</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">KDV Tutarı:</span>
                          <div className="text-gray-900">{order.vatAmount}</div>
                        </div>
                        {order.dueDate && (
                          <div>
                            <span className="font-medium text-gray-700">Vade Tarihi:</span>
                            <div className="text-gray-900">{order.dueDate}</div>
                          </div>
                        )}
                        {order.orderDate && (
                          <div>
                            <span className="font-medium text-gray-700">Sipariş Tarihi:</span>
                            <div className="text-gray-900">{order.orderDate}</div>
                          </div>
                        )}
                        <div>
                          <span className="font-medium text-gray-700">Yurt Dışı:</span>
                          <div className="text-gray-900">{order.isAbroad ? 'Evet' : 'Hayır'}</div>
                        </div>
                        {order.externalId && (
                          <div>
                            <span className="font-medium text-gray-700">Harici ID:</span>
                            <div className="text-gray-900">{order.externalId}</div>
                          </div>
                        )}
                        <div>
                          <span className="font-medium text-gray-700">Fatura Tipi:</span>
                          <div className="text-gray-900">{order.invoiceType}</div>
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
  )}
  </>
  );
} 