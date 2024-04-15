import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Home from './pages/Home';
import CreatePost from './pages/CreatePost.js';
import Post from './pages/Post.js';
import Login from './pages/Login.js';
import PageNotFound from './pages/PageNotFound.js';
import Registration from './pages/Registration.js';
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from 'axios';
import Profile from './pages/Profile.js';
import ChangePassword from './pages/ChangePassword.js';

function App() {
  const [authState, setAuthState] = useState({username: "", id: 0, status: false});


  useEffect(() => {
    axios.get('http://localhost:3001/auth/auth', { headers: {
      accessToken: localStorage.getItem("accessToken")
    }}).then((response) => {
      if(response.data.error) {
        setAuthState({
          ...authState, status: false
        });
        
      }
      else {
        if (authState.username !== response.data.username || authState.id !== response.data.id || authState.status !== true) {
          setAuthState({
            username: response.data.username, 
            id: response.data.id, 
            status: true
          });
        }
      }
    });
  }, [authState]); 

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false
    });
    window.location.replace('/');
  }

  return (
    <div className="App"> 
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className="navbar">
            <div className = "links">
            {(!authState.status) ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/registration">Register</Link>
            </>
            ) : (
              <>
                <Link to='/'>Home</Link>
                <Link to='/createpost'>CreatePost</Link>
              </>
            ) 
            }
            </div>
            <div className = "buttonCont">
            {(authState.status) && (
              <>
                  <h1>{authState.username}</h1>
                  <button onClick={logout}>Logout</button>
              </>
            )}
            </div>
          </div>  
            <Routes>
              <Route path="/" element={<Home/>}/> 
              <Route path="/createpost" element={<CreatePost/>}/>
              <Route path="/post/:id" element={<Post/>}/>
              <Route path="/registration" element={<Registration/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile/:id" element={<Profile/>}/>
              <Route path="/changepassword" element={<ChangePassword/>}/>
              <Route path="*" element={<PageNotFound/>}/>
              {/*
              <Route basename="/about" path="/about" element={<About/>}/>
              <Route basename="/event" path="/event" element={<Event/>}/>
              <Route basename="/contact" path="/contact" element={<Contact/>}/>
              <Route basename="/prayer" path="/prayer" element={<Prayer/>}/>
              */}
            </Routes> 
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
