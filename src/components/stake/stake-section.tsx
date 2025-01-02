import { CONTRACTS } from "@/constants/contracts";
import useUserStakes from "@/hooks/useUserStakes";
import layer from "@/images/earn/layer.png";
import { usePopupStore } from "@/store/use-popup-store";
import { useStakeStore } from "@/store/use-stake-store";
import { useAppKit } from "@reown/appkit/react";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { Address } from "viem";
import { useAccount, useBalance } from "wagmi";

const StakeSection = () => {
  const { address } = useAccount();
  const [inputValue, setInputValue] = useState("");
  const [isValidAmount, setIsValidAmount] = useState(false);
  const { open } = useAppKit();
  const { open: openPopup } = usePopupStore();
  const { setField, isLoading } = useStakeStore();
  const { totalStaked } = useUserStakes();


  const { data: balance, refetch } = useBalance({
    address: address,
    token: CONTRACTS.MockToken as Address,
  });

  const cards = [
    {
      title: 'APY',
      value: '10%',
    },
    {
      title: 'Your stake',
      value: `${Number(totalStaked).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
      })} $XETRA`,
    },
    {
      title: 'Balance',
      value: `${Number(balance?.formatted || 0).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
      })} $XETRA`,
    }
  ];

  const stakingInfo = [
    {
      label: 'LOCK PERIOD',
      value: '30 days'
    },
    {
      label: 'EARLY UNSTAKE FEE',
      value: '20% linear'
    },
    {
      label: 'MAX WALLET STAKE',
      value: '100,000'
    },
    {
      label: 'MAX POOL STAKE',
      value: '10,000,000'
    }
  ];

  const percentageButtons = [
    { value: 0.1, label: '10%' },
    { value: 0.25, label: '25%' },
    { value: 0.5, label: '50%' },
    { value: 1, label: 'Max' }
  ];


  const handleInputChange = (e: { target: { value: string; }; }) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    if (value === '' || (Number(value) >= 0 && Number(value) <= Number(balance?.formatted || 0))) {
      setInputValue(value);
    }
  };

  const handlePercentageClick = (percentage: number) => {
    if (balance) {
      const newValue = (Number(balance.formatted) * percentage);
      setInputValue(newValue.toString());
    }
  };

  useEffect(() => {
    const numValue = Number(inputValue);
    const balanceValue = Number(balance?.formatted || 0);
    setIsValidAmount(
      numValue > 0 &&
      numValue <= balanceValue &&
      numValue <= 100000 // MAX_WALLET_STAKE
    );
  }, [inputValue, balance]);

  useEffect(() => {
    refetch();
  }, [isLoading]);

  return (
    <div className="p-6 rounded-3xl bg-white shadow-[0px_0px_24px_0px_rgba(244,122,255,0.24)] md:mx-10 mx-4 flex flex-col gap-4">
      <h1 className="text-[#1B1B1B] text-2xl font-semibold">Stake and Earn</h1>
      <div className="flex md:flex-row flex-col gap-3 w-full">
        <div className="flex flex-col gap-[10px] md:min-w-[700px]">
          <div className="flex md:flex-row flex-col gap-[10px] w-full">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-[#F5F5F7] rounded-xl p-4 flex flex-col gap-2 md:min-h-[201px] w-full md:max-w-[226px] flex-1 relative overflow-hidden"
              >
                <span className="h-[44px] w-[4px] rounded-e-sm bg-[#FF306E] absolute top-[13px] left-0"></span>
                <span className="text-[#666666] text-sm">{card.title}</span>
                <span className="text-[#1B1B1B] text-2xl font-semibold">{card.value}</span>
              </div>
            ))}
          </div>
          <div className="flex bg-[#F5F5F7] rounded-xl min-h-[120px] w-full md:flex-row flex-col">
            {stakingInfo.map((info, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 p-4 flex-1 justify-center items-center"
              >
                <span className="text-[#FF306E] text-xl font-semibold">{info.value}</span>
                <span className="text-[#666666] text-sm uppercase">{info.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 rounded-[20px] flex-1 w-full border flex flex-col justify-between border-[#EAEAEA] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.06),0px_1px_2px_0px_rgba(16,24,40,0.04)]">
          <h2 className="text-2xl font-semibold text-[#1B1B1B]">Staking</h2>
          <div className="p-3 flex flex-col gap-3 items-center relative">
            <div className="absolute inset-0 flex z-0 items-center justify-center">
              <Image src={layer} alt="layer" layout="fill" objectFit="cover" />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter amount"
              className="w-full placeholder:text-[#AEAEAE] placeholder:underline text-center z-10 bg-transparent
                focus:outline-none min-w-[200px] text-[32px] font-semibold text-[#FF306E] underline focus:border-pink-500"
            />
            <div className="flex items-center text-sm justify-items-center z-10">
              <span className="text-[#AEAEAE]">Balance: </span>
              <span className="text-[#1B1B1B] font-semibold">
                {Number(balance?.formatted || 0).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 3,
                })} XETRA
              </span>
            </div>
            <div className="flex gap-2 z-10">
              {percentageButtons.map((btn, index) => (
                <button
                  key={index}
                  onClick={() => handlePercentageClick(btn.value)}
                  className="px-2 py-1 rounded-full border border-[#FF306E] text-[#FF306E] hover:bg-pink-50 transition-colors text-sm"
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
          <button
            disabled={!isValidAmount}
            onClick={() => {
              if (!address) {
                open()
              }
              if (isValidAmount) {
                setField('amount', inputValue);
                openPopup('stakeDetail');
              }
            }}
            className={`w-full py-3 z-10 rounded-full text-sm font-medium transition-colors
              ${isValidAmount
                ? 'bg-[#FF306E] text-white hover:bg-[#E02861]'
                : 'bg-[#EAEAEA] text-[#AEAEAE]'}`}
          >
            {!address ? 'Connect Wallet' :
              !balance?.formatted ? 'Loading...' :
                Number(balance?.formatted) === 0 ? 'Not enough balance' :
                  !isValidAmount ? 'Enter valid amount' :
                    'Stake Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StakeSection;