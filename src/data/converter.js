// This script is used to convert the bible text from the old format into a more universal .json format
const path = require('path');
const fs = require('fs');

const projectPath = path.join(__dirname, "../../");

fs.readdir(projectPath + "/texts/old-format", function (err, files) 
{
    if (err) 
    {
      return console.log('Unable to scan directory: ' + err);
    } 
    
    // Delete previous conversion
    fs.rmSync(projectPath + "/texts/new-format", { recursive: true, force: true });
    fs.mkdirSync(projectPath + "/texts/new-format");

    // Get all books
    let books = getBooks();

    for (let i = 0; i < books.length; i++) {
      let folderName = projectPath +  "/texts/new-format/" + books[i].abbreviation + "/";
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
      }
    }

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
            result.book = books[i].name;
          }
        }

        let folderName = projectPath + "/texts/new-format/" + result.abbreviation + "/";    
        let data = JSON.stringify(result, null, 2);
        fs.writeFileSync(folderName + result.chapter + '.json', data, (err) => {
          if (err) throw err;
          console.log('Data written to file');
        });

        console.log("DONE: " + file);
      }
    });

    let data = JSON.stringify({ books }, null, 2);
    fs.writeFileSync(projectPath + "/texts/new-format/books.json", data,  (err) => {
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
          chapters: 50,
          verses: [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 54, 33, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26]
        },
        {
          name: "Anden Mosebog",
          abbreviation: "2Mos",
          chapters: 40,
          verses: [22, 25, 22, 31, 23, 30, 29, 28, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 37, 30, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38]
        },
        {
          name: "Tredje Mosebog",
          abbreviation: "3Mos",
          chapters: 27,
          verses: [17, 16, 17, 35, 26, 23, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34]
        },
        {
          name: "Fjerde Mosebog",
          abbreviation: "4Mos",
          chapters: 36,
          verses: [54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 35, 28, 32, 22, 29, 35, 41, 30, 25, 19, 65, 23, 31, 39, 17, 54, 42, 56, 29, 34, 13]
        },
        {
          name: "Femte Mosebog",
          abbreviation: "5Mos",
          chapters: 34,
          verses: [46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 31, 19, 29, 23, 22, 20, 22, 21, 20, 23, 29, 26, 22, 19, 19, 26, 69, 28, 20, 30, 52, 29, 12]
        },
        {
          name: "Josvabogen",
          abbreviation: "Jos",
          chapters: 24,
          verses: [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16, 33]
        },
        {
          name: "Dommerbogen",
          abbreviation: "Dom",
          chapters: 21,
          verses: [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25]
        },
        {
          name: "Ruths Bog",
          abbreviation: "Ruth",
          chapters: 4,
          verses: [22, 23, 18, 22]
        },
        {
          name: "Første Samuelsbog",
          abbreviation: "1Sam",
          chapters: 31,
          verses: [28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 16, 23, 28, 23, 43, 25, 12, 25, 11, 31, 13]
        },
        {
          name: "Anden Samuelsbog",
          abbreviation: "2Sam",
          chapters: 24,
          verses: [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 32, 44, 26, 22, 51, 39, 25]
        },
        {
          name: "Første Kongebog",
          abbreviation: "1Kong",
          chapters: 22,
          verses: [53, 46, 28, 20, 32, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 29, 54]
        },
        {
          name: "Anden Kongebog",
          abbreviation: "2Kong",
          chapters: 25,
          verses: [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 20, 22, 25, 29, 38, 20, 41, 37, 37, 21, 26, 20, 37, 20, 30]
        },
        {
          name: "Første Krønikebog",
          abbreviation: "1Krøn",
          chapters: 29,
          verses: [54, 55, 24, 43, 41, 66, 40, 40, 44, 14, 47, 41, 14, 17, 29, 43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30]
        },
        {
          name: "Anden Krønikebog",
          abbreviation: "2Krøn",
          chapters: 36,
          verses: [18, 17, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 23, 14, 19, 14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 26, 23]
        },
        {
          name: "Ezras Bog",
          abbreviation: "Ezra",
          chapters: 10,
          verses: [11, 70, 13, 24, 17, 22, 28, 36, 15, 44]
        },
        {
          name: "Nehemias' Bog",
          abbreviation: "Neh",
          chapters: 13,
          verses: [11, 20, 38, 17, 19, 19, 72, 18, 37, 40, 36, 47, 31]
        },
        {
          name: "Esters Bog",
          abbreviation: "Est",
          chapters: 10,
          verses: [22, 23, 15, 17, 14, 14, 10, 17, 32, 3]
        },
        {
          name: "Jobs Bog",
          abbreviation: "Job",
          chapters: 42,
          verses: [22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 34, 30, 17, 25, 6, 14, 21, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24, 41, 30, 32, 26, 17]
        },
        {
          name: "Salmernes Bog",
          abbreviation: "Sl",
          chapters: 150,
          verses: [6, 11, 9, 9, 13, 11, 18, 10, 21, 18, 7, 9, 6, 7, 5, 11, 15, 51, 15, 10, 14, 32, 6, 10, 22, 11, 14, 9, 11, 13, 25, 11, 22, 23, 28, 13, 40, 23, 14, 18, 14, 12, 5, 27, 18, 12, 10, 15, 21, 23, 21, 11, 7, 9, 24, 14, 12, 12, 18, 14, 9, 13, 12, 11, 14, 20, 8, 36, 37, 6, 24, 20, 28, 23, 11, 13, 21, 72, 13, 20, 17, 8, 19, 13, 14, 17, 7, 19, 53, 17, 16, 16, 5, 23, 11, 13, 12, 9, 9, 5, 8, 29, 22, 35, 45, 48, 43, 14, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 14, 10, 8, 12, 15, 21, 10, 20, 14, 9, 6]
        },
        {
          name: "Ordsprogenes Bog",
          abbreviation: "Ordsp",
          chapters: 31,
          verses: [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31]
        },
        {
          name: "Prædikerens Bog",
          abbreviation: "Præd",
          chapters: 12,
          verses: [18, 26, 22, 17, 19, 12, 29, 17, 18, 20, 10, 14]
        },
        {
          name: "Højsangen",
          abbreviation: "Høj",
          chapters: 8,
          verses: [17, 17, 11, 16, 16, 12, 14, 14]
        },
        {
          name: "Esajas' Bog",
          abbreviation: "Es",
          chapters: 66,
          verses: [31, 22, 26, 6, 30, 13, 25, 23, 20, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12, 21, 14, 21, 22, 11, 12, 19, 11, 25, 24]
        },
        {
          name: "Jeremias' Bog",
          abbreviation: "Jer",
          chapters: 52,
          verses: [19, 37, 25, 31, 31, 30, 34, 23, 25, 25, 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34]
        },
        {
          name: "Klagesangene",
          abbreviation: "Klages",
          chapters: 5,
          verses: [22, 22, 66, 22, 22]
        },
        {
          name: "Ezekiels Bog",
          abbreviation: "Ez",
          chapters: 48,
          verses: [28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 44, 37, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35]
        },
        {
          name: "Daniels Bog",
          abbreviation: "Dan",
          chapters: 12,
          verses: [21, 49, 33, 34, 30, 29, 28, 27, 27, 21, 45, 13]
        },
        {
          name: "Hoseas' Bog",
          abbreviation: "Hos",
          chapters: 14,
          verses: [9, 25, 5, 19, 15, 11, 16, 14, 17, 15, 11, 15, 15, 10]
        },
        {
          name: "Joels Bog",
          abbreviation: "Joel",
          chapters: 4,
          verses: [20, 27, 5, 21]
        },
        {
          name: "Amos' Bog",
          abbreviation: "Am",
          chapters: 9,
          verses: [15, 16, 15, 13, 27, 14, 17, 14, 15]
        },
        {
          name: "Obadias' Bog",
          abbreviation: "Obad",
          chapters: 1,
          verses: [21]
        },
        {
          name: "Jonas' Bog",
          abbreviation: "Jon",
          chapters: 4,
          verses: [16, 11, 10, 11]
        },
        {
          name: "Mikas Bog",
          abbreviation: "Mika",
          chapters: 7,
          verses: [16, 13, 12, 14, 14, 16, 20]
        },
        {
          name: "Nahums Bog",
          abbreviation: "Nah",
          chapters: 3,
          verses: [14, 14, 19]
        },
        {
          name: "Habakkuks Bog",
          abbreviation: "Hab",
          chapters: 3,
          verses: [17, 20, 19]
        },
        {
          name: "Sefanias' Bog",
          abbreviation: "Sef",
          chapters: 3,
          verses: [18, 15, 20]
        },
        {
          name: "Haggajs Bog",
          abbreviation: "Hagg",
          chapters: 2,
          verses: [15, 23]
        },
        {
          name: "Zakarias' Bog",
          abbreviation: "Zak",
          chapters: 14,
          verses: [17, 17, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21]
        },
        {
          name: "Malakias' Bog",
          abbreviation: "Mal",
          chapters: 3,
          verses: [14, 17, 24]
        },
        {
          name: "Matthæusevangeliet",
          abbreviation: "Matt",
          chapters: 28,
          verses: [25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20]
        },
        {
          name: "Markusevangeliet",
          abbreviation: "Mark",
          chapters: 16,
          verses: [45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20]
        },
        {
          name: "Lukasevangeliet",
          abbreviation: "Luk",
          chapters: 24,
          verses: [80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53]
        },
        {
          name: "Johannesevangeliet",
          abbreviation: "Joh",
          chapters: 21,
          verses: [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25]
        },
        {
          name: "Apostlenes Gerninger",
          abbreviation: "ApG",
          chapters: 28,
          verses: [26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28, 40, 38, 40, 30, 35, 27, 27, 32, 44, 31]
        },
        {
          name: "Romerbrevet",
          abbreviation: "Rom",
          chapters: 16,
          verses: [32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27]
        },
        {
          name: "Første Korintherbrev",
          abbreviation: "1Kor",
          chapters: 16,
          verses: [31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24]
        },
        {
          name: "Anden Korintherbrev",
          abbreviation: "2Kor",
          chapters: 13,
          verses: [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 13]
        },
        {
          name: "Galaterbrevet",
          abbreviation: "Gal",
          chapters: 6,
          verses: [24, 21, 29, 31, 26, 18]
        },
        {
          name: "Efeserbrevet",
          abbreviation: "Ef",
          chapters: 6,
          verses: [23, 22, 21, 32, 33, 24]
        },
        {
          name: "Filipperbrevet",
          abbreviation: "Fil",
          chapters: 4,
          verses: [30, 30, 21, 23]
        },
        {
          name: "Kolossenserbrevet",
          abbreviation: "Kol",
          chapters: 4,
          verses: [29, 23, 25, 18]
        },
        {
          name: "Første Thessalonikerbrev",
          abbreviation: "1Thess",
          chapters: 5,
          verses: [10, 20, 13, 18, 28]
        },
        {
          name: "Andet Thessalonikerbrev",
          abbreviation: "2Thess",
          chapters: 3,
          verses: [12, 17, 18]
        },
        {
          name: "Første Timotheusbrev",
          abbreviation: "1Tim",
          chapters: 6,
          verses: [20, 15, 16, 16, 25, 21]
        },
        {
          name: "Andet Timotheusbrev",
          abbreviation: "2Tim",
          chapters: 4,
          verses: [18, 26, 17, 22]
        },
        {
          name: "Titusbrevet",
          abbreviation: "Tit",
          chapters: 3,
          verses: [16, 15, 15]
        },
        {
          name: "Filemonbrevet",
          abbreviation: "Filem",
          chapters: 1,
          verses: [25]
        },
        {
          name: "Hebræerbrevet",
          abbreviation: "Hebr",
          chapters: 13,
          verses: [14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25]
        },
        {
          name: "Jakobs Brev",
          abbreviation: "Jak",
          chapters: 5,
          verses: [27, 26, 18, 17, 20]
        },
        {
          name: "Første Petersbrev",
          abbreviation: "1Pet",
          chapters: 5,
          verses: [25, 25, 22, 19, 14]
        },
        {
          name: "Andet Petersbrev",
          abbreviation: "2Pet",
          chapters: 3,
          verses: [21, 22, 18]
        },
        {
          name: "Første Johannesbrev",
          abbreviation: "1Joh",
          chapters: 5,
          verses: [10, 29, 24, 21, 21]
        },
        {
          name: "Andet Johannesbrev",
          abbreviation: "2Joh",
          chapters: 1,
          verses: [13]
        },
        {
          name: "Tredje Johannesbrev",
          abbreviation: "3Joh",
          chapters: 1,
          verses: [15]
        },
        {
          name: "Judas' Brev",
          abbreviation: "Jud",
          chapters: 1,
          verses: [25]
        },
        {
          name: "Johannes' Åbenbaring",
          abbreviation: "Åb",
          chapters: 22,
          verses: [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21]
        }
    ]

    for (let i = 0; i < books.length; i++) {
      if (books[i].verses.length != books[i].chapters)
        console.log(books[i].abbreviation);

      books[i].chapters = new Array(books[i].chapters).fill(0);
    }

    return books;
}

