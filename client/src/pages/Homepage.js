import { useEffect, useState } from 'react';
import Post from '../Post'

export default function Homepage(){
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/post').then( response => {
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