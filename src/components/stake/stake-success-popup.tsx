import success from '@/images/stake/success.svg';
import { usePopupStore } from '@/store/use-popup-store';
import { useStakeStore } from '@/store/use-stake-store';
import Image from 'next/image';
import Link from 'next/link';

const StakeSuccessPopup = () => {
  const { txHash } = useStakeStore();
  const { close } = usePopupStore();

  return (
    <div className='flex flex-col gap-[30px] items-center'>
      <Image src={success} alt="Success" />
      <div className="flex flex-col gap-2 items-center">
        <h1 className='text-[#1B1B1B] text-2xl font-semibold'>XETRA Staked! 🚀</h1>
        <span className='text-[#666666] text-sm text-center'>You’ve locked your XETRA to support the network and started earning passive income. 🎉</span>
      </div>
      <div className="flex flex-col gap-4 w-full items-center">
        <button
          onClick={close}
          className='py-3 bg-[#EAEAEA] rounded-full hover:bg-[#E02861] text-[#1B1B1B] text-sm font-medium transition-colors w-full'>
          <span>Close</span>
        </button>
        <Link
          href={`https://sepolia.etherscan.io/tx/${txHash}`}
          target='_blank'
          className='text-sm font-medium transition-colors w-full text-[#FF306E] text-center'>
          View transaction
        </Link>
      </div>
    </div>
  )
}

export default StakeSuccessPopup