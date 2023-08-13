import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import EditPostOptions from "../EditPostOptions";


export default function PostPage(){
    const {id} = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const {userInfo, ready} = useContext(UserContext); 
    

    useEffect(() => {
        async function fetchData(){
            const response = await fetch(`http://localhost:5000/post/${id}`);
            const postData = await response.json();
            setPostInfo(postData);
        }
        fetchData();
    },[]);

    if(!postInfo || !ready) return '';

    return(
        <div className="post-page">
            <h2>{postInfo.title}</h2>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author">@{postInfo.author.username}</div>            
            <EditPostOptions postInfo={postInfo} id={id} userInfo={userInfo}/>
            <div className="image">
                <img src={`http://localhost:5000/${postInfo.coverImg}`} alt="" />
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </div>
    );
}