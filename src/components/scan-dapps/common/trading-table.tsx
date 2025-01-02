import { TradingData } from '@/types';
import React from 'react'

import { shortAddress } from '@/utils/address';
import { useRouter } from 'next/navigation';
interface TableHeader {
  id: string;
  label: string;
}


interface ITradingTable {
  data: any[]
}
const TradingTable = ({ data }: ITradingTable) => {

  const tableHeaders: TableHeader[] = [
    { id: 'buys', label: 'Buys' },
    { id: 'sells', label: 'Sells' },
    { id: 'roi', label: 'ROI(%)' },
    { id: 'winrate', label: 'Winrate(%)' },
    { id: 'tradersProfit', label: "Trader's Profit" },
    { id: 'solscan', label: "solScan" },
    { id: 'numTrades', label: '# of Trades' },
    { id: 'tradingDays', label: 'Trading Days' },
    { id: 'firstTrade', label: 'First Trade' },
    { id: 'lastTrade', label: 'Last Trade' },
    { id: 'link', label: 'Solscan link' }
  ];


  const generateWithCell = (id: string) => {
    if (id === 'winrate' || id === 'tradersProfit' || id === 'solscan' || id === 'firstTrade' || id === 'lastTrade' || id === 'link') return 'w-[132px]';
    return 'w-[100px]';
  }


  const handleRow = (row: any, key: string) => {
    if (key !== 'solscanLink') return;
    window.open(`https://solscan.io/account/${row[key]}`, '_blank');
  }
  console.log('data', data)

  return (
    <main className='px-4 lg:mx-10 '>
      <main className='border border-[#D8D8D8] rounded-2xl h-[800px] lg:h-full w-full overflow-y-auto'>
        <section className='h-[56px] bg-[#F5F5F7] flex items-center justify-between overflow-x-auto w-[1256px] lg:w-full'>
          {tableHeaders.map((item, index) => {
            return <div key={index} className={`${generateWithCell(item.id)} pr-3 text-center text-sm`}>
              {item.label}
            </div>
          })}
        </section>
        <section className='flex flex-col bg-[#fff] overflow-x-auto w-[1256px] lg:w-full'>
          {data.map((row, index) => {
            return <div key={index} className='h-[56px] bg-[#fff] flex items-center justify-between cursor-pointer hover:bg-[#FAFAFA]'>
              {Object.keys(row).map((key, index) => {
                return <div onClick={() => handleRow(row, key)} key={index} className={`${generateWithCell(key)} pr-3 text-center text-sm ${key === 'solscan' && 'text-[#335CFF] underline'}`}>
                  {key === 'solscanLink' ? shortAddress(row[key]) : row[key]}
                </div>
              })}
            </div>
          })}
        </section>
      </main>
    </main>
    
  )
}

export default TradingTable