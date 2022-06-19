import { Avatar, Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import RepeatIcon from '@material-ui/icons/Repeat';
import PublishIcon from "@material-ui/icons/Publish";
import './Post.css';
import { forwardRef, useEffect, useState } from 'react';
import db from '../../../firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import Comment from './Comment/Comment';
import LikePost from './LikePost/LikePost';
import { RecoilRoot, atom, useRecoilState } from 'recoil';

const  Post = forwardRef(({
    timestamp,
    postId,
    profilePic,
    displayName,
    username,
    verified,
    text,
    image,
    user,
    showImage,
    setImage,
    size,
}, ref) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [likeId, setLikeId] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [commentOpen, setCommentOpen] = useState(true);
    const [openModal, setOpenModal] = useRecoilState(showImage);
    const [modalImage, setModalImage] = useRecoilState(setImage)
    const [screenSize, setScreenSize] = useRecoilState(size);

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})))
                });
            setScreenSize(window.innerWidth);
        };

        return () => {
            unsubscribe();
        }
    }, [postId]);

    useEffect(()=> {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection("posts")
            .doc(postId)
            .collection("likes")
            .onSnapshot(snapshot => {
                setLikeId(snapshot.docs?.map((doc) => ({ id: doc.id, data: doc.data().username})));
            });
        }

        return () => {
            unsubscribe();
        }
    }, [postId]);

    useEffect(() => {
        db.collection("posts").doc(postId).collection("likes").onSnapshot(snapshot => {
            setIsLiked(snapshot.docs.map(doc =>  { return doc.data().username === user.displayName}))
        });
    }, [postId, user]);

    const deletePost = () => {
        db.collection("posts")
            .doc(postId)
            .delete();
    };

    const postComment = (e) => {
        e.preventDefault();
        db.collection("posts")
            .doc(postId)
            .collection("comments")
            .add({
                text: comment,
                username: user.displayName,
                profilePhoto: user.photoURL,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        setCommentOpen(true);
        setComment("");
        setScreenSize(window.innerWidth);
    };

    const displayImage = () => {
        setOpenModal(true);
        setModalImage(image)
    }

    return (
        <div className="post" ref={ref}>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__headerLeft">
                        <div className="post__avatar">
                            <Avatar src={profilePic} />
                        </div>
                        <div className="post__headerText">
                            <h3>
                                {displayName}{" "}
                                <span className="post__headerSpecial">
                                    { verified && <VerifiedUserIcon className='post__badge'/>} @{username}
                                </span>
                            </h3>
                            <span className="post__timestamp">
                            {new Date(timestamp?.toDate()).toLocaleDateString()} {new Date(timestamp?.toDate()).toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                    {
                        displayName === user.displayName &&
                            <div className="post__headerRight">
                                <div className="post__clear">
                                    <Button onClick={deletePost}>
                                        <ClearIcon fontSize='small' />
                                    </Button>
                                </div>
                            </div>
                    }
                    
                </div>
                <div className="post__headerDescription">
                    <p>{text}</p>
                </div>
                {image &&
                    <div className="post__image">
                        <img
                            onClick={displayImage}
                            src={image}
                            alt=""
                        />
                    </div>
                 }
                <div className="post__footer">
                    <div style={{display: "flex", alignItems: "center"}}>
                    <Button>
                        {commentOpen && comments.length > 0 ? (
                            <ChatBubbleIcon fontSize="small" onClick={() => setCommentOpen(!commentOpen)} />
                        ) : (
                            <ChatBubbleOutlineIcon fontSize="small" onClick={() => setCommentOpen(!commentOpen)} />
                        )}
                    </Button>
                        {comments.length}
                    </div>
                    <Button>
                        <RepeatIcon fontSize="small" />
                    </Button>
                        <LikePost id = {postId} username={user.displayName} likes={likeId} isLiked = {isLiked[0]} />
                    <Button>
                        <PublishIcon fontSize="small" />
                    </Button>
                </div>
                <FlipMove>

                {
                    <form className="post__commentBox">
                        <input
                         type="text"
                         className="post__input"
                         placeholder='Add a comment...'
                         value={comment}
                         onChange={(e) => setComment(e.target.value)}
                         />
                        
                        <button
                            disabled={!comment}
                            className='post__button'
                            type='submit'
                            onClick={postComment}
                        >Post</button>
                    </form>
                }

                    {
                        commentOpen && 
                        (
                            <div className="post__comments">
                                <FlipMove>
                                    {comments?.map((comment) => (
                                        <Comment
                                            key={comment.id}
                                            profilePhoto = {comment.data.profilePhoto}
                                            username={comment.data.username}
                                            timestamp={comment.data?.timestamp}
                                            text={comment.data.text}
                                            postId={postId}
                                            commentId={comment.id}
                                            user={user}
                                        />
                                    ))}
                                </FlipMove>
                            </div>
                        )
                    }
                </FlipMove>
            </div>
        </div>
    );
});

export default Post;