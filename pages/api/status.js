import { readFileSync } from 'fs';
import path from 'path';

const configDirectory = path.join(process.cwd(), 'database.config');

const mysql = require('mysql');
const database = mysql.createConnection(JSON.parse(readFileSync(configDirectory)));

async function handler(req, res) {
    database.connect();
    const result = await select();
    res.json(result);
}

function select() {
    return new Promise((resolve, reject) => {
        database.query(
            "SELECT * FROM Status",
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

export default handler;