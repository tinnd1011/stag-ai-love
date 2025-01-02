import crypto from "@/images/crypto.svg";
import coin from "@/images/deploy/coin.svg";
// import { uploadToken } from "@/services/dapp";
import { triggerToast } from "@/utils/trigger-toast";
import Image from "next/image";
import { useEffect, useState } from "react";
import HeadComponent from "../scan-dapps/common/head";
import CustomSlider from "./custom-slider";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { ABI } from "./abi";
import { isAddress } from "viem";
// import { readContract } from "@wagmi/core";
// import { wagmiAdapter } from "@/config/wagmi-config";

const DeployApp = () => {
  const { isDisconnected } = useAccount();

  const {
    writeContract,
    isPending,
    data: txHash,
    error: writeError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    const deployError: any = writeError?.cause;
    if (deployError) {
      if (deployError?.cause?.code == 4001)
        triggerToast("error", "Transaction rejected");
      else triggerToast("error", "Failed to deploy token");
    }
  }, [writeError]);

  const TOKEN_CONTRACT_ADDRESS = "0x464caD574fB4dc0BA72e01f99e59A5f09F3B15Cc"; // Add your contract address here

  const [formData, setFormData] = useState({
    network: "Ethereum Mainnet",
    tokenName: "",
    tokenSymbol: "",
    totalSupply: "1000",
    marketingWallet: "",
    devWallet: "",
    marketingBuyFee: "",
    devBuyFee: "",
    lpBuyFee: "",
    buyFee: "0",
    marketingSellFee: "",
    devSellFee: "",
    lpSellFee: "",
    sellFee: "0",
    totalFee: "0",
    maxTransactionAmount: 50,
    maxWalletAmount: 50,
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputSliderChange = (e: {
    target: { name: any; value: any };
  }) => {
    const { name, value } = e.target;

    if (value === "") {
      setFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }

    // Only allow integers
    if (!/^\d*$/.test(value)) {
      return;
    }

    let numValue = parseInt(value);
    if (!isNaN(numValue)) {
      numValue = Math.min(100, Math.max(0, numValue));
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    }
  };

  // const getDeployFee = async () => {
  //   const data = await readContract(wagmiAdapter.wagmiConfig, {
  //     address: TOKEN_CONTRACT_ADDRESS as `0x${string}`,
  //     abi: ABI,
  //     functionName: "deployFee",
  //   });
  //   return data;
  // };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData);

    if (!writeContract) return;

    // const deployFee = await getDeployFee();

    const tokenInfo = {
      name: formData.tokenName,
      symbol: formData.tokenSymbol,
      marketingFeeReceiver: formData.marketingWallet,
      devFeeReceiver: formData.devWallet,
      marketingTaxBuy: BigInt(formData.marketingBuyFee),
      marketingTaxSell: BigInt(formData.marketingSellFee),
      devTaxSell: BigInt(formData.devSellFee),
      devTaxBuy: BigInt(formData.devBuyFee),
      lpTaxBuy: BigInt(formData.lpBuyFee),
      lpTaxSell: BigInt(formData.lpSellFee),
      totalSupply: BigInt(formData.totalSupply),
      maxPercentageForWallet: BigInt(formData.maxWalletAmount),
      maxPercentageForTx: BigInt(formData.maxTransactionAmount),
      swapRouter: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // UniswapV2 Router
      newOwner: formData.marketingWallet, // Using marketing wallet as owner
    };

    try {
      const tx = writeContract({
        address: TOKEN_CONTRACT_ADDRESS as `0x${string}`,
        abi: ABI,
        functionName: "deployToken",
        args: [tokenInfo],
      });

      triggerToast("update", "Token deployment initiated");
    } catch (error) {
      console.error("Error:", error);
      triggerToast("error", "Failed to deploy token");
    }
  };

  const contract = [
    {
      title: "Network",
      value: formData.network,
    },
    {
      title: "Router",
      value: "Uniswap V2",
    },
    {
      title: "Token Name",
      value: formData.tokenName,
    },
    {
      title: "Symbol",
      value: formData.tokenSymbol,
    },
    {
      title: "Total Supply",
      value: formData.totalSupply,
    },
    {
      title: "Marketing Wallet",
      value: formData.marketingWallet,
    },
    {
      title: "Dev Wallet",
      value: formData.devWallet,
    },
    {
      title: "Marketing Buy Fee",
      value: formData.marketingBuyFee,
    },
    {
      title: "Dev Buy Fee",
      value: formData.devBuyFee,
    },
    {
      title: "LP Buy Fee",
      value: formData.lpBuyFee,
    },
    {
      title: "Buy Fee",
      value: formData.buyFee,
    },
    {
      title: "Marketing Sell Fee",
      value: formData.marketingSellFee,
    },
    {
      title: "Dev Sell Fee",
      value: formData.devSellFee,
    },
    {
      title: "LP Sell Fee",
      value: formData.lpSellFee,
    },
    {
      title: "Sell Fee",
      value: formData.sellFee,
    },
    {
      title: "Total Fee",
      value: formData.totalFee,
    },
    {
      title: "Max Transaction Amount",
      value: formData.maxTransactionAmount,
    },
    {
      title: "Max Wallet Amount",
      value: formData.maxWalletAmount,
    },
  ];

  const validateForm = () => {
    if (
      formData.tokenName &&
      formData.tokenSymbol &&
      formData.totalSupply &&
      formData.marketingWallet &&
      formData.devWallet &&
      formData.marketingBuyFee &&
      formData.devBuyFee &&
      formData.lpBuyFee &&
      formData.marketingSellFee &&
      formData.devSellFee &&
      formData.lpSellFee &&
      formData.totalFee &&
      formData.maxTransactionAmount &&
      formData.maxWalletAmount &&
      isAddress(formData.marketingWallet) &&
      isAddress(formData.devWallet)
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex flex-col md:gap-8 gap-4 pb-20">
      <HeadComponent icon={crypto} title="Deploy ERC20 Token on ETH Network" />
      <div className="flex items-center gap-4 md:px-20 px-4">
        <Image src={coin} alt="coin" width={32} height={32} />
        <h1 className="text-[#1B1B1B] md:text-[32px] text-lg font-semibold">
          Create Token
        </h1>
      </div>
      <div className="w-full flex mx-auto md:flex-row flex-col gap-8 py-6 md:px-10 px-4">
        <form onSubmit={handleSubmit} className="space-y-8 md:min-w-[696px]">
          {/* Network Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1B1B1B]">
              Network
            </label>
            <div className="relative">
              <select
                className="w-full p-3 bg-white border border-gray-200 rounded-2xl appearance-none cursor-pointer pr-10 pl-10 text-gray-900"
                defaultValue="Ethereum Mainnet"
              >
                <option value="Ethereum Mainnet" className="flex items-center">
                  Ethereum Mainnet
                </option>
              </select>
              {/* Globe Icon */}
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 21C7.0293 21 3 16.9707 3 12C3 7.0293 7.0293 3 12 3C16.9707 3 21 7.0293 21 12C21 16.9707 16.9707 21 12 21ZM9.939 18.9003C9.05107 17.0169 8.53668 14.9792 8.4243 12.9H4.8558C5.03093 14.285 5.60453 15.5893 6.50691 16.6545C7.40929 17.7197 8.60161 18.4999 9.939 18.9003ZM10.227 12.9C10.3629 15.0951 10.9902 17.157 12 18.9768C13.0371 17.1089 13.6429 15.0325 13.773 12.9H10.227ZM19.1442 12.9H15.5757C15.4633 14.9792 14.9489 17.0169 14.061 18.9003C15.3984 18.4999 16.5907 17.7197 17.4931 16.6545C18.3955 15.5893 18.9691 14.285 19.1442 12.9ZM4.8558 11.1H8.4243C8.53668 9.02081 9.05107 6.98312 9.939 5.0997C8.60161 5.50009 7.40929 6.28028 6.50691 7.34547C5.60453 8.41065 5.03093 9.71499 4.8558 11.1ZM10.2279 11.1H13.7721C13.6423 8.96754 13.0368 6.89118 12 5.0232C10.9629 6.8911 10.3571 8.96747 10.227 11.1H10.2279ZM14.061 5.0997C14.9489 6.98312 15.4633 9.02081 15.5757 11.1H19.1442C18.9691 9.71499 18.3955 8.41065 17.4931 7.34547C16.5907 6.28028 15.3984 5.50009 14.061 5.0997Z"
                    fill="#1B1B1B"
                  />
                </svg>
              </div>
              {/* Chevron Icon */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Token Information */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#FF306E] text-sm font-semibold">
              Token Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-[#1B1B1B] font-medium mb-1">
                  Name<span className="text-[#FB3748]">*</span>
                </label>
                <input
                  type="text"
                  name="tokenName"
                  className="w-full p-4 border rounded-xl border-[#EAEAEA] bg-white shadow-[0px_1px_3px_-1px_rgba(103,111,128,0.06)]"
                  placeholder="Token name"
                  value={formData.tokenName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-[#1B1B1B] font-medium mb-1">
                  Symbol<span className="text-[#FB3748]">*</span>
                </label>
                <input
                  type="text"
                  name="tokenSymbol"
                  className="w-full p-4 border rounded-xl border-[#EAEAEA] shadow-[0px_1px_3px_-1px_rgba(103,111,128,0.06)] bg-white"
                  placeholder="Token Symbol (BNB)"
                  value={formData.tokenSymbol}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-[#1B1B1B] font-medium mb-1">
                  Total Supply<span className="text-[#FB3748]">*</span>
                </label>
                <input
                  type="text"
                  name="totalSupply"
                  className="w-full p-4 border rounded-xl border-[#EAEAEA] shadow-[0px_1px_3px_-1px_rgba(103,111,128,0.06)] bg-white"
                  placeholder="Min 1000"
                  value={formData.totalSupply}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Wallet Information */}
          <div className="space-y-4">
            <h3 className="text-[#FF306E] text-sm font-semibold">
              Wallet Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#1B1B1B] font-medium mb-1">
                  Marketing Wallet<span className="text-[#FB3748]">*</span>
                </label>
                <input
                  type="text"
                  name="marketingWallet"
                  className="w-full p-4 border rounded-xl border-[#EAEAEA] shadow-[0px_1px_3px_-1px_rgba(103,111,128,0.06)] bg-white"
                  placeholder="0x..."
                  value={formData.marketingWallet}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-[#1B1B1B] font-medium mb-1">
                  Dev Wallet<span className="text-[#FB3748]">*</span>
                </label>
                <input
                  type="text"
                  name="devWallet"
                  className="w-full p-4 border rounded-xl border-[#EAEAEA] shadow-[0px_1px_3px_-1px_rgba(103,111,128,0.06)] bg-white"
                  placeholder="0x..."
                  value={formData.devWallet}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Tax Configs */}
          <div className="space-y-4">
            <h3 className="text-[#FF306E] text-sm font-semibold">
              Wallet Information
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-[#1B1B1B] font-medium mb-1">
                    Marketing Buy Fee<span className="text-[#FB3748]">*</span>
                  </label>
                  <input
                    type="text"
                    name="marketingBuyFee"
                    className="w-full p-4 border rounded-xl border-[#EAEAEA] shadow-[0px_1px_3px_-1px_rgba(103,111,128,0.06)] bg-white"
                    placeholder="0-15%"
                    value={formData.marketingBuyFee}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#1B1B1B] font-medium mb-1">
                    Dev Buy Fee<span className="text-[#FB3748]">*</span>
                  </label>
                  <input
                    type="text"
                    name="devBuyFee"
                    className="w-full p-4 border rounded-xl border-[#EAEAEA] shadow-[0px_1px_3px_-1px_rgba(103,111,128,0.06)] bg-white"
                    placeholder="0-15%"
                    value={formData.devBuyFee}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#1B1B1B] font-medium mb-1">
                    LP Buy Fee<span className="text-[#FB3748]">*</span>
                  </label>
                  <input
                    type="text"
                    name="lpBuyFee"
                    className="w-full p-4 border rounded-xl border-[#EAEAEA] shadow-[0px_1px_3px_-1px_rgba(103,111,128,0.06)] bg-white"
                    placeholder="0-15%"
                    value={formData.lpBuyFee}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#1B1B1B] font-medium mb-1">
                    Buy Fee
                  </label>
                  <input
                    type="text"
                    name="buyFee"
                    className="w-full p-4 border rounded-xl border-[#EAEAEA] shadow-[0px_1px_3px_-1px_rgba(103,111,128,0.06)] bg-white"
                    value={formData.buyFee}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-[#1B1B1B] font-medium mb-1">
                    Marketing Sell Fee<span className="text-[#FB3748]">*</span>
                  </label>
                  <input
                    type="text"
                    name="marketingSellFee"
                    className="w-full p-4 border rounded-xl border-[#EAEAEA] shadow-[0px_1px_3px_-1px_rgba(103,111,128,0.06)] bg-white"
                    placeholder="0-15%"
                    value={formData.marketingSellFee}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#1B1B1B] font-medium mb-1">
                    Dev Sell Fee<span className="text-[#FB3748]">*</span>
                  </label>
                  <input
                    type="text"
                    name="devSellFee"
                    className="w-full p-4 border rounded-xl border-[#EAEAEA] shadow-[0px_1px_3px_-1px_rgba(103,111,128,0.06)] bg-white"
                    placeholder="0-15%"
                    value={formData.devSellFee}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#1B1B1B] font-medium mb-1">
                    LP Sell Fee<span className="text-[#FB3748]">*</span>
                  </label>
                  <input
                    type="text"
                    name="lpSellFee"
                    className="w-full p-4 border rounded-xl border-[#EAEAEA] shadow-[0px_1px_3px_-1px_rgba(103,111,128,0.06)] bg-white"
                    placeholder="0-15%"
                    value={formData.lpSellFee}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#1B1B1B] font-medium mb-1">
                    Sell Fee
                  </label>
                  <input
                    type="text"
                    name="sellFee"
                    className="w-full p-4 border rounded-xl border-[#EAEAEA] shadow-[0px_1px_3px_-1px_rgba(103,111,128,0.06)] bg-white "
                    value={formData.sellFee}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#1B1B1B] font-medium mb-1">
                  Total Fee
                </label>
                <input
                  type="text"
                  name="totalFee"
                  className="w-full p-4 border rounded-xl border-[#EAEAEA] shadow-[0px_1px_3px_-1px_rgba(103,111,128,0.06)] bg-white "
                  value={formData.totalFee}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-gray-500 mt-1">
                  *Buy Fee + Sell Fee amount must be between 0 - 30
                </p>
              </div>
            </div>
          </div>

          {/* Token Configs */}
          <div className="space-y-4">
            <h3 className="text-[#FF306E] text-sm font-semibold">
              Token Configs
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#1B1B1B] font-medium mb-1">
                  Max Transaction Amount
                  <span className="text-[#FB3748]">*</span>
                </label>
                <div className="flex items-center w-full gap-4">
                  <CustomSlider
                    value={formData.maxTransactionAmount}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        maxTransactionAmount: Math.round(value),
                      }))
                    }
                  />
                  <input
                    type="text"
                    name="maxTransactionAmount"
                    value={formData.maxTransactionAmount}
                    onChange={handleInputSliderChange}
                    className="p-4 shadow-[0px_1px_3px_-1px_rgba(103,111,128,0.06)] max-w-[70px] bg-[#FAFAFA] border border-[#D8D8D8] rounded-2xl"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#1B1B1B] font-medium mb-1">
                Max Wallet Amount<span className="text-[#FB3748]">*</span>
              </label>
              <div className="flex items-center w-full gap-4">
                <CustomSlider
                  value={formData.maxWalletAmount}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, maxWalletAmount: value }))
                  }
                />
                <input
                  type="text"
                  name="maxWalletAmount"
                  value={formData.maxWalletAmount}
                  onChange={handleInputSliderChange}
                  className="p-4 shadow-[0px_1px_3px_-1px_rgba(103,111,128,0.06)] max-w-[70px] bg-[#FAFAFA] border border-[#D8D8D8] rounded-2xl"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Contract Summary */}
        <section className="bg-[#FFF] rounded-2xl py-6 px-4 w-full h-fit flex flex-col gap-10">
          <div>
            <span className="text-[#666666] text-xs">Contract Summary</span>
            <h1 className="text-[#FF306E] text-xl font-semibold">
              Tax Contract
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            {contract.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-[#1B1B1B] flex-1 font-semibold text-sm">
                  {item.title}
                </span>
                <span className="text-[#666666] flex-1 text-sm">
                  {item.value || "--"}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            disabled={
              !validateForm() || isDisconnected || isPending || isConfirming
            }
            className={`
        hover:scale-105 transition-all duration-300 ease-in-out
        bg-[linear-gradient(130deg,#8EC9FF_9%,#FF306E_56%,#F1D789_95%)] p-[2px] w-full rounded-full ${
          !validateForm() || isDisconnected || isPending || isConfirming
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
          >
            <div className="flex items-center justify-center rounded-full px-8 py-1.5 bg-[#1B1B1B] text-white gap-2">
              <span>
                {isPending
                  ? "Confirming..."
                  : isConfirming
                  ? "Deploying..."
                  : isSuccess
                  ? "Deployed!"
                  : "Deploy"}
              </span>
            </div>
          </button>
        </section>
      </div>
    </div>
  );
};

export default DeployApp;
