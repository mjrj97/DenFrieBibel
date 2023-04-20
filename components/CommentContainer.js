const CommentContainer = () => {    
    return (
        <div className='sticky-top sticky-comment pt-4'>
            <div className="comment-container thirty">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link rounded-0 active" id="translation-tab" data-bs-toggle="tab" data-bs-target="#translation" type="button" role="tab" aria-controls="translation" aria-selected="true">Oversættelse</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link rounded-0" id="interpretation-tab" data-bs-toggle="tab" data-bs-target="#interpretation" type="button" role="tab" aria-controls="interpretation" aria-selected="false">Fortolkning</button>
                    </li>
                </ul>
                <div className="tab-content thirty p-4" id="myTabContent">
                    <div className="tab-pane show active" id="translation" role="tabpanel" aria-labelledby="translation-tab">
                        <div className="comment p-2">
                            <div class="container">
                                <div class="row">
                                    <div class="col-2 p-2">
                                        <div className="comment-profile-picture"/>
                                    </div>
                                    <div class="col-10">
                                        <p>Dette er en simpel kommentar, hvor jeg kan give feedback til en oversættelse.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="interpretation" role="tabpanel" aria-labelledby="interpretation-tab">
                        med
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentContainer