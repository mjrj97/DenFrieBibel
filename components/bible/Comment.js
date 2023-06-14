import { useState } from 'react'
import styles from './Comment.module.css';
import Image from 'next/image';

function Comment({ author, children, favorites, time, replies, id }) {
    const [showComments, setShowComments] = useState(false);
    const [favorite, setFavorite] = useState(false);

    // MISSINGS:
    // - Report button
    // - Edit button

    return (
        <div id={id} className={styles.comment}>
            <div className="container">
                <div className="row">
                    <div className="col-2 p-2">
                        <Image alt="User profile picture" src='/user.png' className={styles.commentProfileImage} width={100} height={100}/>
                    </div>
                    <div className="col-10">
                        <div className='pb-1'>
                            <a className='link-dark' href="#"><strong>{author}</strong></a>
                            <span style={{ fontStyle: "italic", fontSize: "0.75rem"}}> - {TimeToDateString(time)}</span>
                        </div>
                        <span>{children}</span><br/>
                        <div>
                            <button className='btn btn-sm px-1' onClick={() => setFavorite(!favorite)}>&#x2B50; {favorite ? (favorites + 1) : favorites}</button>
                            <button className='btn btn-sm px-1 mx-3' onClick={() => setShowComments(!showComments)}>&#x1F4AC; {replies}</button>
                        </div>
                        {/* showComments ?
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
                        */}
                    </div>
                </div>
            </div>
        </div>
    )
}

function TimeToDateString(time) {
    const today = new Date(time);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '/' + mm + '/' + yyyy;
}

export default Comment