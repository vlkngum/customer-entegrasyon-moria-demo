import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { settingsService } from "@/utils/requests/settingsService";
import GenericStoreSettingsClient from "./GenericStoreSettingsClient";
import { ServiceTemplate } from '@/types/Ecommerce';

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

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

// Helper for Turkish-insensitive name matching
function normalizeName(name: string) {
  return name
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i')
    .replace(/ç/g, 'c')
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]/g, '');
}

export default async function GenericStoreSettingsPage({ params }: PageProps) {
  const { name } = await params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session = await getServerSession(authOptions as any) as ExtendedSession | null;
  if (!session?.accessToken) {
    return <div>Loading...</div>;
  }

  // 1. Fetch service templates
  const templatesRes = await settingsService.getServiceTemplates(session.accessToken);
  const templates: ServiceTemplate[] = templatesRes?.data?.data || [];

  // 2. Filter templates to only marketplace type
  const marketplaceTemplates = templates.filter(
    (tpl: ServiceTemplate) => tpl.type === 'marketplace'
  );

  // 3. Find template by [name] param (case-insensitive, Turkish safe)
  const template = marketplaceTemplates.find(
    (tpl: ServiceTemplate) => normalizeName(tpl.name) === normalizeName(name)
  );
  if (!template) {
    return <div>Platform bulunamadı.</div>;
  }

  // 3. Get integration_id from template
  const integrationId: number | null = template.integration_id ?? null;
  if (integrationId === null) {
    return <div>Bu platform için integration_id bulunamadı.</div>;
  }

  // 4. Extract user integration data from the template we already found
  const integration = template.user_integration ? {
    id: template.user_integration.id,
    user_id: '', // UserIntegration doesn't have user_id, we'll use empty string
    integration_id: integrationId,
    config: template.user_integration.config,
    created_at: template.user_integration.created_at,
    updated_at: template.user_integration.updated_at,
    integration: {
      id: integrationId,
      name: template.name,
      created_at: template.created_at || '',
      updated_at: template.updated_at || '',
      logo_url: template.logo_url || '',
    },
  } : null;

  // 6. Prepare config: user config if exists, else default config
  let initialConfig: Record<string, unknown> = {};
  if (integration && integration.config) {
    initialConfig = integration.config;
  } else if (template.default_config && template.default_config.prod) {
    // Flatten default_config.prod to a simple key-value object
    initialConfig = Object.fromEntries(
      Object.entries(template.default_config.prod).map(([key, val]: [string, { value: unknown }]) => [key, val.value])
    );
  }

  // Compose a full IntegrationData-like object for the client
  const initialData = {
    id: integration?.id || '',
    user_id: integration?.user_id || '',
    integration_id: integrationId,
    config: initialConfig,
    created_at: integration?.created_at || template.created_at || '',
    updated_at: integration?.updated_at || template.updated_at || '',
    integration: integration?.integration || {
      id: integrationId,
      name: template.name,
      created_at: template.created_at || '',
      updated_at: template.updated_at || '',
      logo_url: template.logo_url || '',
    },
  };
  return (
    <GenericStoreSettingsClient
      platformName={template.name}
      initialData={initialData}
      defaultConfig={template.default_config?.prod || {}}
      showIntegrationStatus={initialData.config.integrationStatus as boolean}
      platformType={template.type}
    />
  );
} 