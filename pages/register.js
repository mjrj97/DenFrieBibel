// Libraries
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Link from 'next/link'

import { registerValidation } from '@/src/auth/Validation';
import TextInput from '@/components/main/form/TextInput';

const Register = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

        let validationError = registerValidation(name, email, password, confirmPassword);

        if (validationError) {
            setError(validationError);
        }
        else
        {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, confirmPassword })
            };
            fetch('/api/auth/register', requestOptions)
            .then(response => { 
                if (response.status === 201) {
                    router.push("/");
                }
                
                return response.json();
            })
            .then(data => {
                if (data.errors.length > 0)
                    setError(data.errors[0]);
                else
                {
                    setError({});
                }
            });
        }
    }

    return (
        <>
            <Head>
                <title>Opret bruger</title>
            </Head>
            
            <h2>Opret bruger</h2>
            <form className='mt-4' onSubmit={handleSubmit}>
                <TextInput  value={name} 
                            onChange={(e)=> setName(e.target.value)}
                            type="text" id="name"
                            placeholder="Fulde navn"
                            error={error.name}/>
                <TextInput  value={email} 
                            onChange={(e)=> setEmail(e.target.value)}
                            type="text" id="email"
                            placeholder="E-mail"
                            error={error.email}/>
                <TextInput  value={password} 
                            onChange={(e)=> setPassword(e.target.value)}
                            type="password" id="password"
                            placeholder="Adgangskode"
                            error={error.password}/>
                <TextInput  value={confirmPassword} 
                            onChange={(e)=> setConfirmPassword(e.target.value)}
                            type="password" id="repeatPassword"
                            placeholder="Gentag adgangskode"
                            error={error.confirmPassword}/>
                <br/>
                <div className='row m-0'>
                    <button type="submit" className="col-3 btn btn-primary py-2 px-4">Opret</button>
                    <div className='col-9'>
                        <Link href="/login">Har du allerede en bruger?</Link>
                    </div>
                </div>
            </form>
            <div className='mt-5'>
                <h5>Gode råd til adgangskoden</h5>
                <ul>
                    <li>Undgå at bruge navne eller ord fra ordbogen</li>
                    <li>Brug ikke dit CPR-, NemID-, eller MitID-nummer</li>
                    <li>Lav helst en ny adgangskode, som du ikke har brugt på andre hjemmesider</li>
                </ul>
            </div>
        </>
    )
}

export default Register;