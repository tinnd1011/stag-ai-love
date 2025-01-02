import useClaimedTokens from "@/hooks/useClaimedToken";
import useClaimRewards from "@/hooks/useClaimReward";
import useTotalStaked from "@/hooks/useTotalStaked";
import useUserRewards from "@/hooks/useUserReward";
import useUserStakes from "@/hooks/useUserStakes";
import eth from "@/images/stake/eth.svg";
import pending from "@/images/stake/pending.svg";
import stack from "@/images/stake/stack.svg";
import { cn } from "@/lib/utils";
import { getStakes } from "@/services/plan";
import { triggerToast } from "@/utils/trigger-toast";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import { useAccount } from "wagmi";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      // <div className="bg-white p-2 rounded shadow-lg border border-gray-200">
      //   <p className="text-sm text-gray-900">{`${payload[0].value.toLocaleString(
      //     undefined,
      //     {
      //       minimumFractionDigits: 0,
      //       maximumFractionDigits: 3,
      //     }
      //   )}`}</p>
      // </div>
      null
    );
  }
  return null;
};

const ClaimSection = () => {
  const { totalRewardsInEth } = useUserStakes();
  const { formattedTotalStaked } = useTotalStaked();
  const { formattedAmount, refetch: refetchClaimToken } = useClaimedTokens();
  const [reward, setReward] = useState<{ timestamp: string; amount: string; }[]>([]);
  const [stake, setStake] = useState<{ timestamp: string; amount: string; }[]>([]);
  const { address } = useAccount();
  const { formattedRewards, claimableRewards, refetch } = useUserRewards();
  const { claimRewards, isLoading } = useClaimRewards({
    onSuccess: () => {
      refetch();
      refetchClaimToken();
      triggerToast("success", "Rewards claimed successfully");
    },
    onError: () => {
      triggerToast("error", "Failed to claim rewards");
    },
  });

  useEffect(() => {
    const getStakeData = async () => {
      const response = await getStakes(String(address));
      if (response.data) {
        setStake(response.data.stake);
        setReward(response.data.reward);
      } else {
        setReward([]);
        setStake([]);
      }
    }
    getStakeData();
  }, [reward, stake, address]);

  const chartStakeData = stake.map((item) => ({
    name: item.timestamp,
    value: Number(item.amount),
  }));

  const chartRewardData = reward.map((item) => ({
    name: item.timestamp,
    value: Number(item.amount),
  }));

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseMove = (data: any) => {
    if (data && data.activeTooltipIndex !== undefined) {
      setActiveIndex(data.activeTooltipIndex);
    } else {
      setActiveIndex(null);
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };


  return (
    <div className="flex md:flex-row flex-col gap-3 md:min-h-[308px] px-10">
      <div className="p-[4px] flex h-full justify-between relative overflow-hidden flex-1 rounded-3xl">
        <motion.div
          className="absolute inset-[-50%] rounded-3xl z-10"
          style={{
            background:
              "linear-gradient(90deg, #FFFFFF 30%, rgba(103, 103, 255, 0.1) 43%, #F06DFF 57%, #F1D789 70%)",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
          }}
        />
        <div
          className={cn(
            "relative z-10 rounded-3xl h-full p-6 bg-[#FAFAFA] flex flex-col md:justify-between gap-4",
            "backdrop-blur-sm bg-opacity-95 flex-1"
          )}
        >
          <div className="flex flex-col gap-3 items-center justify-center h-full">
            <Image src={pending} alt="pending" />
            <span className="text-sm font-medium text-[#666666]">My pending reward</span>
            <h3 className="text-2xl text-[#1B1B1B] font-semibold text-center">{formattedRewards} XETRA</h3>
          </div>
          <button
            disabled={isLoading || Number(claimableRewards) === 0}
            onClick={claimRewards}
            className={`
        hover:scale-105 transition-all duration-300 ease-in-out
        bg-[linear-gradient(130deg,#8EC9FF_9%,#FF306E_56%,#F1D789_95%)] p-[2px] w-full rounded-full ${isLoading || Number(claimableRewards) === 0 ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center justify-center rounded-full px-8 py-1.5 bg-[#1B1B1B] text-white gap-2">
              <span>
                {isLoading ? "Claiming..." : "Claim reward"}
              </span>
            </div>
          </button>
        </div>
      </div>
      <div className="flex-1 bg-white rounded-[20px] p-6 overflow-hidden shadow-[0px_2px_12px_-2px_rgba(189,177,201,0.16)] flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Image src={eth} alt="eth" />
          <div className="flex flex-col gap-2">
            <span className="text-sm text-[#666666] font-medium">My claimed XETRA</span>
            <h1 className="text-xl text-[#1B1B1B] font-semibold">
              {formattedAmount} XETRA
            </h1>
          </div>
        </div>
        <div className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartRewardData}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                stroke="#E5E7EB"
                strokeDasharray="3 3"
                strokeWidth={1}
              />
              <Line
                type="linear"
                dataKey="value"
                stroke="#22C55E"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#22C55E" }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex-1 bg-white rounded-[20px] p-6 overflow-hidden shadow-[0px_2px_12px_-2px_rgba(189,177,201,0.16)] flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Image src={stack} alt="stack" />
          <div className="flex flex-col gap-2">
            <span className="text-sm text-[#666666] font-medium">Total Staked</span>
            <h1 className="text-xl text-[#1B1B1B] font-semibold">{Number(formattedTotalStaked).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 3,
            })} $XETRA</h1>
          </div>
        </div>
        <div className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartStakeData}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                stroke="#E5E7EB"
                strokeDasharray="3 3"
                strokeWidth={1}
              />
              <Line
                type="linear"
                dataKey="value"
                stroke="#22C55E"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#22C55E" }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default ClaimSection