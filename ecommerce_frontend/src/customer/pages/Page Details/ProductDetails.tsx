import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import { teal } from '@mui/material/colors';
import { Button, Divider } from '@mui/material';
import { Add, AddShoppingCart, FavoriteBorder, LocalShipping, Remove, Shield, Wallet, WorkspacePremium } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import SimilarProduct from './SimilarProduct';
import ReviewCard from '../Review/ReviewCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../state/store';
import { fetchProductById } from '../../../state/customer/ProductSlice';

const ProductDetails = () => {
  const [quantity,setQuantity] = React.useState(1);
  const {productId} = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {product} = useAppSelector(store=>store)
  const [activeImage,setActiveImage]=useState(0)
  const [selectedSize, setSelectedSize] = useState("DEFAULT");
const [isInCart, setIsInCart] = useState(false);
const [isInWishlist, setIsInWishlist] = useState(false);



  useEffect(()=>{
    dispatch(fetchProductById(Number(productId)));
    checkIfInCart();
    checkWishlist();
  },[productId])

const handleActiveImage=(value:number)=>()=>{
  setActiveImage(value)
}

const handleAddToCart = async () => {
  if (!product.product) return;

  try {
    const token = localStorage.getItem("token") || "";

    const body = {
      productId: product.product.id,
      size: selectedSize,
      quantity
    };

    const res = await fetch("http://localhost:8080/api/cart/add", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`  // ✔ FIXED
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    console.log("ADDED TO CART:", data);
    setIsInCart(true);
  } catch (error) {
    console.log(error);
  }
};


const checkIfInCart = async () => {
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

    // check if product exists
    const exists = data.cartItems?.some((item: any) =>
      item.product.id === product.product?.id
    );

    setIsInCart(exists);
  } catch (err) {
    console.log(err);
  }
};

const checkWishlist = async () => {
  try {
    if (!product.product?.id) return;

    const token = localStorage.getItem("token") || "";
    const res = await fetch("http://localhost:8080/api/wishlist", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    const data = await res.json();
    const exists = data?.products?.some((p: any) => p.id === product.product?.id);
    setIsInWishlist(Boolean(exists));
  } catch (err) {
    console.log("checkWishlist error", err);
  }
};

const handleToggleWishlist = async () => {
  try {
    if (!product.product?.id) return;

    const token = localStorage.getItem("token") || "";
    const res = await fetch(
      `http://localhost:8080/api/wishlist/add-product/${product.product.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );

    // optional: you can check status or returned body
    const data = await res.json();
    console.log("wishlist toggle response", data);

    // flip UI immediately
    setIsInWishlist(prev => !prev);

    // (optional) refresh global wishlist state / navbar badge later
  } catch (err) {
    console.log("toggle wishlist error", err);
  }
};





  return (
    <div className='px-5 lg:px-20 pt-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <section className='flex flex-col lg:flex-row gap-5'>
              <div className='w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3'>
              {product.product?.images.map((item,index)=><img 
              onClick={handleActiveImage(index)}
              className='lg:w-full w-[50px] cursor-pointer rounded-md'
              src={item} alt='' />)}
              </div>
              <div className='w-full h-full lg:w-[85%]'>
                  <img 
                  className='w-full rounded-md'
                  src={product.product?.images[activeImage]}/>
              </div>
          </section>
          <section>
            <h1 className='font-bold text-lg text-primary-color'>{product.product?.seller?.businessDetails.businessName}</h1>
            <p className='text-gray-500 font-semibold'> {product.product?.title}</p>
            <div className='flex justify-between items-center py-2 border w-[180px] px-3 mt-5'>
                  <div className='flex gap-1 items-center'>
                      <span>4</span>
                      <StarIcon sx={{color:teal[500],fontSize:"17px"}}/>
                  </div>
                  <Divider orientation='vertical' flexItem/>
                  <span>
                    259 Ratings
                  </span>
            </div>
            <div>
              <div className='price flex items-center gap-3 mt-5 text-2xl'>
                <span className='font-sans text-gray-800'>
                    ₹{product.product?.sellingPrice}
                </span>
                <span className="line-through text-gray-400">
                  ₹{product.product?.mrpPrice}
                </span>
                <span className='text-primary-color font-semibold'>
                  {product.product?.discountPercent}%
                </span>
              </div>
              <p className='text-sm '>Inclusive of all taxes. Free shipping above Rs.1500</p>
            </div>
            <div className='mt-7 space-y-3'>
                <div className='flex items-center gap-4'>
                    <Shield sx={{color:teal[500]}}/>
                    <p>Authentic & Quality assured</p>
                </div>
                <div className='flex items-center gap-4'>
                    <WorkspacePremium sx={{color:teal[500]}}/>
                    <p>100% Money Back Guarantee</p>
                </div>
                <div className='flex items-center gap-4'>
                    <LocalShipping sx={{color:teal[500]}}/>
                    <p>Free Shipping And Returns</p>
                </div>
                <div className='flex items-center gap-4'>
                    <Wallet sx={{color:teal[500]}}/>
                    <p>Pay on Delivery might be Available</p>
                </div>
            </div>
            <div className='mt-7 space-y-2'>
                <h1>QUANTITY</h1>
                <div className='flex items-center gap-w w-[140px] justify-between'>
                  <Button disabled={quantity==1} onClick={()=> setQuantity(quantity-1)}><Remove/></Button>
                  <span>
                    {quantity}
                  </span>
                  <Button onClick={()=> setQuantity(quantity+1)}>
                    <Add/>
                  </Button>
                </div>
            </div>
            <div className='mt-5 flex items-center gap-5 '>
                <Button
  onClick={isInCart ? () => navigate("/cart") : handleAddToCart}
  fullWidth
  variant={isInCart ? "outlined" : "contained"}
  startIcon={<AddShoppingCart />}
  sx={{ py: "1rem" }}
>
  {isInCart ? "Go To Bag" : "Add To Bag"}
</Button>

                <Button
  fullWidth
  variant={isInWishlist ? "contained" : "outlined"}
  startIcon={<FavoriteBorder />}
  sx={{ py: "1rem" }}
  onClick={handleToggleWishlist}
>
  {isInWishlist ? "ADDED TO WISHLIST" : "WISHLIST"}
</Button>
            </div>
            <div>
              <p className='mt-5'>
                {product.product?.description}
              </p>
            </div>
            <div className='mt-12 space-y-9'>
              <ReviewCard/>
              <Divider/>
            </div>
          </section>
        </div>

        <div className='mt-20'>
          <h1 className='text-lg font-bold'>
              Similar Products
          </h1>
          <div className='pt-5'>
                <SimilarProduct/>
          </div>
        </div>

    </div>
  )
}

export default ProductDetails