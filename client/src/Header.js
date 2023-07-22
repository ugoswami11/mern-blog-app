import { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";

export default function Header(){
  const {setUserInfo,userInfo, ready} = useContext(UserContext);

  useEffect(() => {
    async function fetchData(){
      const {data} = await axios.get('/profile');
      setUserInfo(data);
    }
    fetchData();
  }, []);

  function logout(){
    axios.post('/logout');
    setUserInfo(null);
  }

  if(!ready){
    return '';
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
