import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';


const Shop = () => {
      
      const [products , setProducts] = useState([]);
      const [cart, setCart] = useState([])

      useEffect(()=>{
            fetch('https://frozen-refuge-86407.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
      },[])
      useEffect(()=>{
            const savedCart = getDatabaseCart()
            const productKey = Object.keys(savedCart);
            // console.log(products, productKey);
            if(products.length > 0){
                  const productCart = productKey.map( pdKey =>{
                        const product = products.find(pd => pd.key === pdKey)
                        product.quantity = savedCart[pdKey]
                        return product;
                  })
                  setCart(productCart)
            }
      },[products])

      const handleAddProduct = (product) =>{
            // console.log('added products',product);
            const sameProduct = cart.find(pd => pd.key === product.key);
            let count = 1;
            let newCart;
            if(sameProduct){
                  count = sameProduct.quantity + 1;
                  sameProduct.quantity = count;
                  const others = cart.filter(pd => pd.key !== product.key)
                  newCart=[...others,sameProduct]
            }
            else{
                  product.quantity = 1;
                  newCart=[...cart , product]
            }
            setCart(newCart);
            addToDatabaseCart(product.key ,count)
      }
      return (
            <div className='shop-container'>
                 <div className='product-container'>
                 {
                        products.map(pd => <Product showAddToCart ={true} key={pd.key} product={pd} handleAddProduct={handleAddProduct}></Product>)
                  }
                 </div> 
                 <div className="cart-container">
                       <Cart cart={cart}>
                              <Link to='/order'><button className='main-button'>Review Order</button></Link>
                       </Cart>
                 </div>
                
            </div>
      );
};

export default Shop;