import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';



export const userContext = createContext()
function App() {
  const [ loggedInUser , setLoggedInUser] = useState({})
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <h3>Email : {loggedInUser.email}</h3>
    <BrowserRouter>
    <Header></Header>

      <Routes>
        <Route path='/shop' element={<Shop></Shop>}></Route>
        <Route path='/order' element={<Review></Review>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        
        
        <Route element={<PrivateRoute></PrivateRoute>}>
        <Route path='/inventory' element={<Inventory></Inventory>}></Route>
          <Route path='shipment' element={<Shipment></Shipment>}></Route>

        </Route>        

        <Route path='/product/:pdkey' element={<ProductDetails></ProductDetails>}></Route>
        <Route  path='/' element={<Shop></Shop>}></Route>
        <Route  path='*' element={<NotFound></NotFound>}></Route>


        
      </Routes>
    </BrowserRouter>
    
     
    </userContext.Provider>
  );
}

export default App;
