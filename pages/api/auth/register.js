import { registerValidation } from '@/src/auth/Validation';
import { arrayResult, objectResult } from '@/src/db/parser';
import { connection } from '@/src/db/connection';
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
        let user = req.body;
        let validationError = registerValidation(user.name, user.email, user.password, user.confirmPassword);

        if (validationError) {
            status = 400;
            result.errors.push(validationError);
        }
        else {
            let rows = await connection.query('SELECT * FROM User');
            let results = arrayResult(rows);

            // Check whether a user is already using that email
            let emailIsInUse = false;
            for (let i = 0; i < results.length && !emailIsInUse; i++) {
                if (results[i].Email == user.email)
                {
                    emailIsInUse = true;
                }
            }

            if (emailIsInUse) 
            {
                // Return error if email is in use
                validationError = {
                    email: "Denne email er allerede i brug."
                }

                status = 400;
                result.errors.push(validationError);
            }
            else 
            {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                const result = objectResult(await connection.query('INSERT INTO User (Name, Email, HashedPassword, Confirmed) VALUES (?, ?, ?, ?);', [user.name, user.email, hashedPassword, false]));
                
                await connection.query('DELETE FROM Session WHERE UserID = ?', [result.insertId]);
                    
                let session = {
                    id: crypto.randomUUID(),
                    userID: result.insertId,
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

                status = 201;
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