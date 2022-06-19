import './Login.css';
import { auth, provider } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import { Button } from '@material-ui/core';

function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {

        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch ({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            }).catch ((error) => {
                alert("حدث خطأ أثناء عملية التسجيل قد تعود إلى ضعف الإتصال");
            })

    };

    return (
        <div className='login'>
            <div className='login__logo'>
                <img 
                    src = 'https://upload.wikimedia.org/wikipedia/ar/9/9f/Twitter_bird_logo_2012.svg'
                    alt = ''
                />
                <img
                    src = 'https://upload.wikimedia.org/wikipedia/commons/5/51/Twitter_logo.svg'
                    alt = ''
                />
            </div>
            <Button type='submit' onClick = {signIn}>Sign In</Button>
        </div>

    )
}

export default Login;
