import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import VerseNumber from './VerseNumber';
import SectionTitle from './SectionTitle';

function Verse({ verse, index, onSelected, settings}) {
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
                parts.push(<span key={verse.footnotes.length + "pA" + verse.number}>{beginning}</span>);
            }

            if (i == 0)
                addVerseNumber(verse.number);
            parts.push(<span key={i + "p" + verse.number}>{trimmed}</span>);

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
        parts.push(<span key={verse.footnotes.length + "p" + verse.number}>{slice}</span>);
    }
    else {
        const text = FormatText(verse.text, settings);
        const trimmed = text.trimStart();
        const diff = text.length - trimmed.length;
        if (diff > 0) {
            let beginning = text.substring(0, diff).replace(/ /g, "");
            if (index == 0 || (settings.showTitles && verse.title))
                beginning = beginning.replace(/\n/g, "");
            parts.push(<span key={0 + "pA" + verse.number}>{beginning}</span>);
        }
        addVerseNumber(verse.number);
        parts.push(<span key={0 + "pB" + verse.number}>{trimmed}</span>);
    }

    return (
        <>
            {verse.title && settings.showTitles ? <SectionTitle>{FormatText(verse.title, settings)}</SectionTitle> : <></>}
            <span className='verseLine'>
                {parts}&nbsp;
            </span>
        </>
    )
}

function FormatText(text, settings) {
    let result = text;

    if (settings && settings.godsName == "HERREN") {
        result = result.replace(/JHVHvs/g, "HERRES");
        result = result.replace(/JHVHs/g, "HERRENS");
        result = result.replace(/JHVHv/g, "HERRE");
        result = result.replace(/JHVH/g, "HERREN");
    }
    else if (settings && settings.godsName == "Herren") {
        result = result.replace(/JHVHvs/g, "Herres");
        result = result.replace(/JHVHs/g, "Herrens");
        result = result.replace(/JHVHv/g, "Herre");
        result = result.replace(/JHVH/g, "Herren");
    }
    else if (settings && settings.godsName == "Jahve") {
        result = result.replace(/JHVHvs/g, "Jahves");
        result = result.replace(/JHVHs/g, "Jahves");
        result = result.replace(/JHVHv/g, "Jahve");
        result = result.replace(/JHVH/g, "Jahve");
    }
    else { // godsName == "JHVH"
        result = result.replace(/JHVHvs/g, "JHVHs");
        result = result.replace(/JHVHs/g, "JHVHs");
        result = result.replace(/JHVHv/g, "JHVH");
        result = result.replace(/JHVH/g, "JHVH");
    }

    if (settings && !settings.exegeticLayout) {
        // Remove exergetic layout
        result = result.replace(/\t/g, " ").replace(/ +(?= )/g,'');;

        // Add poetic indentation
        result = result.replace(/\f /g, "\n\t").replace(/\f/g, "\n\t");
    }

    return result;
}

export default Verse