import React from 'react';
import { Order } from '@/types/Order';
import {
  getCustomerFullName,
  getCustomerEmail,
  getOrderTotal,
  getPlatformName,
  getOrderStatus,
  getOrderDate,
  getShippingAddress,
  getInvoiceAddress,
  getCargoTrackingNumber,
  getCargoProvider,
  getTotalItemCount,
  hasFastDelivery,
  getEstimatedDeliveryDates,
  getOrderLineItems
} from '@/utils/orderUtils';

interface OrderDetailCardProps {
  order: Order;
  className?: string;
}

export default function OrderDetailCard({ order, className = '' }: OrderDetailCardProps) {
  const lineItems = getOrderLineItems(order);
  const estimatedDelivery = getEstimatedDeliveryDates(order);

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sipariş #{order.order_number}</h2>
            <p className="text-gray-600 mt-1">{getPlatformName(order)}</p>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'Created' ? 'bg-blue-100 text-blue-800' :
              order.status === 'Shipped' ? 'bg-green-100 text-green-800' :
              order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {getOrderStatus(order)}
            </span>
            <p className="text-sm text-gray-500 mt-1">{getOrderDate(order)}</p>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Müşteri Bilgileri</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Ad Soyad:</span> {getCustomerFullName(order)}</p>
            <p><span className="font-medium">E-posta:</span> {getCustomerEmail(order)}</p>
            {order.order_data?.customerId && (
              <p><span className="font-medium">Müşteri ID:</span> {order.order_data.customerId}</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Sipariş Özeti</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Toplam Tutar:</span> {getOrderTotal(order)}</p>
            <p><span className="font-medium">Ürün Sayısı:</span> {getTotalItemCount(order)}</p>
            {hasFastDelivery(order) && (
              <p className="text-green-600 font-medium">✓ Hızlı Teslimat</p>
            )}
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Fatura Adresi</h3>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm">{getInvoiceAddress(order)}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Teslimat Adresi</h3>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm">{getShippingAddress(order)}</p>
          </div>
        </div>
      </div>

      {/* Cargo Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Kargo Bilgileri</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><span className="font-medium">Kargo Firması:</span> {getCargoProvider(order)}</p>
            <p><span className="font-medium">Takip Numarası:</span> {getCargoTrackingNumber(order)}</p>
          </div>
          {estimatedDelivery && (
            <div>
              <p><span className="font-medium">Tahmini Teslimat:</span></p>
              <p className="text-sm text-gray-600">
                {estimatedDelivery.start} - {estimatedDelivery.end}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Order Items */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Sipariş Ürünleri</h3>
        <div className="space-y-3">
          {lineItems.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.productName}</h4>
                  <div className="text-sm text-gray-600 mt-1 space-y-1">
                    <p><span className="font-medium">SKU:</span> {item.merchantSku}</p>
                    <p><span className="font-medium">Barkod:</span> {item.barcode}</p>
                    <p><span className="font-medium">Kategori ID:</span> {item.productCategoryId}</p>
                    <p><span className="font-medium">Ürün Kodu:</span> {item.productCode}</p>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-medium text-gray-900">
                    {item.price} {item.currencyCode}
                  </p>
                  <p className="text-sm text-gray-600">Adet: {item.quantity}</p>
                  <p className="text-sm text-gray-600">
                    Toplam: {item.amount} {item.currencyCode}
                  </p>
                </div>
              </div>
              {item.discount > 0 && (
                <div className="mt-2 text-sm text-green-600">
                  İndirim: {item.discount} {item.currencyCode}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Information */}
      {order.order_data && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Ek Bilgiler</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><span className="font-medium">Vergi Numarası:</span> {order.order_data.taxNumber || 'Belirtilmemiş'}</p>
              <p><span className="font-medium">Kimlik Numarası:</span> {order.order_data.identityNumber}</p>
              <p><span className="font-medium">Teslimat Tipi:</span> {order.order_data.deliveryType}</p>
            </div>
            <div>
              <p><span className="font-medium">Depo ID:</span> {order.order_data.warehouseId}</p>
              <p><span className="font-medium">Paket Durumu:</span> {order.order_data.shipmentPackageStatus}</p>
              <p><span className="font-medium">Oluşturan:</span> {order.order_data.createdBy}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 