import abi from "@/abi/contract_abi.json";
import erc20Abi from "@/abi/erc20_abi.json";
import { CONTRACTS } from "@/constants/contracts";
import { useCallback, useEffect, useState } from "react";
import { Address, parseUnits } from "viem";
import { useTransactionReceipt, useWriteContract } from "wagmi";

interface UseStakeProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface StakeStatus {
  isLoading: boolean;
  isSuccess: boolean;
  error: Error | null;
  txHash: string | null;
}

export function useStake({ onSuccess, onError }: UseStakeProps) {
  const [status, setStatus] = useState<StakeStatus>({
    isLoading: false,
    isSuccess: false,
    error: null,
    txHash: null,
  });

  // Write contract hook for staking
  const { writeContractAsync } = useWriteContract();

  const { data } = useTransactionReceipt({
    hash: status?.txHash as `0x${string}`,
  });

  useEffect(() => {
    if (data?.status === "success") {
      onSuccess?.();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Function to stake tokens
  const stake = useCallback(
    async (amount: string) => {
      try {
        setStatus({
          isLoading: true,
          isSuccess: false,
          error: null,
          txHash: null,
        });

        const totalCostIn = parseUnits(amount.toString(), 18);

        const approvalTx = await writeContractAsync({
          abi: erc20Abi,
          address: CONTRACTS.MockToken as Address,
          functionName: "approve",
          args: [CONTRACTS.MockAddress as Address, totalCostIn],
        });
        console.log("approvalTx", approvalTx);
        //delay 2s
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Then execute the buyPackage transaction with the package amount

        // Execute the staking transaction
        const stakeTx = await writeContractAsync({
          address: CONTRACTS.MockAddress as Address,
          abi,
          functionName: "stake",
          args: [totalCostIn],
        });

        setStatus((prev) => ({
          ...prev,
          isLoading: false,
          txHash: stakeTx,
        }));
      } catch (error) {
        setStatus((prev) => ({
          ...prev,
          isLoading: false,
          error: error as Error,
        }));
        onError?.(error as Error);
      }
    },
    [writeContractAsync, onError]
  );

  // Reset status
  const reset = useCallback(() => {
    setStatus({
      isLoading: false,
      isSuccess: false,
      error: null,
      txHash: null,
    });
  }, []);

  return {
    stake,
    reset,
    ...status,
  };
}