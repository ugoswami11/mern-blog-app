import { useEffect, useState } from 'react';
import Post from '../Post'
import axios from "axios";

export default function Homepage(){
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            const {data} = await axios.get('/post');
            setPosts(data);
        }
        fetchData();
    },[]);

    return(
        <>
            {posts.length > 0 && posts.map(post => (
                <Post key={post._id} {...post}/>
            ))}
        </>
    );
}