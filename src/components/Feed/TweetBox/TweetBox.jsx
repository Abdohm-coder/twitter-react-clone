import './TweetBox.css';
import { Avatar, Button } from '@material-ui/core';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import { useState } from 'react';
import db from '../../../firebase';
import { storage } from '../../../firebase';
import firebase from 'firebase';
import { useStateValue } from '../../../StateProvider';
import Clear from '@material-ui/icons/Clear';

export default function TweetBox({ profile }) {

    const [tweetMessage, setTweetMessage] = useState('');
    const [{ user }, dispatch] = useStateValue();

    // Upload Image

    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
    const [displayIMG, setDisplayIMG] = useState(null);
    const [uRL, setURL] = useState([]);

    // handleChange = handleChange.bind()

     const handleChange = (e) => {
        if (e.target.files[0]) {
            let img = e.target.files[0];
            setDisplayIMG(URL.createObjectURL(img));
            setImage(e.target.files[0])
        };
        
    };

    const removeIMG = () => {
        setImage(null)
        setDisplayIMG(null);
    }

    const sendTweet = (e) => {
        e.preventDefault();

        if(tweetMessage && !image) {
            db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                displayName: user.displayName,
                username: user.displayName.toLowerCase().replace(/\s/g, ''),
                profilePic: user.photoURL,
                text: tweetMessage,
                verified: true,
            });
            setTweetMessage("");
        } 

        if(image) {
                // Upload Image
                const uploadTask = storage.ref(`images/${image?.name}`).put(image);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // progress function
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress)
                    },
                    (error) => {
                        // Error function
                        alert("حدث خطأ أثناء تحميل الصورة ")
                    },
                    () => {
                        // Complete function
                        storage
                            .ref("images")
                            .child(image?.name)
                            .getDownloadURL()
                            .then(url => {
                                // Post Image inside db
                                    db.collection("posts").add({
                                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                        displayName: user.displayName,
                                        username: user.displayName.toLowerCase().replace(/\s/g, ''),
                                        profilePic: user.photoURL,
                                        text: tweetMessage,
                                        verified: true,
                                        image: url
                                    })
                                setProgress(0);
                                setImage(null);
                                setDisplayIMG(null)
                                setTweetMessage("");
                            });
                    });
            

        }
    


    };

    return (
        <div className='tweetBox'>
            <form>
                <div className="tweetBox__input">
                    <Avatar src={profile} />
                    <input
                     type="text"
                     value={tweetMessage}
                     onChange={(e) => setTweetMessage(e.target.value)}
                     placeholder="What's happening?" />
                    

                    <input type='file' id='file' onChange={handleChange} />
                    <label className='tweetBox__label' htmlFor="file">
                        <CropOriginalIcon className='imageCrop' />
                    </label>
                </div>

                {image &&
                    <div className="tweetBox__displayImage">
                        <div className="displayImage__container">
                            <div className="displayImage__item">
                                <Button onClick={removeIMG}>
                                    <Clear fontSize='small' className='displayImage__clear' />
                                </Button>
                                <img
                                className=''
                                src={displayIMG} 
                                alt="" />
                                <div className="displayImage__top">
                                    <p className='tweetBox__imageName'> {image.name} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {image && (
                    <div className="progressUpload">
                        <progress value={progress} max='100' />
                    </div>
                )}

                <Button onClick={sendTweet} type='submit' className='tweetBox__tweetButton'>Tweet</Button>
            </form>
        </div>
    );
};
