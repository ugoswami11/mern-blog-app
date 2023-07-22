import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    async function login(ev){
        ev.preventDefault();
        try{
            const {data} = await axios.post('/login',{username, password})
            setUserInfo(data);
            setRedirect(true);
            
        }catch(err){
            alert('wrong credentials');
        }
        
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }

    return(
        <form className="login" action="" method="post"
            onSubmit={login}
        >
            <h1>Login</h1>
            <input type="text" name="" id="username" placeholder="username"
                value={username}
                onChange={ev => setUsername(ev.target.value)}
            />
            <input type="password" name="password" id="" placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
}