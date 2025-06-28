'use client';
import {  FiGrid, FiCheckCircle } from 'react-icons/fi';
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdSettings  } from "react-icons/io";
import Image from "next/image";
const product = {
  name: 'sSsS',
  sku: '1212',
  price: '121,00 ₺',
  stock: '1212',
};

const integrationHistory = [
  {
    channel: 'Entekas',
    status: 'Başarılı',
    message: '1212 stok kodlu yeni ürün eklendi.',
    date: '21.08.2025 16:43',
  },
];

export default function ProductSyncPage() {
  return (
    <div className="p-6 bg-gray-50/50 min-h-screen"> 
      <div className="panel">
        <div className="flex items-center justify-between gap-4 mb-6"> 
          <div className='flex flex-col py-2 px-6 mr-20 items-center gap-2 border-r border-gray-300  cursor-pointer'>
            <FiGrid className="text-blue-600 w-8 h-8"  />
            <a className='text-nowrap'>Ürün Bilgileri </a>
          </div> 
          
          <div className='w-full flex gap-4 '>
            <div className="bg-blue-100 items-center justify-center flex rounded-lg w-12 h-12">
              <FiGrid className="text-blue-600 w-8 h-8"  />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Entegrasyon</h1>
              <p className="text-sm text-gray-600">Ürününüzü tüm platformlardan satışa çıkarın.</p>
            </div>
          </div>

          <div className='flex flex-col py-2 px-6 items-center gap-2 border-l border-gray-300  cursor-pointer'>
            <IoMdSettings className="text-blue-600 w-8 h-8"  />
            <a className='text-nowrap'>Seçenekler </a>
          </div> 
        </div>
         
        <div className="flex flex-row w-full  gap-8 items-start justify-between border-t border-gray-300 py-4"> 
          <div className="flex items-start gap-3 min-w-36">
            <div className="rounded-lg items-center justify-center flex-shrink-0 flex flex-col ">
              <Image src={"/entekas-logo.svg"} className="w-24 aspect-square" alt={''}  width={0} height={0}/>
              <p className="text-xs text-gray-500"> Ürünün seçenekleri yok</p>
            </div> 
          </div>        
          
          <div className="min-w-1/4 items-left justify-center flex flex-col">
            <p className="text-md font-semibold text-gray-800 uppercase mb-1">ÜRÜN ADI</p>
            <p className="text-gray-500 mb-1">{product.name}</p>
          </div> 

          <div className='flex flex-row justify-between w-full'>
            <div>
              <p className="text-md font-semibold text-gray-800 uppercase mb-1">ÜRÜN KODU</p>
              <p className="text-gray-500 mb-1">{product.sku}</p>
            </div>
            
            <div>
              <p className="text-md font-semibold text-gray-800 uppercase mb-1">ÜRÜN FİYATI</p>
              <p className="text-gray-500 mb-1">{product.price}</p>
            </div>
            
            <div>
              <p className="text-md font-semibold text-gray-800 uppercase mb-1">ÜRÜN STOĞU</p>
              <p className="text-gray-500 mb-1">{product.stock}</p>
            </div>
          </div> 
        </div>
      </div>
       
      <div className="panel max-w-1/4 flex flex-col gap-4">
        <div className='flex flex-row justify-between'>
          <div className="bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 ">
            <Image src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_pCKN8VDz8eHVrMoM-faHQj3O4HDD12bTLg&s'} className='rounded-full w-16 h-16' alt={''}/>
          </div> 

          <div className="flex justify-between items-start mb-3"> 
            <div className="flex flex-col items-center gap-1 flex-shrink-0 ml-4">
              <span className="text-xs text-gray-800 font-medium">Bağlantı Durumu</span>
              <div className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-extrabold flex items-center gap-1">
                <IoCloseCircleOutline size={15} />
                BAĞLANTI YOK
              </div>
            </div> 
          </div>
        </div>
           
        <div className='w-full flex flex-col justify-between items-center gap-2'>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Trendyol Entegrasyon</h3>
          <p className="text-sm text-gray-600">
            Trendyol de ürününüzü listelemek için aşağıdaki <span className="font-semibold">satışa çıkar</span> butonuna tıklayabilirsiniz.
          </p>
        
          <div className="flex items-center gap-2 text-gray-400 pt-4">
            <div className=" flex items-center justify-center flex-shrink-0 ">
              <Image src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_pCKN8VDz8eHVrMoM-faHQj3O4HDD12bTLg&s'} className='rounded-full w-6 h-6' alt={''} />
            </div> 
            <span>→</span>
            <div className="  flex items-center justify-center flex-shrink-0 ">
              <Image src={'/entekas-logo.svg'} className='rounded-full w-6 h-6' alt={''} width={0} height={0}/>
            </div> 
          </div>
        </div>
             
          <div className="w-full flex flex-row justify-center items-center gap-2"> 
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  SATIŞA ÇIKAR
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                  ÜRÜN BAĞLA
                </button>
              </div>
              
              
      </div>

      {/* Integration History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Entegrasyon Geçmişi</h3>
        
        <div className="bg-orange-50 border-l-4 border-orange-400 text-orange-800 text-sm p-4 rounded-r-md mb-6">
          <p className="mb-2">
            Platformlar üzerinde yapmış olduğunuz işlemlerin loglarına aşağıdaki tablodan ulaşabilirsiniz.
          </p>
          <p className="mb-2">
            Aşağıdaki tabloda son 20 log kaydınız bulunmaktadır. Daha eski log kayıtları için{' '}
            <span className="font-semibold text-orange-900 hover:underline cursor-pointer">destek ekibimiz</span>{' '}
            ile iletişime geçebilirsiniz.
          </p>
          <p>
            Ayrıca almış olduğunuz hatalar için direk hatanın üzerine gelerek{' '}
            <span className="font-semibold text-orange-900 hover:underline cursor-pointer">destek talebi oluştur</span>{' '}
            butonu yardımıyla taleplerinizi iletebilirsiniz.
          </p>
        </div>
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
            <div>KANAL</div>
            <div>DURUM</div>
            <div>MESAJ</div>
            <div className="text-right">TARİH</div>
          </div>
          
          <div>
            {integrationHistory.map((log, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 items-center px-4 py-4 hover:bg-gray-50 border-t border-gray-100">
                <div className="font-medium text-gray-800 flex items-center">
                  <div className="w-1 h-6 bg-green-400 mr-3 rounded-full"></div>
                  {log.channel}
                </div>
                <div>
                  <span className="text-green-600 flex items-center gap-1 text-sm font-medium">
                    <FiCheckCircle size={14} />
                    {log.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{log.message}</div>
                <div className="text-right text-sm text-gray-500">{log.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}