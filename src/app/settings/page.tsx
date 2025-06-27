"use client"

import { useState } from "react"
import { Settings, Building, FileText, Package, Truck, Tag, Bell } from "lucide-react"
import { useRouter } from "next/navigation";
type FieldType = {
  type: "text" | "email" | "tel" | "textarea" | "file" | "select" | "checkbox"
  label: string
  name: string
  required?: boolean
  options?: string[]
}

type MenuItemType = {
  id: string
  label: string
  icon: any
  fields?: FieldType[]
}

type FieldWithCategory = FieldType & {
  category: string
}

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
]

export default function CompanySettingsPanel() {
  const [activeTab, setActiveTab] = useState("company")
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState<Record<string, any>>({})

  // Tüm field'ları topla
  const getAllFields = (): FieldWithCategory[] => {
    return menuItems.filter(item => item.fields).flatMap(item => 
      item.fields!.map(field => ({
        ...field,
        category: item.label
      }))
    )
  }

  // Aktif sekmenin field'larını getir
  const getActiveFields = (): FieldWithCategory[] => {
    if (activeTab === "all") {
      return getAllFields()
    }
    const activeMenu = menuItems.find(item => item.id === activeTab)
    return activeMenu?.fields?.map(field => ({
      ...field,
      category: activeMenu.label
    })) || []
  }

  // Arama filtresi
  const filteredMenuItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    console.log("Form verisi:", formData)
    alert("Ayarlar kaydedildi!")
  }

  const renderField = (field: FieldWithCategory, showCategory = false) => (
    <div key={field.name} className="flex items-start gap-4 py-3">
      <div className="w-48 min-w-[180px]">
       
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>

      <div className="flex-1">
        {field.type === "textarea" ? (
          <textarea
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="input"
            rows={3}
          />
        ) : field.type === "file" ? (
          <div className="w-full flex items-center border border-gray-300 rounded-md p-2 bg-gray-50">
            <input
              id={`${field.name}-upload`}
              type="file"
              onChange={(e) => handleChange(field.name, e.target.files?.[0] ?? null)}
              className="hidden"
            />
            <label htmlFor={`${field.name}-upload`}>
              <span className="bg-white px-3 py-1 rounded border border-gray-300 cursor-pointer hover:bg-gray-50 transition text-sm font-medium">
                Dosya Seç
              </span>
            </label>
            <span className="ml-3 text-gray-500 text-sm">
              {formData[field.name]?.name || "Dosya seçilmedi"}
            </span>
          </div>
        ) : field.type === "select" ? (
          <select
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="input"
          >
            <option value="">Seçiniz...</option>
            {field.options?.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : field.type === "checkbox" ? (
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData[field.name] || false}
              onChange={(e) => handleChange(field.name, e.target.checked)}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-600">Aktif</span>
          </label>
        ) : (
          <input
            type={field.type}
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="input"
          />
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen  flex items-start justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg flex w-full max-w-7xl min-h-[600px]">
        {/* Sidebar */}
        <aside className="w-80  border-r border-gray-200 p-6 ">
          <input
            type="text"
            placeholder="Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
          />
          
          <nav>
            <ul className="space-y-2">
              {filteredMenuItems.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <button
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      activeTab === id
                        ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {activeTab === "all" ? "Tüm Ayarlar" : menuItems.find(item => item.id === activeTab)?.label}
            </h1>
            <p className="text-gray-600">
              {activeTab === "all" 
                ? "Tüm ayarları bu sayfadan görüntüleyebilir ve düzenleyebilirsiniz." 
                : "Aşağıdaki formu doldurarak ayarlarınızı güncelleyebilirsiniz."
              }
            </p>
          </div>

          <div className="space-y-1 max-w-4xl">
            {getActiveFields().map(field => renderField(field, activeTab === "all"))}

            <div className="flex justify-end pt-8 border-t border-gray-200 mt-8">
              <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Ayarları Kaydet
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}