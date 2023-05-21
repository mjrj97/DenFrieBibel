import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import VerseNumber from './VerseNumber';
import SectionTitle from './SectionTitle';

function Verse({ verse, index, chapterUID, onSelected, settings}) {
    const parts = [];
    
    const addVerseNumber = (verseNumber) => {
        parts.push(settings.showVerseNumber ? <VerseNumber key={"vn" + verseNumber} onClick={(e) => onSelected(verseNumber, e)} number={verseNumber}/> : <></>);
    }

    if (verse.footnotes && verse.footnotes.length > 0) {
        for (let i = 0; i < verse.footnotes.length; i++) {
            let start = i == 0 ? 0 : verse.footnotes[i-1].position;
            let end = verse.footnotes[i].position;

            let slice = FormatText(verse.text.slice(start, end), settings);
            const trimmed = slice.trimStart();
            const diff = slice.length - trimmed.length;
            
            if (diff > 0) {
                let beginning = slice.substring(0, diff);
                if (i == 0)
                    beginning = beginning.replace(/ /g, "");
                if (index == 0 || (settings.showTitles && verse.title))
                    beginning = beginning.replace(/\n/g, "");
                parts.push(<span key={chapterUID + verse.footnotes.length + "pA" + verse.number}>{beginning}</span>);
            }

            if (i == 0)
                addVerseNumber(verse.number);
            parts.push(<span key={chapterUID + i + "p" + verse.number}>{trimmed}</span>);

            const tooltipID = verse.number + verse.footnotes[i].type + verse.footnotes[i].designation;
            const tooltipText = FormatText(verse.footnotes[i].text);
            const footnote = (
                <span id={tooltipID} key={tooltipID} className='fakeOffset'>
                    <Tooltip id={tooltipID} className='footnote'/>
                    <sup className='ignore'>
                        [<a href={"#b" + tooltipID} data-tooltip-id={tooltipID} data-tooltip-content={tooltipText}>{verse.footnotes[i].designation}</a>]
                    </sup>
                </span>
            );
            
            if ((settings.showAcademicFootnotes && verse.footnotes[i].type == "E") || (settings.showGeneralFootnotes && verse.footnotes[i].type == "T"))
                parts.push(footnote);
        }

        let slice = FormatText(verse.text.slice(verse.footnotes[verse.footnotes.length - 1].position, verse.text.length), settings);
        parts.push(<span key={chapterUID + verse.footnotes.length + "p" + verse.number}>{slice}</span>);
    }
    else {
        const text = FormatText(verse.text, settings);
        const trimmed = text.trimStart();
        const diff = text.length - trimmed.length;
        if (diff > 0) {
            let beginning = text.substring(0, diff).replace(/ /g, "");
            if (index == 0 || (settings.showTitles && verse.title))
                beginning = beginning.replace(/\n/g, "");
            parts.push(<span key={chapterUID + 0 + "pA" + verse.number}>{beginning}</span>);
        }
        addVerseNumber(verse.number);
        parts.push(<span key={chapterUID + 0 + "pB" + verse.number}>{trimmed}</span>);
    }

    return (
        <>
            {verse.title && settings.showTitles ? <SectionTitle>{FormatText(verse.title, settings)}</SectionTitle> : <></>}
            <span className='verseLine'>
                {parts}&nbsp;{settings.oneVersePerLine ? <br/> : <></>}
            </span>
        </>
    )
}

// DOESN'T HADNLE CURSIVE/ITALIC (*this is in italics*) - ONLY APPLICABLE IN FOOTNOTES
// IS MISSING \n from EXEGETICAL LAYOUT
function FormatText(text, settings) {
    let result = text;

    if (settings && settings.godsName == "JHVH") {
        result = result.replace(/HERRENS/g, "JHVHs");
        result = result.replace(/HERREN/g, "JHVH");
        result = result.replace(/HERRES/g, "JHVHs");
        result = result.replace(/HERRE/g, "JHVH");
    }
    else if (settings && settings.godsName == "Herren") {
        result = result.replace(/HERRENS/g, "Herrens");
        result = result.replace(/HERREN/g, "Herren");
        result = result.replace(/HERRES/g, "Herres");
        result = result.replace(/HERRE/g, "Herre");
    }
    else if (settings && settings.godsName == "Jahve") {
        result = result.replace(/HERRENS/g, "Jahves");
        result = result.replace(/HERREN/g, "Jahve");
        result = result.replace(/HERRES/g, "Jahves");
        result = result.replace(/HERRE/g, "Jahve");
    }
    else { // godsName == "HERREN"
        result = result.replace(/HERRENS/g, "HERRENS");
        result = result.replace(/HERREN/g, "HERREN");
        result = result.replace(/HERRES/g, "HERRES");
        result = result.replace(/HERRE/g, "HERRE");
    }

    if (settings) {
        if (settings.exegeticLayout) {
            
        }
        else {
            // Remove exergetic layout
            result = result.replace(/\t/g, " ").replace(/\n/g, "").replace(/ +(?= )/g,'');

            // Add new lines
            result = result.replace(/\v/g, "\n");

            // Add poetic indentation
            result = result.replace(/\f /g, "\n\t").replace(/\f/g, "\n\t");
        }
    }

    return result;
}

export default Verse