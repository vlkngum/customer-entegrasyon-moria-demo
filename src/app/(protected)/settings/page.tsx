"use client"

// import { useState } from "react"
// import { Settings, Building, FileText, Package, Truck, Tag, Bell } from "lucide-react"
import { ProtectedRoute } from "@/components/auth";
import { useAuth } from "@/hooks/useAuth";

// type MenuItemType = {
//   id: string
//   label: string
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   icon: any
//   fields?: FieldType[]
// }

// type FieldWithCategory = FieldType & {
//    category: string
// }

/*
const menuItems: MenuItemType[] = [
  { 
    id: "all", 
    label: "Tüm Ayarlar", 
    icon: Settings 
  },
  { 
    id: "company", 
    label: "Firma Ayarları", 
    icon: Building,
    fields: [
      { type: "file", label: "Firma Logosu", name: "logo" },
      { type: "text", label: "Slogan", name: "slogan" },
      { type: "text", label: "Firma Adı", name: "companyName", required: true },
      { type: "tel", label: "Telefon", name: "phone", required: true },
      { type: "email", label: "Bilgilendirme E-posta Adresi", name: "infoEmail" },
      { type: "email", label: "Kullanıcı Giriş E-posta Adresi", name: "loginEmail", required: true },
      { type: "textarea", label: "Firma Adresi", name: "companyAddress" },
      { type: "text", label: "Firma Websitesi", name: "companyWebsite" },
    ]
  },
  { 
    id: "invoice", 
    label: "Fatura Ayarları", 
    icon: FileText,
    fields: [
      { type: "text", label: "Fatura Seri No", name: "invoiceSerialNo", required: true },
      { type: "text", label: "Fatura Başlangıç No", name: "invoiceStartNo", required: true },
      { type: "select", label: "Para Birimi", name: "currency", options: ["TL", "USD", "EUR"], required: true },
      { type: "text", label: "Vergi Dairesi", name: "taxOffice" },
      { type: "text", label: "Vergi No", name: "taxNumber" },
      { type: "textarea", label: "Fatura Notu", name: "invoiceNote" },
      { type: "checkbox", label: "Otomatik Fatura Oluştur", name: "autoInvoice" },
    ]
  },
  { 
    id: "products", 
    label: "Ürün Listesi Ayarları", 
    icon: Package,
    fields: [
      { type: "select", label: "Varsayılan Kategori", name: "defaultCategory", options: ["Elektronik", "Giyim", "Ev & Yaşam", "Spor", "Kitap"] },
      { type: "checkbox", label: "Stok Takibi Aktif", name: "stockTracking" },
      { type: "text", label: "Minimum Stok Uyarısı", name: "minStockAlert" },
      { type: "checkbox", label: "Otomatik SKU Oluştur", name: "autoSKU" },
      { type: "select", label: "Fiyat Görüntüleme", name: "priceDisplay", options: ["KDV Dahil", "KDV Hariç"] },
      { type: "text", label: "Varsayılan KDV Oranı (%)", name: "defaultVAT" },
    ]
  },
  { 
    id: "marketplace", 
    label: "Pazaryeri Ayarları", 
    icon: Truck,
    fields: [
      { type: "checkbox", label: "Trendyol Entegrasyonu", name: "trendyolIntegration" },
      { type: "text", label: "Trendyol API Key", name: "trendyolApiKey" },
      { type: "checkbox", label: "Hepsiburada Entegrasyonu", name: "hepsiburadaIntegration" },
      { type: "text", label: "Hepsiburada API Key", name: "hepsiburadaApiKey" },
      { type: "checkbox", label: "N11 Entegrasyonu", name: "n11Integration" },
      { type: "text", label: "N11 API Key", name: "n11ApiKey" },
      { type: "select", label: "Senkronizasyon Sıklığı", name: "syncFrequency", options: ["15 Dakika", "30 Dakika", "1 Saat", "2 Saat"] },
    ]
  },
  { 
    id: "shipping", 
    label: "Kargo Etiket Ayarları", 
    icon: Tag,
    fields: [
      { type: "select", label: "Varsayılan Kargo Firması", name: "defaultShipping", options: ["Yurtiçi Kargo", "MNG Kargo", "Aras Kargo", "PTT Kargo"] },
      { type: "text", label: "Gönderici Adı", name: "senderName", required: true },
      { type: "textarea", label: "Gönderici Adresi", name: "senderAddress", required: true },
      { type: "tel", label: "Gönderici Telefonu", name: "senderPhone", required: true },
      { type: "checkbox", label: "Otomatik Etiket Yazdır", name: "autoPrintLabel" },
      { type: "select", label: "Etiket Boyutu", name: "labelSize", options: ["10x15 cm", "10x10 cm", "A4"] },
    ]
  },
  { 
    id: "invoice-fields", 
    label: "Fatura Açıklama Alanı Tanımları", 
    icon: FileText,
    fields: [
      { type: "text", label: "Açıklama Alanı 1", name: "customField1" },
      { type: "text", label: "Açıklama Alanı 2", name: "customField2" },
      { type: "text", label: "Açıklama Alanı 3", name: "customField3" },
      { type: "textarea", label: "Standart Açıklama Metni", name: "standardDescription" },
      { type: "checkbox", label: "Müşteri Notları Göster", name: "showCustomerNotes" },
      { type: "checkbox", label: "Ürün Kodları Göster", name: "showProductCodes" },
    ]
  },
  { 
    id: "notifications", 
    label: "Bildirim Ayarları", 
    icon: Bell,
    fields: [
      { type: "checkbox", label: "E-posta Bildirimleri", name: "emailNotifications" },
      { type: "checkbox", label: "SMS Bildirimleri", name: "smsNotifications" },
      { type: "checkbox", label: "Yeni Sipariş Bildirimi", name: "newOrderNotification" },
      { type: "checkbox", label: "Stok Azalma Bildirimi", name: "lowStockNotification" },
      { type: "checkbox", label: "İade/Değişim Bildirimi", name: "returnNotification" },
      { type: "email", label: "Bildirim E-posta Adresi", name: "notificationEmail" },
      { type: "tel", label: "Bildirim SMS Numarası", name: "notificationPhone" },
    ]
  },
];
*/

