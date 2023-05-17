import { loginValidation } from '@/src/auth/Validation';
import { objectResult } from '@/src/db/parser';
import { connection } from '@/src/db/connection.js';
import { serialize } from 'cookie';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const handler = async (req, res) => {
    let result = {
        content: undefined,
        errors: []
    };
    let status = 200;
    
    if (req.method === "POST") {
        const user = req.body;
        let validationError = loginValidation(user.email, user.password);

        if (validationError) {
            status = 400;
            result.errors.push(validationError);
        } 
        else {
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
                    status = 200;
                } 
                else {
                    validationError = {
                        email: "",
                        password: "Forkert email eller adgangskode."
                    }

                    status = 401;
                    result.errors.push(validationError);
                }
            }
            else {
                validationError = {
                    email: "",
                    password: "Forkert email eller adgangskode."
                }

                status = 401;
                result.errors.push(validationError);
            }

            await connection.end();
        }
    }
    else {
        status = 405; // Method Not Allowed
        result.errors.push("HTTP " + req.method + " is not a valid method for this API.");
    }

    res.status(status).json(result);
}

export default handler;