import token from '@/images/stake/token.svg';
import Image from 'next/image';

const LoadingPopup = () => {
  return (
    <div className='flex flex-col gap-8 py-12 items-center'>
      <div className={`w-[100px] h-[100px] relative`}>
        <Image src={token} alt="Token"
          width={48}
          height={48}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-full h-full animate-spin"
        >
          <path
            d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50ZM8 50C8 73.196 26.804 92 50 92C73.196 92 92 73.196 92 50C92 26.804 73.196 8 50 8C26.804 8 8 26.804 8 50Z"
            fill="#FFECC0"
          />
          <path
            d="M96 50C98.2091 50 100.017 51.7938 99.8401 53.9958C99.1074 63.1369 95.8712 71.9288 90.4509 79.3893C84.2444 87.9316 75.493 94.2899 65.4509 97.5528C55.4087 100.816 44.5913 100.816 34.5491 97.5528C24.507 94.2899 15.7556 87.9316 9.54915 79.3893C3.34275 70.8469 -9.23094e-07 60.559 0 50C9.23094e-07 39.441 3.34275 29.1531 9.54915 20.6107C15.7556 12.0684 24.507 5.71007 34.5492 2.44717C43.3195 -0.402481 52.6811 -0.763387 61.6012 1.36445C63.75 1.87705 64.8975 4.15039 64.2148 6.2514C63.5321 8.35242 61.2777 9.48216 59.1213 9.00238C51.8167 7.37716 44.1842 7.72824 37.0213 10.0556C28.5859 12.7965 21.2347 18.1374 16.0213 25.313C10.8079 32.4886 8 41.1305 8 50C8 58.8695 10.8079 67.5114 16.0213 74.687C21.2347 81.8626 28.5859 87.2035 37.0213 89.9444C45.4567 92.6852 54.5433 92.6852 62.9787 89.9444C71.4141 87.2035 78.7653 81.8626 83.9787 74.687C88.4057 68.5938 91.0981 61.4434 91.8097 53.9941C92.0198 51.795 93.7909 50 96 50Z"
            fill="#F6B51E"
          />
        </svg>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-[#1B1B1B] text-2xl font-semibold">Staking $XETRA</h1>
        <span className="text-sm text-[#666666] text-center">Lock tokens, support the network, and let AI dApps earn you passive income effortlessly!</span>
      </div>
    </div>
  )
}

export default LoadingPopup