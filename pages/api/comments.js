import { readFileSync } from 'fs';

const handler = (req, res) => {
    let result = {
        content: undefined,
        errors: []
    };
    let status = 200;

    if (req.method === "GET") {
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
                    console.log(givenVerses);
    
                    result.content = JSON.parse(readFileSync('./texts/sample-comments/comment.json'));
                }
                else {
                    status = 400; // Bad Request
                    result.errors.push("The list of verses must be comma-separated, and only contain numbers ie. [1,2,3].");
                }
            }
            else {
                status = 400; // Bad Request
                result.errors.push("The list of verses were not formatted correctly. They must be given as in the example: /api/comments?verses=[1,2,3, ...]");
            }
        }
        else {
            status = 400; // Bad Request
            result.errors.push("A list of verses must be given. Do this with /api/comments?verses=[1,2,3, ...]");
        }
        
    }
    else {
        status = 405; // Method Not Allowed
        result.errors.push("HTTP " + req.method + " is not a valid method for this API.");
    }
    
    res.status(status).json(result);
}

export default handler;