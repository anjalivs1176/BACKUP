// import React, { useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { Button, ThemeProvider } from '@mui/material';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import Navbar from './customer/components/Navbar/Navbar';
// import customTheme from './Theme/customTheme';
// import Home from './customer/pages/Home/Home';
// import Product from './customer/pages/Product/product';
// import ProductDetails from './customer/pages/Page Details/ProductDetails';
// import Review from './customer/pages/Review/Review';
// import Cart from './customer/pages/Cart/Cart';
// import Checkout from './customer/pages/Checkout/Checkout';
// import Account from './customer/pages/Account/Account';
// import { Route, Routes } from 'react-router-dom';
// import BecomeSeller from './seller/Become Seller/BecomeSeller';
// import SellerDashboard from './seller/SellerDashboard/SellerDashboard';
// import AdminDashboard from './admin/pages/Dashboard/AdminDashboard';
// import { useAppDispatch } from './state/store';
// import { fetchSellerProfile } from './state/seller/sellerProfileSlice';
// import Auth from './customer/pages/Auth/Auth';
// import Wishlist from './customer/pages/Wishlist/Wishlist';
// import PaymentSuccess from './customer/pages/Payment/PaymentSuccess';
// import OrderDetails from './customer/pages/Account/OrderDetails';
// import SellerVerifyOTP from './seller/Pages/SellerVerifyOTP';

// function App() {

//  const dispatch = useAppDispatch();

//   useEffect(() => {
//     const token = localStorage.getItem("jwt");
//     if (token) {
//       dispatch(fetchSellerProfile(token));
//     }
//   }, [dispatch]);


//   return (
//       <ThemeProvider theme={customTheme}>
//         <div>
//           <Navbar/>

//           <Routes>
//             <Route path='/' element={<Home/>}/>
//             <Route path='/login' element={<Auth/>}/>
//             <Route path='/products/:category' element={<Product/>}/>
//             <Route path='/reviews/:productId' element={<Review/>}/>
//             <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails/>}/>
//             <Route path='/cart/' element={<Cart/>}/>
//             <Route path='/checkout' element={<Checkout/>} />
//             <Route path='/account/*' element={<Account/>} />
//             <Route path='/become-seller' element={<BecomeSeller/>} />
//             <Route path='/seller/*' element={< SellerDashboard/>}/>
//             <Route path='/admin/*' element={< AdminDashboard/>}/>
//             <Route path="/wishlist" element={<Wishlist />} />
//             <Route path="/payment-success/:paymentOrderId" element={<PaymentSuccess />} />
//             <Route path="/account/orders/:orderId" element={<OrderDetails />} />
//             <Route path="/verify-seller/:email/:otp" element={<SellerVerifyOTP />} />
//           </Routes>
//         </div>
//       </ThemeProvider>
//   );
// }

// export default App;



import React, { useEffect } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router-dom';

import Navbar from './customer/components/Navbar/Navbar';
import customTheme from './Theme/customTheme';
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/Product/product';
import ProductDetails from './customer/pages/Page Details/ProductDetails';
import Review from './customer/pages/Review/Review';
import Cart from './customer/pages/Cart/Cart';
import Checkout from './customer/pages/Checkout/Checkout';
import Account from './customer/pages/Account/Account';
import BecomeSeller from './seller/Become Seller/BecomeSeller';
import SellerDashboard from './seller/SellerDashboard/SellerDashboard';
import AdminDashboard from './admin/pages/Dashboard/AdminDashboard';
import { useAppDispatch } from './state/store';
import { fetchSellerProfile } from './state/seller/sellerProfileSlice';
import Auth from './customer/pages/Auth/Auth';
import Wishlist from './customer/pages/Wishlist/Wishlist';
import PaymentSuccess from './customer/pages/Payment/PaymentSuccess';
import OrderDetails from './customer/pages/Account/OrderDetails';
import SellerVerifyOTP from './seller/Pages/SellerVerifyOTP';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  // HIDE NAVBAR ON SELLER ROUTES
  const hideNavbar =
    location.pathname.startsWith('/seller') ||
    location.pathname.startsWith('/become-seller') ||
    location.pathname.startsWith('/verify-seller')||
    location.pathname.startsWith('/admin');

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      dispatch(fetchSellerProfile(token));
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={customTheme}>
      <div>

        {/* Customer Navbar (hidden on seller pages) */}
        {!hideNavbar && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/seller/*" element={<SellerDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/payment-success/:paymentOrderId" element={<PaymentSuccess />} />
          <Route path="/account/orders/:orderId" element={<OrderDetails />} />
          <Route path="/verify-seller/:email/:otp" element={<SellerVerifyOTP />} />
        </Routes>

      </div>
    </ThemeProvider>
  );
}

export default App;

