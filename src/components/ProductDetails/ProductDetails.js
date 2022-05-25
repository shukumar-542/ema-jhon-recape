import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
      const {pdkey} = useParams()
      const product = fakeData.find(pd => pd.key === pdkey)
      return (
            <div>
                  <h1>Products details </h1>
                  <Product product={product} showAddToCart ={false}></Product>
            </div>
      );
};

export default ProductDetails;