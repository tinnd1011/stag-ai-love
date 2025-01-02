import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";
import { useTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACTS } from "@/constants/contracts";
import abi from "@/abi/contract_abi.json";

interface UseClaimRewardsProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface ClaimStatus {
  isLoading: boolean;
  isSuccess: boolean;
  error: Error | null;
  txHash: string | null;
}

export function useClaimRewards({ onSuccess, onError }: UseClaimRewardsProps) {
  const [status, setStatus] = useState<ClaimStatus>({
    isLoading: false,
    isSuccess: false,
    error: null,
    txHash: null,
  });

  const { writeContractAsync } = useWriteContract();

  const { data } = useTransactionReceipt({
    hash: status?.txHash as `0x${string}`,
  });

  useEffect(() => {
    if (data?.status === "success") {
      setStatus(prev => ({
        ...prev,
        isLoading: false,
        isSuccess: true
      }));
      onSuccess?.();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const claimRewards = useCallback(async () => {
    try {
      setStatus({
        isLoading: true,
        isSuccess: false,
        error: null,
        txHash: null,
      });

      const claimTx = await writeContractAsync({
        address: CONTRACTS.MockAddress as Address,
        abi,
        functionName: "claimRewards",
      });

      setStatus((prev) => ({
        ...prev,
        txHash: claimTx,
      }));
    } catch (error) {
      setStatus((prev) => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
      onError?.(error as Error);
    }
  }, [writeContractAsync, onError]);

  const reset = useCallback(() => {
    setStatus({
      isLoading: false,
      isSuccess: false,
      error: null,
      txHash: null,
    });
  }, []);

  return {
    claimRewards,
    reset,
    ...status,
  };
}

export default useClaimRewards;