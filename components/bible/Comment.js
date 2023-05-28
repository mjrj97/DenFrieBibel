import { useState } from 'react'
import styles from './Comment.module.css';

function Comment({ author, children, favorites, date, replies, uuid }) {
    const [showComments, setShowComments] = useState(false);
    const [favorite, setFavorite] = useState(false);

    // MISSINGS:
    // - Report button
    // - Edit button

    return (
        <div id={uuid} className={styles.comment}>
            <div className="container">
                <div className="row">
                    <div className="col-2 p-2">
                        <img src='/user.png' className={styles.commentProfileImage}/>
                    </div>
                    <div className="col-10">
                        <div className='pb-1'>
                            <a className='link-dark' href="#"><strong>{author}</strong></a>
                            <span style={{ fontStyle: "italic", fontSize: "0.75rem"}}> - {date}</span>
                        </div>
                        <span>{children}</span><br/>
                        <div>
                            <button className='btn btn-sm px-1' onClick={() => setFavorite(!favorite)}>&#x2B50; {favorite ? (favorites + 1) : favorites}</button>
                            <button className='btn btn-sm px-1 mx-3' onClick={() => setShowComments(!showComments)}>&#x1F4AC; { (Array.isArray(replies)) ? replies.length : 0}</button>
                        </div>
                        { showComments ?
                            <div>
                                <hr className="solid"></hr>
                                {
                                    (Array.isArray(replies)) ? (replies.map((reply, i) => 
                                    <div key={i}>
                                        <div>
                                            <div className='pb-1'>
                                                <a className='link-dark' href="#"><strong>{reply.user.name}</strong></a>
                                                <span style={{ fontStyle: "italic", fontSize: "0.75rem"}}> - {reply.date}</span>
                                            </div>
                                            <span>{reply.content}</span>
                                        </div>
                                        <hr/>
                                    </div>
                                    )) : ""
                                }
                                <form className="form-group row mt-1">
                                    <div className="col-9">
                                        <input type="text" className="form-control form-control-sm col-9" placeholder="Skriv en kommentar"/>
                                    </div>
                                    <button type="submit" className="btn btn-sm btn-secondary col-3">Send</button>
                                </form>
                            </div>
                            :
                            <></>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment