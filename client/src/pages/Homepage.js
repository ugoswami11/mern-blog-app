import { useEffect, useState } from 'react';
import Post from '../Post'

export default function Homepage(){
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        fetch('https://mern-blog-api-amber.vercel.app/post').then( response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    },[]);

    return(
        <>
            {posts.length > 0 && posts.map(post => (
                <Post key={post._id} {...post}/>
            ))}
        </>
    );
}