// This script is used to convert the bible text from the old format into a more universal .json format

const path = require('path');
const fs = require('fs');
const readline = require('readline');

const directoryPath = path.join(__dirname, "texts/old-format");

fs.readdir(directoryPath, function (err, files) 
{
    if (err) 
    {
        return console.log('Unable to scan directory: ' + err);
    } 
    
    // Delete previous conversion
    fs.rmSync("texts/new-format", { recursive: true, force: true });
    fs.mkdirSync("texts/new-format");

    /// Convert each file in directory
    files.forEach(async function (file) 
    {
        console.log("CONVERTING: " + file);
        let result = await convertFile(file);
        
        let folderName = "texts/new-format/" + result.abbreviation + "/";
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }

        let data = JSON.stringify(result, null, 2);
        fs.writeFileSync(folderName + result.chapter + '.json', data, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    });

    console.log("DONE!");
});

async function convertFile(file) 
{
    // Footnotes in last verse doesn't work
    // There should be a line ending at the end of each verse
	// Missing translation "level" https://github.com/EzerIT/DFB/blob/master/oversigt.inc.php
    // space between line should become a space in text

    // Open file stream
    const filePath = path.join(directoryPath, file);
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    // Data that will be put into an object
    let book = "";
    let abbreviation = file.replace(/\.[^/.]+$/, "");
    let chapter = 0;
    let version;
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
    for await (const line of rl)
    {
        if (line !== null && line.match(/^ *$/) === null)
        {
            if (line.startsWith("!!")) // Meta data from file
            {
                let raw = line.substring(3,line.length-3);
                let values = raw.split(':');

                if (values[0] == "Dato for denne version") {
                    let parts = values[1].trim().split('.')
                    // Switch from american to european format.
                    version = Date.parse(parts[1] + '.' + parts[0] + '.' + parts[2]);
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
                    verse: verseNumber + 1
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
                                    if (text.trim() != '') {
                                        // Get footnotes out of verse before pushing it.
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

                                        // Add verse and clear text buffer
                                        verses.push({
                                            text: text.replace(/\s?\{[^}]+\}/g, ''),
                                            number: verseNumber
                                        });
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
        }
    }

    verses.push({
        text,
        number: verseNumber
    });

    let result = {
        book,
        abbreviation,
        chapter,
        version,
        verses,
        titles,
        footnotes
    }

    return result;
}