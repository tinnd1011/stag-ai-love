import { useEffect, useState } from "react";
import { Address, formatUnits } from "viem";
import { useReadContract } from "wagmi";
import { CONTRACTS } from "@/constants/contracts";
import abi from "@/abi/contract_abi.json";

interface TotalStakedData {
  totalStaked: bigint;
  formattedTotalStaked: string;
  isLoading: boolean;
  error: Error | null;
}

export function useTotalStaked(): TotalStakedData {
  const [totalStakedData, setTotalStakedData] = useState<TotalStakedData>({
    totalStaked: BigInt(0),
    formattedTotalStaked: '0',
    isLoading: true,
    error: null,
  });

  const { data, isLoading, error } = useReadContract({
    address: CONTRACTS.MockAddress as Address,
    abi,
    functionName: "totalStaked",
  });

  useEffect(() => {
    if (data !== undefined && data !== null && (typeof data === 'string' || typeof data === 'number' || typeof data === 'bigint')) {
      setTotalStakedData({
        totalStaked: BigInt(data),
        formattedTotalStaked: formatUnits(BigInt(data), 9),
        isLoading: false,
        error: null,
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setTotalStakedData(prev => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
    }
  }, [error]);

  return totalStakedData;
}

export default useTotalStaked;