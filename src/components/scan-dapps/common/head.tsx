import React from 'react'
import arrowLeft from "@/images/arrow-left.svg";
import Image from 'next/image';
import { useRouter } from 'next/navigation';


interface IHead {
    icon: string;
    title: string;
}
const HeadComponent = ({ icon, title }: IHead) => {
  const router = useRouter()
  return (
      <main className='flex px-4 md:px-10 top-0 items-center w-full gap-3 py-8'>
          <Image
              src={arrowLeft}
              alt="arrow left"
              width={24}
              className="hover:cursor-pointer"
        onClick={() => router.push("?type=store")}
          />
        <Image src={icon} alt='solana' width={32} height={32}/>
        <span className='text-[#1B1B1B] md:text-2xl text-sm font-semibold'>{title}</span>
    </main>
  )
}

export default HeadComponent