import { connection } from '@/src/db/connection';
import { serialize } from 'cookie';

const handler = async (req, res) => {
    let result = {
        content: undefined,
        errors: []
    };
    let status = 200;

    if (req.method === "GET") {
        let token = req.cookies["session-token"];

        await connection.query('DELETE FROM Session WHERE UserID = ?', [token]);

        await connection.end();

        const cookie = serialize("session-token", "DELETED", {
            httpOnly: true,
            path: "/",
            sameSite: "strict",
            secure: true
        });

        res.setHeader("Set-Cookie", cookie);
    }
    else {
        status = 405; // Method Not Allowed
        result.errors.push("HTTP " + req.method + " is not a valid method for this API.");
    }
    
    res.status(status).json(result);
}

export default handler;