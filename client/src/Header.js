import { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import './Config';

export default function Header(){
  const {setUserInfo,userInfo} = useContext(UserContext);

  useEffect(async () => {
    await fetch(global.config.apiUrl+'/profile', {
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
          <div className="header-links">
            <Link to="/create">Create post</Link>
            <Link to="/" onClick={logout}>Logout</Link>
          </div>
        )}
        {!username && (
          <div className="header-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
        
      </nav>
  </header>
  );
}
