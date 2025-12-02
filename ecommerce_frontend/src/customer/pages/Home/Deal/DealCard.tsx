import React from 'react'

const DealCard = () => {
  return (
    <div className="px-2 cursor-pointer">
      <div className="rounded-md overflow-hidden bg-white shadow-sm">
        <img
          className="w-full h-40 object-cover object-top border-b-4 border-pink-600"
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/bangle-bracelet-armlet/g/g/q/free-2-7-na-5-wb023-2025-2025-027-vembley-original-imahe4sk9bmqmcfv.jpeg?q=70"
          alt="Deal Item"
        />

        <div className="bg-black text-white p-3 text-center space-y-1">
          <p className="text-base font-semibold">Smart Watch</p>
          <p className="text-xl font-bold">20% OFF</p>
          <p className="text-sm">Shop Now</p>
        </div>
      </div>
    </div>
  )
}

export default DealCard
