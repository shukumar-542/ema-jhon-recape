
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import {getAuth,GoogleAuthProvider, signInWithPopup, signOut,createUserWithEmailAndPassword ,signInWithEmailAndPassword,updateProfile,FacebookAuthProvider   } from "firebase/auth";
import { useContext, useState } from 'react';
import { userContext } from '../../App';
import { useLocation ,useNavigate} from 'react-router-dom';


initializeApp(firebaseConfig)


function Login() {
  const [newUser , setNewuser] = useState('')
  const [user , setUser] = useState({
    isSignedIn : false,
    newUser : false,
    name : '',
    email : '',
    password : '',
    photo : '',
    error : '',
    success : false,

  })

  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();

  const [loggedInUser , setLoggedInUser] = useContext(userContext);
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location.state);
  let {from} = location.state || {from : {pathname : '/'}}

const handleSignIn = ()=>{
  const auth = getAuth();
  signInWithPopup(auth, provider)
  .then((result) =>{
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    setUser({
      isSignedIn : true,
      name : user.displayName,
      email : user.email,
      photo : user.photoURL,
    })
    // ...
  })
  .catch((error) =>{
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
  })
  
  
}
const handleSignOut =() =>{
  const auth = getAuth();
  signOut(auth).then(() => {
   const isSignedOut = {
     isSignedIn : false,
     name : '',
     email : '',
     photo : '',
     
   }
   setUser(isSignedOut)
     
}).catch((error) => {
  // An error happened.
});
}
const handleSubmit = (e) =>{
  if(newUser && user.email && user.password){
    const auth = getAuth();
  createUserWithEmailAndPassword(auth, user.email, user.password)
  .then((userCredential) => {
    // Signed in 
    const newuser = userCredential.user;
    const createNewUser = {...user}
    createNewUser.error = '';
    createNewUser.success =  true;
    setUser(createNewUser)
    updatedUser(user.name)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const createNewUser  = {...user}
    createNewUser.error = errorMessage ;
    createNewUser.success = false;
    setUser(createNewUser)
    console.log(errorCode, errorMessage);
  });
  }
  if(!newUser && user.email && user.password){
    const auth = getAuth();
  signInWithEmailAndPassword(auth, user.email, user.password)
  .then((userCredential) => {
    // Signed in 
    const newuser = userCredential.user;
    const createNewUser = {...user}
    createNewUser.error = '';
    createNewUser.success =  true;
    setUser(createNewUser)
    setLoggedInUser(createNewUser)
    console.log(from);
    console.log('hello');
    navigate(from)
    console.log(newuser);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const createNewUser  = {...user}
    createNewUser.error = errorMessage ;
    createNewUser.success = false;
    setUser(createNewUser)
    console.log(errorMessage);
  });
  }
  
 

  e.preventDefault();
}

const updatedUser = name =>{
  const auth = getAuth();
updateProfile(auth.currentUser, {
  displayName: name
}).then(() => {
  // Profile updated!
console.log('user update successfuly');
}).catch((error) => {
  // An error occurred
  console.log('user not updated');
});
}
const handleBlur =(e)=>{
  // console.log(e.target.name , e.target.value);
  let isFormValid = true;
  if(e.target.name === 'email'){
    const validEmail = /\S+@\S+\.\S+/.test(e.target.value)
    isFormValid=validEmail
  }
  if(e.target.name === 'password'){
    const validPass =  e.target.value.length > 6;
    isFormValid=validPass
  }
  if(isFormValid){
    const newUserInfo = {...user}
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
  }
}
const handleFbLogin = () =>{
  const auth = getAuth();
signInWithPopup(auth, fbProvider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    console.log(user);

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
}
  return (
    <div className="App">
      {user.isSignedIn ?<button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign In</button>}
      <button onClick={handleFbLogin}>Login With Facebook</button>
        { user.isSignedIn &&
          <div>
            <p>welcome , {user.name}</p>
            <p>Your Email :{user.email}</p>
            <img src={user.photo} alt=""/>
          </div>
        }

        <h1>Our Own Authentication</h1>

        <input type="checkbox" onChange={()=>{setNewuser(!newUser)}} name="newUser" id="" />
        <label htmlFor="newuser">New user Sign up</label>
        <form onSubmit={handleSubmit}>
          {newUser &&<input type="text" name='name' onBlur={handleBlur} placeholder='Enter Your Name' /> }
          <br />
          <input type="text" onBlur={handleBlur} name='email' placeholder='Your Email Address' required/>
          <br />
          <input type="password" onBlur={handleBlur} name="password" placeholder='Your Password' /><br />
          <input type="submit" value={newUser ? 'SignUp' : 'LogIn'} />
        </form>    
        <p style={{color :'red'}}>{user.error}</p> 
        {user.success && <p style={{color:'green'}}>Account {newUser ?'Create' : 'LoggedIn'} SuccessFully</p> }
    </div>
  );
}

export default Login;
