// This script is used to convert the bible text from the old format into a more universal .json format

const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, "../../texts/old-format");

fs.readdir(directoryPath, function (err, files) 
{
    if (err) 
    {
        return console.log('Unable to scan directory: ' + err);
    } 
    
    // Delete previous conversion
    fs.rmSync("../../texts/new-format", { recursive: true, force: true });
    fs.mkdirSync("../../texts/new-format");

    // Get all books
    let books = getBooks();

    // Convert each file in directory
    files.forEach(function (file) 
    {
        let extension = path.extname(file);

        if (extension == ".txt") {
            console.log("CONVERTING: " + file);
            let result = convertFile(file);
            
            for (let i = 0; i < books.length; i++) {
                if (books[i].abbreviation == result.abbreviation) {
                    books[i].chapters[result.chapter - 1] = result.translation;
                }
            }

            let folderName = "../../texts/new-format/" + result.abbreviation + "/";
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName);
            }
    
            let data = JSON.stringify(result, null, 2);
            fs.writeFileSync(folderName + result.chapter + '.json', data, (err) => {
                if (err) throw err;
                console.log('Data written to file');
            });

            console.log("DONE: " + file);
        }
    });

    let data = JSON.stringify({ books }, null, 2);
    fs.writeFileSync("../../texts/new-format/books.json", data,  (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    console.log("DONE!");
});

