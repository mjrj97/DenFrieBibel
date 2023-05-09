const handler = (req, res) => {
    let result = {
        content: undefined,
        errors: []
    };

    result.errors.push("´" + req.url + "´ is not a recognized API endpoint. Did you mean /api/bible or /api/comment?");

    res.status(404).json(result);
}

export default handler;