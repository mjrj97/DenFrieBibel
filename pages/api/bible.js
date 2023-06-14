import { arrayResult } from '@/src/db/parser';
import { connection } from '@/src/db/connection.js';

const isValidInput = (text) => {
    const containWhiteSpaceRegex = /^\S+$/;
    const onlyLettersOrNumberRegex = /^[a-zA-ZæøåÆØÅ0-9]*$/;

    let simple = text.toLowerCase();
    let allowed = true;

    if (!simple.match(containWhiteSpaceRegex))
        allowed = false;
    else if (!onlyLettersOrNumberRegex.test(simple))
        allowed = false;
    else if (simple.length > 5)
        allowed = false;
    else if (simple.includes("drop"))
        allowed = false;
    else if (simple.includes("load"))
        allowed = false;
    else if (simple.includes("with"))
        allowed = false;

    return allowed;
}

const handler = async (req, res) => {
    let result = {
        content: undefined,
        errors: []
    };
    let status = 200;

    try {
        if (req.method === "GET") {
            let book = req.query.book;
            let chapter = req.query.chapter;

            if (isValidInput(book) && (!chapter || (chapter && isValidInput(chapter)))) {
                const books = arrayResult(await connection.query('SELECT BookID as bookID, Name as name, Abbreviation as abbreviation FROM Book'));
                for (let i = 0; i < books.length; i++) {
                    books[i].chapters = [];
                }

                const chapters = arrayResult(await connection.query('SELECT BookID, Translation FROM Chapter'));
                for (let i = 0; i < chapters.length; i++) {
                    let bookID = chapters[i].BookID;
                    books[bookID-1].chapters.push(chapters[i].Translation);
                }
        
                if (book) {
                    if (book.toLowerCase() === "all") {
                        result.content = books;
                    }
                    else {
                        //Check whether the queryed book exists to prevent injection of unwanted content
                        const found = arrayResult(await connection.query('SELECT BookID, Chapters, Name, Abbreviation FROM Book WHERE Abbreviation = ?', [book]))[0];

                        if (found) {
                            if (chapter) {
                                if (chapter <= found.Chapters && chapter > 0) {
                                    let bookID = found.BookID;
                                    const chapterResult = arrayResult(await connection.query('SELECT ChapterID, Number, Translation FROM Chapter WHERE BookID = ? AND Number = ?', [bookID, chapter]))[0];
                                    if (chapterResult) {
                                        const chapterID = chapterResult.ChapterID;
                                        const contributors = arrayResult(await connection.query('SELECT Type as type, Name as name FROM Contributor WHERE ChapterID = ?', [chapterID]));
                                        const verses = arrayResult(await connection.query('SELECT Verse.Number as number, Verse.VerseID as verseID, Text.TextID as textID, Text.Text as text, Text.Title as title, Text.Version as version FROM Verse INNER JOIN Text ON Verse.VerseID=Text.VerseID AND Verse.ChapterID = ?', [chapterID]));
                                        
                                        for (let i = 0; i < verses.length; i++) {
                                            const footnotes = arrayResult(await connection.query('SELECT Text as text, Type as type, Position as position From Footnote WHERE TextID = ?', [verses[i].textID]));
                                            if (footnotes && footnotes.length > 0) {
                                                verses[i].footnotes = footnotes;
                                            }
                                        }
        
                                        let object = {
                                            book: found.Name,
                                            abbreviation: found.Abbreviation,
                                            chapter: chapterResult.Number,
                                            translation: chapterResult.Translation,
                                            contributors,
                                            verses
                                        }
        
                                        if (verses.length == 0) {
                                            status = 404; // Not Found
                                            result.errors.push("This chapter has not been translated yet.");
                                        }

                                        result.content = object;
                                    }
                                }
                                else if (chapter <= 0) {
                                    status = 400; // Bad Request
                                    result.errors.push("The chapter cannot be negative or zero.");
                                }
                                else {
                                    status = 400; // Bad Request
                                    result.errors.push("There are only " + found.chapters.length + " in this book.");
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
                status = 400; // Bad Request
                result.errors.push("Parameters contain forbidden characters or words.");
            }
        }
        else {
            status = 405; // Method Not Allowed
            result.errors.push("HTTP " + req.method + " is not a valid method for this API.");
        }
    }
    catch (err) {
        status = 500; // Method Not Allowed
        result.errors.push("Internal server error.");
    }
    
    res.status(status).json(result);
}

export default handler;