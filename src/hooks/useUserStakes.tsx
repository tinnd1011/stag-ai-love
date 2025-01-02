import abi from '@/abi/contract_abi.json';
import { CONTRACTS } from '@/constants/contracts';
import { useMemo } from 'react';
import { Address, formatUnits } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

interface StakingDetails {
  totalStaked: number;
  totalRewardsInEth: number;
  timeElapsedPerStake: bigint[];
  isLoading: boolean;
  error: Error | null;
}

// Define the type for the data returned by the contract
type UserStakingResult = [bigint, bigint, bigint[]];

const useUserStakes = (): StakingDetails => {
  const { address } = useAccount();

  const { data, isLoading, error } = useReadContract({
    address: CONTRACTS.MockAddress as Address,
    abi: abi,
    functionName: 'getUserStakingDetails',
    args: [address as Address],
  }) as {
    data: UserStakingResult | undefined;
    isLoading: boolean;
    error: Error | null
  };

  const stakingDetails = useMemo(() => {
    if (!data) {
      return {
        totalStaked: 0,
        totalRewardsInEth: 0,
        timeElapsedPerStake: [],
      };
    }

    const [totalStaked, totalRewardsInEth, timeElapsedPerStake] = data;

    return {
      totalStaked: Number(formatUnits(totalStaked, 18)),
      totalRewardsInEth: Number(formatUnits(totalRewardsInEth, 18)), // Added formatting for rewards
      timeElapsedPerStake,
    };
  }, [data]);

  return {
    ...stakingDetails,
    isLoading,
    error: error as Error | null,
  };
};

export default useUserStakes;