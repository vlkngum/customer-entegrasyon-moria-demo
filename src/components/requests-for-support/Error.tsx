import React from 'react';
import Image from "next/image";

const Error = () => (
  <div className='flex justify-center items-center bg-[#f2f8ff] h-screen'>
    <Image src="/noTicket.svg" alt="" className='w-300 h-150' />
  </div>
);

export default Error; 