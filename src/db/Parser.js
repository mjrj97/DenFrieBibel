export const arrayResult = (result) => {
    return Object.values(JSON.parse(JSON.stringify(result)));
}

export const objectResult = (result) => {
    return JSON.parse(JSON.stringify(result));
}