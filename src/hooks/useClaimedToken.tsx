import { useEffect, useMemo } from 'react';
import { Address, formatUnits } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import { CONTRACTS } from '@/constants/contracts';
import abi from '@/abi/contract_abi.json';

interface ClaimedTokensData {
  claimedAmount: bigint;
  formattedAmount: string;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const useClaimedTokens = (): ClaimedTokensData => {
  const { address } = useAccount();

  const { data, isLoading, error, refetch } = useReadContract({
    address: CONTRACTS.MockAddress as Address,
    abi: abi,
    functionName: 'totalUserRewards',
    args: [address as Address],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000); // Refetch every 10 seconds

    return () => clearInterval(interval);
  }, [refetch]);

  const claimedTokens = useMemo(() => {
    if (!data || typeof data !== 'bigint') {
      return {
        claimedAmount: BigInt(0),
        formattedAmount: '0'
      };
    }

    return {
      claimedAmount: data,
      formattedAmount: formatUnits(data as bigint, 9)
    };
  }, [data]);

  return {
    ...claimedTokens,
    isLoading,
    error: error as Error | null,
    refetch
  };
};

export default useClaimedTokens;