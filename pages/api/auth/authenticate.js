import { connection } from '@/src/db/connection';
import { arrayResult } from '@/src/db/Parser';

const handler = async (req, res) => {
    let sessionResult = arrayResult(await connection.query('SELECT * FROM Session WHERE SessionID = ?', [req.cookies["session-token"]]));

    let user = null;

    if (sessionResult.length > 0) {
        let userResult = arrayResult(await connection.query('SELECT * FROM User WHERE UserID = ?', [sessionResult[0].UserID]));

        user = {
            name: userResult[0].Name
        }
    }

    await connection.end();

    res.status(200).json(user);
}

export default handler;