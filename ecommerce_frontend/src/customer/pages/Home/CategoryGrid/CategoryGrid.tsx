// import React from 'react'

// const CategoryGrid = () => {
//   return (
//     <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20'>
//         <div className='col-span-3 row-span-12 text-white '>
//             <img
//             className='w-full h-full object-cover object-top rounded-md'
//             src="https://rukminim2.flixcart.com/image/612/612/xif0q/lehenga-choli/j/u/w/free-3-4-sleeve-lengha-01-pedr-trends-original-imahedaczfgydnen.jpeg?q=70" alt="" />
//         </div>
//          <div className='col-span-2 row-span-6 text-white '>
//             <img 
//             className='w-full h-full object-cover object-top rounded-md'
//             src="https://rukminim2.flixcart.com/image/612/612/xif0q/sandal/r/d/l/3-3225-white-36-myshtezia-white-original-imah9ttqdxzrudyz.jpeg?q=70" alt="" />
//         </div>
//         <div className='col-span-4 row-span-6 text-white '>
//             <img 
//             className='w-full h-full object-cover object-top rounded-md'
//             src="https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/z/f/k/s-oxflining13062024-mildin-original-imahahxnggwuyhbz.jpeg?q=70" alt="" />
//         </div>
//         <div className='col-span-3 row-span-12 text-white '>
//             <img 
//             className='w-full h-full object-cover object-top rounded-md'
//             src="https://rukminim2.flixcart.com/image/612/612/xif0q/sari/b/9/b/free-oti-and-613-red-pikham-unstitched-original-imahfxc8jrnyzp7j.jpeg?q=70" alt="" />
//         </div>
//          <div className='col-span-4 row-span-6 text-white '>
//             <img 
//             className='w-full h-full object-cover object-top rounded-md'
//             src="https://rukminim2.flixcart.com/image/612/612/xif0q/jewellery-set/b/p/g/-original-imahfss2mmmrcwn8.jpeg?q=70" alt="" />
//         </div>
//         <div className='col-span-2 row-span-6 text-white '>
//             <img 
//             className='w-full h-full object-cover object-top rounded-md'
//             src="https://rukminim2.flixcart.com/image/612/612/xif0q/dress/c/3/i/m-11621-sheetal-associates-original-imahhm4s2hgyr4pf.jpeg?q=70" alt="" />
//         </div>
//     </div>
//   )
// }

// export default 





import React, { useEffect, useState } from "react";
import { adminApi } from "../../../../admin/services/adminApi";

const CategoryGrid = () => {
 const [items, setItems] = useState<any[]>([]);

useEffect(() => {
  fetchHomeCategories();
}, []);

const fetchHomeCategories = async () => {
  try {
    const res = await adminApi.getHomeCategories();
    setItems(res.data.slice(0, 6)); 
  } catch (err) {
    console.log(err);
  }
};


  return (
    <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">

      {items[0] && (
        <div className="col-span-3 row-span-12">
          <img className="w-full h-full object-cover rounded-md" src={items[0].image} alt="" />
        </div>
      )}

      {items[1] && (
        <div className="col-span-2 row-span-6">
          <img className="w-full h-full object-cover rounded-md" src={items[1].image} alt="" />
        </div>
      )}

      {items[2] && (
        <div className="col-span-4 row-span-6">
          <img className="w-full h-full object-cover rounded-md" src={items[2].image} alt="" />
        </div>
      )}

      {items[3] && (
        <div className="col-span-3 row-span-12">
          <img className="w-full h-full object-cover rounded-md" src={items[3].image} alt="" />
        </div>
      )}

      {items[4] && (
        <div className="col-span-4 row-span-6">
          <img className="w-full h-full object-cover rounded-md" src={items[4].image} alt="" />
        </div>
      )}

      {items[5] && (
        <div className="col-span-2 row-span-6">
          <img className="w-full h-full object-cover rounded-md" src={items[5].image} alt="" />
        </div>
      )}

    </div>
  );
};

export default CategoryGrid;
