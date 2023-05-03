// Libraries
import React, { useState } from 'react'
import Head from 'next/head'

const About = () => {
    const [status, setStatus] = useState([
        {
            Name: "GT",
            Incomplete: 29,
            Raw: 56,
            Partial: 108,
            Complete: 192,
            Total: 929
        },
        {
            Name: "NT",
            Incomplete: 56,
            Raw: 29,
            Partial: 82,
            Complete: 0,
            Total: 260
        }
    ]);

    return (
        <>
            <Head>
                <title>Om os</title>
            </Head>
            <section className='pb-4'>
                <h2 className='pb-2'>Om os</h2>
                <p>Den Frie Bibel udspringer af ønsket om at skabe en tekstnær dansk bibeloversættelse som er fri for enhver form for copyright. Altså en tekst som alle og enhver har lov til at kopiere og benytte som de ønsker. Forbilledet har været den engelske World English Bible.</p>
                <p>Foreløbig er det kun et begrænsket antal kapitler der foreligger i mere eller mindre færdiggjort grad. Visse kapitler er oversat fra grundsproget, andre er en moderniseret og revideret udgave af de danske oversættelser fra 1871 (GT) og 1907 (NT).</p>
                <p>Oversættelsen er tekstnær. Det betyder at der er lagt vægt på at den danske tekst skal være en så præcis gengivelse af grundteksten som muligt, også på steder hvor grundteksten er vanskelig at forstå. Hvor originalen er tvetydig, bør oversættelsen også være det. Der er altså ikke tale om en gendigtning af den bibelske tekst.</p>
            </section>
            <section className='pb-4'>
                <h2 className='pb-2'>Ophavsret</h2>
                <p>Intet indhold i Den Frie Bibel er belagt med ophavsret. Det betyder at alle har ret til at gøre hvad som helst med teksten: Kopiere den, udskrive den, citere den, lægge den på andre websider, radiotransmittere den, sælge den, prædike over den, osv.</p>
                <p>Derimod er selve betegnelsen Den Frie Bibel et varemærke, og hvis du ændrer teksten, må du ikke benytte betegnelsen Den Frie Bibel om den ændrede tekst.</p>
            </section>
            <section>
                <h2 className='pb-2'>Status</h2>
                <div>
                    {(Array.isArray(status)) ? (status.map((state, i) => 
                        <div className='pb-4' key={i}>
                            <p><strong>{state.Name}</strong>: {state.Complete + state.Partial + state.Raw + state.Incomplete} / {state.Total} kapitler</p>
                            <div className="progress">
                                <div className="progress-bar bg-success" role="progressbar" style={{width: percentage(state.Complete, state.Total)}} aria-valuenow={state.Complete} aria-valuemin="0" aria-valuemax={state.Total}></div>
                                <div className="progress-bar bg-primary" role="progressbar" style={{width: percentage(state.Partial, state.Total)}} aria-valuenow={state.Partial} aria-valuemin="0" aria-valuemax={state.Total}></div>
                                <div className="progress-bar bg-warning" role="progressbar" style={{width: percentage(state.Raw, state.Total)}} aria-valuenow={state.Raw} aria-valuemin="0" aria-valuemax={state.Total}></div>
                                <div className="progress-bar bg-secondary" role="progressbar" style={{width: percentage(state.Incomplete, state.Total)}} aria-valuenow={state.Incomplete} aria-valuemin="0" aria-valuemax={state.Total}></div>
                            </div>
                        </div>
                    )) : ""}
                </div>
            </section>
        </>
    )
}

function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue + "%";
}

export default About;