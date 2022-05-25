import React from 'react';

const ReviewOrder = (props) => {
      // console.log(props);
      const {name,quantity,key,price} = props.products
      const reviewItem ={
            borderBottom : '1px solid lightgray',
            margin :'5px',
            padding : '20px',
            marginLeft : '50px'
      }
      return (
            <div style={reviewItem}>
                  <h5>{name}</h5>
                  <p><b>Quantity : {quantity}</b></p>
                  <p><small>{price}</small></p>
                  <button 
                        className='main-button'
                        onClick={()=>props.removeProducts(key)}

                  >Remove</button>

            </div>
      );
};

export default ReviewOrder;