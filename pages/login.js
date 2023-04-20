// Libraries
import { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { signIn } from 'next-auth/react';

import { LoginValidation } from '@/src/Validation';
import TextInput from '@/components/main/form/TextInput';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        let validationError = LoginValidation(email, password);

        if (validationError) {
            setError(validationError);
        }
        else
        {
            setError({});

            const result = await signIn("credentials", {
                username: email,
                password,
                redirect: true,
                callbackUrl: "/"
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