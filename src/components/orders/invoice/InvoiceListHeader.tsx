import React from 'react';
import ProductTable, { ProductTableColumn } from '../../ProductTable';

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

  return <ProductTable columns={columns} data={orders} />;
} 