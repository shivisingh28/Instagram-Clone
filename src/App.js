import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import { Button, Input } from "@material-ui/core";

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  //this is an example of hook
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);


  const [posts, setPosts] = useState([]);
  const[open,setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

	// useEffect => runs a piece of code based on a specific condition
	useEffect(() => {
		//this is where the code runs ie runs everytime the variable post changes
		db.collection("posts").onSnapshot((snapshot) => {
			//every time a new post is added ,this code fires
			setPosts(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					post: doc.data(),
				}))
			);
		});
  }, []);
  //[] this bracket means run the code only once
	return (
		<div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        //aria-labelledby="simple-modal-title"
        //aria-describedby="simple-modal-description"
      >
    <div style={modalStyle} className={classes.paper}>
      <center>
       <img className="app__headerImage"
					src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
					alt=""
          />
          <Input
          placeholder="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />

          <Input
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />

          <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Login</Button>
      </center>
    </div>
      </Modal>
			<div className="app__header">
				<img
					className="app__headerImage"
					src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
					alt=""
				/>
			</div>
			{/* Header */}
      <Button onClick={() => setOpen(true)}>Sign Up</Button>
			<h1>Hello eveyone</h1>

			{posts.map(({ id, post }) => (
				<Post
					key={id}
					username={post.username}
					caption={post.caption}
					imageUrl={post.imageUrl}
				/>
			))}

			{/* Posts */}
		</div>
	);
}

export default App;
