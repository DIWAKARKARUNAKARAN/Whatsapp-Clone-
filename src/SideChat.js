import React, { useEffect, useState } from 'react';
import "./SideChat.css";
import { Avatar } from '@material-ui/core';
import { db } from './firebase';
import { Link } from 'react-router-dom';

function SideChat({id,name,photo,addNewChat}) {
    const[messages,setMessages]=useState('');
    useEffect(()=>{
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>setMessages(snapshot.docs.map(doc=>doc.data())));

        }
    },[id])

    const createChat=()=>{
      const roomName=prompt('Please enter room name');
      const roomPhoto=prompt('Please enter room photo URL');

      if(roomName && roomPhoto){
        db.collection('rooms').add({
          name:roomName,
          roomPhoto,
        });
      }
    }
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
    <div className='sideChat'>
        <Avatar src={photo}/>
        <div className='sideChat_info'>
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
        </div>
    </div></Link>
    
  ):(
    
    <div onClick={createChat}className='SideChat'>
        <h2>Add New Chat</h2>
      
    </div>
  );
}

export default SideChat;
