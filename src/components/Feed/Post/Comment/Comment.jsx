import { Avatar, Button } from '@material-ui/core';
import Clear from '@material-ui/icons/Clear';
import './Comment.css';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { forwardRef } from 'react';
import db from '../../../../firebase';

const Comment = forwardRef(({ profilePhoto, username, timestamp, text, postId, commentId, user }, ref) => {

    const removeComment = () => {
        db.collection("posts").doc(postId).collection("comments").doc(commentId).delete();
    }
    
    return (
        <div className="comment" ref={ref}>
            <Avatar src={profilePhoto} className='comment__avatar' />
            <div className="comment__info">
                <div className='comment__text'>
                    <div className='comment__username'>
                        <p> {username} </p>
                         <VerifiedUserIcon className='comment__badge'/> <p> @{username.toLowerCase().replace(/\s/g, '')} </p> 
                    </div> 
                    {text}
                </div>
                <span className="comment__timestamp">
                    {new Date(timestamp?.toDate()).toUTCString()}
                </span>
            </div>
            {username === user.displayName && 
                <div className="comment__clear">
                    <Button onClick={removeComment}>
                        <Clear fontSize='small' style={{color: "#C70000"}} />
                    </Button>
                </div>
            }
        </div>
    );
});
export default Comment;
