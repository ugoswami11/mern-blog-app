import { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header(){
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('https://mern-blog-api-xuvz.onrender.com/profile', {
      credentials: 'include',
      mode: 'cors'
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      }).catch(function (error){
        console.log(error);
      });
    });
  }, []);

  function logout(){
    fetch('https://mern-blog-api-xuvz.onrender.com/logout', {
      credentials: 'include',
      method: 'POST',
      mode: 'cors',
    })
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return(
    <header>
      <Link to="/">Blogpoint</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <Link to="/" onClick={logout}>Logout</Link>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        
      </nav>
  </header>
  );
}
