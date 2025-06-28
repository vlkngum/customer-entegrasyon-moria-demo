"use client";

import { MdDiscount } from "react-icons/md";
import { LuWallet } from "react-icons/lu";
import { RiShoppingCart2Line } from "react-icons/ri";
import StatCard from "@/components/dashboard/StatCard";
import SalesStatisticsChart from "@/components/dashboard/SalesStatisticsChart"; 
const stats = [
  { name: 'Bugunki Sipariş Sayısı', value: '16', icon: MdDiscount, change: '+12%', gradient: 'blue' as const },
  { name: 'Aylık Gelir', value: '₺45,678', icon: LuWallet, change: '+8%', gradient: 'green' as const },
  { name: 'Aktif Raporlar', value: '23', icon: RiShoppingCart2Line, change: '+5%', gradient: 'purple' as const },
  { name: 'Dökümanlar', value: '156', icon: LuWallet, change: '+3%', gradient: 'orange' as const },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const activities = [
  { id: 1, user: 'Kullanıcı 1', action: 'Yeni bir işlem gerçekleştirdi', time: '2 saat önce' },
  { id: 2, user: 'Kullanıcı 2', action: 'Yeni bir işlem gerçekleştirdi', time: '3 saat önce' },
  { id: 3, user: 'Kullanıcı 3', action: 'Yeni bir işlem gerçekleştirdi', time: '4 saat önce' },
  { id: 4, user: 'Kullanıcı 4', action: 'Yeni bir işlem gerçekleştirdi', time: '5 saat önce' },
  { id: 5, user: 'Kullanıcı 5', action: 'Yeni bir işlem gerçekleştirdi', time: '6 saat önce' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const quickActions = [
  { label: 'Yeni Kullanıcı Ekle', color: 'blue' as const, onClick: () => console.log('Yeni Kullanıcı') },
  { label: 'Rapor Oluştur', color: 'green' as const, onClick: () => console.log('Rapor') },
  { label: 'Döküman Yükle', color: 'purple' as const, onClick: () => console.log('Döküman') },
  { label: 'Ayarları Düzenle', color: 'orange' as const, onClick: () => console.log('Ayarlar') },
];

const salesData = [
  { date: '03-06-2025', sales: 0.1, revenue: 0 },
  { date: '07-06-2025', sales: 2, revenue: 1 },
  { date: '11-06-2025', sales: 0.3, revenue: 2 },
  { date: '15-06-2025', sales: 0.8, revenue: 0.7 },
  { date: '19-06-2025', sales: 1.5, revenue: 1.8 },
  { date: '23-06-2025', sales: 0.6, revenue: 2.5 },
  { date: '27-06-2025', sales: 2.7, revenue: 0.7 },
  { date: '31-06-2025', sales: 0.8, revenue: 1.8 },
];

export default function Home() {
  return (
    <div className=" px-6 py-10">
      <div className="panel">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatCard key={stat.name} {...stat} />
          ))}
        </div>

        <div className="mb-8">
          <SalesStatisticsChart data={salesData} />
        </div>
{/* 
          <QuickActions actions={quickActions}/>
          <ActivityList activities={activities}/> */}

      </div>
 
   
    </div>
  );
}
