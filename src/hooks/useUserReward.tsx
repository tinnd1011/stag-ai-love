import { useEffect, useMemo } from 'react';
import { Address, formatUnits } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import { CONTRACTS } from '@/constants/contracts';
import abi from '@/abi/contract_abi.json';

interface RewardsData {
  claimableRewards: bigint;
  formattedRewards: string;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const useUserRewards = (): RewardsData => {
  const { address } = useAccount();

  const { data, isLoading, error, refetch } = useReadContract({
    address: CONTRACTS.MockAddress as Address,
    abi: abi,
    functionName: 'getWalletClaimableRewards',
    args: [address as Address],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000); // Refetch every 10 seconds

    return () => clearInterval(interval);
  }, [refetch]);

  const rewards = useMemo(() => {
    if (!data || typeof data !== 'string' && typeof data !== 'number' && typeof data !== 'bigint') {
      return {
        claimableRewards: BigInt(0),
        formattedRewards: '0'
      };
    }

    return {
      claimableRewards: BigInt(data),
      formattedRewards: formatUnits(BigInt(data), 9)
    };
  }, [data]);

  return {
    ...rewards,
    isLoading,
    error: error as Error | null,
    refetch
  };
};

export default useUserRewards;