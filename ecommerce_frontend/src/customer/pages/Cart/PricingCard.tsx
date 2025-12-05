// // import { Divider } from '@mui/material';
// // import React from 'react';

// // const PricingCard = ({ cart }: any) => {

// //   if (!cart || !cart.cartItems?.length) {
// //     return (
// //       <div className="p-5 text-center text-gray-500">
// //         No items in your cart.
// //       </div>
// //     );
// //   }

// //   const originalMRP = cart.totalMrpPrice ?? 0;
// //   const sellingPrice = cart.totalSellingPrice ?? 0;

// //   const discountAmount = originalMRP - sellingPrice;

// //   const shipping = sellingPrice > 1500 ? 0 : 100;

// //   const finalSellingPrice = originalMRP + shipping - discountAmount;

// //   return (
// //     <>
// //       <div className="space-y-3 p-5">

// //         <div className="flex justify-between items-center">
// //           <span>Total MRP</span>
// //           <span>{originalMRP.toFixed(2)} Rs</span>
// //         </div>

// //         <div className="flex justify-between items-center">
// //           <span>Discount</span>
// //           <span className="text-green-600">
// //             -{discountAmount.toFixed(2)} Rs
// //           </span>
// //         </div>

// //         {cart.couponCode && (
// //           <div className="text-xs text-green-700">
// //             Coupon Applied: <b>{cart.couponCode}</b>
// //           </div>
// //         )}

// //         <div className="flex justify-between items-center">
// //           <span>Shipping Fee</span>
// //           <span>{shipping === 0 ? "Free" : `${shipping} Rs`}</span>
// //         </div>

// //         <div className="flex justify-between items-center">
// //           <span>Platform Fee</span>
// //           <span className="text-primary-color">Free</span>
// //         </div>

// //       </div>

// //       <Divider />

// //       <div className="flex justify-between items-center p-5 text-primary-color">
// //         <span>Total Payable</span>
// //         <span>{(finalSellingPrice).toFixed(2)} Rs</span>
// //       </div>
// //     </>
// //   );
// // };

// // export default PricingCard;




// import { Divider } from '@mui/material';
// import React from 'react';

// const PricingCard = ({ cart }: any) => {

//   if (!cart || !cart.cartItems?.length) {
//     return (
//       <div className="p-5 text-center text-gray-500">
//         No items in your cart.
//       </div>
//     );
//   }

//   const originalMRP = cart.totalMrpPrice ?? 0;
//   const sellingPrice = cart.totalSellingPrice ?? 0;

//   // 🟢 Base discount (MRP - SellingPriceBeforeCoupon)
//   const baseDiscount = originalMRP - sellingPrice;

//   // 🟢 Coupon discount = backend-adjusted difference
//   const couponDiscount =
//     cart.couponCode ? (cart.originalSellingPrice ?? originalMRP - sellingPrice - baseDiscount) : 0;

//   const shipping = sellingPrice > 1500 ? 0 : 100;

//   const totalPayable = sellingPrice + shipping;

//   return (
//     <>
//       <div className="space-y-3 p-5">

//         {/* MRP */}
//         <div className="flex justify-between items-center">
//           <span>Total MRP</span>
//           <span>{originalMRP.toFixed(2)} Rs</span>
//         </div>

//         {/* Base Discount */}
//         <div className="flex justify-between items-center">
//           <span>Base Discount</span>
//           <span className="text-green-600">
//             -{baseDiscount.toFixed(2)} Rs
//           </span>
//         </div>

//         {/* Coupon Discount */}
//         {cart.couponCode && (
//           <div className="flex justify-between items-center">
//             <span>Coupon Discount ({cart.couponCode})</span>
//             <span className="text-green-600">
//               -{couponDiscount.toFixed(2)} Rs
//             </span>
//           </div>
//         )}

//         {/* Shipping */}
//         <div className="flex justify-between items-center">
//           <span>Shipping Fee</span>
//           <span>{shipping === 0 ? "Free" : `${shipping} Rs`}</span>
//         </div>

//         <div className="flex justify-between items-center">
//           <span>Platform Fee</span>
//           <span className="text-primary-color">Free</span>
//         </div>

//       </div>

