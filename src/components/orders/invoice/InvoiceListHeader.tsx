import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ProductTableColumn } from '../../ProductTable';

interface Invoice {
  id: string;
  marketplace: string;
  customerName: string;
  invoiceDate: string;
  orderNumber: string;
  amount: string;
  status: string;
}

export default function InvoiceListHeader() {

  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  
  const orders: Invoice[] = [
    {
      id: '1',
      marketplace: 'Trendyol',
      customerName: 'Ahmet Yılmaz',
      invoiceDate: '12.03.2023',
      orderNumber: 'TR123456789',
      amount: '150.00 TL',
      status: 'Onay Bekliyor',
    },
    {
      id: '2',
      marketplace: 'Hepsiburada',
      customerName: 'Ayşe Demir',
      invoiceDate: '11.03.2023',
      orderNumber: 'HB987654321',
      amount: '220.50 TL',
      status: 'Onaylandı',
    },
    {
      id: '3',
      marketplace: 'N11',
      customerName: 'Mehmet Can',
      invoiceDate: '10.03.2023',
      orderNumber: 'N1123456789',
      amount: '85.75 TL',
      status: 'Kargolandı',
    },
    {
      id: '4',
      marketplace: 'GittiGidiyor',
      customerName: 'Zeynep Korkmaz',
      invoiceDate: '09.03.2023',
      orderNumber: 'GG112233445',
      amount: '300.00 TL',
      status: 'İptal Edildi',
    },
  ];

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

  return(

   <>
  <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" /> 
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
                      <input type="checkbox" className="rounded border-gray-300" />
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                          ⚪
                        </div>
                        <span className="text-sm font-medium text-gray-900">{order.marketplace}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.invoiceDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-sm text-gray-900 mr-4">Kargolama</span>
                          <span className="w-2 h-2 bg-blue-500 rounded-full "></span>
                          <span className="text-sm text-gray-900 mr-4">Fatura Yazdırılacak</span>
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-sm text-gray-900 mr-4">Kargo Fiyat Yazdırılacak</span>
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span className="text-sm text-gray-900">Kargoya Beklenmedi</span>
                        </div>
                        <div className="text-xs text-gray-500">Kargolama Durumu - Fatura Durumu - Kargo Fiyat Durumu - Kargo Entegrasyon Durumu</div>
                      </div>
                      <button
                        onClick={() => toggleRow(order.id)}
                        className="ml-4 p-1 hover:bg-gray-100 rounded"
                      >
                        {expandedRows.has(order.id) ? (
                          <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRows.has(order.id) && (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 bg-gray-50">
                      <div className="flex justify-center gap-3">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                          Fatura Yazdır
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                          Kargo Fiyat Yazdır
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                          Kargoya Ilet
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
  </>
  );
} 