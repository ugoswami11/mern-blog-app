import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost(){
    const {id} = useParams();
    const [title, setTtile] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [imgLink, setImgLink] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        fetch(`http://localhost:5000/post/${id}`).then(response =>{
            response.json().then(postInfo=>{
                setTtile(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
                setImgLink(postInfo.coverImg);
            })
        })
    },[id])

    async function updatePost(ev){
        ev.preventDefault();

        const response = await fetch('http://localhost:5000/post',{
            method: 'PUT',
            body: JSON.stringify({id, title, summary, content, imgLink}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include', 
        });

        if(response.ok){
            setRedirect(true);
        }
    }   

    
    if(redirect){
        return <Navigate to={`/post/${id}`} />
    }

    return(
        <form action="" onSubmit={updatePost}>
            <input type="title" placeholder={'Title'} value={title}
                onChange={ev => setTtile(ev.target.value)}
            />
            <input type="summary" placeholder={'Summary'} value={summary}
                onChange={ev => setSummary(ev.target.value)}
            />
            <input type="text" placeholder={'image link'} value={imgLink}
                onChange={ev => setImgLink(ev.target.value)}
            />
            <Editor onChange={setContent} value={content} />
            <button style={{marginTop:'5px'}}>Edit Post</button>
        </form>
    )
}