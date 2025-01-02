import { Button, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { WalletName } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import { IoCloseCircleSharp } from "react-icons/io5";
export default function ModalConnectWallet({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (value: boolean) => void}) {

    const { wallets, select } = useWallet()

    const handleConnectWallet = (walletName: WalletName) => {
        select(walletName);
        close();
    }

    function close() {
        setIsOpen(false)
    }
    
    return (
        <>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50"></div>
                </Transition.Child>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full relative max-w-md rounded-xl bg-black p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <h2 className='text-[#8CE339] text-lg text-center'>Select wallet</h2>
                            <IoCloseCircleSharp onClick={close} color='#fff' className='absolute top-4 right-4 cursor-pointer' size={30}/>
                            <section className='py-10'>
                                {
                                    wallets.filter(wallet => wallet.readyState === 'Installed').length > 0 ? wallets.filter(wallet => wallet.readyState === 'Installed').map(wallet => {
                                        return <button onClick={() => { handleConnectWallet(wallet.adapter.name) }}
                                            key={wallet.adapter.name} className='flex mb-2 cursor-pointer w-full py-3 px-4 items-center gap-x-2 rounded-lg bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.08)]  border-[2px]'>
                                            <Image src={wallet.adapter.icon} alt={wallet.adapter.name} loader={() => wallet.adapter.icon} width={32} height={32} />
                                            <span className='text-white'>{wallet.adapter.name}</span>
                                        </button>
                                    }) : <span className='text-white text-base text-center block'>No wallet is detected</span>
                                }
                            </section>
                            
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
