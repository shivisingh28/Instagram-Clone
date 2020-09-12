import React ,{useState,useEffect} from 'react';
import './App.css';
import Post from './Post';
import { db } from './firebase';

function App() {
  //this is an example of hook
  const [posts,setPosts] =useState([
    {
      username:"shivi__singh28",
      caption:"Wow it works",
      imageUrl:"https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
  },{
     username:"shivi__singh28",
      caption:"Wow it works",
      imageUrl:"https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
  }
]);
// useEffect => runs a piece of code based on a specific condition
useEffect(() => {

  //this is where the code runs ie runs everytime the variable post changes
  db.collection('posts').onSnapshot(snapshot=>{
    //every time a new post is added ,this code fires 
  })
  
}, [])
   //[] this bracket means run the code only once 
  return (
    <div className="App">
      <div className="app__header">
        <img
        className="app__headerImage"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
        />
       </div>
       {/* Header */}
       <h1>Hello eveyone</h1>

       {posts.map(post => (
         <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
       ))}


  
      {/* Posts */}
    </div>
  );
}

export default App;
