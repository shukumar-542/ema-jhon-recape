import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/fakedb';
import './Shipment.css'
 
const Shipment = () => {
      const { register, handleSubmit, watch, formState: { errors } } = useForm();
      const [loggedInUser,setLoggedInUser] = useContext(userContext)
      const onSubmit = data => {
        const savedcart = getDatabaseCart()
        const orderDetails = {...loggedInUser,products : savedcart, shipment : data,orderTime: new Date()}
        fetch('http://localhost:5000/addOrder',{
          method : 'POST',
          headers :{
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data =>{
          
            processOrder();
            alert('your Order is palaced')
          
        })
      
      };
    
      // console.log(watch("example")); // watch input value by passing the name of it
    
      return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
         
          
          <input {...register("firstname", { required: true })} defaultValue={loggedInUser.name} />
          {errors.firstname && <span>This field is required</span>}

          <input {...register("email", { required: true })} defaultValue={loggedInUser.email} />
          {errors.email && <span>This field is required</span>}

          <input {...register("address", { required: true })} placeholder='Enter Your address' />
          {errors.address && <span>This field is required</span>}

          <input {...register("phone", { required: true })} placeholder='Enter your phone number'/>
          {errors.phone && <span>This field is required</span>}
          
          
          
          <input type="submit" />
        </form>
      );
};

export default Shipment;