'use client'

import { IoIosVideocam, IoMdNotifications  } from "react-icons/io";
import { MdPersonAddAlt1 , MdPerson, MdMessage } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { HiMiniGift } from "react-icons/hi2";
import { useState } from "react";
import { FaUserLock, FaCog, FaFileInvoice, FaUsers } from "react-icons/fa";
import { RiShutDownLine } from "react-icons/ri";


export default function Header () {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="w-full flex flex-row justify-between bg-white shadow-xl px-8 py-4">
            <div className="max-w-1/2 flex flex-row gap-4">
                <div className="flex flex-row items-center gap-2 hover:cursor-pointer">
                    <div className="h-5">
                      <IoIosVideocam className="text-blue-800 w-full h-full"/>
                    </div>
                    <p className="text-xs">Videolu Eğitim Merkezi</p>
                </div> 
                <div className="flex flex-row items-center gap-2 hover:cursor-pointer">
                    <div className="h-5">
                      <MdPerson className="text-blue-800 w-full h-full"/>
                    </div>
                    <p className="text-xs">Destek Merkezi</p>
                </div> 
                <div className="flex flex-row items-center gap-2 hover:cursor-pointer">
                    <div className="h-5">
                      <MdPersonAddAlt1 className="text-blue-800 w-full h-full"/>
                    </div>
                    <p className="text-xs">Destek Talebi Oluştur</p>
                </div>  
            </div>

            <div className="max-w-1/2 flex flex-row gap-4 ">
                <div className="flex flex-row gap-2">
                    <div className="flex flex-row items-center gap-2 hover:cursor-pointer">
                        <div className="h-8 aspect-square bg-blue-300/50 rounded-full p-1.5">
                            <HiMiniGift className="text-blue-800 w-full h-full"/>
                        </div>
                    </div> 
                    <div className="flex flex-row items-center gap-2 hover:cursor-pointer">
                        <div className="h-8 aspect-square bg-blue-300/50 rounded-full p-1.5">
                            <IoMdNotifications className="text-blue-800 w-full h-full"/>
                        </div>
                    </div> 
                    <div className="flex flex-row items-center gap-2 hover:cursor-pointer">
                        <div className="h-8 aspect-square bg-blue-300/50 rounded-full p-1.5">
                            <MdMessage className="text-blue-800 w-full h-full"/>
                        </div>
                    </div>  
                </div>

                <div className="relative  flex flex-row items-center gap-1.5" onClick={toggleDropdown}>
                    <div className="h-8 aspect-square bg-gray-400 rounded-full p-1 hover:cursor-pointer">
                      <MdPerson className="text-white w-full h-full "/> 
                    </div>
                    
                    <p className="text-sm font-light hover:cursor-pointer">Sinan Kaloğlu</p>
                    
                    <div className="aspect-square bg-blue-300/50 rounded-full items-center p-0.5 hover:cursor-pointer">
                        <FaChevronDown className="h-2 w-2"/>
                    </div>

                    <div className={`
                        absolute right-0 mt-6 top-full w-48 bg-white shadow-lg rounded-md py-2 z-10
                        transition-all duration-300 ease-out overflow-hidden
                        ${isDropdownOpen ? 'max-h-screen opacity-100 ' : 'max-h-0 opacity-0 pointer-events-none'}
                    `}>
                        <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            CM App ID: 45352
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                            <FaUserLock className="w-4 h-4"/>
                            <p className="text-sm">Şifre Değiştir</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                            <FaCog className="w-4 h-4"/>
                            <p className="text-sm">Abonelik Ayarları</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                            <FaFileInvoice className="w-4 h-4"/>
                            <p className="text-sm">Fatura Bilgileri</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 border-b border-gray-200 mb-2">
                            <FaUsers className="w-4 h-4"/>
                            <p className="text-sm">Kullanıcı ve Yetki Yönetimi</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                            <RiShutDownLine className="w-5 h-5"/>
                            <p className="text-sm">Çıkış</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}   