import { 
  UsersIcon, 
  ChartBarIcon, 
  DocumentTextIcon,
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';
import Image from 'next/image';

const stats = [
  { name: 'Toplam Kullanıcı', value: '1,234', icon: UsersIcon, change: '+12%' },
  { name: 'Aylık Gelir', value: '₺45,678', icon: CurrencyDollarIcon, change: '+8%' },
  { name: 'Aktif Raporlar', value: '23', icon: ChartBarIcon, change: '+5%' },
  { name: 'Dökümanlar', value: '156', icon: DocumentTextIcon, change: '+3%' },
];

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600">{stat.change}</span>
              <span className="text-sm text-gray-500"> geçen aya göre</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Son Aktiviteler</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Kullanıcı {i}</p>
                    <p className="text-sm text-gray-500">Yeni bir işlem gerçekleştirdi</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 saat önce</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors">
              Yeni Kullanıcı Ekle
            </button>
            <button className="p-4 bg-green-50 rounded-lg text-green-600 hover:bg-green-100 transition-colors">
              Rapor Oluştur
            </button>
            <button className="p-4 bg-purple-50 rounded-lg text-purple-600 hover:bg-purple-100 transition-colors">
              Döküman Yükle
            </button>
            <button className="p-4 bg-orange-50 rounded-lg text-orange-600 hover:bg-orange-100 transition-colors">
              Ayarları Düzenle
            </button>
          </div>
        </div>
      </div>

      <Image 
        src="/cmapps-logo" 
        alt="CMApps Logo"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        priority
      />
    </div>
  );
}
