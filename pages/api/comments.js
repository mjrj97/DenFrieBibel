import { readFileSync } from 'fs';

const handler = (req, res) => {
    let result = {
        content: undefined,
        errors: []
    };
    let status = 200;

    if (req.method === "GET") {
        result.content = JSON.parse(readFileSync('./texts/sample-comments/comment.json'));
    }
    else {
        status = 405; // Method Not Allowed
        result.errors.push("HTTP " + req.method + " is not a valid method for this API.");
    }
    
    res.status(status).json(result);
}

export default handler;