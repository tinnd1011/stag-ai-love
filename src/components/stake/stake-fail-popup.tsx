import fail from '@/images/stake/fail.svg';
import { usePopupStore } from '@/store/use-popup-store';
import Image from 'next/image';

const StakeFailPopup = () => {

  const { close } = usePopupStore();

  return (
    <div className='flex flex-col gap-[30px] items-center'>
      <Image src={fail} alt="Success" />
      <div className="flex flex-col gap-2 items-center">
        <h1 className='text-[#1B1B1B] text-2xl font-semibold text-center'>Oops! Something
          went wrong 😕</h1>
        <span className='text-[#666666] text-sm text-center'>We couldn’t complete your staking request. Please try again.</span>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <button
          onClick={close}
          className='py-3 bg-[#EAEAEA] rounded-full hover:bg-[#E02861] text-[#1B1B1B] text-sm font-medium transition-colors w-full'>
          <span>Close</span>
        </button>
      </div>
    </div>
  )
}

export default StakeFailPopup