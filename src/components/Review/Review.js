import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewOrder from '../ReviewOrder/ReviewOrder';
import happyimg from '../../images/giphy.gif'
import { useNavigate } from 'react-router-dom';

const Review = () => {
      const [cart, setCart ] = useState([]);
      const [orderPlace, setOrderPlace] = useState(false)
      const navigate = useNavigate()
      const handlePlaceOrder =()=>{
            navigate('/shipment')
      }
      let thankyou;
      if(orderPlace){
            thankyou = <img src={happyimg} alt="" />
      }
      const  removeProducts = (productkey) =>{
            console.log('remove',productkey);
            const newCart = cart.filter(pd => pd.key !== productkey);
            setCart(newCart)
            removeFromDatabaseCart(productkey);
      }
      useEffect(()=>{
            const saveCart = getDatabaseCart()
            const productKeys = Object.keys(saveCart)
            const cartProducts = productKeys.map(key =>{
                  const products = fakeData.find(pd => pd.key === key)
                  products.quantity = saveCart[key]
                  return products
            },[])
            setCart(cartProducts)
            // console.log(cartProducts);
      },[])
      return (
            <div className='shop-container'>
                <div className='product-container'>
                {
                        cart.map(pd => <ReviewOrder 
                              products={pd}
                               key ={pd.key}
                               removeProducts={removeProducts}></ReviewOrder>)
                  }
                  {thankyou}
                </div>  
                <div className='cart-container'>
                  <Cart cart={cart}>
                        <button className='main-button' onClick={handlePlaceOrder}>Proceed Order</button>
                  </Cart>
                </div>
                 
            </div>
      );
};

export default Review;