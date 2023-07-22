import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Editor from "../Editor";


export default function EditPost(){
    const {id} = useParams();
    const [title, setTtile] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [imgLink, setImgLink] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        async function fetchData(){
            const {data} = await axios.get(`/post/${id}`);
            setTtile(data.title);
            setSummary(data.summary);
            setContent(data.content);
            setImgLink(data.coverImg);
        }
        fetchData();
    },[id])

    async function updatePost(ev){
        ev.preventDefault();
        const postData = {id, title, summary, content, imgLink};
        try{
            await axios.put('/post',postData);
            setRedirect(true);
        }catch(err){
            alert('There was some error while updating post');
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