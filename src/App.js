import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}
const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function App() {
	//this is an example of hook
	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);

	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [openSignIn, setOpenSignIn] = useState(false);
	const [email, setEmail] = useState("");
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//user has logged in.....
				console.log(authUser);
				setUser(authUser);
			} else {
				//user has logged out....
				setUser(null);
			}
		});
		return () => {
			//perform some cleanup actions
			unsubscribe();
		};
	}, [user, username]);

	// useEffect => runs a piece of code based on a specific condition
	useEffect(() => {
		//this is where the code runs ie runs everytime the variable post changes
		//	db.collection("posts").orderBy('timestamp',"desc").onSnapshot((snapshot)
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
	const signUp = (event) => {
		event.preventDefault(); // we always do this so that the page doesn't refresh while logging in
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				authUser.user.updateProfile({
					displayName: username,
				});
			})

			.catch((error) => alert(error.message));
		setOpen(false);
	};

	const signIn = (event) => {
		event.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.catch((error) => alert(error.message));
		setOpenSignIn(false);
	};

	return (
		<div className="App">
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				//aria-labelledby="simple-modal-title"
				//aria-describedby="simple-modal-description"
			>
				<div style={modalStyle} className={classes.paper}>
					<form className="app__signup">
						<center>
							<img
								className="app__headerImage"
								src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
								alt=""
							/>
						</center>
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
						<Button type="submit" onClick={signUp}>
							Login
						</Button>
					</form>
				</div>
			</Modal>
			<Modal
				open={openSignIn}
				onClose={() => setOpenSignIn(false)}
				//aria-labelledby="simple-modal-title"
				//aria-describedby="simple-modal-description"
			>
				<div style={modalStyle} className={classes.paper}>
					<form className="app__signup">
						<center>
							<img
								className="app__headerImage"
								src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
								alt=""
							/>
						</center>
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
						<Button type="submit" onClick={signIn}>
							Sign In
						</Button>
					</form>
				</div>
			</Modal>
			<div className="app__header">
				<img
					className="app__headerImage"
					src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
					alt=""
				/>
				{user ? (
					<Button onClick={() => auth.signOut()}>Logout</Button>
				) : (
					<div className="app__loginContainer">
						<Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
						<Button onClick={() => setOpen(true)}>Sign Up</Button>
					</div>
				)}
			</div>
			{/* Header */}
      <div className="app__posts">
      {posts.map(({ id, post }) => (
				<Post
					key={id}
					username={post.username}
					caption={post.caption}
					imageUrl={post.imageUrl}
				/>
			))}
      </div>
      <InstagramEmbed
      url='https://www.instagram.com/p/CBDtHwlAoEdjPXaZP0iTT9L4GchOT_pnRWEtGI0/'
      maxWidth={320}
      hideCaption={false}
      containerTagName='div'
      protocol=''
      injectScript
      onLoading={()=>{}}
      onSuccess={()=>{}}
      onAfterRender={()=>{}}
      onFailure={()=>{}}
      />
			{user?.displayName ? (
				<ImageUpload username={user.displayName} />
			) : (
				<h3>Sorry !! You need to login first !!</h3>
			)}
		</div>
	);
}

export default App;
