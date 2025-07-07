"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useErp } from "@/store/hooks/useErp";
import { integrationService } from "@/utils/requests/integrationService";
import toastService from "@/utils/services/toastService";

interface PlatformTemplate {
  id: number;
  name: string;
  type: string;
  fields: Array<{
    name: string;
    label: string;
    type: string;
    required: boolean;
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
  }>;
  logo?: string;
  bg?: string;
}

interface IntegrationData {
  integration_id?: number;
  [key: string]: unknown;
}

interface ErpConfig {
  [key: string]: unknown;
}

interface GenericErpSettingsClientProps {
  platformTemplate: PlatformTemplate;
  integrationData: IntegrationData | null;
  erpConfig: ErpConfig;
}

export default function GenericErpSettingsClient({
  platformTemplate,
  integrationData,
  erpConfig,
}: GenericErpSettingsClientProps) {
  const { setField, setIntegrationStatus } = useErp();
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize form data from Redux state or integration data
  useEffect(() => {
    const initialData: { [key: string]: string } = {};
    
    // Use integration data if available, otherwise use Redux state
    const sourceData = integrationData || erpConfig;
    
    platformTemplate.fields.forEach((field) => {
      const value = sourceData[field.name];
      initialData[field.name] = typeof value === 'string' ? value : '';
    });
    
    setFormData(initialData);
    
    // Set connection status
    const statusValue = sourceData.integrationStatus;
    const status = typeof statusValue === 'string' ? statusValue : 'false';
    setIsConnected(status === 'true');
    setIntegrationStatus(status);
  }, [platformTemplate, integrationData, erpConfig, setIntegrationStatus]);

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    setField(fieldName, value);
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    platformTemplate.fields.forEach((field) => {
      if (field.required && (!formData[field.name] || formData[field.name].trim() === '')) {
        newErrors[field.name] = `${field.label} alanı zorunludur`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toastService.showToast('error', 'Hata', 'Kimlik doğrulama tokeni bulunamadı');
        return;
      }

      const payload = {
        ...formData,
        platform_name: platformTemplate.name,
        type: 'erp',
        integrationStatus: 'true'
      };

      // Use postIntegration for both create and update
      const response = await integrationService.postIntegration(token, payload);

      console.log('ERP integration response:', response);

      if (response.code === 200 || response.code === 201) {
        toastService.showToast('success', 'Başarılı', 'ERP entegrasyon bilgisi başarıyla kaydedildi');
        setIsConnected(true);
        setIntegrationStatus('true');
      } else {
        toastService.showToast('error', 'Hata', response.message || 'ERP entegrasyon kaydedilirken hata oluştu');
      }
    } catch (error) {
      console.error('Error saving ERP integration:', error);
      toastService.showToast('error', 'Hata', 'ERP entegrasyon kaydedilirken hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDisconnect = async () => {
    if (!integrationData?.integration_id) {
      toastService.showToast('error', 'Hata', 'Bağlantı kesilecek entegrasyon bulunamadı');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toastService.showToast('error', 'Hata', 'Kimlik doğrulama tokeni bulunamadı');
        return;
      }

      // Use postIntegration to update the integration status to false
      const payload = {
        ...formData,
        platform_name: platformTemplate.name,
        type: 'erp',
        integrationStatus: 'false'
      };

      const response = await integrationService.postIntegration(token, payload);

      if (response.code === 200 || response.code === 201) {
        toastService.showToast('success', 'Başarılı', 'ERP entegrasyon başarıyla kesildi');
        setIsConnected(false);
        setIntegrationStatus('false');
      } else {
        toastService.showToast('error', 'Hata', response.message || 'ERP entegrasyon kesilirken hata oluştu');
      }
    } catch (error) {
      console.error('Error disconnecting ERP integration:', error);
      toastService.showToast('error', 'Hata', 'ERP entegrasyon kesilirken hata oluştu');
    }
  };

  const renderField = (field: PlatformTemplate['fields'][0]) => {
    const value = formData[field.name] || '';
    const error = errors[field.name];

    switch (field.type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Seçiniz</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        );

      case 'password':
        return (
          <input
            type="password"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        );
    }
  };

  return (
    <div className="mt-8 mx-6 panel max-w-[1200px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {platformTemplate.logo && (
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: platformTemplate.bg || '#f3f4f6' }}
            >
              <Image 
                src={platformTemplate.logo} 
                alt={platformTemplate.name}
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{platformTemplate.name}</h2>
            <p className="text-sm text-gray-600">ERP Platform Ayarları</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isConnected 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {isConnected ? 'Bağlı' : 'Bağlı Değil'}
          </div>
          
          {isConnected && (
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Bağlantıyı Kes
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platformTemplate.fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
              {errors[field.name] && (
                <p className="text-sm text-red-600">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => {
              setFormData({});
              platformTemplate.fields.forEach(field => {
                setField(field.name, '');
              });
            }}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Temizle
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
} 