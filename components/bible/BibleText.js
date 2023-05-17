import React, { useEffect, useState } from 'react';

import Loading from '../main/Loading';
import Verse from './Verse';

function BibleText ({ text, onSelectionChange }) {
    const [settings, setSettings] = useState({
        showVerseNumber: true,
        showChapterInVerse: false,
        showTitles: true,
        showGeneralFootnotes: true,
        showAcademicFootnotes: true,
        showFootnotesAtBottom: true,
        showContributors: true,
        oneVersePerLine: false,
        extraLineSpacing: false,
        exegeticLayout: false,
        godsName: "Herren",
        font: "Helvetica"
    });

    useEffect(() => {
      const data = localStorage.getItem("settings");
      if (data) {
        setSettings(JSON.parse(data));
      }
    }, []);

    let bibleText;
    let verses = [];

    let generalFootnoteElements = [];
    let academicFootnoteElements = [];
    let contributors = [];

    let translationLevel = "";
    let lastChange;
    
    const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    let alphabetCount = 0;
    let numberCount = 1;

    if (text) {
        verses = text.verses;

        if (verses && verses.length > 0) {
            lastChange = 0;
            for (let i = 0; i < verses.length; i++) {
                if (lastChange < verses[i].version)
                    lastChange = verses[i].version;
            }
            lastChange = new Date(lastChange).toLocaleDateString("da-DK", {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\./g, "-");
        }
        
        let translation = text.translation;
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

        if (text.contributors && text.contributors.length > 0) {
            for (let i = 0; i < text.contributors.length; i++) {
                let contributor = text.contributors[i];
                contributors.push(<div key={"contributor" + i}><small><strong>{contributor.type}:</strong> <a href="#">{contributor.name}</a></small><br/></div>);
            }
        }

        if (verses) {
            for (let i = 0; i < verses.length; i++) {
                const verse = verses[i];
                if (verse.footnotes) {
                    for (let j = 0; j < verse.footnotes.length; j++) {
                        const footnote = verse.footnotes[j];
                        if (footnote.type == "E") {
                            footnote.designation = alphabet[alphabetCount];
                            alphabetCount++;
                            academicFootnoteElements.push(<><small><strong>[<a id={"b" + verse.number + footnote.type + footnote.designation} href={"#" + verse.number + footnote.type + footnote.designation}>{footnote.designation}</a>]</strong> {footnote.text}</small><br/></>);
                        }
                        else {
                            footnote.designation = numberCount;
                            numberCount++;
                            generalFootnoteElements.push(<><small><strong>[<a id={"b" + verse.number + footnote.type + footnote.designation} href={"#" + verse.number + footnote.type + footnote.designation}>{footnote.designation}</a>]</strong> {footnote.text}</small><br/></>);
                        }
                    }
                }
            }

            bibleText = verses.map((verse, i) => {
                return (<Verse onSelected={onSelectionChange} 
                            key={"v" + verse.number + "c" + text.chapter}
                            verse={verse}
                            index={i}
                            settings={settings}/>);
            });
        }
    }

    return (
        <div className='py-0'>
            {!bibleText ? (
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