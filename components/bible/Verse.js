import React from 'react'

import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import VerseNumber from './VerseNumber';

function Verse({ verseNumber, verseText, footnotes, onSelected}) {
    const parts = [];
    
    if (footnotes.length > 0) {

        for (let i = 0; i < footnotes.length; i++) {
            let start = i == 0 ? 0 : footnotes[i-1].position;
            let end = footnotes[i].position;

            let slice = FormatText(verseText.slice(start, end));

            parts.push(<span key={i + "p" + verseNumber}>{slice}</span>);

            const tooltipID = verseNumber + "f" + footnotes[i].designation;
            const tooltipText = FormatText(footnotes[i].text);
            const footnote = (
                <span key={i}>
                    <Tooltip id={tooltipID} className='footnote'/>
                    <sup className='ignore'>
                        [<a href="#/" data-tooltip-id={tooltipID} data-tooltip-content={tooltipText}>{footnotes[i].designation}</a>]
                    </sup>
                </span>
            );

            parts.push(footnote);
        }

        let slice = FormatText(verseText.slice(footnotes[footnotes.length - 1].position, verseText.length) + "\n");
        parts.push(<span key={footnotes.length + "p" + verseNumber}>{slice}</span>);
    }
    else {
        const text = FormatText(verseText + "\n");
        parts.push(<span key={footnotes.length + "p" + verseNumber}>{text}</span>);
    }
    
    return (
        <span className='verseLine'>
            {verseNumber ? <VerseNumber onClick={(e) => onSelected(verseNumber, e)} number={verseNumber}/> : <></>}
            {parts}&nbsp;
        </span>
    )
}

function FormatText(text) {
    return text.replace(/>>/g, '»').replace(/<</g, '«');
}

export default Verse