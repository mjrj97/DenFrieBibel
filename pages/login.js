// Libraries
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Link from 'next/link'

import { loginValidation } from '@/src/auth/Validation';
import TextInput from '@/components/main/form/TextInput';

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        let validationError = loginValidation(email, password);

        if (validationError) {
            setError(validationError);
        }
        else
        {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            };
            fetch('http://localhost:3000/api/auth/login', requestOptions)
            .then(response => { 
                if (response.status === 200) {
                    router.push('/');
                }

                return response.json();
            }).then(data => {
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
                <title>Log ind</title>
            </Head>
            
            <h2>Log ind</h2>
            <form className='mt-4' onSubmit={handleSubmit}>
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
                <br/>
                <div className='row m-0'>
                    <button type="submit" className="col-3 btn btn-primary py-2 px-4">Log ind</button>
                    <div className='col-9'>
                        <Link href="#">Glemt adgangskode?</Link><br/>
                        <Link href="/register">Opret profil</Link>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login;