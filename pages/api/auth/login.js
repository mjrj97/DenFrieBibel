import { loginValidation } from '@/src/auth/Validation';
import { objectResult } from '@/src/db/Parser';
import { connection } from '@/src/db/connection';
import { serialize } from 'cookie';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const handler = async (req, res) => {
    const user = req.body;
    let validationError = loginValidation(user.email, user.password);

    if (validationError) {
        res.status(400).json(validationError);
    } else {
        const result = objectResult(await connection.query('SELECT * FROM User WHERE Email = ?', [user.email]));
        
        if (result.length > 0) {
            const database = result[0];

            if(await bcrypt.compare(user.password, database.HashedPassword)) {
                await connection.query('DELETE FROM Session WHERE UserID = ?', [database.UserID]);
                
                let session = {
                    id: crypto.randomUUID(),
                    userID: result[0].UserID,
                    lastRefresh: Date.now()
                }

                await connection.query('INSERT INTO Session (SessionID, UserID, LastRefresh) VALUES (?, ?, ?);', [session.id, session.userID, session.lastRefresh])

                const cookie = serialize("session-token", session.id, {
                    httpOnly: true,
                    path: "/",
                    sameSite: "strict",
                    expires: new Date(new Date().getTime()+(5*24*60*60*1000)), // Expires 5 days later
                    secure: true
                });

                res.setHeader("Set-Cookie", cookie);
                res.status(200).json({});
            } else {
                validationError = {
                    email: "",
                    password: "Forkert email eller adgangskode."
                }

                res.status(401).json(validationError);
            }
        }
        else {
            validationError = {
                email: "",
                password: "Forkert email eller adgangskode."
            }

            res.status(401).json(validationError);
        }

        await connection.end();
    }
}

export default handler;