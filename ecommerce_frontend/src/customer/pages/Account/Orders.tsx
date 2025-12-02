// import React, { useEffect, useState } from 'react'
// import { Order, OrderItem as OrderItemType } from "../../../type/orderType";
// import OrderItem from '../../../customer/pages/Account/OrderItem';
// import axios from "axios";


// const Orders = () => {
//   const [orders, setOrders] = useState<any[]>([]); // temporary type

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await axios.get("http://localhost:8080/api/orders/user", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         console.log("orders 👉", res.data);
//         setOrders(res.data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);


//   return (
//     <div className='text-sm min-h-screen'>
//       <div className='pb-5'>
//         <h1 className='font-semibold'>All Orders</h1>
//         <p>from anytime</p>
//       </div>
//       <div className='space-y-2'>
//         {orders.map((order) => (
//           <OrderItem key={order.id} order={order} />
//         ))}
//         {orders.length === 0 && (
//           <p className="text-gray-500">You have no orders yet.</p>
//         )}

//       </div>
//     </div>
//   )
// }

// export default Orders


import React, { useEffect, useState } from 'react'
import axios from "axios";
import OrderItem from './OrderItem';

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8080/api/orders/user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setOrders(res.data);
        console.log("ORDERS →", res.data);

      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return <p className="text-gray-600 text-sm">Loading orders...</p>;

  return (
    <div className="text-sm min-h-screen">
      <div className="pb-5">
        <h1 className="font-semibold text-lg">All Orders</h1>
        <p className="text-gray-500">from anytime</p>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}

        {orders.length === 0 && (
          <p className="text-gray-500 text-center pt-10">
            You don’t have any orders yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
