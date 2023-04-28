import { RegisterValidation } from '@/src/Validation';
import { readFileSync } from 'fs';
import path from 'path';

const configDirectory = path.join(process.cwd(), 'database.config');
const mysql = require('serverless-mysql')({
    config: JSON.parse(readFileSync(configDirectory))
})

const handler = async (req, res) => {
    let body = req.body;
    let validationError = RegisterValidation(body.name, body.email, body.password, body.password);

    if (validationError) {
        res.status(400).json(validationError);
    }
    else {
        let rows = await mysql.query('SELECT * FROM User');
        let results = ArrayResult(rows);

        // Check whether a user is already using that email
        let emailIsInUse = false;
        for (let i = 0; i < results.length && !found; i++) {
            if (results[i].Email == body.email)
            {
                emailIsInUse = true;
            }
        }

        if (emailIsInUse) 
        {
            // Return error if email is in use
            validationError = {
                name: "",
                email: "Denne email er allerede i brug.",
                password: "",
                confirmPassword: ""
            }
            res.status(400).json(validationError);
        }
        else 
        {
            let result = ObjectResult(await mysql.query('INSERT INTO User (Email, HashedPassword, Confirmed) VALUES (?, ?, ?);', [body.email, body.password, false]));
            let id = result.insertId;
            console.log(id);

            res.status(201).json({ Text: "Test" });
        }
        
        await mysql.end();
    }
}

const ArrayResult = (result) => {
    return Object.values(JSON.parse(JSON.stringify(result)));
}

const ObjectResult = (result) => {
    return JSON.parse(JSON.stringify(result));
}

export default handler;