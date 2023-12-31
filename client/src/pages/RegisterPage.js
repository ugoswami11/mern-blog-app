import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function register(event){
        event.preventDefault();
        
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if(response.status === 200){
            alert('Registration successfull');
            navigate('/');
        }else{
            alert('Registration failed');
        }
        
    }

    return(
        <form className="register" action="" method="post" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" name="" id="username" placeholder="username" value={username} onChange={ev => setUsername(ev.target.value)} />
            <input type="password" name="" id="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}/>
            <button type="submit">Register</button>
        </form>
    );
}