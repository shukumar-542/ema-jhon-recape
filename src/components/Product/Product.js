import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons'



const Product = (props) => {
      // console.log(props.product);
      const{name,img,price, seller,stock} = props.product
      return (
            <div className='product'>
               <div>
                     <img src={img} alt="" />
               </div>
               <div>
                     <h2 className='product-name'>{name}</h2>
                     <p><small> By :{seller}</small></p>
                     <p>${price}</p>
                     <p>stock {stock} in avaiable </p>
                     <button onClick={()=>props.handleAddProduct(props.product)} className='main-button'><FontAwesomeIcon icon={faShoppingCart} />  Add to cart</button>

               </div>  
            </div>
      );
};

export default Product;