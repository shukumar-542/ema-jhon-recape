import React from 'react';

const Cart = (props) => {
      const cart = props.cart
      const total = cart.reduce((total, pd)=>total + pd.price,0);

      let shipping = 0;
      if(total > 35){
            shipping = 0;
      }
      else if(total > 15){
            shipping = 4.99
      }
      else if(total > 0){
            shipping =12.99
      }
      const vat  = total /10

      const  formatNumber = num =>{
            const precision = num.toFixed(2)
            return Number(precision)
      }
      return (
            <div>
                  <h2>Order Summery </h2>
                  <h5>Items Orders {cart.length}</h5>
                  <h5><small>Shipping Cost : {shipping}</small></h5>
                  <h5><small>Vat + Tax : {formatNumber(vat)}</small></h5>
                  <h5>Total Price : {formatNumber(total +shipping +vat)}</h5>

            </div>
      );
};

export default Cart;