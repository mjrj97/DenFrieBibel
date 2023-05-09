const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const onlyLettersRegex = /^[a-zA-Z æøåÆØÅ]*$/;
const containDigitRegex = /\d/;
const containUpperCaseRegex = /(?=.*[A-ZÆØÅ])/;
const containLowerCaseRegex = /(?=.*[a-zæøå])/;
const containWhiteSpaceRegex = /^\S+$/;

export function registerValidation(name, email, password, confirmPassword) {
    let error;

    if (!name)
        name = "";
    if (!email)
        email = "";
    if (!password)
        password = "";
    if (!confirmPassword)
        confirmPassword = "";

    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";

    if (name === "")
        nameError = "Påkrævet";
    else if (!onlyLettersRegex.test(name))
        nameError = "Navnet må kun indeholde danske bogstaver og mellemrum";
    else if (name.length < 8)
        nameError = "Navnet må ikke være kortere end 8 tegn";
    else if (name.length > 64)
        nameError = "Navnet må ikke være længere end 64 tegn";

    if (email === "")
        emailError = "Påkrævet";
    else if (!email.match(containWhiteSpaceRegex))
        emailError = "E-mailen må ikke have mellemrum";
    else if (!email.match(emailRegex))
        emailError = "E-mailen har ikke det korrekte format";
    else if (email.length > 254)
        emailError = "E-mailen må ikke være længere end 254 tegn";
    
    if (password === "")
        passwordError = "Påkrævet";
    else if (password.length < 8)
        passwordError = "Adgangskoden må ikke være kortere end 8 tegn";
    else if (password.length > 40)
        passwordError = "Adgangskoden må ikke være længere end 40 tegn";
    else if (!password.match(containDigitRegex))
        passwordError = "Adgangskoden skal indeholde min. et nummer";
    else if (!password.match(containUpperCaseRegex))
        passwordError = "Adgangskoden skal indeholde min. et stort bogstav";
    else if (!password.match(containLowerCaseRegex))
        passwordError = "Adgangskoden skal indeholde min. et lille bogstav";
    else if (!password.match(containWhiteSpaceRegex))
        passwordError = "Adgangskoden må ikke indeholde mellemrum";

    if (confirmPassword === "")
        confirmPasswordError = "Er ikke identisk med adgangskoden";
    else if (confirmPassword !== password)
        confirmPasswordError = "Er ikke identisk med adgangskoden";

    if (nameError != "" || emailError !== "" || passwordError !== "" || confirmPasswordError != "") {
        error = {
            name: nameError,
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError
        }
    }

    return error;
}

export function loginValidation (email, password) {
    let error;

    let emailError = "";
    let passwordError = "";

    if (email === "")
        emailError = "Påkrævet";
    else if (!email.match(emailRegex))
        emailError = "E-mailen har ikke det korrekte format";
    else if (email.length > 254)
        emailError = "E-mailen må ikke være længere end 254 tegn";

    if (password === "")
        passwordError = "Påkrævet";
    else if (password.length < 8)
        passwordError = "Adgangskoden må ikke være kortere end 8 tegn";
    else if (password.length > 40)
        passwordError = "Adgangskoden må ikke være længere end 40 tegn";

    if (emailError !== "" || passwordError !== "") {
        error = {
            email: emailError,
            password: passwordError
        }
    }

    return error;
}