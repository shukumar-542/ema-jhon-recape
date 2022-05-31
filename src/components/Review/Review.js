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

            fetch('http://localhost:5000/productsByKey',{
                  method : 'POST',
                  headers :{
                        'Content-Type':'application/json'
                  },
                  body: JSON.stringify(productKeys) 
            })
            .then(res => res.json())
            .then(data => setCart(data))
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