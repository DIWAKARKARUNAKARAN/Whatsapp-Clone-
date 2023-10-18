
import './App.css';
import Sidebar from './Sidebar';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Chat from './Chat';
import Login from './Login';
import { useState } from 'react';
function App() {
  const [user,setUser]=useState(
    sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user'))
  :''
  );
  return !user ?
       (<Login setUser={setUser}/> ):  
      (
      <div className="app">
    <div className='app_body'>
    <BrowserRouter>
      <Sidebar setUser={setUser} user={user}/>
      <Routes>
        <Route path="/rooms/:roomId"element={ <Chat user={user}/>}/>
        <Route path="/" element={<chat user={user}/>}/>
        </Routes>
      </BrowserRouter>
    </div> 
    </div>
);
}

export default App;
