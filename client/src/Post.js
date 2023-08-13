
import { format } from "date-fns/esm";
import { Link } from "react-router-dom";

export default function Post({_id,title, summary, content, coverImg, createdAt, author}){
  return(
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={'http://localhost:5000/'+coverImg} alt=""></img>
        </Link>
      </div>
      <div className="content">
        <Link to={`/post/${_id}`}>
          <h4 className="title">{title}</h4>
        </Link>
        <p className="info">
          <Link href="/" className="author">{author.username}</Link>
          <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
