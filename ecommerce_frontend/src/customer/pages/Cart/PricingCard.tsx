// import { Divider } from '@mui/material'
// import React from 'react'

// const PricingCard = ({ cart }: any) => {
//   return (
//     <>
//       <div className='space-y-3 p-5'>
        
//         <div className='flex justify-between items-center'>
//           <span>Total MRP</span>
//           <span>{cart?.totalMrpPrice} Rs</span>
//         </div>

//         <div className='flex justify-between items-center'>
//           <span>Discount</span>
//           <span className='text-green-600'>
//             {cart?.discount}%  
//           </span>
//         </div>

//         <div className='flex justify-between items-center'>
//           <span>Shipping Fee</span>
//           <span>{cart?.totalSellingPrice > 1500 ? "Free" : "100 Rs"}</span>
//         </div>

//         <div className='flex justify-between items-center'>
//           <span>Platform Fee</span>
//           <span className='text-primary-color'>Free</span>
//         </div>

//       </div>

//       <Divider />

//       <div className='flex justify-between items-center p-5 text-primary-color'>
//         <span>Total Payable</span>
//         <span>
//           {cart?.totalSellingPrice + (cart?.totalSellingPrice > 1500 ? 0 : 100)} Rs
//         </span>
//       </div>
//     </>
//   )
// }

// export default PricingCard


import { Divider } from '@mui/material'
import React from 'react'

const PricingCard = ({ cart }: any) => {

  // ⭐ If cart is empty, show simple UI
  if (!cart || cart.cartItems?.length === 0) {
    return (
      <div className="p-5 text-center text-gray-500">
        No items in your cart.
      </div>
    );
  }

  return (
    <>
      <div className='space-y-3 p-5'>
        <div className='flex justify-between items-center'>
          <span>Total MRP</span>
          <span>{cart?.totalSellingPrice} Rs</span>
        </div>

        <div className='flex justify-between items-center'>
          <span>Discount</span>
          <span className='text-green-600'>
            {cart?.discount}%  
          </span>
        </div>

        <div className='flex justify-between items-center'>
          <span>Shipping Fee</span>
          <span>{cart?.totalSellingPrice > 1500 ? "Free" : "100 Rs"}</span>
        </div>

        <div className='flex justify-between items-center'>
          <span>Platform Fee</span>
          <span className='text-primary-color'>Free</span>
        </div>
      </div>

      <Divider />

      <div className='flex justify-between items-center p-5 text-primary-color'>
        <span>Total Payable</span>
        <span>
          {cart?.totalSellingPrice + (cart?.totalSellingPrice > 1500 ? 0 : 100)} Rs
        </span>
      </div>
    </>
  )
}

export default PricingCard
