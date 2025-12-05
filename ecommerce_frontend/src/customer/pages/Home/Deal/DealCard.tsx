import React from 'react'

const DealCard = ({ deal }: any) => {
  return (
    <div className="px-2 cursor-pointer">
      <div className="rounded-md overflow-hidden bg-white shadow-sm">
        <img
          className="w-full h-40 object-cover border-b-4 border-pink-600"
          src={deal.image}
          alt={deal.title}
        />

        <div className="bg-black text-white p-3 text-center space-y-1">
          <p className="text-base font-semibold">{deal.title}</p>
          <p className="text-xl font-bold">{deal.discount}% OFF</p>
          <p className="text-sm">Shop Now</p>
        </div>
      </div>
    </div>
  );
};


export default DealCard