function getBooks() {
    let books = [
        {
          name: "Første Mosebog",
          abbreviation: "1Mos",
          chapters: 50
        },
        {
          name: "Anden Mosebog",
          abbreviation: "2Mos",
          chapters: 40
        },
        {
          name: "Tredje Mosebog",
          abbreviation: "3Mos",
          chapters: 27
        },
        {
          name: "Fjerde Mosebog",
          abbreviation: "4Mos",
          chapters: 36
        },
        {
          name: "Femte Mosebog",
          abbreviation: "5Mos",
          chapters: 34
        },
        {
          name: "Josvabogen",
          abbreviation: "Jos",
          chapters: 24
        },
        {
          name: "Dommerbogen",
          abbreviation: "Dom",
          chapters: 21
        },
        {
          name: "Ruths Bog",
          abbreviation: "Ruth",
          chapters: 4
        },
        {
          name: "Første Samuelsbog",
          abbreviation: "1Sam",
          chapters: 31
        },
        {
          name: "Anden Samuelsbog",
          abbreviation: "2Sam",
          chapters: 24
        },
        {
          name: "Første Kongebog",
          abbreviation: "1Kong",
          chapters: 22
        },
        {
          name: "Anden Kongebog",
          abbreviation: "2Kong",
          chapters: 25
        },
        {
          name: "Første Krønikebog",
          abbreviation: "1Krøn",
          chapters: 29
        },
        {
          name: "Anden Krønikebog",
          abbreviation: "2Krøn",
          chapters: 36
        },
        {
          name: "Ezras Bog",
          abbreviation: "Ezra",
          chapters: 10
        },
        {
          name: "Nehemias' Bog",
          abbreviation: "Neh",
          chapters: 13
        },
        {
          name: "Esters Bog",
          abbreviation: "Est",
          chapters: 10
        },
        {
          name: "Jobs Bog",
          abbreviation: "Job",
          chapters: 42
        },
        {
          name: "Salmernes Bog",
          abbreviation: "Sl",
          chapters: 150
        },
        {
          name: "Ordsprogenes Bog",
          abbreviation: "Ordsp",
          chapters: 31
        },
        {
          name: "Prædikerens Bog",
          abbreviation: "Præd",
          chapters: 12
        },
        {
          name: "Højsangen",
          abbreviation: "Høj",
          chapters: 8
        },
        {
          name: "Esajas' Bog",
          abbreviation: "Es",
          chapters: 66
        },
        {
          name: "Jeremias' Bog",
          abbreviation: "Jer",
          chapters: 52
        },
        {
          name: "Klagesangene",
          abbreviation: "Klages",
          chapters: 5
        },
        {
          name: "Ezekiels Bog",
          abbreviation: "Ez",
          chapters: 48
        },
        {
          name: "Daniels Bog",
          abbreviation: "Dan",
          chapters: 12
        },
        {
          name: "Hoseas' Bog",
          abbreviation: "Hos",
          chapters: 14
        },
        {
          name: "Joels Bog",
          abbreviation: "Joel",
          chapters: 3
        },
        {
          name: "Amos' Bog",
          abbreviation: "Am",
          chapters: 9
        },
        {
          name: "Obadias' Bog",
          abbreviation: "Obad",
          chapters: 1
        },
        {
          name: "Jonas' Bog",
          abbreviation: "Jon",
          chapters: 4
        },
        {
          name: "Mikas Bog",
          abbreviation: "Mika",
          chapters: 7
        },
        {
          name: "Nahums Bog",
          abbreviation: "Nah",
          chapters: 3
        },
        {
          name: "Habakkuks Bog",
          abbreviation: "Hab",
          chapters: 3
        },
        {
          name: "Sefanias' Bog",
          abbreviation: "Sef",
          chapters: 3
        },
        {
          name: "Haggajs Bog",
          abbreviation: "Hag",
          chapters: 2
        },
        {
          name: "Zakarias' Bog",
          abbreviation: "Zak",
          chapters: 14
        },
        {
          name: "Malakias' Bog",
          abbreviation: "Mal",
          chapters: 4
        },
        {
          name: "Matthæusevangeliet",
          abbreviation: "Matt",
          chapters: 28
        },
        {
          name: "Markusevangeliet",
          abbreviation: "Mark",
          chapters: 16
        },
        {
          name: "Lukasevangeliet",
          abbreviation: "Luk",
          chapters: 24
        },
        {
          name: "Johannesevangeliet",
          abbreviation: "Joh",
          chapters: 21
        },
        {
          name: "Apostlenes Gerninger",
          abbreviation: "ApG",
          chapters: 28
        },
        {
          name: "Romerbrevet",
          abbreviation: "Rom",
          chapters: 16
        },
        {
          name: "Første Korintherbrev",
          abbreviation: "1Kor",
          chapters: 16
        },
        {
          name: "Anden Korintherbrev",
          abbreviation: "2Kor",
          chapters: 13
        },
        {
          name: "Galaterbrevet",
          abbreviation: "Gal",
          chapters: 6
        },
        {
          name: "Efeserbrevet",
          abbreviation: "Ef",
          chapters: 6
        },
        {
          name: "Filipperbrevet",
          abbreviation: "Fil",
          chapters: 4
        },
        {
          name: "Kolossenserbrevet",
          abbreviation: "Kol",
          chapters: 4
        },
        {
          name: "Første Thessalonikerbrev",
          abbreviation: "1Thess",
          chapters: 5
        },
        {
          name: "Andet Thessalonikerbrev",
          abbreviation: "2Thess",
          chapters: 3
        },
        {
          name: "Første Timotheusbrev",
          abbreviation: "1Tim",
          chapters: 6
        },
        {
          name: "Andet Timotheusbrev",
          abbreviation: "2Tim",
          chapters: 4
        },
        {
          name: "Titusbrevet",
          abbreviation: "Tit",
          chapters: 3
        },
        {
          name: "Hebræerbrevet",
          abbreviation: "Hebr",
          chapters: 13
        },
        {
          name: "Jakobs Brev",
          abbreviation: "Jak",
          chapters: 5
        },
        {
          name: "Første Petersbrev",
          abbreviation: "1Pet",
          chapters: 5
        },
        {
          name: "Andet Petersbrev",
          abbreviation: "2Pet",
          chapters: 3
        },
        {
          name: "Første Johannesbrev",
          abbreviation: "1Joh",
          chapters: 5
        },
        {
          name: "Andet Johannesbrev",
          abbreviation: "2Joh",
          chapters: 1
        },
        {
          name: "Tredje Johannesbrev",
          abbreviation: "3Joh",
          chapters: 1
        },
        {
          name: "Judas' Brev",
          abbreviation: "Jud",
          chapters: 1
        },
        {
          name: "Johannes' Åbenbaring",
          abbreviation: "Åb",
          chapters: 22
        }
    ]

    for (let i = 0; i < books.length; i++) {
        books[i].chapters = new Array(books[i].chapters).fill(0);
    }

    return books;
}

