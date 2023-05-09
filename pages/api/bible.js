import { readFileSync, existsSync } from 'fs';

const handler = (req, res) => {
    let result = {
        content: undefined,
        errors: []
    };
    let status = 200;
    
    if (req.method === "GET") {
        let book = req.query.book;
        let chapter = req.query.chapter;
    
        let text = { errors: [] };
        let books = JSON.parse(readFileSync('./texts/new-format/books.json')).books;
    
        if (book) {
            if (book.toLowerCase() === "all") {
                result.content = books;
            }
            else {
                //Check whether the queryed book exists to prevent injection of unwanted content
                let found = books.find(element => element.abbreviation == book);

                if (found) {
                    if (chapter) {
                        if (chapter <= found.chapters && chapter > 0) {
                            let path = './texts/new-format/' + book + '/' + chapter + '.json';
                            if (existsSync(path)) {
                                text = JSON.parse(readFileSync(path));
                                result.content = text;
                            }
                            else {
                                status = 404; // Not Found
                                result.errors.push("This chapter has not been translated yet.");
                            }
                        }
                        else if (chapter <= 0) {
                            status = 400; // Bad Request
                            result.errors.push("The chapter cannot be negative or zero.");
                        }
                        else {
                            status = 400; // Bad Request
                            result.errors.push("There are only " + found.chapters + " in this book.");
                        }
                    }
                    else {
                        status = 400; // Bad Request
                        result.errors.push("A chapter must be selected. Do this with /api/books?book=[book-abbreviation]&chapter=[number].");
                    }
                }
                else {
                    status = 404; // Not Found
                    result.errors.push("The book: ´" + book + "´ does not exist in the library.");
                }
            }
        }
        else {
            status = 400; // Bad Request
            result.errors.push("A book must be selected. Do this with /api/books?book=[book-abbreviation], or book=all to return the list of available books.");
        }
    }
    else {
        status = 405; // Method Not Allowed
        result.errors.push("HTTP " + req.method + " is not a valid method for this API.");
    }
    
    res.status(status).json(result);
}

export default handler;