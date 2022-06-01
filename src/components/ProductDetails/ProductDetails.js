import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
      const {pdkey} = useParams()
      const [product, setProduct] = useState({})
      useEffect(()=>{
            fetch('https://frozen-refuge-86407.herokuapp.com/product/'+pdkey)
            .then(res => res.json())
            .then(data => setProduct(data))
      },[])
      // const product = fakeData.find(pd => pd.key === pdkey)
      return (
            <div>
                  <h1>Products details </h1>
                  <Product product={product} showAddToCart ={false}></Product>
            </div>
      );
};

export default ProductDetails;