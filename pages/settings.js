import { useEffect, useState } from 'react'
import Head from 'next/head'

import Checkbox from '@/components/main/Checkbox';
import Select from '@/components/main/Select';

const Reading = () => {
  const godNames = ["Herren", "HERREN", "Jahve", "JHVH"];

  const [settings, setSettings] = useState({
      showVerseNumber: true,
      showTitles: true,
      showFootnotes: true,
      godsName: "Herren"
    }
  );

  useEffect(() => {
    const data = localStorage.getItem("settings");
    if (data) {
      setSettings(JSON.parse(data));
    }
  }, []);

  const handleVerseNumber = () => { 
    const newSettings = { ...settings, showVerseNumber: !settings.showVerseNumber };
    setSettings(newSettings);
    localStorage.setItem("settings", JSON.stringify(newSettings));
  };

  const handleTitles = () => { 
    const newSettings = { ...settings, showTitles: !settings.showTitles };
    setSettings(newSettings);
    localStorage.setItem("settings", JSON.stringify(newSettings));
  };

  const handleFootnotes = () => { 
    const newSettings = { ...settings, showFootnotes: !settings.showFootnotes };
    setSettings(newSettings);
    localStorage.setItem("settings", JSON.stringify(newSettings));
  };

  const handleGodsName = (e) => { 
    const newSettings = { ...settings, godsName: e.target.value };
    setSettings(newSettings);
    localStorage.setItem("settings", JSON.stringify(newSettings));
  };

  return (
    <>
      <Head>
          <title>Læseoplevelse</title>
      </Head>
      
      <Checkbox label={"Vis versnumre"} value={settings.showVerseNumber}  onChange={handleVerseNumber}/>
      <Checkbox label={"Vis overskrifter"} value={settings.showTitles}  onChange={handleTitles}/>
      <Checkbox label={"Vis fodnoter"} value={settings.showFootnotes}  onChange={handleFootnotes}/>

      <div className='col-md-6 mt-2'>
          <Select label={"Guds navn"} value={settings.godsName} onChange={handleGodsName} options={godNames}/>
      </div>
    </>
  )
}

export default Reading;