function SettingsContent() {
  const { user, authority } = useAuth();
  // const [activeTab, setActiveTab] = useState("all")
  // const [searchTerm, setSearchTerm] = useState("")
  // const [formData, setFormData] = useState<Record<string, unknown>>({})

  // // Tüm field'ları topla
  // const getAllFields = (): FieldWithCategory[] => {
  //   return menuItems.filter(item => item.fields).flatMap(item => 
  //     item.fields!.map(field => ({
  //       ...field,
  //       category: item.label
  //     }))
  //   )
  // }

  // // Aktif sekmenin field'larını getir
  // const getActiveFields = (): FieldWithCategory[] => {
  //   if (activeTab === "all") {
  //     return getAllFields()
  //   }
  //   const activeMenu = menuItems.find(item => item.id === activeTab)
  //   return activeMenu?.fields?.map(field => ({
  //     ...field,
  //     category: activeMenu.label
  //   })) || []
  // }

  // // Arama filtresi
  // const filteredMenuItems = menuItems.filter(item =>
  //   item.label.toLowerCase().includes(searchTerm.toLowerCase())
  // )

  // const handleChange = (name: string, value: unknown) => {
  //   setFormData(prev => ({ ...prev, [name]: value }))
  // }

  // const handleSubmit = () => {
  //   alert("Ayarlar kaydedildi!")
  // }

  return (
    <div className="p-6">
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Admin Access Confirmed</h2>
        <p><strong>Current User:</strong> {user?.name}</p>
        <p><strong>Authority:</strong> {authority}</p>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        {/* Rest of your existing settings content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Company Settings</h1>
          {/* Your existing settings form content would go here */}
          <p className="text-gray-600">Settings management interface for admin users.</p>
        </div>
      </div>
    </div>
  );
}

// Fallback component for unauthorized users
function UnauthorizedFallback() {
  return (
    <div className="p-6">
      <div className="text-center">
        <div className="text-red-600 text-xl font-semibold mb-2">Access Denied</div>
        <p className="text-gray-600 mb-4">You need admin privileges to access settings.</p>
        <p className="text-sm text-gray-500">Please contact your administrator if you believe this is an error.</p>
      </div>
    </div>
  );
}

export default function CompanySettingsPanel() {
  return (
    <ProtectedRoute 
      fallback={<UnauthorizedFallback />}
    >
      <SettingsContent      />
    </ProtectedRoute>
  );
}