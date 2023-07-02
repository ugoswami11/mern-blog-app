import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost(){
    const [title, setTtile] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev){
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        ev.preventDefault();
        const response = await fetch('http://localhost:5000/post', {
            method: 'POST',
            body: data,
            credentials: 'include', 
        });


        if(response.ok){
            setRedirect(true);
        }else{
            alert('There was some error creating post');
        }
        
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return(
        <form action="" onSubmit={createNewPost}>
            <input type="title" placeholder={'Title'} value={title}
                onChange={ev => setTtile(ev.target.value)}
            />
            <input type="summary" placeholder={'Summary'} value={summary}
                onChange={ev => setSummary(ev.target.value)}
            />
            <input type="file" onChange={ev => setFiles(ev.target.files)}/>
            <Editor onChange={setContent} value={content} />
            <button style={{marginTop:'5px'}}>Create post</button>
        </form>
    )
}