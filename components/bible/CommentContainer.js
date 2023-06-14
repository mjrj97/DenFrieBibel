import { useState, useEffect } from 'react'
import styles from './CommentContainer.module.css';
import Comment from "./Comment"
import Loading from "../main/Loading"

const CommentContainer = ({ selected }) => {  
    const [comments, setComments] = useState();
    const [comment, setComment] = useState("");

    useEffect(() => {
        let query = "[" + selected[0];
        for (let i = 1; i < selected.length; i++) {
            query += "," + selected[i];
        }
        query += "]";

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch("/api/comments?verses=" + query, requestOptions).then(
            response => response.json()
        ).then(data => {
            let content = data.content;
            if (content)
                setComments(data.content);
            else
                setComments([]);
        });
    }, [selected]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                comment,
                selected
            })
        };
        fetch('/api/comments', requestOptions).then(response => {
            if (response.status === 201) {
                response.json().then(
                    data => {
                        let array = [...comments];
                        array.push(data.content);
                        setComments(array);
                    }
                );
                setComment("");
            }
        });
    }
    
    return (
        <div className={`sticky-top ${styles.stickyComment} d-none d-md-block`}>
            <div className={`thirty p-4 ${styles.commentContainer}`}>
                {
                    comments ? (comments.length > 0 ? (comments.map((comment, i) => 
                        <div key={"comment" + i}>
                            <Comment id={comment.id + "c"} author={comment.user.name} 
                                time={comment.time}
                                favorites={comment.favorites}
                                replies={comment.replies}>
                                {comment.content}
                            </Comment>
                            <hr className="solid"></hr>
                        </div>
                    )) : <p>Ingen kommentarer...</p>) : <Loading/>
                }
                <form className="form-group row mt-1" onSubmit={handleSubmit}>
                    <div className="col-9">
                        <input type="text" id="comment" value={comment} onChange={(e)=> setComment(e.target.value)} className="form-control col-9" placeholder="Nyt opslag"/>
                    </div>
                    <button type="submit" className={"btn btn-primary col-3" + (comment.trim().length > 0 ? "" : " disabled")}>Indsend</button>
                </form>
            </div>
        </div>
    )
}

export default CommentContainer