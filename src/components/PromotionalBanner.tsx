"use client";

import { IoIosStar } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";

export default function PromotionalBanner() {

  return (
    <div className="w-full bg-gradient-to-tr from-blue-700 to-blue-900 py-3 flex items-center justify-around px-[20%] text-white text-sm shadow-xl">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <IoIosStar className="w-3 h-3 text-white" />
          <span className="font-bold">KISA SÜRELİ FIRSAT</span>
          <IoIosStar className="w-3 h-3 text-white" />
        </div>
        <div className="absolute mt-6 w-56 h-20 bg-white/20 rounded-full blur-md"></div>
      </div>
      <p className="flex-1 text-center">
        Hemen satın al %5 indirimden faydalan!
      </p>
      <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 cursor-pointer transition-colors duration-200">
          PAKET SATIN AL 
          <FaArrowRight className="w-4 h-4" />
        </button>
      <div className="ml-8 flex items-center">
        <span className="flex flex-col items-center mx-1">
          <span className="text-white text-lg font-bold">00</span>
          <span className="text-white text-xs uppercase">GÜN</span>
        </span>
        <span className="text-white text-lg font-bold">:</span>
        <span className="flex flex-col items-center mx-1">
          <span className="text-white text-lg font-bold">09</span>
          <span className="text-white text-xs uppercase">SAAT</span>
        </span>
        <span className="text-white text-lg font-bold">:</span>
        <span className="flex flex-col items-center mx-1">
          <span className="text-white text-lg font-bold">51</span>
          <span className="text-white text-xs uppercase">DAKİKA</span>
        </span>
        <span className="text-white text-lg font-bold">:</span>
        <span className="flex flex-col items-center mx-1">
          <span className="text-white text-lg font-bold">11</span>
          <span className="text-white text-xs uppercase">SANİYE</span>
        </span>
      </div>
    </div>
  );
} 