import { useState, useEffect } from 'react'
import styles from './CommentContainer.module.css';
import Comment from "./Comment"
import Loading from "../main/Loading"

const CommentContainer = ({ selected }) => {  
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let query = "[" + selected[0];
        for (let i = 1; i < selected.length; i++) {
            query += "," + selected[i];
        }
        query += "]";

        fetch("/api/comments?verses=" + query).then(
          response => response.json()
        ).then(
          data => {
            setComments(data.content.comments);
          }
        );
    }, [selected]);

    return (
        <div className={`sticky-top ${styles.stickyComment}`}>
            <div className={`thirty p-4 ${styles.commentContainer}`}>
                {
                    comments.length > 0 ? (comments.map((comment, i) => 
                        <div key={"comment" + i}>
                            <Comment id={comment.uuid} author={comment.user.name} 
                                date={comment.date}
                                favorites={comment.favorites}
                                replies={comment.replies}>
                                {comment.content}
                            </Comment>
                            <hr className="solid"></hr>
                        </div>
                    )) : <Loading/>
                }
                <form className="form-group row mt-1">
                    <div className="col-9">
                        <input type="text" className="form-control col-9" placeholder="Nyt opslag"/>
                    </div>
                    <button type="submit" className="btn btn-primary col-3">Indsend</button>
                </form>
            </div>
        </div>
    )
}

export default CommentContainer