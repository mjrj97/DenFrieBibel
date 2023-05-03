import { connection } from '@/src/db/connection';
import { serialize } from 'cookie';

const handler = async (req, res) => {
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

    res.status(200).send();
}

export default handler;