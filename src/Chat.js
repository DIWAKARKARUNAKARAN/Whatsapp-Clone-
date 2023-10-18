import React, { useEffect, useState } from 'react';
import './Chat.css';
import { Avatar,IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined,MicOutlined } from '@material-ui/icons';
import { useParams} from 'react-router-dom';
import { db } from './firebase';
import {serverTimestamp} from 'firebase/firestore';

function Chat({user}) {
    const{roomId}=useParams();
    const[input,setinput]=useState('');
    const[roomData,setRoomData]=useState('');
    const[messages,setMessages]=useState([]);

    const sendMessage=(e)=>{
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name:'Fazil',
            timestamp: serverTimestamp(),
        });
        setinput('');
    };
    useEffect(()=>{
    if(roomId){
    db.collection('rooms').doc(roomId).onSnapshot((snapshot)=>setRoomData(snapshot.data()));

    db.collection('rooms').doc(roomId).collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot((snapshot)=>
    setMessages(snapshot.docs.map((doc)=>doc.data()))
    );
    }

    },[roomId]);

    //alert(roomId);

  return (
    <div className='chat'>
        <div className='chat_header'>
            <Avatar src={roomData.roomPhoto}/>
            <div className='chat_headerInfo'>
                <h3>{roomData.name}</h3>
                <p>
                {''}last seen{''}
                {new Date(messages[0]?.timestamp?.toDate()).toUTCString()}</p>
            </div>
                
            <div className='chat_headerRight'>
            <IconButton><SearchOutlined/></IconButton>
                <IconButton><AttachFile/></IconButton>
                <IconButton><MoreVert/></IconButton>
            </div>
            </div>
            <div className='chat_body'>
                {messages.map((message)=>(
                    <p className={`chat_message ${message.name===user.displayName && 'chat_receiver'}`}>
                        <span className='chat_name'>{message.name}</span>
                        {message.message}
                        <span className='chat_timestamp'>
                            {new Date(
                                messages[messages.length-1]?.timestamp?.toDate()
                            ).toUTCString()}
                        </span>
                    </p>
                ))}
                
        
            </div>
            <div className='chat_footer'>
                <InsertEmoticon/>
                <form>
                    <input type='text' value={input}onChange={eve=>setinput(eve.target.value)}/>
                    <button onClick={sendMessage}type='submit'>Send a Message</button>
                </form>
                <MicOutlined/>
            </div>
    </div>
  );
}

export default Chat;
