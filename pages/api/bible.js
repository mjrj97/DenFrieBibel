import { readFileSync, existsSync } from 'fs';

const handler = (req, res) => {
    let book = req.query.book;
    let chapter = req.query.chapter;

    let text = { errors: [] };
    let books = JSON.parse(readFileSync('./texts/new-format/books.json')).books;

    let result;

    if (book === "all") 
    {
        result = books;
    }
    else
    {
        //Check whether the queryed book exists to prevent injection of unwanted content
        let found = books.find(element => element.abbreviation == book);

        if (found) 
        {
            let path = './texts/new-format/' + book + '/' + chapter + '.json';
            if (existsSync(path))
            {
                text = JSON.parse(readFileSync(path));
            }
            else
            {
                text.errors.push("Dette kapitel er ikke blevet oversat endnu...");
            }
        }
        else 
        {
            text.errors.push("Denne bog findes ikke...");
        }

        result = text;
    }

    res.json(result);
}

export default handler;