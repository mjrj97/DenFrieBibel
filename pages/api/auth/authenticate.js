import { connection } from '@/src/db/connection.js';
import { arrayResult } from '@/src/db/parser';

const handler = async (req, res) => {
    let result = {
        content: undefined,
        errors: []
    };
    let status = 200;

    if (req.method === "GET") {
        let sessionResult = arrayResult(await connection.query('SELECT * FROM Session WHERE SessionID = ?', [req.cookies["session-token"]]));

        let user = null;

        if (sessionResult.length > 0) {
            let userResult = arrayResult(await connection.query('SELECT * FROM User WHERE UserID = ?', [sessionResult[0].UserID]));

            user = {
                name: userResult[0].Name
            }
        }

        await connection.end();
        
        result.content = user;
    }
    else {
        status = 405; // Method Not Allowed
        result.errors.push("HTTP " + req.method + " is not a valid method for this API.");
    }
    
    res.status(status).json(result);
}

export default handler;