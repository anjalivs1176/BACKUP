
import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import { Close, LocalOffer } from '@mui/icons-material'
import { teal } from '@mui/material/colors'
import { Button, IconButton, TextField } from '@mui/material'
import PricingCard from './PricingCard'
import { useNavigate } from 'react-router-dom'
import Product from '../Product/product'

const Cart = () => {

    const [couponCode, setCouponCode] = useState("")
    const [cart, setCart] = useState<any>(null)

    const navigate = useNavigate()

    const handleChange = (e: any) => {
        setCouponCode(e.target.value)
    }

    // ---------------- FETCH CART --------------------
    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("token") || "";

            const res = await fetch("http://localhost:8080/api/cart", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();
            console.log("MY CART:", data);
            setCart(data);
        } catch (err) {
            console.log(err);
        }
    };

const navigateToProduct = (item: any) => {
    const category = item.product.category.categoryId;
    const title = encodeURIComponent(item.product.title);
    const id = item.product.id;

    navigate(`/product-details/${category}/${title}/${id}`);
};



    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div className='pt-10 px-5 sm:px-10 md:px-60 min-h-screen'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                
                {/* LEFT SIDE - CART ITEMS */}
                <div className='cartItemSection lg:col-span-2 space-y-3'>

                    {
                        cart?.cartItems?.length > 0 ? (
                            cart.cartItems.map((item: any) => (
                                <CartItem 
                                key={item.id} item={{ ...item, 
                                    onDelete: fetchCart,
                                onNavigate: navigateToProduct
                             }} />
                            ))
                        ) : (
                            <p>Your cart is empty 🤧</p>
                        )
                    }

                </div>

                {/* RIGHT SIDE - PRICE SECTION */}
                <div className='col-span-1 text-sm space-y-3'>
                    <div className='border rounded-md px-5 py-3 space-y-5'>
                        <div className='flex gap-3 text-sm items-center'>
                            <LocalOffer sx={{ color: teal[600], fontSize: "17px" }} />
                            <span>Apply Coupon</span>
                        </div>

                        <div className='flex justify-between items-center'>
                            <TextField
                                onChange={handleChange}
                                placeholder='coupon code'
                                size='small'
                                variant='outlined'
                            />
                            <Button size='small'>Apply</Button>
                        </div>
                    </div>

                    <div className='border rounded-md'>
                        <PricingCard cart={cart} />
                        <div className='p-5'>
                            <Button
                                onClick={() => navigate("/checkout")}
                                fullWidth
                                variant='contained'
                                sx={{ py: "11px" }}>Buy Now</Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Cart
