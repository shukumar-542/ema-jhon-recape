import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, FacebookAuthProvider, sendEmailVerification } from "firebase/auth";



export const initializeGoogleFramework = () => {
  initializeApp(firebaseConfig)
}

export const handleGoogleSignIn = () => {
  const provider = new GoogleAuthProvider();

  const auth = getAuth();
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const signInUser = {
        isSignedIn: true,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        success: true,
      }
      return signInUser;
    })
    .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
    })


}

export const handleFbLogin = () => {
  const fbProvider = new FacebookAuthProvider();

  const auth = getAuth();
  return signInWithPopup(auth, fbProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      user.success = true;
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      return user;



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

export const createUserEmailAndPassword = (name, email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const newuser = userCredential.user;
      const createNewUser = newuser
      createNewUser.error = '';
      createNewUser.success = true;
      updatedUser(name)
      emailVarification();
      return createNewUser;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const createNewUser = {}
      createNewUser.error = errorMessage;
      createNewUser.success = false;
      console.log(errorCode, errorMessage);
      return createNewUser;
    });
}
export const signInWithEmail = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const newuser = userCredential.user;
      const createNewUser = newuser
      createNewUser.error = '';
      createNewUser.success = true;
      return createNewUser;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const createNewUser = {}
      createNewUser.error = errorMessage;
      createNewUser.success = false;
      return createNewUser;
    });
}

export const handleSignOut = () => {
  const auth = getAuth();
  return signOut(auth).then(() => {
    const isSignedOut = {
      isSignedIn: false,
      name: '',
      email: '',
      photo: '',

    }
    return isSignedOut;

  }).catch((error) => {
    // An error happened.
  });
}
const updatedUser = name => {
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
const emailVarification = () => {
  const auth = getAuth();
  sendEmailVerification(auth.currentUser)
    .then(() => {
     console.log('sent a email !!');
    });
}