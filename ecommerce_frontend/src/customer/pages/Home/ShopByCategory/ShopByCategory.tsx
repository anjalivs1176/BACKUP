import React from 'react'
import ShopByCategoryCard from './ShopByCategoryCard'

const ShopByCategory = () => {
  return (
    <div className="flex flex-wrap justify-center lg:justify-between gap-5 sm:gap-7 px-4 lg:px-20">
      {[1,1,1,1,1,1,1,1,1,1,1,1].map((item, index) => (
        <ShopByCategoryCard key={index} />
      ))}
    </div>
  )
}

export default ShopByCategory
