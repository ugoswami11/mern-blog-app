import { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header(){
  const {setUserInfo, userInfo, ready} = useContext(UserContext);;

  useEffect(() =>{
    fetch('http://localhost:5000/profile',{
      credentials: 'include',
    }).then(response => {
        response.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })
  },[]);

  function logout(){
    fetch('http://localhost:5000/logout', {
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null);
  }

  if(!ready) return '';

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
