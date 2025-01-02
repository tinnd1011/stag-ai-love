import { useStake } from '@/hooks/useStake';
import token from '@/images/stake/token.svg';
import { cn } from '@/lib/utils';
import { usePopupStore } from '@/store/use-popup-store';
import { useStakeStore } from '@/store/use-stake-store';
import Image from 'next/image';
import { useEffect } from 'react';
import LoadingPopup from './loading-popup';
const StakeDetailPopup = () => {
  const { amount, setField, isLoading: isModalLoading } = useStakeStore();
  const { close, open } = usePopupStore();
  const { stake, isLoading, reset, txHash } = useStake({
    onSuccess: () => {
      close();
      setField('isLoading', false);
      setField('txHash', txHash);
      open('stakeSuccess');
    },
    onError: (error) => {
      close();
      setField('isLoading', false);
      open('stakeFail');
      reset();
    },
  });


  const details = [
    {
      title: 'APY',
      value: '10%',
    },
    {
      title: 'FEE',
      value: '1%',
    },
  ];

  if (isModalLoading) {
    return (
      <LoadingPopup />
    )
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className="flex flex-col gap-4 items-center">
        <Image src={token} alt="Token" />
        <div className='flex flex-col items-center gap-0'>
          <h1 className='text-[32px] font-semibold text-[#1B1B1B]'>{Number(amount).toLocaleString(
            undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 3,
          }
          )} $XETRA</h1>
          <span className='text-[#666666] font-semibold text-base'>$200</span>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        {details.map((detail, index) => (
          <div key={index} className='flex justify-between gap-1 items-center'>
            <span className='text-[#666666] text-sm'>{detail.title}</span>
            <span className='text-[#1B1B1B] text-xl font-semibold'>{detail.value}</span>
          </div>
        ))}
      </div>
      <button
        disabled={isLoading}
        onClick={
          () => {
            setField('isLoading', true);
            stake(amount);
          }
        }
        className={cn("rounded-2xl py-4 bg-[linear-gradient(91deg,#FACC69_-0.26%,#FF8965_100.36%)] shadow-[0px_7px_10px_0px_rgba(255,48,110,0.10),1px 1px_8px_0px_rgba(253,255,236,0.49)_inset]", {
          'opacity-50': isLoading,
        })}>
        <span className="text-[#1B1B1B] text-base font-semibold">Confirm</span>
      </button>
    </div>
  )
}

export default StakeDetailPopup