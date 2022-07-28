import { auth, provider } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import { Button } from "@material-ui/core";
import "./Login.css";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert("Oops...Check your network and try again");
      });
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/ar/9/9f/Twitter_bird_logo_2012.svg"
          alt="twitter bird logo"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Twitter_logo.svg"
          alt="twitter logo"
        />
      </div>
      <Button type="submit" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Login;
