import React from 'react';
import {auth,provider} from './firebase';
import './Login.css'
import { Button } from '@material-ui/core';


function Login({setUser}) {
    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then((result)=>{
            sessionStorage.setItem('user',JSON.stringify(result.user));
            setUser(result.user);
        })
        .catch(err=>alert(err.mesage));
    };
    
  return (
    <div className='login'>
        <div className='login_container'>
            <img src='https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-whatsapp-icon-png-image_6315990.png'
            alt='whatsapp'
            />
             <div className='login_text'>
                <h1>Sign in to whatsapp</h1>
            </div>
            <Button type="submit" onClick={signIn}>
                Sign in with Googles
            </Button>
        </div>
            
        </div>
      
    
  );
  }

export default Login;
