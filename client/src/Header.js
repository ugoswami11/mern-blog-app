import { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import './Config';

export default function Header(){
  const {setUserInfo,userInfo} = useContext(UserContext);

  useEffect(() => {
    fetch(global.config.apiUrl+'/profile', {
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
    fetch(global.config.apiUrl+'/logout', {
      credentials: 'include',
      method: 'POST',
      mode: 'cors',
    })
    setUserInfo(null);
  }

  const username = userInfo?userInfo.username: '';

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