function convertFile(file) 
{
    // Read the file
    const filePath = path.join(directoryPath, file);
    let lines = fs.readFileSync(filePath, 'utf-8').split(/\n/).filter(Boolean);

    // Data that will be put into an object
    let book = "";
    let translation = "Ikke begyndt";
    let abbreviation = file.replace(/\.[^/.]+$/, "");
    let chapter = 0;
    let version;
    let contributors = [];
    let verses = [];
    let titles = [];
    let footnotes = [];

    // Handles capitalization of abbreviation (remember 1joh => 1Joh and sl => Sl)
    abbreviation = abbreviation.substring(0, abbreviation.length - 3);
    let fixedAbbreviation = "";
    let foundLetter = false;
    for (let i = 0; i < abbreviation.length; i++) {
        let char = abbreviation[i];

        if ((char >= '0' && char <= '9') || foundLetter) {
            fixedAbbreviation += char;
        }
        else {
            fixedAbbreviation += char.toUpperCase();
            foundLetter = true;
        }
    }
    abbreviation = fixedAbbreviation;

    // Data buffers
    let text = "";
    let verseNumber = 0;
    
    // Go through each line in file
    lines.forEach(line => {
        // Fix arrows
        line = line.replace(/<<</g, '‹«');
        line = line.replace(/>>/g, '»').replace(/<</g, '«');
        line = line.replace(/>/g, '›').replace(/</g, '‹');
        line = line.substring(0, line.length-1);

        if (line === null || line.match(/^ *$/) !== null) {
            if (text.substring(text.length - 1) != "\f")
                text += "\f";
        }
        else if (line.startsWith("***")) // Empty line
        {
            text += "[NEWLINE]";
        }
        else if (line.startsWith("!!")) // Meta data from file
        {
            let raw = line.substring(3,line.length-3);
            let values = raw.split(':');

            if (values[0] == "Dato for denne version") {
                let parts = values[1].trim().split('.')
                // Switch from american to european format.
                version = Date.parse(parts[1] + '.' + parts[0] + '.' + parts[2]);
            }
            else if (values[0] == "Modenhed") {
                let value = values[1].trim().toLowerCase();
                switch (value) {
                    case 'ikke lavet':
                        translation = 0;
                        break;
                    case 'ufuldstændigt':
                        translation = 25;
                        break;
                    case 'rå oversættelse':
                        translation = 50;
                        break;
                    case 'delvis færdig':
                        translation = 75;
                        break;
                    case 'færdig':
                        translation = 100;
                        break;
                    default:
                        translation = 0;
                }
            }
            else {
                contributors.push({ name: values[1].trim(), type: values[0].trim() });
            }
        }
        else if (line.startsWith("===")) // Retrieve Book and Chapter info
        {
            let lineWithoutFootnote = line.replace(/\s?\{[^}]+\}/g, '');
            // Handle footnotes later
            
            let substring = lineWithoutFootnote.substring(3,lineWithoutFootnote.length-3);
            let values = substring.split(',');

            if (values.length === 2)
            {
                book = values[0];
                chapter = parseInt(values[1].replace(/\D/g, ""));
            }
            else 
            {
                values = substring.split(' ');
                book = "Salmernes Bog";
                chapter = parseInt(values[1].replace(/\D/g, ""));
            }
        }
        else if (line.startsWith("==")) // Titles
        {
            let trimmed = line.trim();
            titles.push({
                text: trimmed.substring(2,trimmed.length-2).trim(),
                verse: verseNumber + 1,
                version
            });
        }
        else 
        {
            let lines = line.split('//');

            for (let i = 0; i < lines.length; i++) {
                if (lines[i] !== '') 
                {
                    // Get indentation number from the line
                    let numberText = lines[i].replace(/(^\d+)(.+$)/i,'$1');

                    if (numberText !== '')
                    {
                        let lineWithoutNumber;

                        let number = parseInt(numberText);
                        if (!isNaN(number))
                            lineWithoutNumber = lines[i].substring(numberText.length + 1, lines[i].length);
                        else
                            lineWithoutNumber = lines[i];

                        if (lineWithoutNumber.charAt(0) == 'v')
                        {
                            let words = lineWithoutNumber.split(' ');
                            let attempt = words[0].substring(1, words[0].length);
                            
                            let isNumber = !isNaN(attempt);

                            // If it begins with a versenumber
                            if (isNumber)
                            {
                                if (text.trim() != '' && verseNumber != 0) {
                                    // Get footnotes out of verse before pushing it.
                                    let footnotesInVerse = GetFootnotes(text, verseNumber);

                                    for (let j = 0; j < footnotesInVerse.length; j++) {
                                        footnotes.push(footnotesInVerse[j]);
                                    }

                                    // Add verse and clear text buffer
                                    let formatted = text.replace(/\s?\{[^}]+\}/g, '');
                                    verses.push({
                                        text: formatted.trimEnd().replace("\f[NEWLINE]", "\n\n").replace("[NEWLINE]", "\n\n"),
                                        number: verseNumber,
                                        version
                                    });
                                    if (formatted.endsWith("\f"))
                                        text = "\f";
                                    else
                                        text = "";
                                }

                                // Set verseNumber to the number retrieved.
                                verseNumber = parseInt(attempt);
                            }

                            lineWithoutNumber = "";
                            for (let i = isNumber ? 1 : 0; i < words.length; i++) {
                                lineWithoutNumber += words[i] + " ";
                            }
                        }

                        // If is not the first line, and it has indentation add a new line.
                        if (number > 0 && text.trim() !== "") {
                            text += "\n";
                        }

                        // Add indentation
                        for (let j = 0; j < number; j++) {
                            text += "\t";
                        }
                        
                        // Add contents of the line without versenumber, indentation number or footnotes.
                        text += lineWithoutNumber.trim();
                    }
                    else
                    {
                        text += lines[i];
                    }
                }
            }
        }
    });

    let footnotesInVerse = GetFootnotes(text, verseNumber);
    for (let j = 0; j < footnotesInVerse.length; j++) {
        footnotes.push(footnotesInVerse[j]);
    }

    let formatted = text.replace(/\s?\{[^}]+\}/g, '')
    verses.push({
        text: formatted.trimEnd().replace("\f[NEWLINE]", "\n\n").replace("[NEWLINE]", "\n\n"),
        number: verseNumber,
        version
    });

    let result = {
        book,
        abbreviation,
        chapter,
        translation,
        contributors,
        verses,
        titles,
        footnotes
    }

    return result;
}

function GetFootnotes(text, verseNumber) {
    let footnotes = [];

    let segments = text.split('{');
    if (segments.length > 1) {
        let position = segments[0].length;
        for (let j = 0; j < segments.length; j++) {
            let end = segments[j].indexOf('}');
            if (end != -1) {
                let footnote = segments[j].substring(0,end);

                footnotes.push({
                    text: footnote.substring(3),
                    type: footnote.substring(0,1),
                    verse: verseNumber,
                    position: position
                });

                position += segments[j].length - end -1;
            }
        }
    }

    return footnotes;
}