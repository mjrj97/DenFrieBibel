import { useEffect, useState } from 'react'
import Head from 'next/head'

import Checkbox from '@/components/main/Checkbox';
import Select from '@/components/main/Select';

const Reading = () => {
  const godNames = ["Herren", "HERREN", "Jahve", "JHVH"];
  const fonts = ["Helvetica", "Merriweather"];

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

  const handleVerseNumber = () => { saveSettings({ ...settings, showVerseNumber: !settings.showVerseNumber }); };

  const handleShowChapterInVerse = () => { saveSettings({ ...settings, showChapterInVerse: !settings.showChapterInVerse }); };

  const handleTitles = () => { saveSettings({ ...settings, showTitles: !settings.showTitles }); };

  const handleGeneralFootnotes = () => { saveSettings({ ...settings, showGeneralFootnotes: !settings.showGeneralFootnotes }); };

  const handleAcademicFootnotes = () => { saveSettings({ ...settings, showAcademicFootnotes: !settings.showAcademicFootnotes }); };

  const handleFootnotesAtBottom = () => { saveSettings({ ...settings, showFootnotesAtBottom: !settings.showFootnotesAtBottom }); };
 
  const handleContributors = () => { saveSettings({ ...settings, showContributors: !settings.showContributors }); };

  const handleOneVersePerLine = () => { saveSettings({ ...settings, oneVersePerLine: !settings.oneVersePerLine }); };

  const handleExtraLineSpacing = () => { saveSettings({ ...settings, extraLineSpacing: !settings.extraLineSpacing }); };

  const handleExegeticLayout = () => { saveSettings({ ...settings, exegeticLayout: !settings.exegeticLayout }); };

  const handleGodsName = (e) => { saveSettings({ ...settings, godsName: e.target.value }); };

  const handleFont = (e) => { saveSettings({ ...settings, font: e.target.value }); };

  const saveSettings = (s) => {
    setSettings(s);
    localStorage.setItem("settings", JSON.stringify(s));
  }

  return (
    <>
      <Head>
          <title>Læseoplevelse</title>
      </Head>
      
      <h3>Præsentation</h3>
      <Checkbox label={"Vis versnumre"} value={settings.showVerseNumber}  onChange={handleVerseNumber}/>
      <Checkbox label={"Vis kapitelnumre ved hvert vers"} value={settings.showChapterInVerse}  onChange={handleShowChapterInVerse}/>
      <Checkbox label={"Vis overskrifter"} value={settings.showTitles}  onChange={handleTitles}/>
      <Checkbox label={"Ét vers pr. linje"} value={settings.oneVersePerLine}  onChange={handleOneVersePerLine}/>
      <Checkbox label={"Eksegetisk layout"} value={settings.exegeticLayout}  onChange={handleExegeticLayout}/>
      <div className='col-md-6 mt-2'>
          <Select label={"Guds navn"} value={settings.godsName} onChange={handleGodsName} options={godNames}/>
      </div>
      <br/>
      <h3>Tekstbehandling</h3>
      <Checkbox label={"Ekstra linjeafstand"} value={settings.extraLineSpacing}  onChange={handleExtraLineSpacing}/>
      <div className='col-md-6 mt-2'>
          <Select label={"Skrifttype"} value={settings.font} onChange={handleFont} options={fonts}/>
      </div>
      <br/>
      <h3>Fodnoter</h3>
      <Checkbox label={"Vis generelle fodnoter"} value={settings.showGeneralFootnotes}  onChange={handleGeneralFootnotes}/>
      <Checkbox label={"Vis faglige fodnoter"} value={settings.showAcademicFootnotes}  onChange={handleAcademicFootnotes}/>
      <Checkbox label={"Vis fodnoter under bibelteksten"} value={settings.showFootnotesAtBottom}  onChange={handleFootnotesAtBottom}/>
      <Checkbox label={"Vis bidragsydere"} value={settings.showContributors}  onChange={handleContributors}/>
    </>
  )
}

export default Reading;