function convertFile(file) {
  // Read the file
  const filePath = path.join(projectPath + "/texts/old-format", file);
  let fileContents = fs.readFileSync(filePath, 'utf-8');

  // SPLIT INTO CONTENT BEFORE AND AFTER BOOK NAME
  let content = fileContents.split(/===/g);

  let meta = retrieveMetaData(content[0]);
  let book = content[1].trim().split(",")[0].trim();
  let verses = retrieveVerses(content[2]);

  if (book.toLowerCase().includes("salme"))
    book = "Salmernes Bog";

  // FIND CHAPTER NUMBER AND BOOK ABBREVIATION
  const fileName = file.split(".")[0];
  let lastChar = -1;
  for (let i = fileName.length - 1; i >= 0 && lastChar == -1; i--) {
    if (!/^\d$/.test(fileName[i])) {
      lastChar = i;
    }
  }
  let chapter = parseInt(fileName.substring(lastChar + 1));

  let abbreviation = fileName.substring(0, lastChar + 1);
  if (/^\d$/.test(abbreviation[0])) {
    abbreviation = abbreviation.charAt(0) + abbreviation.charAt(1).toUpperCase() + abbreviation.slice(2);
  }
  else {
    abbreviation = abbreviation.charAt(0).toUpperCase() + abbreviation.slice(1);
  }

  // INSERT VERSION NUMBER INTO ALL VERSES
  for (let i = 0; i < verses.length; i++) {
    verses[i].version = meta.version;
  }

  return {
    book,
    abbreviation,
    chapter,
    translation: meta.translation,
    contributors: meta.contributors,
    verses
  }
}

