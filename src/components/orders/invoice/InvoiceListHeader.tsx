import React from 'react';

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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-3 gap-4 font-semibold text-sm text-gray-600  pb-3 mb-3 items-center">
        <div className=" gap-4 flex"> 
          <input type="checkbox" className="form-checkbox hidden " />
          PLATFORM
        </div>
        <div>MÜŞTERİ VE SİPARİŞ BİLGİLERİ</div>
        <div>SİPARİŞ İŞLEM DURUMLARI</div>  
      </div>
      {orders.map((order) => (
        <div key={order.id} className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100 items-center text-sm">
          <div className="font-medium text-gray-900 gap-4 flex"> 
            <input type="checkbox" className="form-checkbox" />
            {order.marketplace}
          </div>
          <div>
            <div className="text-gray-900">{order.customerName}</div>
            <div className="text-gray-500 text-xs">{order.invoiceDate}</div>
          </div>
          <div>
            <div className="text-gray-900">{order.orderNumber}</div>
            <div className="text-gray-500 text-xs">{order.amount}</div>
          </div> 
           
        </div>
      ))}
    </div>
  );
} 