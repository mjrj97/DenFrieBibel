import { readFileSync } from 'fs';

const handler = (req, res) => {
    let comments = JSON.parse(readFileSync('./texts/sample-comments/comment.json'));

    res.json(comments);
}

export default handler;