// Doesn't handle //0 properly. Should still be a newline (or a space atleast).
function retrieveVerses(data) {
  let text = data.trim();
  let raw = text.split(/(?=v[0-9]|V[0-9])/g);

  let titles = [];
  let verses = [];
  let backBuffer = "";

  // MAKE INTO VERSE ARRAY
  for (let i = 0; i < raw.length; i++) {
    let line = raw[i].replace(/\r\n\r\n/g, "%").trim();
    let verseNumber = 0;

    // RETRIEVE VERSE NUMBER
    if (line[0] == "v" || line[0] == "V") {
      
      let found = -1;
      for (let j = 0; j < line.length && found == -1; j++) {
        if (line[j] == ' ')
          found = j;
      }
      
      verseNumber = parseInt(line.substring(1, found));
      line = line.substring(found);
    }

    line = backBuffer + " " + line;
    backBuffer = "";
    line = line.replace(/\r\n/g, " ");
    line = line.replace(/  /g, " ");
    line = line.replace(/%%/g, "%");
    line = line.replace(/% /g, "%");

    // FIX ARROWS
    line = line.replace(/<<</g, '‹«');
    line = line.replace(/>>/g, '»').replace(/<</g, '«');
    line = line.replace(/>/g, '›').replace(/</g, '‹');

    // REMOVE HEADLINES
    if (line.includes("==")) {
      line = line.replace(/==/g, "@");
      let title = line.match(/\@(.*?)\@/)[1];

      titles.push({
        verse: verseNumber + 1,
        text: fixGodsName(title.replace(/ *\{[^)]*\} */g, "")) // REMOVE FOOTNOTES FROM HEADLINES
      });

      line = line.replace(/ *\@[^)]*\@ */g, "");
    }
    
    // MOVE NON-TEXT FROM THE END OF PREVIOUS LINE TO START OF NEXT LINE
    let found = -1;
    for (let j = line.length - 1; j >= 0 && found == -1; j--) {
      if (line[j] !== '/' && line[j] !== '%' && line[j] !== ' ' && line[j] !== '\r' && line[j] !== '\n' && !line[j].match(/[0-9]/))
        found = j + 1;
    }
    if (found != -1) {
      backBuffer = line.substring(found).trim();
      line = line.substring(0, found);
    }

    // IF LINE DOESN'T CONTAIN LETTERS, MOVE IT TO NEXT LINE
    if (line.match(/[a-zA-Z]/g)) {
      // EXEGETICAL LAYOUT
      let slices = line.split("//");
      line = "";
      for (let j = 0; j < slices.length; j++) {
        if (/^\d$/.test(slices[j][0])) {

          found = -1;
          for (let k = 0; k < slices[j].length && found == -1; k++) {
            if (!/^\d$/.test(slices[j][k]))
              found = k;
          }
          
          let exegeticalIndentation = parseInt(slices[j].substring(0, found));
          if (exegeticalIndentation > 0)
            line += "$"
          for (let k = 0; k < exegeticalIndentation; k++) {
            line += "£"
          }

          line += slices[j].substring(found).trim();
        }
        else {
          line += slices[j].trim();
        }
      }
      
      line = line.replace(/ %/g, "%");
      line = line.replace(/  /g, " ");

      // PUSH VERSE TO ARRAY
      verses.push({
        number: verseNumber,
        text: fixGodsName(line.replace(/£/g, "\t").replace(/\$/g, "\n").replace(/%/g, "\f").replace(/\*\*\*/g, "\v"))
      });
    }
    else {
      backBuffer = line;
    }
  }

  // PUT TITLES INTO VERSES
  for (let i = 0; i < verses.length; i++) {
    for (let j = 0; j < titles.length; j++) {
      if (verses[i].number == titles[j].verse) {
        verses[i].title = titles[j].text;
      }
    }
  }

  // PULL FOOTNOTES OUT
  for (let i = 0; i < verses.length; i++) {
    if (verses[i].text.includes("{")) {
      verses[i].footnotes = [];
      let slices = verses[i].text.split("{");

      for (let j = 0; j < slices.length -1; j++) {
        slices[j] = fixGodsName(slices[j].trimEnd());
      }

      let index = slices[0].length;

      verses[i].text = slices[0];

      for (let j = 1; j < slices.length; j++) {
        let parts = slices[j].split("}");
        verses[i].footnotes.push({
          text: parts[0].substring(2).trim(),
          type: parts[0][0],
          position: index
        });

        
        if (parts[1])
        {
          verses[i].text += parts[1];
          index += parts[1].length;
        }
      }
    }
  }

  return verses;
}

