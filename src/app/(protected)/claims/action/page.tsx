import ClaimFilter from "@/components/claims/ClaimFilter";
import ClaimList from "@/components/claims/ClaimList";

import OrderHeader from '@/app/(protected)/orders/components/Header';
 
import {  FaBars } from "react-icons/fa";

export default function ClaimsPage() {
  
  const tabs = [
    { id:"/claims", name: "Tümü", icon: <FaBars className="w-4 h-4" />, href: '/claims' },
    { id:"/claims/active", name: "Aktif İadeler", href: '/claims/active' },
    { id:"/claims/action", name: "Aksiyon Alınacak", href: '/claims/action' },
    { id:"/claims/accepted", name: "Kabul Edilen", href: '/claims/accepted' },
    { id:"/claims/rejected", name: "Reddedilen", href: '/claims/rejected' },
    { id:"/claims/service-analysis", name: "Servis & Analiz", href: '/claims/service-analysis' },
    { id:"/claims/cancelled", name: "İptal Edilen", href: '/claims/cancelled' },
  ];

   


  return (
    <div className="min-h-screen">
      <div className="flex-1">

      <div className='panel'>
          <OrderHeader
            tabItems={tabs}
          />
          
          <ClaimFilter/>
        </div> 
        
        <ClaimList/>       
      </div>
    </div>
  );
}
