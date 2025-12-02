import React from 'react'
import "./ShopByCategory.css"

const ShopByCategoryCard = () => {
  return (
    <div className="flex gap-3 flex-col justify-center items-center group cursor-pointer
                    w-[120px] sm:w-[150px] md:w-[180px] lg:w-[240px]">
      
      <div className="custom-border 
                      w-[100px] h-[100px]
                      sm:w-[130px] sm:h-[130px]
                      md:w-[170px] md:h-[170px]
                      lg:w-[240px] lg:h-[249px]
                      ">
        <img
          className=" group-hover:scale-95 transition-transform transform-duration-700 
                     object-cover object-top h-full w-full"
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/bangle-bracelet-armlet/g/g/q/free-2-7-na-5-wb023-2025-2025-027-vembley-original-imahe4sk9bmqmcfv.jpeg?q=70"
          alt="Home Decor"
        />
      </div>

      <h1 className="text-sm sm:text-base md:text-lg font-medium">Home Decor</h1>
    </div>
  )
}

export default ShopByCategoryCard