function retrieveMetaData(data) {
  let values = data.trim().split(/\r\n/g);
  let meta = {
    contributors: [],
    translation: 0,
    version: 0
  }
  
  for (let i = 0; i < values.length; i++) {
    let line = values[i].replace(/!/g, "");
    line = line.replace(/</g, "");
    line = line.replace(/>/g, "");

    const pair = line.split(":");
    const key = pair[0].trim();
    const value = pair[1].trim();

    if (key.toLowerCase() === "dato for denne version") {
      let parts = value.split('.');
      meta.version = Date.parse(parts[1] + '.' + parts[0] + '.' + parts[2]); // Switch from american to european format.
    }
    else if (key.toLowerCase() === "modenhed") {
      switch (value.toLowerCase()) {
        case 'ikke lavet':
          meta.translation = 0;
          break;  
        case 'ufuldstændigt':
          meta.translation = 25;
          break;
        case 'rå oversættelse':
          meta.translation = 50;
          break;
        case 'delvis færdig':
          meta.translation = 75;
          break;
        case 'færdig':
          meta.translation = 100;
          break;
        default:
          meta.translation = 0;
      }
    }
    else {
      meta.contributors.push({
        type: key,
        name: value
      });
    }
  }

  return meta;
}

function fixGodsName(text) {
  let result = text;

  result = result.replace(/JHVHvs/g, "HERRES");
  result = result.replace(/JHVHs/g, "HERRENS");
  result = result.replace(/JHVHv/g, "HERRE");
  result = result.replace(/JHVH/g, "HERREN");

  return result;
}