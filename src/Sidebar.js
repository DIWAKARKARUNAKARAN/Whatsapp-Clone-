import React from 'react';
import './Sidebar.css';
import SideChat from './SideChat';
import { Avatar, IconButton } from '@material-ui/core';
import { DonutLarge } from '@material-ui/icons';
import { Chat } from '@material-ui/icons';
import { MoreVert } from '@material-ui/icons';
import { SearchOutlined } from '@material-ui/icons';
import { useEffect,useState } from 'react';
import {db} from './firebase';

function Sidebar({setUser,user}) {
    const [rooms,setRooms]=useState([]);
    useEffect(()=>{
        const unsubscribe=db.collection('rooms').onSnapshot((snapshot)=>
        setRooms(snapshot.docs.map((doc)=>({
            id:doc.id,
            data:doc.data(),
        }))
        )
    );
    return ()=>unsubscribe();

    },[]);
    console.log(rooms);
  return (
    <div className='sidebar'>
        <button onClick={()=>{sessionStorage.setItem('user','');setUser();}}>
      Logout
    </button>
        <div className='sidebar_header'>
            <Avatar src={user.photoURL} /> 
            <div className='sidebar_headerRight'>
                <IconButton><DonutLarge/></IconButton>
                <IconButton><Chat/></IconButton>
                <IconButton><MoreVert/></IconButton>
                
            </div>
        </div>
        <div className='sidebar_search'>
            <div className='sidebar_searchContainer'>
            <SearchOutlined/>
            <input placeholder='Search the Chat' type='text'/>

            </div>
        </div>
        <div className='sidebar_chats'>
            <SideChat addNewChat/>
            {
                rooms.map(room=>(
                    <SideChat key={room.id}id={room.id}
                    name={room.data.name}photo={room.data.roomPhoto}/>
                ))
            }
            
        </div>
         
      
    </div>
  );
}

export default Sidebar;
