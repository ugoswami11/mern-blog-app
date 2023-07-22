import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import axios from "axios";

export default function CreatePost(){
    const [title, setTtile] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [imgLink, setImgLink] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev){
        
        ev.preventDefault();

        try{
            const response = await axios.post('/post',{title, summary, content, imgLink})
            setRedirect(true);
        }
        catch(err){
            alert('There was some error creating post');
        }
        
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return(
        <form  onSubmit={createNewPost}>
            <input type="title" placeholder={'Title'} value={title}
                onChange={ev => setTtile(ev.target.value)}
            />
            <input type="summary" placeholder={'Summary'} value={summary}
                onChange={ev => setSummary(ev.target.value)}
            />
            <input type="text" placeholder={'Image link'} value={imgLink} 
                onChange={ev => setImgLink(ev.target.value)} />
            <Editor onChange={setContent} value={content} />
            <button style={{marginTop:'5px'}}>Create post</button>
        </form>
    )
}