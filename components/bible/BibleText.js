import React, { useEffect, useState } from 'react';

import Loading from '../main/Loading';
import Verse from './Verse';
import StandardSettings from '@/src/data/settings';

function BibleText (props) {
    const [settings, setSettings] = useState(StandardSettings);

    useEffect(() => {
      const data = localStorage.getItem("settings");
      if (data) {
        setSettings(JSON.parse(data));
      }
    }, []);

    let lines = [];
    let generalFootnoteElements = [];
    let academicFootnoteElements = [];
    let contributors = [];

    let translationLevel = "";
    let lastChange;

    let verses;
    let subtitles;
    let footnotes;
    
    const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    let alphabetCount = 0;
    let numberCount = 1;

    if (props.text !== undefined) {
        verses = props.text.verses;
        subtitles = props.text.titles;
        footnotes = props.text.footnotes === undefined ? [] : props.text.footnotes;

        if (verses && verses.length > 0) {
            lastChange = 0;
            for (let i = 0; i < verses.length; i++) {
                if (lastChange < verses[i].version)
                    lastChange = verses[i].version;
            }
            lastChange = new Date(lastChange).toLocaleDateString("da-DK", {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\./g, "-");
        }
        
        let translation = props.text.translation;
        if (translation == 0) {
            translationLevel = "Ikke begyndt";
        }
        else if (translation < 50) {
            translationLevel = "Ufuldstændig";
        }
        else if (translation < 75) {
            translationLevel = "Rå oversættelse";
        }
        else if (translation < 100) {
            translationLevel = "Delvis færdig";
        }
        else if (translation == 100) {
            translationLevel = "Færdig";
        }

        if (props.text.contributors && props.text.contributors.length > 0) {
            for (let i = 0; i < props.text.contributors.length; i++) {
                let contributor = props.text.contributors[i];
                contributors.push(<div key={"contributor" + i}><small><strong>{contributor.type}:</strong> <a href="#">{contributor.name}</a></small><br/></div>);
            }
        }

        if (footnotes !== undefined) {
            for (let i = 0; i < footnotes.length; i++) {
                if (footnotes[i].type == "E") {
                    footnotes[i].designation = alphabet[alphabetCount];
                    alphabetCount++;
                    academicFootnoteElements.push(<><small><strong>[<a id={"b" + footnotes[i].verse + footnotes[i].type + footnotes[i].designation} href={"#" + footnotes[i].verse + footnotes[i].type + footnotes[i].designation}>{footnotes[i].designation}</a>]</strong> {footnotes[i].text}</small><br/></>);
                }
                else {
                    footnotes[i].designation = numberCount;
                    numberCount++;
                    generalFootnoteElements.push(<><small><strong>[<a id={"b" + footnotes[i].verse + footnotes[i].type + footnotes[i].designation} href={"#" + footnotes[i].verse + footnotes[i].type + footnotes[i].designation}>{footnotes[i].designation}</a>]</strong> {footnotes[i].text}</small><br/></>);
                }
            }
        }
    }

    if (verses !== undefined) {
        for (let i = 0; i < verses.length; i++) {
            let currentVerse = verses[i];
            let title = subtitles.find(({verse}) => verse === currentVerse.number);

            lines.push({ 
                text: currentVerse.text, 
                title: title ? title.text : undefined,
                number: currentVerse.number 
            });
        }
    }

    //https://stackoverflow.com/questions/6582233/hash-in-anchor-tags
    let bibleText = (
        (lines.length !== 0) ? (
            lines.map((line, i) => {
                let verse = line;
                let footnotesInVerse = [];

                for (let j = 0; j < footnotes.length; j++) {
                    if (footnotes[j].verse === verse.number)
                        footnotesInVerse.push(footnotes[j]);
                }

                return (<Verse onSelected={props.onSelectionChange} 
                            key={"v" + verse.number + "c" + props.text.chapter}
                            title={verse.title} verseNumber={verse.number}
                            footnotes={footnotesInVerse}
                            verseText={verse.text}
                            settings={settings}/>);
            }
        )
        ) : ""
    )

    return (
        <div className='py-0'>
            {bibleText === "" ? (
                <div className='d-flex justify-content-center'>
                    <Loading/>
                </div>
            ) : (
                <div>
                    {bibleText}
                    {settings.showFootnotesAtBottom || settings.showContributors ? <>
                        <hr className='mt-5'/>
                    </> : <></>}
                    {settings.showFootnotesAtBottom && (settings.showGeneralFootnotes || settings.showAcademicFootnotes) ? <>
                        <div className='mt-4'>
                            <h4>Fodnoter</h4>
                            <div className='mb-3'>
                                {settings.showGeneralFootnotes ? generalFootnoteElements : <></>}
                            </div>
                            <div className='mb-3'>
                                {settings.showAcademicFootnotes ? academicFootnoteElements : <></>}
                            </div>
                        </div>
                    </> : <></>}
                    {settings.showContributors ? <>
                        <div className='mt-4'>
                            <h4>Bidragsydere</h4>
                            {contributors}
                            <br/>
                            <small><strong>Modenhed:</strong> {translationLevel}</small><br/>
                            <small><strong>Sidst ændret:</strong> {lastChange}</small><br/>
                        </div>
                    </> : <></>}
                    
                </div>
            )}
        </div>
    )
}

export default BibleText;