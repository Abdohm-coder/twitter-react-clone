import './Feed.css';
import TweetBox from './TweetBox/TweetBox';
import Post from './Post/Post';
import { useEffect, useState } from 'react';
import db from '../../firebase';
import FlipMove from 'react-flip-move';
import { useStateValue } from '../../StateProvider';
import firebase from 'firebase';
import { Button } from '@material-ui/core';

export default function Feed({ showImage, setImage, size }) {

    const [posts, setPosts] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    
    useEffect(() => {
        db.collection("posts")
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setPosts(snapshot.docs.map((doc) => ({id : doc.id, data : doc.data()})))
            });
    }, []);

    return (
        <div className='feed'>

            <div className="feed__header">
                <h2>Home</h2>
            </div>

            <TweetBox profile={user.photoURL}/>
            <FlipMove >
                { posts.map((post) => (
                    <Post
                        key={post.id}
                        timestamp = {post.data.timestamp}
                        postId={post.id}
                        profilePic = {post.data.profilePic}
                        displayName={post.data.displayName}
                        username={post.data.username}
                        verified={post.data.verified}
                        text={post.data.text}
                        image={post.data.image}
                        user={user}
                        showImage={showImage}
                        setImage={setImage}
                        size={size}
                    />
                ))}
            </FlipMove>

        </div>
    )
}
