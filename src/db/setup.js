const path = require('path');
const fs = require("fs");

const directoryPath = path.join(__dirname, "../../");

const connection = require(directoryPath + '/src/db/connection.js').connection;

const books = JSON.parse(fs.readFileSync(directoryPath + "/texts/new-format/books.json")).books;

async function setup() {
    await setupTables();

    let chapterIndex = 1;
    let verseIndex = 0;
    let textIndex = 1;

    for (let i = 0; i < books.length; i++) {
        console.log("Inserted: " + books[i].abbreviation);
        await connection.query('INSERT INTO Book (BookID, Name, Abbreviation, Chapters) VALUES (?, ?, ?, ?);', [i+1, books[i].name, books[i].abbreviation, books[i].chapters.length]);

        for (let j = 0; j < books[i].chapters.length; j++) {
            await connection.query('INSERT INTO Chapter (ChapterID, BookID, Number, Translation) VALUES (?, ?, ?, ?);', [chapterIndex + j, i+1, j+1, books[i].chapters[j]]);
            let verseCount = books[i].verses[j];

            const path = directoryPath + "/texts/new-format/" + books[i].abbreviation + "/" + (j+1) + ".json";
            let chapter;
            if (fs.existsSync(path))
                chapter = JSON.parse(fs.readFileSync(path));

            if (chapter) {
                let contributors = chapter.contributors;
                for (let k = 0; k < contributors.length; k++) {
                    await connection.query('INSERT INTO Contributor (ChapterID, Type, Name) VALUES (?, ?, ?);', [chapterIndex + j, contributors[k].type, contributors[k].name]);
                }
            }

            for (let k = 1; k <= verseCount; k++) {
                await connection.query('INSERT INTO Verse (VerseID, ChapterID, Number) VALUES (?, ?, ?);', [verseIndex + k, chapterIndex + j, k]);

                if (chapter) {
                    let text;
                    for (let l = 0; l < chapter.verses.length && !text; l++) {
                        if (chapter.verses[l].number == k)
                            text = chapter.verses[l];
                    }
                    if (text) {
                        await connection.query('INSERT INTO Text (TextID, VerseID, Title, Text, Version) VALUES (?, ?, ?, ?, ?);', [textIndex, verseIndex + k, text.title, text.text, text.version]);

                        if (text.footnotes) {
                            for (let l = 0; l < text.footnotes.length; l++) {
                                await connection.query('INSERT INTO Footnote (TextID, Type, Text, Position) VALUES (?, ?, ?, ?);', [textIndex, text.footnotes[l].type, text.footnotes[l].text, text.footnotes[l].position]);
                            }
                        }

                        textIndex++;
                    }
                }
            }

            verseIndex += verseCount;
        }

        chapterIndex += books[i].chapters.length;
    }

    await connection.end();
}

async function setupTables() {
    await setupTable('Book', `BookID TINYINT(4) NOT NULL, 
                            Name TINYTEXT NOT NULL, 
                            Abbreviation TINYTEXT NOT NULL, 
                            Chapters SMALLINT(6) NOT NULL, 
                            PRIMARY KEY (BookID)`);

    await setupTable('Chapter', `ChapterID SMALLINT(6) NOT NULL, 
                            BookID TINYINT(4) NOT NULL, 
                            Number TINYINT(4) NOT NULL, 
                            Translation TINYINT(4) NOT NULL, 
                            PRIMARY KEY (ChapterID)`);

    await setupTable('Verse', `VerseID SMALLINT(6) NOT NULL, 
                            ChapterID SMALLINT(6) NOT NULL,
                            Number SMALLINT(6) NOT NULL, 
                            PRIMARY KEY (VerseID)`);

    await setupTable('Text', `TextID INT(11) NOT NULL, 
                            VerseID SMALLINT(6) NOT NULL,
                            Title VARCHAR(2048),  
                            Text VARCHAR(2048) NOT NULL, 
                            Version BIGINT(20) NOT NULL, 
                            PRIMARY KEY (TextID)`);

    await setupTable('Footnote', `TextID INT(11) NOT NULL, 
                            Text VARCHAR(2048) NOT NULL,
                            Type CHAR(1) NOT NULL,  
                            Position SMALLINT(6) NOT NULL`);

    await setupTable('Contributor', `ChapterID SMALLINT(6) NOT NULL, 
                            Type VARCHAR(2048) NOT NULL,
                            Name VARCHAR(2048) NOT NULL`);
}

async function setupTable(name, values) {
    try {
        await connection.query('DROP TABLE IF EXISTS ' + name);
        await connection.query('CREATE TABLE ' + name + ' (' + values + ')');
        console.log('Table \'' + name + '\' has been created.');
    } catch (error) {
        console.log('Table \'' + name + '\' could not be created: ' + error);
    }
}

setup().then(() => {
    console.log("COMPLETE");
    process.exit();
});