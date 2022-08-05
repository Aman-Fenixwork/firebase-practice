import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import {signInWithGooglePopup, auth} from "../../config/firebase";
import { signInWithCustomToken,signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import  { useState } from "react"
import Styles from "../../styles/scss/login/login.module.css"

const LoginPage = () => {

  const [values, setValues] = useState({
    email: '',
    password : ''
  })

  const provider = new GoogleAuthProvider();
  const handleInputs = (e:any) => {
    const {name, value} = e.target;
    setValues({
      ...values, 
      [name] : value
    })
  }

  const handleGoogleLogin = () => {
    signInWithGooglePopup().then(() => {
      alert("Login Successful");
    })
    .catch(e => {
      console.log("Error :", e);
    })
  }

  const signOutUser = (): void => {
    auth.signOut();
    localStorage.clear();
    window.location.reload();
  };

  const getUser = () => {
    const jsonValue = localStorage.getItem("user");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const setUser = (userData: any) => {
    localStorage.setItem('user', JSON.stringify(userData))
  };
  const fetchUser = async (uid?: string): Promise<any> => {
    const user = getUser();
    try {
      const query: Response = await fetch(
        `/api/users?uid=${uid ?? user?.uid}`,
        {
          headers: { uid: uid ?? user?.uid },
        }
      );
      const res = await query.json();
      return res;
      // if (res && res.status === 200)
      // else return [];
    } catch (error) {
      return null;
    }
  };
  const checkUserExistsOnDb = async (
      uid: string
    ): Promise<{
      isExists: boolean;
      docId: string | boolean;
      status: number;
    }> => {
      try {
        let isExists = false,
          docId = "";
        const res = await fetchUser(uid);
        console.log("res", res);
        if (res && res.status === 200 && res?.response?.id) {
          const { response } = res;
          isExists = true;
          docId = response.id;
        }
        return { isExists, docId, status: res.status };
      } catch (error) {
        console.log("error");
        return { isExists: false, docId: false, status: 404 };
      }
  };
  const setUserToDb = async (user: any, uid: string): Promise<any> => {
    const { isExists, docId, status } = await checkUserExistsOnDb(uid);
    console.log(isExists, docId, status);
    if (!isExists && (status === 200 || status === 404)) {
      try {
        const query = await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify({
            action: "add",
            user: {
              name: user?.displayName,
              email: user?.email,
              photoURL: user?.photoURL,
              user_uid: user?.uid,
              leads: [],
              createdAt: new Date(),
            },
          }),
        });
        const res = await query.json();
        if (res && res.status === 200) {
          localStorage.setItem("userFcdId", res.response.id);
        }
        return res.response.id;
      } catch (e) {
        console.error("Error adding user to DB: ", e);
      }
    } else {
      console.log("user already exists!!!");
      return docId;
    }
  };
  const signInWithEmail = async (): Promise<void> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log("user",userCredential);
      var user = userCredential.user;
      const docID: string = await setUserToDb(user, user?.uid);
      if (docID) {
        const query = await fetch(`/api/auth`, {
          method: "POST",
          body: JSON.stringify({ uid: docID }),
        });
        const q_response = await query.json();
        if (q_response) {
          const _userCredential = await signInWithCustomToken(
            auth,
            q_response.token
          );
          const tokenizedUser: any = _userCredential.user;
          const _userToLocal = {
            displayName: user?.displayName,
            email: user?.email,
            emailVerified: user?.emailVerified,
            isAnonymous: user?.isAnonymous,
            createdAt: tokenizedUser?.reloadUserInfo?.createdAt,
            lastLoginAt: tokenizedUser?.reloadUserInfo?.lastLoginAt,
            stsTokenManager: tokenizedUser?.stsTokenManager,
            uid: user?.uid,
            photoURL: user?.photoURL,
            phoneNumber: user?.phoneNumber,
          };
          tokenizedUser["user_uid"] = user?.uid;
          setUser(_userToLocal);
        }
      }
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        alert("Please registered with us!");
      } else {
        alert(error.message);
      }
    }
  };
  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result && result?.user) {
        const user = result.user;
        const uid: string = user?.uid;
        try {
          const docID: string = await setUserToDb(user, uid);
          if (docID) {
            const query = await fetch(`/api/auth`, {
              method: "POST",
              body: JSON.stringify({ uid: docID }),
            });
            const q_response = await query.json();
            if (q_response) {
              const userCredential = await signInWithCustomToken(
                auth,
                q_response.token
              );
              const tokenizedUser: any = userCredential.user;
              const _userToLocal = {
                displayName: user?.displayName,
                email: user?.email,
                emailVerified: user?.emailVerified,
                isAnonymous: user?.isAnonymous,
                createdAt: tokenizedUser?.reloadUserInfo?.createdAt,
                lastLoginAt: tokenizedUser?.reloadUserInfo?.lastLoginAt,
                stsTokenManager: tokenizedUser?.stsTokenManager,
                uid: uid,
                photoURL: user?.photoURL,
                phoneNumber: user?.phoneNumber,
              };
              tokenizedUser["user_uid"] = uid;
              setUser(_userToLocal);
            }
          }
        } catch (error) {
          console.log("Error from onAuthStateChange", error);
        }
      }
    } catch (error) {
      signOutUser();
    }
  };
  return (
    <div>
      <Head><title>Login Page</title></Head>
      <div className={Styles.loginContainer}>
          <div className={Styles.login}>
            <div className={Styles.loginMain}>
              <h2>Welcome back!</h2>
              <small>Log in to your account</small>
              <input type="text" name="email" placeholder="Email" onChange={handleInputs}/>
              <input type="password" name="password" placeholder='Password' onChange={handleInputs}/>
              <div className={Styles.googleDiv} onClick={googleSignIn}>
                <span>Sign in with Google</span>
                <Image
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google Image"
                  width={"15px"}
                  height={"15px"}
                />
              </div>
            </div>
              
              <div className={Styles.loginBottom}>
                <button>Forgot your password?</button>
                <button onClick={signInWithEmail}>Log in</button>
              </div>
          </div>
          
      </div>
    </div>
  )
}

export default LoginPage