//       <Divider />

//       {/* TOTAL */}
//       <div className="flex justify-between items-center p-5 text-primary-color">
//         <span>Total Payable</span>
//         <span>{totalPayable.toFixed(2)} Rs</span>
//       </div>
//     </>
//   );
// };

// export default PricingCard;





















// import { Divider } from '@mui/material';
// import React from 'react';

// const PricingCard = ({ cart }: any) => {

//   if (!cart || !cart.cartItems?.length) {
//     return (
//       <div className="p-5 text-center text-gray-500">
//         No items in your cart.
//       </div>
//     );
//   }

//   const originalMRP = cart.totalMrpPrice ?? 0;
//   const finalSellingPrice = cart.totalSellingPrice ?? 0;

//   // base discount (mrp - selling before coupon)
//   const baseDiscount = cart.baseDiscount ?? (originalMRP - finalSellingPrice + (cart.discount ?? 0));

//   // coupon discount (from backend)
//   const couponDiscount = cart.discount ?? 0;

//   const shipping = finalSellingPrice > 1500 ? 0 : 100;

//   const totalPayable = finalSellingPrice + shipping;

//   return (
//     <>
//       <div className="space-y-3 p-5">

//         <div className="flex justify-between items-center">
//           <span>Total MRP</span>
//           <span>{originalMRP.toFixed(2)} Rs</span>
//         </div>

//         <div className="flex justify-between items-center">
//           <span>Base Discount</span>
//           <span className="text-green-600">
//             -{baseDiscount.toFixed(2)} Rs
//           </span>
//         </div>

//         {cart.couponCode && (
//           <div className="flex justify-between items-center">
//             <span>Coupon Discount ({cart.couponCode})</span>
//             <span className="text-green-600">
//               -{couponDiscount.toFixed(2)} Rs
//             </span>
//           </div>
//         )}

//         <div className="flex justify-between items-center">
//           <span>Shipping Fee</span>
//           <span>{shipping === 0 ? "Free" : `${shipping} Rs`}</span>
//         </div>

//         <div className="flex justify-between items-center">
//           <span>Platform Fee</span>
//           <span className="text-primary-color">Free</span>
//         </div>

//       </div>

//       <Divider />

//       <div className="flex justify-between items-center p-5 text-primary-color">
//         <span>Total Payable</span>
//         <span>{totalPayable.toFixed(2)} Rs</span>
//       </div>
//     </>
//   );
// };

// export default PricingCard;






import { Divider } from '@mui/material';
import React from 'react';

const PricingCard = ({ cart }: any) => {

  if (!cart || !cart.cartItems?.length) {
    return (
      <div className="p-5 text-center text-gray-500">
        No items in your cart.
      </div>
    );
  }

  const originalMRP = cart.totalMrpPrice ?? 0;
  const finalSellingPrice = cart.totalSellingPrice ?? 0;

  // ⭐ Read EXACT discount values from backend (NO recalculation)
  const baseDiscount = cart.baseDiscountAmount ?? 0;
  const couponDiscount = cart.couponDiscountAmount ?? 0;

  const shipping = finalSellingPrice > 1500 ? 0 : 100;

  const totalPayable = finalSellingPrice + shipping;

  return (
    <>
      <div className="space-y-3 p-5">

        <div className="flex justify-between items-center">
          <span>Total MRP</span>
          <span>{originalMRP.toFixed(2)} Rs</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Base Discount</span>
          <span className="text-green-600">
            -{baseDiscount.toFixed(2)} Rs
          </span>
        </div>

        {cart.couponCode && (
          <div className="flex justify-between items-center">
            <span>Coupon Discount ({cart.couponCode})</span>
            <span className="text-green-600">
              -{couponDiscount.toFixed(2)} Rs
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span>Shipping Fee</span>
          <span>{shipping === 0 ? "Free" : `${shipping} Rs`}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Platform Fee</span>
          <span className="text-primary-color">Free</span>
        </div>

      </div>

      <Divider />

      <div className="flex justify-between items-center p-5 text-primary-color">
        <span>Total Payable</span>
        <span>{totalPayable.toFixed(2)} Rs</span>
      </div>
    </>
  );
};

export default PricingCard;
