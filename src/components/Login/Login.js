import { useContext, useState } from 'react';
import { userContext } from '../../App';
import { useLocation ,useNavigate} from 'react-router-dom';
import { createUserEmailAndPassword, handleFbLogin, handleGoogleSignIn, handleSignOut, initializeGoogleFramework, signInWithEmail } from './LoginManager';





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
  initializeGoogleFramework()

  const [loggedInUser , setLoggedInUser] = useContext(userContext);
  const navigate = useNavigate()
  const location = useLocation()
  let {from} = location.state || {from : {pathname : '/'}}

  const googleSignIn =() =>{
    handleGoogleSignIn()
    .then(res =>{
      setUser(res)
      setLoggedInUser(res)
      navigate(from)
    })
  }
 
  const signOut = ()=>{
    handleSignOut()
    .then(res =>{
      handleResponse(res, false)
    })
  }

  const handleResponse = (res , redirect)=>{
    
    setUser(res)
    setLoggedInUser(res)
    if(redirect){
    navigate(from)
    }
  }
  const fbLogin =()=>{
    handleFbLogin()
    .then(res =>{
      handleResponse(res, true)
    })
  }


const handleSubmit = (e) =>{
  if(newUser && user.email && user.password){
    createUserEmailAndPassword(user.name, user.email,user.password)
    .then(res =>{
      handleResponse(res, true)
    })
  }
  if(!newUser && user.email && user.password){
    signInWithEmail(user.email, user.password)
    .then(res =>{
      handleResponse(res, true)
    })
  }
  
 

  e.preventDefault();
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

  return (
    <div className="App">
      {user.isSignedIn ?<button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign In</button>}
      <button onClick={fbLogin}>Login With Facebook</button>
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
