import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                /*const {username, password} = credentials;
                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password
                    }),
                });
                const user = await res.json();
                if (res.ok && user) {
                    return user;
                }
                else {
                    return null;
                }*/

                const user = { id: "1", name: "Martin J. R. Jensen", email: "martin.jensen.1997@hotmail.com" }

                if (user) {
                    return user
                } else {
                    return null
                }
            }
        }),
    ],

    session:{
        strategy:"jwt"
    },

    pages: {
        signIn: "/login"
    }
}

export default NextAuth(authOptions)