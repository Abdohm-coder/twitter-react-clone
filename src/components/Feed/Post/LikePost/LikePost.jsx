import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from '@material-ui/icons/Favorite';
import db from "../../../../firebase";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";

function LikePost({ id, username, likes}) {

    const [Liked, setLiked] = useState(false);

    useEffect(() => {
        setLiked(
            likes.findIndex((like) => like?.data === username) !== -1
        )
    }, [likes, username]);

    const postLikes = () => {

        setLiked(!Liked);
        
        for(let i = 0; i < likes.length; i++) {
            if (likes[i].data === username) {
                db.collection("posts").doc(id).collection("likes").doc(likes[i].id).delete();
            }
        }
        if (!Liked) {
            db.collection("posts")
                .doc(id)
                .collection("likes")
                .add({
                    like: true,
                    username: username
                });

        }
    
    }

return (
    <div style={{display: "flex", alignItems: "center"}}>
        <Button>
            { Liked ? (
                <FavoriteIcon onClick={postLikes} fontSize='small' />

            ) : (
                <FavoriteBorderIcon onClick={postLikes} fontSize="small" />
            )}
        </Button>
        <p>
            {likes.length}
        </p>
    </div>
    );
};

export default LikePost;
