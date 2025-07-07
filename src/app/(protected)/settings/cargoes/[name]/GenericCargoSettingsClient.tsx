"use client";
import React, { useState, useEffect } from "react";
import { useCargo } from "@/store/hooks/useCargo";
import { useToast } from "@/store/hooks/useToast";
import { integrationService } from "@/utils/requests/integrationService";

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

interface GenericCargoSettingsClientProps {
  platformTemplate: PlatformTemplate;
  integrationData: IntegrationData | null;
  cargoConfig: Record<string, unknown>;
}

export default function GenericCargoSettingsClient({
  platformTemplate,
  // integrationData,
  cargoConfig,
}: GenericCargoSettingsClientProps) {
  const {
    setField,
    setIntegrationStatus,
    resetConfig,
  } = useCargo();

  const { showToast } = useToast();

  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [integrationStatus, setLocalIntegrationStatus] = useState<string>('false');

  // Initialize form data from Redux state
  useEffect(() => {
    const initialData: { [key: string]: string } = {};
    platformTemplate.fields.forEach((field) => {
      const value = cargoConfig[field.name];
      initialData[field.name] = typeof value === 'string' ? value : '';
    });
    setFormData(initialData);
    const integrationStatusValue = cargoConfig.integrationStatus;
    setLocalIntegrationStatus(typeof integrationStatusValue === 'string' ? integrationStatusValue : 'false');
  }, [platformTemplate, cargoConfig]);

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    setField(fieldName, value);
  };

  const handleIntegrationStatusChange = (checked: boolean) => {
    const status = checked ? 'true' : 'false';
    setLocalIntegrationStatus(status);
    setIntegrationStatus(status);
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    platformTemplate.fields.forEach((field) => {
      if (field.required && (!formData[field.name] || formData[field.name].trim() === '')) {
        errors.push(`${field.label} alanı zorunludur`);
      }
    });

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      showToast('error', 'Hata', errors.join(', '));
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showToast('error', 'Hata', 'Authentication token not found');
        return;
      }

      const submissionData = {
        platform_name: platformTemplate.name,
        platform_type: 'cargo',
        integration_status: integrationStatus,
        ...formData,
      };

      console.log('Submitting cargo integration data:', submissionData);

      const response = await integrationService.postIntegration(token, submissionData);
      console.log('Cargo integration response:', response);

      if (response.code === 200 || response.code === 201) {
        showToast('success', 'Başarılı', 'Entegrasyon bilgisi başarıyla kaydedildi');
      } else {
        showToast('error', 'Hata', response.message || 'Entegrasyon kaydedilirken hata oluştu');
      }
    } catch (error) {
      console.error('Error submitting cargo integration:', error);
      showToast('error', 'Hata', 'Entegrasyon kaydedilirken hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    resetConfig();
    const initialData: { [key: string]: string } = {};
    platformTemplate.fields.forEach((field) => {
      initialData[field.name] = '';
    });
    setFormData(initialData);
    setLocalIntegrationStatus('false');
  };

  const renderField = (field: PlatformTemplate['fields'][0]) => {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'password':
        return (
          <input
            type="password"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder || field.label}
            className="input"
            required={field.required}
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="input"
            required={field.required}
          >
            <option value="">{field.placeholder || `Seçiniz`}</option>
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
            placeholder={field.placeholder || field.label}
            className="input"
            rows={4}
            required={field.required}
          />
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder || field.label}
            className="input"
            required={field.required}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 mx-6 panel max-w-[1200px]">
      <div className="flex gap-8 flex-col md:flex-row">
        <div className="flex-1 gap-4 flex flex-col">
          {platformTemplate.fields.slice(0, Math.ceil(platformTemplate.fields.length / 2)).map((field) => (
            <label key={field.name} className="font-medium text-xs block">
              {field.label} {field.required && '*'}
              {renderField(field)}
            </label>
          ))}
        </div>
        <div className="flex-1 gap-4 flex flex-col">
          {platformTemplate.fields.slice(Math.ceil(platformTemplate.fields.length / 2)).map((field) => (
            <label key={field.name} className="font-medium text-xs block">
              {field.label} {field.required && '*'}
              {renderField(field)}
            </label>
          ))}
          
          {/* Integration Status */}
          <label className="font-medium text-xs flex items-center gap-2 select-none">
            Entegrasyon Durumu
            <input
              type="checkbox"
              checked={integrationStatus === 'true'}
              onChange={(e) => handleIntegrationStatusChange(e.target.checked)}
              className="ml-2 accent-blue-600 w-4 h-4"
            />
          </label>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white rounded-md px-5 py-2.5 text-base transition-colors"
          disabled={isSubmitting}
        >
          SIFIRLA
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-5 py-2.5 text-base transition-colors disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'KAYDEDİLİYOR...' : 'KAYDET'}
        </button>
      </div>
    </form>
  );
} 