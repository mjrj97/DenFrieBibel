import { useState, useEffect } from 'react'

import Comment from "./Comment"

const CommentContainer = ({ selected }) => {  
    const [comments, setComments] = useState([]);
    
    // MISSING
    // - X button to close the window

    useEffect(() => {
        fetch("/api/comments").then(
          response => response.json()
        ).then(
          data => {
            setComments(data.content.comments);
          }
        );
      }, []);

    return (
        selected.length > 0 ? 
        <div className='sticky-top sticky-comment'>
            <div className="comment-container thirty p-4">
                {
                    (Array.isArray(comments)) ? (comments.map((comment, i) => 
                        <div  key={"comment" + i}>
                            <Comment id={comment.uuid} author={comment.user.name} 
                                date={comment.date}
                                favorites={comment.favorites}
                                replies={comment.replies}>
                                {comment.content}
                            </Comment>
                            <hr className="solid"></hr>
                        </div>
                    )) : ""
                }
                <form className="form-group row mt-1">
                    <div className="col-9">
                        <input type="text" className="form-control col-9" placeholder="Nyt opslag"/>
                    </div>
                    <button type="submit" className="btn btn-primary col-3">Indsend</button>
                </form>
            </div>
        </div>
        :
        <></>
    )
}

export default CommentContainer