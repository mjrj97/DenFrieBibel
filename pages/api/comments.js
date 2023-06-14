import { connection } from '@/src/db/connection.js';
import { arrayResult } from '@/src/db/parser';

const handler = async (req, res) => {
    let data = {
        result: {
            content: undefined,
            errors: []
        },
        status: 200
    };

    let contentType = req.headers["content-type"];
    if ((contentType && contentType.trim().toLowerCase() === "application/json" && req.body) || !req.body) {
        try {
            if (req.method === "GET") {
                data = await Get(req);   
            }
            else if (req.method === "POST") {
                data = await Post(req);
            }
            else if (req.method === "DELETE") {
                data = await Delete(req);
            }
            else {
                data.status = 405; // Method Not Allowed
                data.result.errors.push("HTTP " + req.method + " er ikke en tilladt metode for denne API.");
            }
        }
        catch (error) {
            data.status = 500; // Internal Server Error
            data.result.errors.push("Intern server fejl.");
        }
    }
    else {
        data.status = 400; // Bad request
        data.result.errors.push("Denne API kan ikke modtage andre \"content types\" end 'application/json'.");
    }

    res.status(data.status).json(data.result);
}

async function Get(req) {
    let result = {
        content: undefined,
        errors: []
    };
    let status = 200;

    let verses = req.query.verses;
    if (verses) {
        verses = verses.trim();
        if (verses[0] == "[" && verses[verses.length - 1] == "]") {
            verses = verses.substring(1,verses.length - 1);
            if (/^[ 0-9,]*$/.test(verses)) {
                verses = verses.split(",");
                let givenVerses = [];
                for (let i = 0; i < verses.length; i++) {
                    if (verses[i].length > 0) {
                        givenVerses.push(parseInt(verses[i].trim()));
                    }
                }
                let sessionResult = arrayResult(await connection.query('SELECT * FROM VerseComment WHERE VerseID IN (?)', [givenVerses]));

                let comments = [];
                if (sessionResult.length > 0) {
                    // Create array of comments ID's with no repeated values
                    let commentIDs = [];
                    for (let i = 0; i < sessionResult.length; i++) {
                        commentIDs.push(sessionResult[i].CommentID);
                    }
                    commentIDs = [...new Set(commentIDs)];

                    sessionResult = arrayResult(await connection.query('SELECT VerseComment.CommentID, VerseComment.VerseID, Verse.Number FROM VerseComment JOIN Verse ON Verse.VerseID=VerseComment.VerseID WHERE VerseComment.CommentID IN (?)', [commentIDs]));

                    let sessionResult2 = arrayResult(await connection.query('SELECT Comment.CommentID, User.UserID, User.Name, Comment.Text, Comment.Time FROM Comment JOIN User ON User.UserID=Comment.UserID WHERE Comment.CommentID IN (?)', [commentIDs]));
    
                    for (let i = 0; i < sessionResult2.length; i++) {
                        let comment = sessionResult2[i];
                        let verses = [];
    
                        for (let j = 0; j < sessionResult.length; j++) {
                            if (sessionResult[j].CommentID == comment.CommentID)
                            {
                                verses.push({
                                    id: sessionResult[j].VerseID,
                                    number: sessionResult[j].Number
                                });
                            }
                        }
    
                        comments.push({
                            id: comment.CommentID,
                            user: {
                                id: comment.UserID,
                                name: comment.Name
                            },
                            content: comment.Text,
                            time: comment.Time,
                            favorites: 0,
                            replies: 0,
                            verses
                        });
                    }
                }
                
                result.content = comments;
            }
            else {
                status = 400; // Bad Request
                result.errors.push("Listen af vers skal være komma-separeret, og må kun indeholde numre f.eks. [1,2,3].");
            }
        }
        else {
            status = 400; // Bad Request
            result.errors.push("Listen af vers er ikke korrekt formateret. De skal gives som i dette eksempel: /api/comments?verses=[1,2,3, ...]");
        }
    }
    else {
        status = 400; // Bad Request
        result.errors.push("En liste af vers skal angives. Gør dette med /api/comments?verses=[1,2,3, ...]");
    }

    return {
        status,
        result
    }
}

async function Post(req) {
    let result = {
        content: undefined,
        errors: []
    };
    let status = 200;

    let comment = req.body.comment;
    let selected = req.body.selected;

    let cookie = req.cookies["session-token"];
    if (comment.trim().length > 0) {
        if (selected.length > 0) {
            if (cookie && cookie != "DELETED") {
                let sessionResult = arrayResult(await connection.query('SELECT * FROM Session WHERE SessionID = ?', [req.cookies["session-token"]]))[0];
                if (sessionResult) {
                    let id = (await connection.query('INSERT INTO Comment (UserID, Text, Time) VALUES (?, ?, ?);', [sessionResult.UserID, comment, Date.now()])).insertId;
                    for (let i = 0; i < selected.length; i++) {
                        await connection.query('INSERT INTO VerseComment (VerseID, CommentID) VALUES (?, ?);', [selected[i], id]);
                    }
                    
                    let user = arrayResult(await connection.query('SELECT UserID as id, Name as name FROM User WHERE UserID = ?', [sessionResult.UserID]))[0];
    
                    let verses = [];
                    for (let i = 0; i < selected.length; i++) {
                        verses.push({
                            id: selected[i],
                            number: 0
                        });
                    }
    
                    status = 201;
                    result.content = {
                        commentID: id,
                        user: user,
                        content: comment,
                        replies: 0,
                        favorites: 0,
                        time: Date.now(),
                        verses
                    }
                }
                else {
                    status = 401; // Unauthorized
                    result.errors.push("Request havde ikke gyldig session token.");
                }
            }
            else {
                status = 401; // Unauthorized
                result.errors.push("Request havde ikke gyldig session token.");
            }
        }
        else {
            status = 400; // Bad request
            result.errors.push("Kommentaren skal være kædet til min. et vers.");
        }
    }
    else {
        status = 400; // Bad request
        result.errors.push("Kommentaren kan ikke være tom.");
    }

    return {
        status,
        result
    }
}

async function Delete(req) {
    let result = {
        content: undefined,
        errors: []
    };
    let status = 200;

    let id = req.query.id;
    if (id) {
        let sessionResult = arrayResult(await connection.query('SELECT UserID FROM Session WHERE SessionID = ?', [req.cookies["session-token"]]))[0];
        if (sessionResult) {
            let comment = arrayResult(await connection.query('SELECT UserID FROM Comment WHERE CommentID = ?', [id]))[0];
            if (comment) {
                if (comment.UserID == sessionResult.UserID) {
                    await connection.query('DELETE FROM VerseComment WHERE CommentID = ?', [id]);
                    await connection.query('DELETE FROM Comment WHERE CommentID = ?', [id]);
        
                    status = 200; // OK
                }
                else {
                    status = 401; // Unauthorized
                    result.errors.push("Brugeren kædet til dette session token, kan ikke slette denne kommentar.");
                }
            }
            else {
                status = 404; // Not found
                result.errors.push("Der kunne ikke findes en kommentar med dette id.");
            }
        }
        else {
            status = 401; // Unauthorized
            result.errors.push("Request havde ikke gyldig session token.");
        }
    }
    else {
        status = 400; // Bad Request
        result.errors.push("En kommentar skal være angivet med id, for at den kan slettes. Gør dette med /api/comments?id=[...]");
    }

    return {
        status,
        result
    }
}

export default handler;